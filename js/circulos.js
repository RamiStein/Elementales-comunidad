// =========================================================================
// FACULTAD DE CÍRCULOS (VRDE CLUB & RED ELEMENTALES)
// =========================================================================
// Este módulo implementa la "Facultad de Círculo" para autogestión de compras colectivas.
// Permite que familias y vecinos se organicen en Círculos barriales para pedir juntos,
// dejando la gestión del pedido y la entrega a cargo de quien pide (el coordinador del círculo),
// aliviando la logística del nodo y fortaleciendo la economía de confianza barrial.

const INITIAL_CIRCULOS = [
  // Círculos de Nodo Loma Verde (Escobar)
  {
    id: 'circulo-lv-losrobles',
    nodoId: 'nodo-lomaverde',
    nombre: 'Círculo Los Robles (Loma Verde Norte)',
    coordinador: 'Mariana Robles',
    telefono: '5491155443322',
    direccion: 'Calle Los Robles 450, Loma Verde',
    descripcion: 'Familias de Los Robles que compran juntas en VRDE Club. El pedido llega consolidado y se retira en el punto de encuentro.',
    frecuencia: 'Semanal (Miércoles)',
    miembros: [
      { nombre: 'Mariana Robles (Coordinadora)', rol: 'coordinador' },
      { nombre: 'Familia Rossi', rol: 'miembro' },
      { nombre: 'Carlos & Ana', rol: 'miembro' },
      { nombre: 'Martín Huerta', rol: 'miembro' }
    ],
    pedidos: [
      { id: 'ped-circ-01', vecino: 'Familia Rossi', items: '1x Bolsón Huerta, 1x Huevos Pastoriles', total: 12700, estado: 'Listo para consolidar' },
      { id: 'ped-circ-02', vecino: 'Carlos & Ana', items: '1x Miel Pura 1kg, 2x Pan Masa Madre', total: 11900, estado: 'Listo para consolidar' },
      { id: 'ped-circ-03', vecino: 'Mariana Robles', items: '1x Bolsón Huerta, 1x Aceite Oliva', total: 16300, estado: 'Listo para consolidar' }
    ]
  },
  {
    id: 'circulo-lv-biohuerta',
    nodoId: 'nodo-lomaverde',
    nombre: 'Círculo Bio Huerta Loma Verde (Centro)',
    coordinador: 'Julián Eco',
    telefono: '5491144221199',
    direccion: 'Las Encinas 120, Loma Verde Centro',
    descripcion: 'Vecinos de la zona centro de Loma Verde coordinando compras comunitarias de alimentos agroecológicos de huerta.',
    frecuencia: 'Semanal y Lunar',
    miembros: [
      { nombre: 'Julián Eco (Coordinador)', rol: 'coordinador' },
      { nombre: 'Clara del Solar', rol: 'miembro' },
      { nombre: 'Esteban B.', rol: 'miembro' }
    ],
    pedidos: [
      { id: 'ped-circ-04', vecino: 'Clara del Solar', items: '2x Bolsón Huerta, 1x Queso Campo', total: 23200, estado: 'Listo para consolidar' }
    ]
  },
  // Círculos de Nodo La Lucila (Vicente López)
  {
    id: 'circulo-lucila-debenedetti',
    nodoId: 'nodo-lucila',
    nombre: 'Círculo Debenedetti (La Lucila)',
    coordinador: 'Patricia Solís',
    telefono: '5491166778811',
    direccion: 'Calle Debenedetti 1420, La Lucila',
    descripcion: 'Vecinos de Debenedetti y Roma coordinando compras colectivas agroecológicas con entrega barrial.',
    frecuencia: 'Semanal',
    miembros: [
      { nombre: 'Patricia Solís (Coordinadora)', rol: 'coordinador' },
      { nombre: 'Lucía Gómez', rol: 'miembro' }
    ],
    pedidos: [
      { id: 'ped-circ-05', vecino: 'Lucía Gómez', items: '1x Bolsón Huerta, 1x Miel Pura 1kg', total: 14700, estado: 'Listo para consolidar' }
    ]
  }
];

