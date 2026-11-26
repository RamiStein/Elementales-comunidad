import urllib.request
import re
import sys
import json

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
        # check if date
        date_match = re.search(r'(\d{1,2})[/-](\d{1,2})', name)
        if date_match and "Total" not in name:
            day = int(date_match.group(1))
            month = int(date_match.group(2))
            daily_sheets.append((month, day, name, gid))

daily_sheets.sort(key=lambda x: (x[0], x[1]))
print(f"Total daily sheets found: {len(daily_sheets)}")

# Group by month
by_month = {}
for m, d, name, gid in daily_sheets:
    by_month.setdefault(m, []).append((d, name, gid))

for m in sorted(by_month.keys()):
    print(f"Month {m}: {len(by_month[m])} sheets. Range: {by_month[m][0][1]} to {by_month[m][-1][1]}")
