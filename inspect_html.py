import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("htmlview.html", "w", encoding="utf-8") as f:
    import urllib.request
    url = "https://docs.google.com/spreadsheets/d/1FvAOeFqYvRnfNY7HRj5RqwZgF0kaaNMcaXb8qthR8a8/htmlview"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='replace')
        f.write(content)

print(f"Written htmlview.html, length: {len(content)}")

# Look for 'gid' or sheet names or footer
for m in re.finditer(r'gid=(\d+)', content):
    print("Found gid match:", m.group(0), "context:", content[max(0, m.start()-50):min(len(content), m.end()+50)])

# Also search for 'sheet' or tab bar
for m in re.finditer(r'<ul id="sheet-menu"', content):
    print("Found sheet-menu:", content[m.start():m.start()+1000])

# Also check for table headers or text
tables = re.findall(r'<table[^>]*>.*?</table>', content, re.DOTALL)
print(f"Total tables: {len(tables)}")
