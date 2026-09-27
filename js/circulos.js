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
  // Círculos de Central Cooperativa Chasqui (Mayorista)
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
  },
  {
    id: 'circulo-chasqui-oeste',
    slug: 'moreno-quintas',
    nodoId: 'nodo-cooperativa',
    nombre: 'Círculo Mayorista Moreno & Quintas Oeste',
    coordinador: 'Martín Quintas',
    telefono: '5491122334455',
    direccion: 'Ruta 24 km 45, Moreno (Galpón Mayorista)',
    descripcion: 'Familias y almacenes autogestionando compras de cajones agroecológicos directos de quinta Chasqui.',
    frecuencia: 'Semanal (Jueves)',
    miembros: [
      { nombre: 'Martín Quintas (Coordinador)', rol: 'coordinador' },
      { nombre: 'Cooperativa Unión', rol: 'miembro' }
    ],
    pedidos: []
  },
  {
    id: 'circulo-chasqui-sur',
    slug: 'chasqui-sur',
    nodoId: 'nodo-cooperativa',
    nombre: 'Círculo Fraccionamiento Chasqui Sur',
    coordinador: 'Camila Huerta',
    telefono: '5491199887766',
    direccion: 'Punto de Distribución Sur Chasqui',
    descripcion: 'Círculo de compra mayorista de cajones de cítricos y verduras pesadas.',
    frecuencia: 'Semanal',
    miembros: [
      { nombre: 'Camila Huerta (Coordinadora)', rol: 'coordinador' },
      { nombre: 'Red Vecinal Sur', rol: 'miembro' }
    ],
    pedidos: []
  },
  // Círculo Adicional de Nodo La Lucila
  {
    id: 'circulo-lucila-rawson',
    slug: 'vecinos-rawson',
    nodoId: 'nodo-lucila',
    nombre: 'Círculo Vecinos Rawson & Roma (La Lucila)',
    coordinador: 'Santiago M.',
    telefono: '5491144332211',
    direccion: 'Rawson 3450, La Lucila',
    descripcion: 'Vecinos de la cuadra coordinando compras de cajones con entrega en el Centro Comunitario.',
    frecuencia: 'Semanal (Viernes)',
    miembros: [
      { nombre: 'Santiago M. (Coordinador)', rol: 'coordinador' },
      { nombre: 'Laura V.', rol: 'miembro' }
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
          // Asegurar que todos los círculos predeterminados estén presentes y con su nodoId correcto
          INITIAL_CIRCULOS.forEach(initC => {
            const existing = list.find(c => c.id === initC.id || c.slug === initC.slug);
            if (!existing) {
              list.push(initC);
            } else {
              if (existing.nodoId !== initC.nodoId) {
                existing.nodoId = initC.nodoId;
              }
            }
          });
        }
      } catch (e) {
        console.error('Error parseando círculos:', e);
      }
    }
    // Asegurar nodoId y slugs en todos los círculos
    list.forEach(c => {
      if (!c.nodoId) {
        c.nodoId = 'nodo-lomaverde';
      }
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

    let base = window.location.origin;
    if (!base || base === 'null' || window.location.protocol === 'file:') {
      base = window.location.href.split('?')[0].split('#')[0];
      return `${base}?c=${circle.slug || circle.id}`;
    }

    base = base.replace(/\/+$/, '');
    const slug = circle.slug || circle.id;

    // URL estructurada con prefijo /circulo/ para compartir claramente
    const isInitial = INITIAL_CIRCULOS.some(c => c.id === circle.id || c.slug === circle.slug);
    if (isInitial) {
      return `${base}/circulo/${slug}`;
    }

    // Para círculos autogestionados por usuarios:
    // La URL base es con prefijo /circulo/: (ej: https://elementales.store/circulo/mibarrio) y le adjuntamos metadatos de coordinación para WhatsApp
    const params = new URLSearchParams();
    if (circle.nombre) params.set('n', circle.nombre);
    if (circle.coordinador) params.set('coord', circle.coordinador);
    if (circle.direccion) params.set('dir', circle.direccion);
    if (circle.telefono) params.set('tel', circle.telefono);
    if (circle.nodoId) params.set('nodo', circle.nodoId);

    const query = params.toString();
    return query ? `${base}/circulo/${slug}?${query}` : `${base}/circulo/${slug}`;
  },

  registerCircleFromParams(urlParams) {
    const slug = urlParams.get('c') || urlParams.get('circulo');
    const nombre = urlParams.get('n');
    if (!slug) return null;

    let circle = this.getCircle(slug);
    if (circle) return circle;

    if (!nombre) return null;

    const all = this.getAllCircles();
    const newCircle = {
      id: 'circulo-' + Date.now().toString(36),
      slug: slug,
      nombre: nombre,
      coordinador: urlParams.get('coord') || 'Vecino/a Coordinador/a',
      telefono: urlParams.get('tel') || '',
      direccion: urlParams.get('dir') || 'Punto barrial acordado',
      nodoId: urlParams.get('nodo') || 'nodo-cooperativa',
      descripcion: 'Círculo de compra colectiva de cajones Chasqui.',
      frecuencia: 'Semanal',
      miembros: [
        { nombre: `${urlParams.get('coord') || 'Coordinador/a'} (Coordinador/a)`, rol: 'coordinador' }
      ],
      pedidos: []
    };

    all.unshift(newCircle);
    this.saveCircles(all);
    return newCircle;
  },

  getCreatedCircleIds() {
    try {
      const saved = localStorage.getItem('elementales_my_created_circles');
      if (saved) return JSON.parse(saved);
      // Fallback inicial: si no existía el registro previo, cualquier círculo que no sea del sistema se marca como propio
      const all = this.getAllCircles();
      const nonSystem = all.filter(c => !INITIAL_CIRCULOS.some(ic => ic.id === c.id || ic.slug === c.slug)).map(c => c.id);
      if (nonSystem.length > 0) {
        localStorage.setItem('elementales_my_created_circles', JSON.stringify(nonSystem));
        return nonSystem;
      }
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

    // Los círculos oficiales del sistema nunca son editables por usuarios normales
    const isSystem = INITIAL_CIRCULOS.some(c => c.id === circle.id || c.slug === circle.slug);
    if (isSystem) return false;

    const myCreated = this.getCreatedCircleIds();
    return myCreated.includes(circle.id);
  },

  canEditCircle(circleId) {
    if (!circleId) return false;
    // Administrador / Gestor del nodo con sesión autenticada con PIN
    const isGestor = typeof AppState !== 'undefined' && 
                     AppState.userRole === 'gestor' && 
                     sessionStorage.getItem('elementales_gestor_auth') === 'true';
    if (isGestor) return true;

    // Solo el creador original en este dispositivo puede editarlo
    return this.isCircleCreator(circleId);
  },

  updateCircleSlug(circleId, rawSlug) {
    if (!circleId || !rawSlug) return { success: false, error: 'Por favor ingresá un nombre de enlace.' };
    
    // CONTROL ESTRICTO DE PERMISOS: Solo el creador o gestor puede editar
    if (!this.canEditCircle(circleId)) {
      return { 
        success: false, 
        error: '⛔ No tenés permisos para modificar este Círculo. Solo quien lo creó puede cambiar su nombre o enlace.' 
      };
    }

    const all = this.getAllCircles();
    const circle = all.find(c => c.id === circleId || c.slug === circleId);
    if (!circle) return { success: false, error: 'Círculo no encontrado' };

    const cleanSlug = rawSlug.trim()
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!cleanSlug) return { success: false, error: 'El nombre de enlace sólo puede contener letras, números y guiones.' };

    const RESERVED = ['nodo', 'circulo', 'lomaverde', 'lucila', 'cooperativa', 'chasqui', 'nodo-lomaverde', 'nodo-lucila', 'nodo-cooperativa', 'admin', 'api', 'index', 'css', 'js', 'public'];
    if (RESERVED.includes(cleanSlug)) {
      return { success: false, error: `El enlace "/circulo/${cleanSlug}" está reservado para la navegación del sistema. Elegí otro nombre.` };
    }

    const duplicate = all.find(c => c.slug === cleanSlug && c.id !== circle.id);
    if (duplicate) {
      return { success: false, error: `El enlace "/${cleanSlug}" ya está en uso por "${duplicate.nombre}". Elegí otro nombre.` };
    }

    circle.slug = cleanSlug;
    this.saveCircles(all);
    return { success: true, slug: cleanSlug, circle, url: this.getShareUrl(circle.id) };
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

    const newCircle = {
      id: newId,
      slug: finalSlug,
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
    this.addCreatedCircleId(newId); // Registrar inmediatamente como creador de este círculo
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