const CirculosManager = {
  getAllCircles() {
    const saved = localStorage.getItem('elementales_circulos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error parseando círculos:', e);
      }
    }
    return [...INITIAL_CIRCULOS];
  },

  saveCircles(circles) {
    localStorage.setItem('elementales_circulos', JSON.stringify(circles));
  },

  getCirclesByNode(nodeId) {
    const all = this.getAllCircles();
    return all.filter(c => c.nodoId === nodeId || (!c.nodoId && nodeId === 'nodo-lucila'));
  },

  getCircle(id) {
    const all = this.getAllCircles();
    return all.find(c => c.id === id);
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

  createCircle(data) {
    const all = this.getAllCircles();
    const newId = 'circulo-' + (data.nodoId === 'nodo-lomaverde' ? 'lv-' : 'lucila-') + Date.now().toString(36);
    const newCircle = {
      id: newId,
      nodoId: data.nodoId || 'nodo-lomaverde',
      nombre: data.nombre,
      coordinador: data.coordinador,
      telefono: data.telefono || '',
      direccion: data.direccion,
      descripcion: data.descripcion || '',
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
    const circle = all.find(c => c.id === circleId);
    if (!circle) return false;

    const name = memberName || AppState.userName || 'Vecino/a';
    const exists = (circle.miembros || []).some(m => m.nombre === name);
    if (!exists) {
      if (!circle.miembros) circle.miembros = [];
      circle.miembros.push({ nombre: name, rol: 'miembro' });
      this.saveCircles(all);
    }
    this.setActiveCircleId(circleId);
    return true;
  },

  addOrderToCircle(circleId, orderData) {
    const all = this.getAllCircles();
    const circle = all.find(c => c.id === circleId);
    if (!circle) return false;

    if (!circle.pedidos) circle.pedidos = [];
    const newOrder = {
      id: 'ped-circ-' + Date.now().toString(36),
      vecino: orderData.clientName || AppState.userName || 'Vecino/a',
      items: orderData.itemsSummary || 'Varios productos',
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

    let text = `🌿 *PEDIDO CONSOLIDADO CÍRCULO: ${circle.nombre.toUpperCase()}*\n`;
    text += `📍 *Punto de Entrega:* ${circle.direccion}\n`;
    text += `👤 *Coordinador/a:* ${circle.coordinador} (${circle.telefono})\n`;
    text += `📅 *Frecuencia:* ${circle.frecuencia}\n`;
    text += `------------------------------------\n`;
    text += `👥 *DESGLOSE DE VECINOS (${pedidos.length} pedidos):*\n\n`;

    pedidos.forEach((p, idx) => {
      text += `*${idx + 1}. ${p.vecino}* ($${p.total.toLocaleString('es-AR')}):\n`;
      text += `   ${p.items}\n\n`;
    });

    text += `------------------------------------\n`;
    text += `💰 *TOTAL A ABONAR A LA RED / NODO:* $${totalGral.toLocaleString('es-AR')}\n\n`;
    text += `_La gestión del retiro y reparto interno queda a cargo del Círculo ${circle.nombre}._`;

    return text;
  },

  generateShareText(circleId) {
    const circle = this.getCircle(circleId);
    if (!circle) return '';
    const origin = window.location.origin;
    const url = `${origin}/?nodo=${circle.nodoId === 'nodo-lomaverde' ? 'lomaverde' : 'lucila'}&circulo=${circle.id}`;

    let text = `🌱 *¡Sumate a nuestro Círculo de Compra Colectiva en Elementales / VRDE Club!* 🌱\n\n`;
    text += `Estamos pidiendo juntos en el *${circle.nombre}* para recibir bolsones agroecológicos y compras comunitarias al costo en:\n`;
    text += `📍 *${circle.direccion}*\n\n`;
    text += `👉 Entrá acá para armar tu pedido y sumarlo a nuestro círculo:\n${url}\n\n`;
    text += `_La gestión del pedido y retiro queda a cargo de nuestro grupo de vecinos._`;
    return text;
  }
};
