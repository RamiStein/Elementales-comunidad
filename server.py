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

    def do_GET(self):
        # Soporte para URLs limpias (SPA): si no existe el archivo estático, redirigir internamente a index.html
        path_without_query = self.path.split('?')[0].split('#')[0]
        full_path = self.translate_path(path_without_query)
        if not os.path.exists(full_path) and not '.' in os.path.basename(path_without_query):
            # Guardar el segmento original en query si es necesario
            clean_slug = path_without_query.strip('/')
            query_part = self.path.split('?')[1] if '?' in self.path else ''
            if clean_slug in ['lomaverde', 'nodo-lomaverde']:
                self.path = f"/?nodo=lomaverde&{query_part}" if query_part else "/?nodo=lomaverde"
            elif clean_slug in ['lucila', 'nodo-lucila']:
                self.path = f"/?nodo=lucila&{query_part}" if query_part else "/?nodo=lucila"
            elif clean_slug in ['cooperativa', 'chasqui', 'nodo-cooperativa']:
                self.path = f"/?nodo=cooperativa&{query_part}" if query_part else "/?nodo=cooperativa"
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
