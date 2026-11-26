import urllib.request
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

sheet_id = "1FvAOeFqYvRnfNY7HRj5RqwZgF0kaaNMcaXb8qthR8a8"

special_sheets = [
    ("Total mensual Abril 26", "1855332985"),
    ("Total mensual Mayo 26", "941704748"),
    ("Total mensual Junio 26", "1989900191"),
    ("Total mensual Julio 26", "1008557068"),
    ("Total mensual Agosto 26", "814773458"),
    ("Costos Fijos y Variables", "344934936"),
    ("Aportes", "1980373469"),
    ("Cuenta Enzo", "608280352")
]

for name, gid in special_sheets:
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
    print(f"\n=======================================================")
    print(f"TAB: {name} (gid={gid})")
    print(f"=======================================================")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='replace')
            lines = [l for l in content.splitlines() if l.strip()]
            for l in lines:
                print(l)
    except Exception as e:
        print(f"Error fetching {name}: {e}")
