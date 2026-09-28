import http.server
import socketserver
import socket
import webbrowser
import os
import sys
import json

PORT = 8080
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
DB_FILE = os.path.join(DATA_DIR, 'elementales_db.json')

def ensure_db():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(DB_FILE):
        initial_db = {
            "sessions": [],
            "orders": [],
            "circulos": [],
            "shares": [],
            "users": []
        }
        with open(DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(initial_db, f, ensure_ascii=False, indent=2)

def read_db():
    ensure_db()
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error leyendo DB: {e}")
        return {"sessions": [], "orders": [], "circulos": [], "shares": [], "users": []}

def write_db(data):
    ensure_db()
    temp_file = DB_FILE + '.tmp'
    try:
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(temp_file, DB_FILE)
        return True
    except Exception as e:
        print(f"Error escribiendo DB: {e}")
        return False

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def guess_type(self, path):
        ctype = super().guess_type(path)
        if ctype.startswith('text/') or ctype in ['application/javascript', 'application/json']:
            if 'charset' not in ctype:
                ctype += '; charset=utf-8'
        return ctype

    def do_GET(self):
        # API REST para Base de Datos
        if self.path.startswith('/api/db'):
            db_data = read_db()
            response_bytes = json.dumps(db_data, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.end_headers()
            self.wfile.write(response_bytes)
            return

        if self.path.startswith('/api/orders'):
            db_data = read_db()
            response_bytes = json.dumps(db_data.get('orders', []), ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.end_headers()
            self.wfile.write(response_bytes)
            return

        # Soporte para URLs limpias (SPA): si no existe el archivo estático, redirigir internamente a index.html
        path_without_query = self.path.split('?')[0].split('#')[0]
        full_path = self.translate_path(path_without_query)
        if not os.path.exists(full_path) and not '.' in os.path.basename(path_without_query):
            clean_slug = path_without_query.strip('/')
            query_part = self.path.split('?')[1] if '?' in self.path else ''
            parts = [p for p in clean_slug.split('/') if p]
            first = parts[0].lower() if parts else ''
            second = parts[1].lower() if len(parts) > 1 else ''
            third = parts[2].lower() if len(parts) > 2 else ''

            if first == 'frutilla':
                circ = second if second else ''
                q = f"circulo={circ}" if circ else ""
                if query_part:
                    q = f"{q}&{query_part}" if q else query_part
                self.path = f"/frutilla.html?{q}" if q else "/frutilla.html"
            elif (first == 'circulo' or first == 'c') and third == 'frutilla':
                q = f"circulo={second}"
                if query_part:
                    q = f"{q}&{query_part}"
                self.path = f"/frutilla.html?{q}"
            elif second == 'frutilla':
                q = f"circulo={first}"
                if query_part:
                    q = f"{q}&{query_part}"
                self.path = f"/frutilla.html?{q}"
            elif first == 'nodo':
                self.path = f"/?nodo=lomaverde&{query_part}" if query_part else "/?nodo=lomaverde"
            elif first == 'circulo' and second:
                self.path = f"/?c={second}&{query_part}" if query_part else f"/?c={second}"
            elif first == 'cajon' and second:
                self.path = f"/?cajon={second}&{query_part}" if query_part else f"/?cajon={second}"
            elif first == 'compartido' and second:
                self.path = f"/?share={second}&{query_part}" if query_part else f"/?share={second}"
            elif clean_slug in ['lomaverde', 'nodo-lomaverde', 'cooperativa', 'chasqui', 'lucila']:
                self.path = f"/?nodo=lomaverde&{query_part}" if query_part else "/?nodo=lomaverde"
            elif clean_slug:
                self.path = f"/?c={clean_slug}&{query_part}" if query_part else f"/?c={clean_slug}"
            else:
                self.path = '/index.html'
        return super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/'):
            endpoint = self.path.split('?')[0].replace('/api/', '').strip('/')
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length).decode('utf-8')
            
            try:
                payload = json.loads(post_body) if post_body else {}
            except Exception:
                payload = {}

            db_data = read_db()

            if endpoint == 'orders':
                orders = db_data.setdefault('orders', [])
                order_id = payload.get('id')
                idx = next((i for i, o in enumerate(orders) if o.get('id') == order_id), None)
                if idx is not None:
                    orders[idx] = payload
                else:
                    orders.insert(0, payload)
                write_db(db_data)

            elif endpoint == 'shares':
                shares = db_data.setdefault('shares', [])
                share_id = payload.get('id')
                idx = next((i for i, s in enumerate(shares) if s.get('id') == share_id), None)
                if idx is not None:
                    shares[idx] = payload
                else:
                    shares.insert(0, payload)
                write_db(db_data)

            elif endpoint == 'circulos':
                circulos = db_data.setdefault('circulos', [])
                c_id = payload.get('id')
                idx = next((i for i, c in enumerate(circulos) if c.get('id') == c_id), None)
                if idx is not None:
                    circulos[idx] = payload
                else:
                    circulos.insert(0, payload)
                write_db(db_data)

            elif endpoint == 'sessions':
                sessions = db_data.setdefault('sessions', [])
                s_id = payload.get('sessionId')
                idx = next((i for i, s in enumerate(sessions) if s.get('sessionId') == s_id), None)
                if idx is not None:
                    sessions[idx] = payload
                else:
                    sessions.insert(0, payload)
                write_db(db_data)

            resp = {"success": True, "endpoint": endpoint}
            resp_bytes = json.dumps(resp).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(resp_bytes)))
            self.end_headers()
            self.wfile.write(resp_bytes)
            return

        self.send_response(404)
        self.end_headers()

if __name__ == "__main__":
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    ensure_db()
    
    local_ip = get_local_ip()
    url_local = f"http://localhost:{PORT}"
    url_network = f"http://{local_ip}:{PORT}"

    print("=" * 60)
    print("🌿 ELEMENTALES COMUNIDAD - SERVIDOR & BASE DE DATOS LOCAL 🌿")
    print("=" * 60)
    print(f"👉 Acceso en esta computadora: {url_local}")
    print(f"📱 Acceso desde celulares en la misma red Wi-Fi: {url_network}")
    print(f"💾 Archivo de Base de Datos: {DB_FILE}")
    print("=" * 60)
    print("Presiona Ctrl+C para detener el servidor.")

    try:
        webbrowser.open(url_local)
    except Exception:
        pass

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
            sys.exit(0)
