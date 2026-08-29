# 🌿 Elementales Comunidad - Sistema de Pedidos & Feria

Sistema ágil y táctil para toma de pedidos en feria y registro de integrantes para compras comunitarias del nodo **Elementales Comunidad**.

Dominio configurado: **[elementales.store](https://elementales.store)**

---

## 📱 Flujos Principales

1. **Ingresar al Nodo**: Pantalla de bienvenida con identidad oficial y acceso directo.
2. **🛍️ Nuevo Pedido**:
   - Catálogo clasificado por categorías (Verduras & Frutas, Lácteos, Granja, Almacén, Panificados, Cosmética).
   - Contadores rápidos `+` / `−` para uso táctil en teléfonos.
   - Posibilidad de agregar productos libres con precios personalizados en el momento.
   - Resumen y cálculo de vuelto para pagos en efectivo.
   - Generación instantánea de ticket para enviar por WhatsApp.
3. **👥 Nuevo Integrante**:
   - Registro para compras comunitarias del nodo (barrio, punto de retiro, productos de interés, frecuencia).
   - Generación de mensaje de bienvenida para WhatsApp.
4. **📊 Panel de Pedidos & Caja**:
   - Métricas en tiempo real: total recaudado, efectivo vs pagos digitales, cantidad de pedidos.
   - Historial de pedidos con cambio de estado (Pagado / Pendiente).
   - Exportación a Excel (CSV).
5. **🌱 Directorio de Integrantes**:
   - Listado de personas sumadas a la comunidad con botón directo de WhatsApp.
   - Exportación a Excel (CSV).
6. **🏷️ Gestor de Catálogo**:
   - Edición de precios en vivo y agregado de nuevos productos.

---

## 🌐 Despliegue en GitHub Pages (para elementales.store)

1. En tu repositorio de GitHub, ve a **Settings** > **Pages**.
2. En **Build and deployment** > **Source**, selecciona `Deploy from a branch`.
3. Selecciona la rama `main` y la carpeta `/ (root)`, luego haz clic en **Save**.
4. En **Custom domain**, ingresa `elementales.store` y guarda los cambios.
5. En tu proveedor de DNS (donde compraste `elementales.store`), apunta los registros DNS a GitHub Pages:
   - **A Records**:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME**:
     - `www` -> `ramistein.github.io`

---

## 💻 Uso Local

Para correrlo localmente:
- Doble clic en `iniciar-servidor.bat`
- O ejecutar: `python server.py`
