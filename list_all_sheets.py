import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("htmlview.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'items\.push\(({[^}]+})\);'
matches = re.findall(pattern, content)

sheets = []
for m in matches:
    gid_match = re.search(r'gid:\s*\"([^\"]+)\"', m)
    name_match = re.search(r'name:\s*\"([^\"]+)\"', m)
    gid = gid_match.group(1) if gid_match else ""
    name = name_match.group(1) if name_match else ""
    name = name.replace(r'\/', '/')
    sheets.append((gid, name))

print(f"Total sheets: {len(sheets)}")
print("First 20 sheets:")
for gid, name in sheets[:20]:
    print(f"  {name:15} (gid={gid})")

print("\nLast 20 sheets:")
for gid, name in sheets[-20:]:
    print(f"  {name:15} (gid={gid})")

print("\nSpecial non-date sheets:")
for gid, name in sheets:
    # check if not date format dd/mm or dd-mm
    if not re.match(r'^\d{1,2}[/-]\d{1,2}$', name):
        print(f"  SPECIAL: '{name}' (gid={gid})")
