import re
import sys
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("htmlview.html", "r", encoding="utf-8") as f:
    content = f.read()

# Look for items.push({ ... })
# e.g.: items.push({url: "...", gid: "...", name: "..."})
pattern = r'items\.push\(({[^}]+})\);'
matches = re.findall(pattern, content)
print(f"Total items.push matches: {len(matches)}")

sheet_info = []
for m in matches:
    # Extract gid and name
    gid_match = re.search(r'gid:\s*\"([^\"]+)\"', m)
    name_match = re.search(r'name:\s*\"([^\"]+)\"', m)
    if not name_match:
        name_match = re.search(r'title:\s*\"([^\"]+)\"', m)
    
    # Also check context around items.push
    gid = gid_match.group(1) if gid_match else "unknown"
    name = name_match.group(1) if name_match else ""
    sheet_info.append({"gid": gid, "name": name, "raw": m})

print(f"Extracted {len(sheet_info)} sheets:")
for s in sheet_info[:30]:
    print(f"  GID: {s['gid']} | Name: {s['name']} | Raw: {s['raw'][:100]}")
