import http.server
import socketserver
import socket
import webbrowser
import os
import sys

PORT = 8080

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
        super().end_headers()

    def guess_type(self, path):
        ctype = super().guess_type(path)
        if ctype.startswith('text/') or ctype in ['application/javascript', 'application/json']:
            if 'charset' not in ctype:
                ctype += '; charset=utf-8'
        return ctype

    def do_GET(self):
        # Soporte para URLs limpias (SPA): si no existe el archivo estático, redirigir internamente a index.html
        path_without_query = self.path.split('?')[0].split('#')[0]
        full_path = self.translate_path(path_without_query)
        if not os.path.exists(full_path) and not '.' in os.path.basename(path_without_query):
            clean_slug = path_without_query.strip('/')
            query_part = self.path.split('?')[1] if '?' in self.path else ''
            parts = [p for p in clean_slug.split('/') if p]
            first = parts[0].lower() if parts else ''
            second = parts[1].lower() if len(parts) > 1 else ''

            if first == 'nodo':
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

if __name__ == "__main__":
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    
    local_ip = get_local_ip()
    url_local = f"http://localhost:{PORT}"
    url_network = f"http://{local_ip}:{PORT}"

    print("=" * 60)
    print("🌿 ELEMENTALES COMUNIDAD - SISTEMA DE FERIA & PEDIDOS 🌿")
    print("=" * 60)
    print(f"👉 Acceso en esta computadora: {url_local}")
    print(f"📱 Acceso desde celulares en la misma red Wi-Fi: {url_network}")
    print("=" * 60)
    print("Presiona Ctrl+C para detener el servidor.")

    # Intentar abrir el navegador automáticamente
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
