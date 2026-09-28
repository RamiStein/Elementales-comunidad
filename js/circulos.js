// =========================================================================
// FACULTAD DE CÍRCULOS (VRDE CLUB & RED ELEMENTALES)
// =========================================================================
// Autogestión de compras colectivas vecinales en Nodo Loma Verde (Escobar).
// Las familias se agrupan en Círculos barriales para pedir cajones agroecológicos
// de Central Cooperativa Chasqui (+40% sobre costo base).

// Círculos iniciales en limpio para comenzar de cero
const INITIAL_CIRCULOS = [];

const CirculosManager = {
  STORAGE_KEY: 'elementales_circulos',
  RESET_KEY: 'elementales_circulos_v5_clean',

  getAllCircles() {
    // Reset completo para empezar de cero a pedido del usuario
    if (localStorage.getItem(this.RESET_KEY) !== 'true') {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem('elementales_active_circle_id');
      localStorage.removeItem('elementales_my_created_circles');
      localStorage.setItem(this.RESET_KEY, 'true');
    }

    const saved = localStorage.getItem(this.STORAGE_KEY);
    let list = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          list = parsed;
        }
      } catch (e) {
        console.error('Error parseando círculos:', e);
      }
    }

    // Asegurar nodoId = nodo-lomaverde y campos de alias/modalidad
    list.forEach(c => {
      c.nodoId = 'nodo-lomaverde';
      if (!c.modalidad) c.modalidad = 'ambas';
      if (!c.alias) c.alias = '';
      if (!c.slug) {
        c.slug = (c.nombre || c.id)
          .toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    });

    return list;
  },

  saveCircles(circles) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(circles));
  },

  getCirclesByNode(nodeId) {
    return this.getAllCircles();
  },

  getCircle(idOrSlug) {
    if (!idOrSlug) return null;
    const all = this.getAllCircles();
    const query = String(idOrSlug).toLowerCase().trim();
    return all.find(c => 
      c.id.toLowerCase() === query || 
      (c.slug && c.slug.toLowerCase() === query) ||
      (c.nombre && c.nombre.toLowerCase().includes(query))
    );
  },

  getActiveCircleId() {
    return localStorage.getItem('elementales_active_circle_id');
  },

  setActiveCircleId(id) {
    if (id) {
      localStorage.setItem('elementales_active_circle_id', id);
    } else {
      localStorage.removeItem('elementales_active_circle_id');
    }
  },

  getShareUrl(circleId) {
    const circle = this.getCircle(circleId);
    if (!circle) return 'https://elementales.store';

    let base = (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null' && window.location.protocol !== 'file:')
      ? window.location.origin.replace(/\/+$/, '')
      : 'https://elementales.store';

    const slug = circle.slug || circle.id;
    return `${base}/circulo/${slug}`;
  },

  getCreatedCircleIds() {
    try {
      const saved = localStorage.getItem('elementales_my_created_circles');
      if (saved) return JSON.parse(saved);
      return [];
    } catch (e) {
      return [];
    }
  },

  addCreatedCircleId(id) {
    if (!id) return;
    const list = this.getCreatedCircleIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem('elementales_my_created_circles', JSON.stringify(list));
    }
  },

  isCircleCreator(circleId) {
    if (!circleId) return false;
    const circle = this.getCircle(circleId);
    if (!circle) return false;

    // 1. Verificación por registro en este navegador
    const myCreated = this.getCreatedCircleIds();
    if (myCreated.includes(circle.id)) return true;

    // 2. Verificación por autoría de sesión actual
    if (typeof AppState !== 'undefined') {
      const currentName = (AppState.userName || '').toLowerCase().trim();
      const currentCode = (AppState.userCode || '').trim();

      if (circle.creador && currentName && circle.creador.toLowerCase().trim() === currentName) {
        return true;
      }
      if (circle.creadorCodigo && currentCode && circle.creadorCodigo === currentCode) {
        return true;
      }
      if (circle.coordinador && currentName && circle.coordinador.toLowerCase().includes(currentName)) {
        return true;
      }
    }

    return false;
  },

  canEditCircle(circleId) {
    if (!circleId) return false;
    // Gestor autenticado con PIN
    const isGestor = typeof AppState !== 'undefined' && 
                     AppState.userRole === 'gestor' && 
                     sessionStorage.getItem('elementales_gestor_auth') === 'true';
    if (isGestor) return true;

    // Solo el creador / coordinador original puede editar
    return this.isCircleCreator(circleId);
  },

  updateCircle(circleId, data) {
    if (!circleId) return { success: false, error: 'ID de círculo inválido' };

    // CONTROL ESTRICTO DE PERMISOS: Solo el creador o gestor puede modificar la información
    if (!this.canEditCircle(circleId)) {
      return { 
        success: false, 
        error: '⛔ No tenés permisos para modificar este Círculo. Solo quien lo creó puede cambiar su nombre, dirección, coordinadores o alias.' 
      };
    }

    const all = this.getAllCircles();
    const circle = all.find(c => c.id === circleId || c.slug === circleId);
    if (!circle) return { success: false, error: 'Círculo no encontrado' };

    // Validar nombre
    if (data.nombre && data.nombre.trim()) {
      circle.nombre = data.nombre.trim();
    }

    // Validar dirección
    if (data.direccion && data.direccion.trim()) {
      circle.direccion = data.direccion.trim();
    }

    // Validar coordinadores
    if (data.coordinador && data.coordinador.trim()) {
      circle.coordinador = data.coordinador.trim();
    }

    // Validar teléfono
    if (data.telefono !== undefined) {
      circle.telefono = data.telefono.trim();
    }

    // Validar alias donde se junta el dinero
    if (data.alias !== undefined) {
      circle.alias = data.alias.trim();
    }

    // Validar modalidad (semanal, lunar o ambas)
    if (data.modalidad) {
      circle.modalidad = data.modalidad;
      circle.frecuencia = data.modalidad === 'ambas' 
        ? 'Semanal y Lunar' 
        : (data.modalidad === 'lunar' ? 'Lunar (Mensual)' : 'Semanal (Miércoles)');
    }

    // Validar descripción
    if (data.descripcion !== undefined) {
      circle.descripcion = data.descripcion.trim();
    }

    // Validar slug si fue modificado
    if (data.slug && data.slug.trim()) {
      const cleanSlug = data.slug.trim()
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const RESERVED = ['nodo', 'circulo', 'lomaverde', 'lucila', 'cooperativa', 'chasqui', 'nodo-lomaverde', 'admin', 'api', 'store'];
      if (!RESERVED.includes(cleanSlug)) {
        const duplicate = all.find(c => c.slug === cleanSlug && c.id !== circle.id);
        if (!duplicate && cleanSlug.length > 0) {
          circle.slug = cleanSlug;
        }
      }
    }

    this.saveCircles(all);
    return { success: true, circle };
  },

  updateCircleSlug(circleId, rawSlug) {
    return this.updateCircle(circleId, { slug: rawSlug });
  },

  createCircle(data) {
    const all = this.getAllCircles();
    const newId = 'circulo-' + Date.now().toString(36);

    let slug = '';
    if (data.slug && data.slug.trim()) {
      slug = data.slug.trim()
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (!slug) {
      slug = (data.nombre || 'circulo')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (!slug) slug = newId;

    let finalSlug = slug;
    let counter = 2;
    while (all.some(c => c.slug === finalSlug && c.id !== newId)) {
      finalSlug = `${slug}-${counter++}`;
    }

    const currentUserName = (typeof AppState !== 'undefined' && AppState.userName) ? AppState.userName : 'Coordinador/a';
    const currentUserCode = (typeof AppState !== 'undefined' && AppState.userCode) ? AppState.userCode : '';

    const modalidad = data.modalidad || 'ambas'; // 'ambas' | 'semanal' | 'lunar'
    const frecuencia = modalidad === 'ambas' 
      ? 'Semanal y Lunar' 
      : (modalidad === 'lunar' ? 'Lunar (Mensual)' : 'Semanal (Miércoles)');

    const newCircle = {
      id: newId,
      slug: finalSlug,
      nodoId: 'nodo-lomaverde',
      nombre: (data.nombre || 'Círculo Comunitario').trim(),
      coordinador: (data.coordinador || currentUserName).trim(),
      telefono: (data.telefono || '').trim(),
      direccion: (data.direccion || 'Punto Barrial acordado').trim(),
      alias: (data.alias || '').trim(),
      modalidad: modalidad,
      frecuencia: frecuencia,
      descripcion: (data.descripcion || 'Círculo de compra colectiva de cajones Chasqui (+40%).').trim(),
      creador: currentUserName,
      creadorCodigo: currentUserCode,
      fechaCreacion: new Date().toLocaleDateString('es-AR'),
      miembros: [
        { nombre: `${(data.coordinador || currentUserName).trim()} (Coordinador/a)`, rol: 'coordinador' }
      ],
      pedidos: []
    };

    all.unshift(newCircle);
    this.saveCircles(all);
    this.addCreatedCircleId(newId); // Registrar creador en localStorage
    this.setActiveCircleId(newId);
    return newCircle;
  },

  joinCircle(circleId, memberName) {
    const all = this.getAllCircles();
    const circle = this.getCircle(circleId);
    if (!circle) return false;

    const name = memberName || (typeof AppState !== 'undefined' && AppState.userName) || 'Vecino/a';
    const exists = (circle.miembros || []).some(m => m.nombre === name);
    if (!exists) {
      if (!circle.miembros) circle.miembros = [];
      circle.miembros.push({ nombre: name, rol: 'miembro' });
      this.saveCircles(all);
    }
    this.setActiveCircleId(circle.id);
    return true;
  },

  addOrderToCircle(circleId, orderData) {
    const all = this.getAllCircles();
    const circle = all.find(c => c.id === circleId || c.slug === circleId);
    if (!circle) return false;

    if (!circle.pedidos) circle.pedidos = [];
    const newOrder = {
      id: 'ped-circ-' + Date.now().toString(36),
      vecino: orderData.clientName || (typeof AppState !== 'undefined' && AppState.userName) || 'Vecino/a',
      items: orderData.itemsSummary || 'Cajón Chasqui',
      total: orderData.totalAmount || 0,
      fecha: new Date().toLocaleDateString('es-AR'),
      estado: 'Listo para consolidar'
    };
    circle.pedidos.unshift(newOrder);
    this.saveCircles(all);
    return newOrder;
  },

  generateWhatsAppOrder(circleId) {
    const circle = this.getCircle(circleId);
    if (!circle) return '';

    const pedidos = circle.pedidos || [];
    const totalGral = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);

    let text = `📦 *PEDIDO CONSOLIDADO CÍRCULO: ${circle.nombre.toUpperCase()}*\n`;
    text += `🌿 *Nodo:* Nodo Loma Verde (Escobar)\n`;
    text += `📍 *Punto de Retiro:* ${circle.direccion}\n`;
    text += `👤 *Coordinador/a:* ${circle.coordinador} (${circle.telefono})\n`;
    if (circle.alias) {
      text += `💳 *Alias para juntar el dinero:* ${circle.alias}\n`;
    }
    text += `📅 *Modalidad:* ${circle.modalidad === 'ambas' ? 'Semanal y Lunar' : (circle.modalidad === 'lunar' ? 'Lunar' : 'Semanal')}\n`;
    text += `------------------------------------\n`;
    text += `👥 *DESGLOSE DE VECINOS (${pedidos.length} pedidos sumados):*\n\n`;

    pedidos.forEach((p, idx) => {
      text += `*${idx + 1}. ${p.vecino}* ($${p.total.toLocaleString('es-AR')}):\n`;
      text += `   ${p.items}\n\n`;
    });

    text += `------------------------------------\n`;
    text += `💰 *TOTAL A CONSOLIDAR:* $${totalGral.toLocaleString('es-AR')}\n\n`;
    text += `_Pedido coordinado en Círculo Vecinal desde Elementales Red Comunitario._`;

    return text;
  },

  generateShareText(circleId) {
    const circle = this.getCircle(circleId);
    if (!circle) return '';
    const url = this.getShareUrl(circle.id);
    const modTxt = circle.modalidad === 'ambas' ? 'Semanal y Lunar' : (circle.modalidad === 'lunar' ? 'Lunar' : 'Semanal');

    let text = `🤝 *¡Sumate al Círculo ${circle.nombre}!* 🌿\n`;
    text += `📍 *Retiro:* ${circle.direccion}\n`;
    text += `👤 *Coordina:* ${circle.coordinador}\n`;
    if (circle.alias) {
      text += `💳 *Alias para el fondo común:* ${circle.alias}\n`;
    }
    text += `🗓️ *Modalidad de compra:* ${modTxt}\n\n`;
    text += `¡Hola vecinos! 👋 En nuestro círculo compramos juntos cajones agroecológicos de Chasqui directo de quintas a precio mayorista.\n\n`;
    text += `👉 *Entrá a la tienda de nuestro círculo para ver el catálogo y sumar tus pedidos:*\n`;
    text += `${url}\n\n`;
    text += `_Podés pedir el cajón entero cerrado o dividir los kilos con nosotros._`;
    return text;
  },

  generateNotifyOrderText(circleId, order) {
    const circle = this.getCircle(circleId);
    if (!circle) return '';
    const url = this.getShareUrl(circle.id);

    let text = `🎉 *¡Hola! Ya sumé mi pedido al Círculo ${circle.nombre}!*\n\n`;
    text += `👤 *Vecino/a:* ${order.clientName}\n`;
    text += `📦 *Detalle:* ${order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}\n`;
    text += `💰 *Total a transferir:* $${(order.total || 0).toLocaleString('es-AR')}\n`;
    if (circle.alias) {
      text += `💳 *Alias para enviar comprobante:* ${circle.alias}\n`;
    }
    text += `📍 *Retiro acordado:* ${circle.direccion}\n`;
    text += `👤 *Coordina:* ${circle.coordinador}\n\n`;
    text += `👉 *Si querés sumarte a pedir en nuestro Círculo, entrá acá:*\n${url}`;
    return text;
  }
};
