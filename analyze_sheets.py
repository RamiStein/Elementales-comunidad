import urllib.request
import re
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

sheet_id = "1FvAOeFqYvRnfNY7HRj5RqwZgF0kaaNMcaXb8qthR8a8"
url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/htmlview"

print(f"Fetching spreadsheet metadata for ID: {sheet_id}...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='replace')
        print(f"Fetched HTML, length: {len(html)}")
except Exception as e:
    print(f"Error fetching htmlview: {e}")
    sys.exit(1)

# Look for sheet buttons in htmlview
# Standard pattern: <li class="" id="sheet-button-0"><a href="#0">Sheet1</a></li>
pattern = r'<li[^>]*id="sheet-button-([^"]+)"[^>]*><a[^>]*href="[^"]*"[^>]*>([^<]+)</a>'
matches = re.findall(pattern, html)
print(f"Found {len(matches)} tabs via sheet-button:")
tabs = []
for gid, name in matches:
    tabs.append({"gid": gid, "name": name.strip()})
    print(f"  - GID: {gid} | Name: {name.strip()}")

if not matches:
    # Try looking in bootstrap data or scripts
    print("Searching for bootstrap data or other sheet indicators...")
    # Look for "name": "...", "sheetId": ...
    sheet_matches = re.findall(r'\"name\":\"([^\"]+)\"[^}]*\"sheetId\":([0-9]+)', html)
    print(f"Found via JSON: {sheet_matches}")
    for name, gid in sheet_matches:
        tabs.append({"gid": gid, "name": name})

# Now fetch each tab as CSV and save
for t in tabs:
    gid = t['gid']
    name = t['name']
    csv_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
    print(f"\n--- Fetching tab: '{name}' (gid={gid}) ---")
    try:
        csv_req = urllib.request.Request(csv_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(csv_req) as csv_resp:
            csv_content = csv_resp.read().decode('utf-8', errors='replace')
            # Save to disk
            safe_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', name)
            filename = f"sheet_{gid}_{safe_name}.csv"
            with open(filename, "w", encoding="utf-8") as out:
                out.write(csv_content)
            lines = [l for l in csv_content.splitlines() if l.strip()]
            print(f"Saved {filename} ({len(lines)} non-empty lines, {len(csv_content)} bytes)")
            # Print first 10 lines
            for i, line in enumerate(lines[:15]):
                print(f"  [{i+1}] {line}")
    except Exception as e:
        print(f"Error fetching tab {gid}: {e}")
