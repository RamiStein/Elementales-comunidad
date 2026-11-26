import urllib.request
import re
import sys
import csv
import io

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

print(f"Total daily sheets: {len(daily_sheets)}")

# Let's inspect a few daily sheets from Sept, Oct, Nov to see structure
for m_target in [9, 10, 11]:
    m_sheets = [s for s in daily_sheets if s[0] == m_target]
    if m_sheets:
        first = m_sheets[0]
        print(f"\nMonth {m_target} First Sheet: {first[2]} (gid={first[3]})")
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={first[3]}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode('utf-8', errors='replace')
            lines = [l for l in data.splitlines() if l.strip()]
            for l in lines[:25]:
                print("  ", l)
