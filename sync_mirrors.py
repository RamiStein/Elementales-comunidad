import os
import shutil

repos = [
    r"C:\Users\Rami\Desktop\Repositorio Elementales Comunidad\Elementales-comunidad",
    r"C:\Users\Rami\.gemini\antigravity\scratch\elementales-feria"
]

primary = repos[0]
mirror = repos[1]

print("Starting synchronization across repositories...")

# 0. Sincronizar archivos raíz clave desde Desktop a Scratch
root_files_to_mirror = [
    "salud.html",
    "carlos.html",
    "talleres.html",
    "eventos.html",
    "index.html",
    "compralunar.html",
    "frutilla.html",
    "oliva.html",
    "gestionelemental.html",
    "miembroelemental.html",
    "prosumidores.html",
    "404.html"
]

if os.path.exists(primary) and os.path.exists(mirror):
    for rf in root_files_to_mirror:
        src = os.path.join(primary, rf)
        dst = os.path.join(mirror, rf)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"Mirrored {rf} to scratch repo")

    # Mirroring assets de talleres
    src_assets = os.path.join(primary, "public", "assets", "talleres")
    dst_assets = os.path.join(mirror, "public", "assets", "talleres")
    if os.path.exists(src_assets):
        os.makedirs(dst_assets, exist_ok=True)
        for item in os.listdir(src_assets):
            s_item = os.path.join(src_assets, item)
            d_item = os.path.join(dst_assets, item)
            if os.path.isfile(s_item):
                shutil.copy2(s_item, d_item)
        print(f"Mirrored talleres assets to scratch repo")

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

    # 5. Talleres & Eventos
    source_talleres = os.path.join(repo, "talleres.html")
    if os.path.exists(source_talleres):
        targets_talleres = [
            os.path.join(repo, "talleres", "index.html"),
            os.path.join(repo, "eventos", "index.html"),
            os.path.join(repo, "eventos.html")
        ]
        for t in targets_talleres:
            os.makedirs(os.path.dirname(t), exist_ok=True)
            shutil.copy2(source_talleres, t)
            print(f"Copied talleres to: {t}")

    # 6. Taller Salud Dr. Carlos (pH 7,5)
    source_salud = os.path.join(repo, "salud.html")
    if os.path.exists(source_salud):
        targets_salud = [
            os.path.join(repo, "salud", "index.html"),
            os.path.join(repo, "carlos", "index.html"),
            os.path.join(repo, "carlos.html")
        ]
        for t in targets_salud:
            os.makedirs(os.path.dirname(t), exist_ok=True)
            shutil.copy2(source_salud, t)
            print(f"Copied salud to: {t}")

print("Sync completed successfully for all mirrors!")
