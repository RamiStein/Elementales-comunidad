// =========================================================================
// ELEMENTALES COMUNIDAD - SINCRONIZACIÓN DE PEDIDOS CON GOOGLE SHEETS
// =========================================================================
// Este módulo permite que cualquier pedido realizado en la web (Oliva, Frutilla,
// Compra Lunar) se registre automáticamente en una planilla de Google Sheets
// en tiempo real, y que el Panel de Gestión lea esa misma planilla.

const ElementalesSheets = {
  STORAGE_KEY: 'elementales_google_sheets_url',
  // URL por defecto (puede sobreescribirse desde el Panel de Gestión o configurar aquí)
  defaultUrl: 'https://script.google.com/macros/s/AKfycbw_placeholder_elementales/exec',

  getUrl() {
    try {
      if (typeof localStorage !== 'undefined') {
        const customUrl = localStorage.getItem(this.STORAGE_KEY);
        if (customUrl && customUrl.trim()) return customUrl.trim();
      }
    } catch (e) {}
    if (typeof window !== 'undefined' && window.ELEMENTALES_SHEETS_URL) {
      return window.ELEMENTALES_SHEETS_URL;
    }
    return this.defaultUrl;
  },

  setUrl(url) {
    if (!url) return;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, url.trim());
      }
    } catch (e) {}
  },

  isConfigured() {
    const url = this.getUrl();
    return Boolean(url && !url.includes('placeholder') && url.startsWith('https://script.google.com/macros/s/'));
  },

  /**
   * Envía un pedido silenciosamente a la planilla de Google Sheets.
   * Utiliza mode: 'no-cors' para garantizar que ningún navegador (Chrome, Safari, iOS)
   * bloquee el envío por políticas de origen cruzado de Google.
   */
  async sendOrder(orderData) {
    const url = this.getUrl();
    if (!this.isConfigured()) {
      console.log('Google Sheets: Webhook no configurado aún o en modo placeholder.');
      return false;
    }

    try {
      // Formatear payload limpio para Google Sheets
      const payload = {
        id: String(orderData.id || ''),
        dateStr: orderData.dateStr || new Date().toLocaleDateString('es-AR'),
        timeStr: orderData.timeStr || new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        clientName: orderData.clientName || 'Vecin@',
        clientPhone: orderData.clientPhone || '',
        clientEmail: orderData.clientEmail || '',
        productName: orderData.productName || 'Aceite de Oliva Extra Virgen Lorenzo Cabrera',
        liters: Number(orderData.liters || 0),
        kg: Number(orderData.kg || 0),
        tierName: orderData.tierName || '',
        total: Number(orderData.total || 0),
        communityContribution: Number(orderData.communityContribution || orderData.donation || 0),
        paymentMethod: orderData.paymentMethod || 'Transferencia',
        nodoNombre: orderData.nodoNombre || 'Nodo La Lucila',
        serElemental: orderData.serElemental || 'Bauti',
        clientAddress: typeof orderData.clientAddress === 'object' ? (orderData.clientAddress.full || '') : String(orderData.clientAddress || ''),
        notes: orderData.notes || '',
        type: orderData.type || 'lunar',
        status: orderData.status || 'Confirmado',
        timestamp: orderData.timestamp || Date.now()
      };

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log('✓ Pedido #' + payload.id + ' despachado hacia Google Sheets con éxito.');
      return true;
    } catch (err) {
      console.warn('Google Sheets: Error al enviar pedido:', err);
      return false;
    }
  },

  /**
   * Obtiene la lista completa de pedidos desde la planilla de Google Sheets.
   * La función doGet() del Apps Script devuelve un arreglo JSON.
   */
  async fetchOrders() {
    const url = this.getUrl();
    if (!this.isConfigured()) {
      return { success: false, error: 'La URL de Google Sheets no está configurada.' };
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Respuesta HTTP no satisfactoria: ' + response.status);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        return { success: true, orders: data };
      } else if (data && Array.isArray(data.orders)) {
        return { success: true, orders: data.orders };
      }
      return { success: false, error: 'Formato de respuesta inesperado de Google Sheets.' };
    } catch (err) {
      return { success: false, error: err.message || 'Error de conexión con Google Sheets.' };
    }
  },

  /**
   * Normaliza una fila leída desde Google Sheets al formato interno de pedidos.
   */
  normalizeSheetRow(row) {
    if (!row) return null;
    const id = String(row.Ticket_ID || row.Ticket || row.id || row.ID || '').trim();
    if (!id) return null;

    const liters = Number(row.Litros_Kg || row.Litros || row.liters || 0);
    const kg = Number(row.Litros_Kg || row.kg || 0);
    const total = Number(row.Total || row.total || 0);
    const donation = Number(row.Aporte_Org || row.donation || row.communityContribution || 0);
    const clientName = String(row.Cliente || row.clientName || 'Vecin@').trim();
    const clientPhone = String(row.Telefono || row.clientPhone || '').trim();
    const clientEmail = String(row.Email || row.clientEmail || '').trim();
    const nodoNombre = String(row.Nodo_Retiro || row.nodoNombre || 'Nodo La Lucila').trim();
    const serElemental = String(row.Ser_Elemental || row.serElemental || 'Bauti').trim();
    const paymentMethod = String(row.Forma_Pago || row.paymentMethod || 'Transferencia').trim();
    const productName = String(row.Producto || row.productName || 'Aceite de Oliva Extra Virgen Lorenzo Cabrera').trim();
    const tierName = String(row.Escala || row.tierName || '').trim();
    const status = String(row.Estado || row.status || 'Confirmado').trim();
    const dateStr = String(row.Fecha || row.dateStr || '').trim();
    const timeStr = String(row.Hora || row.timeStr || '').trim();

    const isOliva = id.startsWith('OLIV-') || /oliva|aceite/i.test(productName);
    const isFrut = id.startsWith('FRUT-') || /frutilla/i.test(productName);

    let items = [];
    if (isOliva) {
      items = [{
        name: `Aceite de Oliva Extra Virgen Lorenzo Cabrera (${liters || 1}L)`,
        qty: liters || 1,
        price: total > 0 ? (total - donation) / (liters || 1) : 18700
      }];
    } else if (isFrut) {
      items = [{
        name: `Frutillas Agroecológicas Finca Ecotipa (${kg || 2.5} kg)`,
        qty: 1,
        price: total > 0 ? (total - donation) : 22000
      }];
    } else {
      items = [{
        name: productName,
        qty: 1,
        price: total > 0 ? (total - donation) : 0
      }];
    }

    return {
      id: id,
      number: parseInt(id.replace(/\D/g, ''), 10) || 1,
      dateStr: dateStr || new Date().toLocaleDateString('es-AR'),
      timeStr: timeStr || new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      clientName: clientName,
      clientPhone: clientPhone,
      clientEmail: clientEmail,
      nodoNombre: nodoNombre,
      serElemental: serElemental,
      paymentMethod: paymentMethod,
      items: items,
      total: total,
      donation: donation,
      communityContribution: donation,
      liters: isOliva ? (liters || 1) : undefined,
      kg: isFrut ? (kg || 2.5) : undefined,
      tierName: tierName,
      productName: productName,
      status: status,
      type: (isOliva || String(row.Tipo).toLowerCase() === 'lunar') ? 'lunar' : 'semanal',
      source: 'google_sheets'
    };
  }
};

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.ElementalesSheets = ElementalesSheets;
}
