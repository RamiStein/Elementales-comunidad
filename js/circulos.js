// =========================================================================
// FACULTAD DE CÍRCULOS (VRDE CLUB & RED ELEMENTALES)
// =========================================================================
// Este módulo implementa la "Facultad de Círculo" para autogestión de compras colectivas.
// Permite que familias y vecinos se organicen en Círculos barriales para pedir juntos
// cajones agroecológicos de Central Cooperativa Chasqui al costo directo de productor campesino,
// dejando la gestión del pedido y la entrega a cargo de quien pide (el coordinador del círculo).

const INITIAL_CIRCULOS = [
  // Círculos de Nodo Loma Verde (Escobar)
  {
    id: 'circulo-lv-losrobles',
    slug: 'los-robles',
    nodoId: 'nodo-lomaverde',
    nombre: 'Círculo Los Robles (Loma Verde Norte)',
    coordinador: 'Mariana Robles',
    telefono: '5491155443322',
    direccion: 'Calle Los Robles 450, Loma Verde',
    descripcion: 'Familias de Los Robles que compran juntas cajones mayoristas de Chasqui. El pedido llega consolidado y se reparte en el punto barrial.',
    frecuencia: 'Semanal (Miércoles)',
    miembros: [
      { nombre: 'Mariana Robles (Coordinadora)', rol: 'coordinador' },
      { nombre: 'Familia Rossi', rol: 'miembro' },
      { nombre: 'Carlos & Ana', rol: 'miembro' },
      { nombre: 'Martín Huerta', rol: 'miembro' }
    ],
    pedidos: [
      { id: 'ped-circ-01', vecino: 'Familia Rossi', items: '1x Cajón Frutillas 5kg (compartido 2.5kg)', total: 10450, fecha: 'Hoy', estado: 'Listo para consolidar' },
      { id: 'ped-circ-02', vecino: 'Carlos & Ana', items: '1x Cajón Manzana Cripps 20kg (entero)', total: 43840, fecha: 'Hoy', estado: 'Listo para consolidar' },
      { id: 'ped-circ-03', vecino: 'Mariana Robles', items: '1x Cajón Naranjas Salustiana 15kg (fraccionado 5kg)', total: 3853, fecha: 'Hoy', estado: 'Listo para consolidar' }
    ]
  },
  {
    id: 'circulo-lv-biohuerta',
    slug: 'biohuerta',
    nodoId: 'nodo-lomaverde',
    nombre: 'Círculo Bio Huerta Loma Verde (Centro)',
    coordinador: 'Julián Eco',
    telefono: '5491144221199',
    direccion: 'Las Encinas 120, Loma Verde Centro',
    descripcion: 'Vecinos de la zona centro de Loma Verde coordinando compras comunitarias de cajones de verdura y huerta agroecológica.',
    frecuencia: 'Semanal',
    miembros: [
      { nombre: 'Julián Eco (Coordinador)', rol: 'coordinador' },
      { nombre: 'Clara del Solar', rol: 'miembro' },
      { nombre: 'Esteban B.', rol: 'miembro' }
    ],
    pedidos: [
      { id: 'ped-circ-04', vecino: 'Clara del Solar', items: '1x Cajón Tomates Redondos 15kg', total: 21600, fecha: 'Hoy', estado: 'Listo para consolidar' }
    ]
  },
  // Círculos de Nodo La Lucila (Vicente López)
  {
    id: 'circulo-lucila-debenedetti',
    slug: 'debenedetti',
    nodoId: 'nodo-lucila',
    nombre: 'Círculo Debenedetti (La Lucila)',
    coordinador: 'Patricia Solís',
    telefono: '5491166778811',
    direccion: 'Calle Debenedetti 1420, La Lucila',
    descripcion: 'Vecinos de Debenedetti y Roma coordinando compras colectivas de cajones de Central Cooperativa Chasqui con retiro barrial.',
    frecuencia: 'Semanal',
    miembros: [
      { nombre: 'Patricia Solís (Coordinadora)', rol: 'coordinador' },
      { nombre: 'Lucía Gómez', rol: 'miembro' }
    ],
    pedidos: [
      { id: 'ped-circ-05', vecino: 'Lucía Gómez', items: '1x Cajón Zapallitos 15kg (fraccionado 5kg)', total: 16790, fecha: 'Hoy', estado: 'Listo para consolidar' }
    ]
  },
  // Círculo Piloto Central Cooperativa Chasqui
  {
    id: 'circulo-chasqui-piloto',
    slug: 'central-chasqui',
    nodoId: 'nodo-cooperativa',
    nombre: 'Círculo Piloto Central Cooperativa Chasqui',
    coordinador: 'Coordinación Chasqui ESSP',
    telefono: '5491123456789',
    direccion: 'Central Mayorista Chasqui & Quintas Asociadas',
    descripcion: 'Círculo piloto abierto para compras colectivas de los 30 cajones de quinta. Pedí el cajón completo o dividilo en círculo al costo directo.',
    frecuencia: 'Semanal',
    miembros: [
      { nombre: 'Coordinación Chasqui (Coordinador)', rol: 'coordinador' },
      { nombre: 'Vecinos Red', rol: 'miembro' }
    ],
    pedidos: []
  }
];

