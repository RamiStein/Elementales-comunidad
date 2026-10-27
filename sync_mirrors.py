import os
import shutil

repos = [
    r"C:\Users\Rami\Desktop\Repositorio Elementales Comunidad\Elementales-comunidad",
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria"
]

print("Starting synchronization across repositories...")

for repo in repos:
    source_lunar = os.path.join(repo, "compralunar.html")
    if not os.path.exists(source_lunar):
        continue

    targets_lunar = [
        os.path.join(repo, "compralunar", "index.html"),
        os.path.join(repo, "compralunar", "nodos", "index.html"),
        os.path.join(repo, "compralunar", "nodos", "lomaverde", "index.html"),
        os.path.join(repo, "compralunar", "nodos", "chasqui", "index.html"),
        os.path.join(repo, "compralunar", "nodos", "central", "index.html"),
    ]

    for t in targets_lunar:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        shutil.copy2(source_lunar, t)
        print(f"Copied lunar to: {t}")

    source_gestion = os.path.join(repo, "gestionelemental.html")
    target_gestion = os.path.join(repo, "gestionelemental", "index.html")
    if os.path.exists(source_gestion):
        os.makedirs(os.path.dirname(target_gestion), exist_ok=True)
        shutil.copy2(source_gestion, target_gestion)
        print(f"Copied gestion to: {target_gestion}")

print("Sync completed successfully for all mirrors!")
