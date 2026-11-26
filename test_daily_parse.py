import urllib.request
import re
import sys
import csv
import io
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

sheet_id = "1FvAOeFqYvRnfNY7HRj5RqwZgF0kaaNMcaXb8qthR8a8"

with open("htmlview.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'items\.push\(({[^}]+})\);'
matches = re.findall(pattern, content)

daily_sheets = []
for m in matches:
    gid_m = re.search(r'gid:\s*\"([^\"]+)\"', m)
    name_m = re.search(r'name:\s*\"([^\"]+)\"', m)
    if gid_m and name_m:
        gid = gid_m.group(1)
        name = name_m.group(1).replace(r'\/', '/').strip()
        date_match = re.search(r'(\d{1,2})[/-](\d{1,2})', name)
        if date_match and "Total" not in name:
            day = int(date_match.group(1))
            month = int(date_match.group(2))
            daily_sheets.append((month, day, name, gid))

daily_sheets.sort(key=lambda x: (x[0], x[1]))

def parse_num(val):
    if not val:
        return 0.0
    val = str(val).strip()
    val = val.replace('$', '').replace(' ', '').replace('"', '')
    if not val:
        return 0.0
    # Handle Argentine format 1.234,56 or 1234.56
    if ',' in val:
        val = val.replace('.', '').replace(',', '.')
    try:
        return float(val)
    except:
        return 0.0

def inspect_sheet_totals(gid, name):
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode('utf-8', errors='replace')
            reader = csv.reader(io.StringIO(data))
            rows = list(reader)
            if not rows:
                return 0, 0, "empty"
            
            # Row 0 check
            row0 = rows[0]
            ingreso_r0 = 0.0
            egreso_r0 = 0.0
            for idx, cell in enumerate(row0):
                if 'INGRESOS' in cell.upper() and idx + 1 < len(row0):
                    # check next few cells
                    for j in range(idx+1, min(idx+5, len(row0))):
                        val = parse_num(row0[j])
                        if val > 0:
                            ingreso_r0 = val
                            break
                if 'EGRESOS' in cell.upper() and idx + 1 < len(row0):
                    for j in range(idx+1, min(idx+6, len(row0))):
                        val = parse_num(row0[j])
                        if val > 0:
                            egreso_r0 = val
                            break

            # Also look at bottom rows for "Total" or sums
            bottom_ingreso = 0.0
            bottom_egreso = 0.0
            for r in reversed(rows[-15:]):
                r_text = " ".join(r).upper()
                if 'TOTAL' in r_text:
                    for c in r:
                        num = parse_num(c)
                        if num > 0:
                            # could be total
                            pass
            return ingreso_r0, egreso_r0, f"r0: {ingreso_r0} / {egreso_r0}"
    except Exception as e:
        return 0, 0, str(e)

# Test on 3 sheets from April and 3 sheets from Sept
for m, d, name, gid in daily_sheets:
    if name in ['23-03', '31/03', '01/04', '04/05', '01/06', '01/07', '03/08', '01/09', '1/10', '02/11']:
        ing, eg, dbg = inspect_sheet_totals(gid, name)
        print(f"Sheet {name:8} (gid={gid}): Ingreso=${ing:,.2f} | Egreso=${eg:,.2f} | {dbg}")
