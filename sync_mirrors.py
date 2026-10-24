import os
import shutil

source = r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria\compralunar.html"
targets = [
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria\compralunar\index.html",
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria\compralunar\nodos\index.html",
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria\compralunar\nodos\lomaverde\index.html",
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria\compralunar\nodos\chasqui\index.html",
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria\compralunar\nodos\central\index.html",
]

print("Starting synchronization...")
for t in targets:
    os.makedirs(os.path.dirname(t), exist_ok=True)
    shutil.copy2(source, t)
    print(f"Copied to: {t}")

print("Sync completed successfully!")
