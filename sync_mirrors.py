import os
import shutil

repos = [
    r"C:\Users\Rami\Desktop\Repositorio Elementales Comunidad\Elementales-comunidad",
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria"
]

print("Starting synchronization across repositories...")

for repo in repos:
    # 1. Compra Lunar
    source_lunar = os.path.join(repo, "compralunar.html")
    if os.path.exists(source_lunar):
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

    # 2. Gestión Elemental
    source_gestion = os.path.join(repo, "gestionelemental.html")
    target_gestion = os.path.join(repo, "gestionelemental", "index.html")
    if os.path.exists(source_gestion):
        os.makedirs(os.path.dirname(target_gestion), exist_ok=True)
        shutil.copy2(source_gestion, target_gestion)
        print(f"Copied gestion to: {target_gestion}")

    # 3. Frutilla
    source_frutilla = os.path.join(repo, "frutilla.html")
    target_frutilla = os.path.join(repo, "frutilla", "index.html")
    if os.path.exists(source_frutilla):
        os.makedirs(os.path.dirname(target_frutilla), exist_ok=True)
        shutil.copy2(source_frutilla, target_frutilla)
        print(f"Copied frutilla to: {target_frutilla}")

    # 4. Aceite de Oliva
    source_oliva = os.path.join(repo, "oliva.html")
    target_oliva = os.path.join(repo, "oliva", "index.html")
    if os.path.exists(source_oliva):
        os.makedirs(os.path.dirname(target_oliva), exist_ok=True)
        shutil.copy2(source_oliva, target_oliva)
        print(f"Copied oliva to: {target_oliva}")

print("Sync completed successfully for all mirrors!")