const CirculosManager = {
  getAllCircles() {
    const saved = localStorage.getItem('elementales_circulos');
    let list = [...INITIAL_CIRCULOS];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
          // Asegurar que exista el círculo piloto chasqui
          if (!list.some(c => c.id === 'circulo-chasqui-piloto' || c.slug === 'central-chasqui')) {
            const chasquiPilot = INITIAL_CIRCULOS.find(c => c.id === 'circulo-chasqui-piloto');
            if (chasquiPilot) list.push(chasquiPilot);
          }
        }
      } catch (e) {
        console.error('Error parseando círculos:', e);
      }
    }
    // Asegurar slugs en todos los círculos
    list.forEach(c => {
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
    localStorage.setItem('elementales_circulos', JSON.stringify(circles));
  },

  getCirclesByNode(nodeId) {
    const all = this.getAllCircles();
    if (!nodeId || nodeId === 'todos') return all;
    return all.filter(c => c.nodoId === nodeId || (!c.nodoId && nodeId === 'nodo-lucila'));
  },

  getCircle(idOrSlug) {
    if (!idOrSlug) return null;
    const all = this.getAllCircles();
    const query = String(idOrSlug).toLowerCase().trim();
    return all.find(c => 
      c.id.toLowerCase() === query || 
      (c.slug && c.slug.toLowerCase() === query) ||
      c.nombre.toLowerCase().includes(query)
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
    if (!circle) return window.location.href;
    let base = window.location.origin + window.location.pathname;
    if (!window.location.origin || window.location.origin === 'null') {
      base = window.location.href.split('?')[0].split('#')[0];
    }
    const param = circle.slug || circle.id;
    return `${base}?c=${param}`;
  },

  createCircle(data) {
    const all = this.getAllCircles();
    const slugBase = (data.nombre || 'circulo')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newId = 'circulo-' + Date.now().toString(36);
    const slug = slugBase || newId;

    const newCircle = {
      id: newId,
      slug: slug,
      nodoId: data.nodoId || 'nodo-cooperativa',
      nombre: data.nombre,
      coordinador: data.coordinador,
      telefono: data.telefono || '',
      direccion: data.direccion,
      descripcion: data.descripcion || 'Círculo de compra colectiva de cajones Chasqui.',
      frecuencia: data.frecuencia || 'Semanal',
      miembros: [
        { nombre: `${data.coordinador} (Coordinador/a)`, rol: 'coordinador' }
      ],
      pedidos: []
    };
    all.unshift(newCircle);
    this.saveCircles(all);
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
    text += `📍 *Punto de Retiro:* ${circle.direccion}\n`;
    text += `👤 *Coordinador/a:* ${circle.coordinador} (${circle.telefono})\n`;
    text += `📅 *Frecuencia:* ${circle.frecuencia}\n`;
    text += `------------------------------------\n`;
    text += `👥 *DESGLOSE DE VECINOS (${pedidos.length} pedidos sumados):*\n\n`;

    pedidos.forEach((p, idx) => {
      text += `*${idx + 1}. ${p.vecino}* ($${p.total.toLocaleString('es-AR')}):\n`;
      text += `   ${p.items}\n\n`;
    });

    text += `------------------------------------\n`;
    text += `💰 *TOTAL A CONSOLIDAR CON CHASQUI:* $${totalGral.toLocaleString('es-AR')}\n\n`;
    text += `_Pedido coordinado desde la plataforma Elementales & Central Cooperativa Chasqui._`;

    return text;
  },

  generateShareText(circleId) {
    const circle = this.getCircle(circleId);
    if (!circle) return '';
    const url = this.getShareUrl(circle.id);

    let text = `📦 *¡Sumate al pedido de cajones de ${circle.nombre}!* 🌿\n\n`;
    text += `Estamos pidiendo juntos cajones agroecológicos de *Central Cooperativa Chasqui* al costo directo de productor campesino.\n\n`;
    text += `📍 *Retiro en:* ${circle.direccion}\n`;
    text += `👤 *Coordina:* ${circle.coordinador}\n\n`;
    text += `👉 *Entrá acá a la tienda de nuestro Círculo para sumar tu cajón o tus kilos:*\n${url}\n\n`;
    text += `_Pedí cajón entero o dividilo con nosotros. ¡Avisale a más vecinos para cerrar los cajones!_`;
    return text;
  },

  generateNotifyOrderText(circleId, order) {
    const circle = this.getCircle(circleId);
    if (!circle) return '';
    const url = this.getShareUrl(circle.id);

    let text = `🎉 *¡Hola! Ya sumé mi pedido al Círculo ${circle.nombre}!*\n\n`;
    text += `👤 *Vecino/a:* ${order.clientName}\n`;
    text += `📦 *Detalle:* ${order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}\n`;
    text += `💰 *Total:* $${(order.total || 0).toLocaleString('es-AR')}\n`;
    text += `📍 *Retiro acordado:* ${circle.direccion}\n\n`;
    text += `👉 *Si querés sumarte a pedir en nuestro Círculo, entrá acá:*\n${url}`;
    return text;
  }
};
