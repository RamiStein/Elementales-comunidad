import urllib.request
import re
import sys
import csv
import io
import json
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

sheet_id = "1FvAOeFqYvRnfNY7HRj5RqwZgF0kaaNMcaXb8qthR8a8"

def parse_arg_money(val):
    if val is None:
        return 0.0
    s = str(val).strip()
    s = s.replace('$', '').replace(' ', '').replace('"', '')
    if not s or s == '-' or s == '0':
        return 0.0
    
    # Check for negative in parentheses or minus
    is_neg = False
    if s.startswith('-') or (s.startswith('(') and s.endswith(')')):
        is_neg = True
        s = s.replace('-', '').replace('(', '').replace(')', '')
    
    if ',' in s:
        # Argentine decimal separator: e.g. 1.234.567,89 or 38.500,00
        parts = s.split(',')
        int_part = parts[0].replace('.', '')
        dec_part = parts[1][:2]
        s = f"{int_part}.{dec_part}"
    else:
        # e.g. 246.366 or 246366
        # if dots look like thousand separators (groups of 3)
        if re.search(r'\.\d{3}$', s):
            s = s.replace('.', '')
    try:
        res = float(s)
        return -res if is_neg else res
    except:
        return 0.0

print(f"Testing parse_arg_money: '$ 38.500,00' -> {parse_arg_money('$ 38.500,00')}")
print(f"Testing parse_arg_money: '$ 246.366' -> {parse_arg_money('$ 246.366')}")
print(f"Testing parse_arg_money: '- $ 650.257,00' -> {parse_arg_money('- $ 650.257,00')}")

# Load all daily sheet gids
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
print(f"Loaded {len(daily_sheets)} daily sheets.")

# Process every daily sheet
results = []
for idx, (month, day, name, gid) in enumerate(daily_sheets):
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode('utf-8', errors='replace')
            reader = csv.reader(io.StringIO(data))
            rows = list(reader)
            
            ingreso = 0.0
            egreso = 0.0
            source = "none"

            if rows:
                # 1. Check Row 0 (Libro Diario, INGRESOS ... EGRESOS)
                row0 = rows[0]
                for c_idx, cell in enumerate(row0):
                    c_up = cell.upper().strip()
                    if 'INGRESOS' in c_up:
                        for offset in range(1, 5):
                            if c_idx + offset < len(row0):
                                val = parse_arg_money(row0[c_idx + offset])
                                if val > 0:
                                    ingreso = val
                                    break
                    if 'EGRESOS' in c_up:
                        for offset in range(1, 5):
                            if c_idx + offset < len(row0):
                                val = parse_arg_money(row0[c_idx + offset])
                                if val > 0:
                                    egreso = val
                                    break
                
                # 2. If row 0 did not yield values, check bottom summary rows
                if ingreso == 0.0 and egreso == 0.0:
                    for r in reversed(rows[-10:]):
                        r_str = " ".join(r).upper()
                        if 'TOTAL' in r_str:
                            nums = [parse_arg_money(c) for c in r if parse_arg_money(c) > 0]
                            if nums:
                                # Often: col 1 = total efvo, col 2 = total mp, etc.
                                # or last item is grand total
                                ingreso = max(nums)
                                source = "bottom_total"
                                break

            results.append({
                "month": month,
                "day": day,
                "name": name,
                "gid": gid,
                "ingreso": ingreso,
                "egreso": egreso,
                "ganancia_diaria": ingreso - egreso
            })
            if (idx + 1) % 25 == 0 or idx + 1 == len(daily_sheets):
                print(f"Processed {idx+1}/{len(daily_sheets)} sheets...")
            # small sleep to prevent rate limiting
            time.sleep(0.05)
    except Exception as e:
        print(f"Error on {name} (gid={gid}): {e}")
        results.append({
            "month": month,
            "day": day,
            "name": name,
            "gid": gid,
            "ingreso": 0.0,
            "egreso": 0.0,
            "ganancia_diaria": 0.0,
            "error": str(e)
        })

# Save results JSON
with open("daily_parsed_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nSaved daily_parsed_results.json. Aggregating by month...")

# Aggregate by month
month_names = {
    3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio",
    8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre"
}

monthly_summary = {}
for r in results:
    m = r['month']
    if m not in monthly_summary:
        monthly_summary[m] = {
            "name": month_names.get(m, f"Mes {m}"),
            "dias_registrados": 0,
            "dias_con_movimiento": 0,
            "total_ingresos": 0.0,
            "total_egresos": 0.0,
            "ganancia_operativa": 0.0
        }
    monthly_summary[m]["dias_registrados"] += 1
    if r['ingreso'] > 0 or r['egreso'] > 0:
        monthly_summary[m]["dias_con_movimiento"] += 1
    monthly_summary[m]["total_ingresos"] += r['ingreso']
    monthly_summary[m]["total_egresos"] += r['egreso']
    monthly_summary[m]["ganancia_operativa"] += r['ganancia_diaria']

print("\n" + "="*80)
print(f"{'MES':15} | {'DÍAS':6} | {'INGRESOS ($)':16} | {'EGRESOS ($)':16} | {'GANANCIA/RESULTADO ($)':22}")
print("="*80)

total_gen_ing = 0.0
total_gen_eg = 0.0
total_gen_gan = 0.0

for m in sorted(monthly_summary.keys()):
    info = monthly_summary[m]
    ing = info['total_ingresos']
    eg = info['total_egresos']
    gan = info['ganancia_operativa']
    total_gen_ing += ing
    total_gen_eg += eg
    total_gen_gan += gan
    sign = "+" if gan >= 0 else "-"
    print(f"{info['name']:15} | {info['dias_registrados']:2} ({info['dias_con_movimiento']:2}) | ${ing:>14,.2f} | ${eg:>14,.2f} | {sign}${abs(gan):>18,.2f}")

print("="*80)
tot_sign = "+" if total_gen_gan >= 0 else "-"
print(f"{'TOTAL GENERAL':15} | {'':6} | ${total_gen_ing:>14,.2f} | ${total_gen_eg:>14,.2f} | {tot_sign}${abs(total_gen_gan):>18,.2f}")
print("="*80)
