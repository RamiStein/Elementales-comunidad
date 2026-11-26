import urllib.request
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

sheet_id = "1FvAOeFqYvRnfNY7HRj5RqwZgF0kaaNMcaXb8qthR8a8"

# Check a sample daily sheet from September (e.g. 01/09 or 15/09) and October
sample_gids = [
    ("23-03 (sample March)", "0"),
    ("01-09 (sample Sept)", "740954865"),
    ("01-10 (sample Oct)", "177277065"),
    ("02-11 (sample Nov)", "1388817086")
]

# Find gids for 01/09 and 01/10 from group_daily_sheets
with open("htmlview.html", "r", encoding="utf-8") as f:
    content = f.read()

for m in [9, 10, 11]:
    # find first sheet for month
    match = re.search(r'items\.push\(({[^}]+name:\s*\"0?1[/_-]0?' + str(m) + r'\"[^}]+})\);', content)
    if not match:
        match = re.search(r'items\.push\(({[^}]+name:\s*\"[^\"]+' + str(m) + r'\"[^}]+})\);', content)
    if match:
        gid = re.search(r'gid:\s*\"([^\"]+)\"', match.group(1)).group(1)
        name = re.search(r'name:\s*\"([^\"]+)\"', match.group(1)).group(1).replace(r'\/', '/')
        print(f"Sample Month {m}: {name} (gid={gid})")
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as resp:
                csv_data = resp.read().decode('utf-8', errors='replace')
                print(f"--- CONTENT OF {name} ---")
                for line in csv_data.splitlines()[:25]:
                    if line.strip():
                        print("  ", line)
        except Exception as e:
            print(f"Error fetching {name}: {e}")
