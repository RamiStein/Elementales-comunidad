// Sistema de Gestión de Feria y Comunidad - Elementales Comunidad (Versión Clara)
// Script Principal de la Aplicación

// --- GESTIÓN DE AUDIO SINTETIZADO (Web Audio API) ---
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playAdd() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Acorde mayor alegre
      notes.forEach((freq, index) => {
        const now = this.ctx.currentTime + index * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      });
    } catch (e) {}
  }

  playElementTone(elementKey) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const frequencies = {
        agua: [392.00, 523.25, 659.25],       // Sol4, Do5, Mi5 (Fluidez)
        tierra: [220.00, 261.63, 329.63],     // La3, Do4, Mi4 (Profundidad y raíz)
        fuego: [523.25, 659.25, 783.99],      // Do5, Mi5, Sol5 (Vitalidad brillante)
        aire: [659.25, 880.00, 1046.50],      // Mi5, La5, Do6 (Levedad etérea)
        eter: [440.00, 554.37, 659.25, 880.0] // La4, Do#5, Mi5, La5 (Armonía sagrada)
      }[elementKey] || [440, 554, 659];

      frequencies.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = elementKey === 'tierra' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {}
  }
}

const sounds = new SoundManager();

// --- SABIDURÍA DE LOS SÓLIDOS PLATÓNICOS Y ELEMENTOS (REFERENCIA 2) ---
const ELEMENTAL_WISDOM = {
  agua: {
    name: 'Agua',
    solid: 'Icosaedro',
    emoji: '💧',
    img: 'public/assets/brand/agua_clean.png',
    badge: 'Icosaedro · 20 Caras Sagradas',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
    title: 'Fluidez, Nutrición & Adaptabilidad',
    motto: '“El agua que riega la huerta y hace circular la vida en cada ser.”',
    connection: 'En el nodo, representa el fluir transparente de los recursos y el cuidado del agua limpia en la producción de alimentos.'
  },
  tierra: {
    name: 'Tierra',
    solid: 'Rombo / Hexaedro',
    emoji: '🍃',
    img: 'public/assets/brand/tierra_clean.png',
    badge: 'Hexaedro · Estabilidad & Materia',
    color: '#15803d',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    title: 'Suelo Vivo, Raíces & Alimento (vrde)',
    motto: '“El suelo fértil donde germina la semilla sana y el sustento de la familia.”',
    connection: 'El puente directo con productores agroecológicos locales, sin intermediarios ni agrotóxicos.'
  },
  fuego: {
    name: 'Fuego',
    solid: 'Tetraedro',
    emoji: '🔥',
    img: 'public/assets/brand/fuego_clean.png',
    badge: 'Tetraedro · Voluntad & Calor',
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    title: 'Energía Solar & Transformación',
    motto: '“El sol que madura los frutos y el fuego vivo del corazón comunitario.”',
    connection: 'La voluntad activa de transformar nuestro entorno, la cocina consciente y el encuentro cálido en la feria.'
  },
  aire: {
    name: 'Aire',
    solid: 'Octaedro',
    emoji: '💨',
    img: 'public/assets/brand/aire_clean.png',
    badge: 'Octaedro · Aliento & Comunicación',
    color: '#0d9488',
    bg: '#f0fdfa',
    border: '#99f6e4',
    title: 'Aliento, Polinización & Claridad',
    motto: '“La brisa que transporta el polen, el vuelo de las aves y la libertad de pensamiento.”',
    connection: 'El diálogo honesto, la claridad mental y el intercambio abierto de ideas en el barrio.'
  },
  eter: {
    name: 'Éter',
    solid: 'Dodecaedro / Flor',
    emoji: '✨',
    img: 'public/assets/brand/eter_clean.png',
    badge: 'Dodecaedro · Cosmos & Flor Sagrada',
    color: '#a6634f',
    bg: '#fcf4f0',
    border: '#c0826d',
    title: 'Quintaesencia, Saberes & Felicidad (En Conjunto)',
    motto: '“La red invisible que une a cada persona como un elemento fundamental para la vida sana.”',
    connection: 'La gestación de comunidades vivas mediante capacitaciones, talleres de saberes y felicidad compartida.'
  }
};

let activeElementalKey = null;

function selectElement(key) {
  activeElementalKey = key;
  sounds.playElementTone(key);

  const info = ELEMENTAL_WISDOM[key];
  if (!info) return;

  // Actualizar clases activas en nodos SVG
  document.querySelectorAll('.elemental-node-group').forEach(el => {
    el.classList.remove('active');
  });
  const activeGroup = document.getElementById(`node-elemental-${key}`);
  if (activeGroup) {
    activeGroup.classList.add('active');
  }

  // Actualizar botones inferiores
  document.querySelectorAll('.elemental-pill-btn').forEach(btn => {
    btn.classList.remove('active-elemental-pill');
  });
  const activePill = document.getElementById(`pill-elemental-${key}`);
  if (activePill) {
    activePill.classList.add('active-elemental-pill');
  }

  // Mostrar la tarjeta de sabiduría elemental
  const card = document.getElementById('elemental-wisdom-card');
  if (card) {
    card.classList.remove('hidden');
    card.style.borderColor = info.color;
    card.style.backgroundColor = info.bg;

    const imgEl = document.getElementById('wisdom-element-img');
    if (imgEl && info.img) {
      imgEl.src = info.img;
      imgEl.alt = info.name;
    }

    document.getElementById('wisdom-element-badge').textContent = info.badge;
    document.getElementById('wisdom-element-badge').style.color = info.color;
    document.getElementById('wisdom-element-badge').style.borderColor = info.color + '40';
    document.getElementById('wisdom-element-badge').style.backgroundColor = '#ffffff';

    document.getElementById('wisdom-element-title').textContent = `${info.emoji} ${info.title}`;
    document.getElementById('wisdom-element-motto').textContent = info.motto;
    document.getElementById('wisdom-element-connection').textContent = info.connection;

    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function closeElementalCard() {
  sounds.playPop();
  activeElementalKey = null;
  const card = document.getElementById('elemental-wisdom-card');
  if (card) card.classList.add('hidden');
  document.querySelectorAll('.elemental-node-group').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.elemental-pill-btn').forEach(btn => btn.classList.remove('active-elemental-pill'));
}

// --- ESTADO PRINCIPAL DE LA APLICACIÓN ---
const AppState = {
  products: [],
  cart: {}, // { prodId: quantity }
  customCartItems: [], // [ { id, name, price, qty } ]
  orders: [],
  members: [],
  activeCategory: 'Todos',
  searchQuery: '',
  memberSearchQuery: '',
  memberRoleFilter: 'Todos',
  selectedMemberForContact: null,
  currentView: 'welcome',
  lastCompletedOrder: null,
  lastCompletedMember: null,

  // Sistema Multimodo & Membresía CsC (Red Elemental)
  catalogMode: 'local', // 'local' | 'semanal' | 'lunar'
  activeNodeId: 'nodo-lomaverde',
  userRole: 'visitante', // 'visitante' | 'socio'
  userPlan: 'plan-raices',
  userName: 'Lucía Gómez',
  userCode: 'CSC-2026-0482',
  userEmail: 'lucia.gomez@comunidad.org',
  userPhone: '+54 9 11 5566-7788',
  userAddress: 'Av. Maipú 2140, Olivos, Vicente López',
  userTrade: 'Diseñadora Textil & Cerámica Botánica',
  userTradeDesc: 'Confección de prendas en tintes naturales, vajilla artesanal para fermentos y talleres comunitarios de arcilla viva.',
  userTradeAvailability: 'Sábados de 10:00 a 14:00 hs en Rawson 3450 o por encargo',
  cajonSharesInCart: [],

  saveUserProfile(profileData) {
    if (profileData.userName !== undefined) {
      this.userName = profileData.userName.trim();
      localStorage.setItem('elementales_user_name', this.userName);
    }
    if (profileData.userEmail !== undefined) {
      this.userEmail = profileData.userEmail.trim();
      localStorage.setItem('elementales_user_email', this.userEmail);
    }
    if (profileData.userPhone !== undefined) {
      this.userPhone = profileData.userPhone.trim();
      localStorage.setItem('elementales_user_phone', this.userPhone);
    }
    if (profileData.userAddress !== undefined) {
      this.userAddress = profileData.userAddress.trim();
      localStorage.setItem('elementales_user_address', this.userAddress);
    }
    if (profileData.userTrade !== undefined) {
      this.userTrade = profileData.userTrade.trim();
      localStorage.setItem('elementales_user_trade', this.userTrade);
    }
    if (profileData.userTradeDesc !== undefined) {
      this.userTradeDesc = profileData.userTradeDesc.trim();
      localStorage.setItem('elementales_user_trade_desc', this.userTradeDesc);
    }
    if (profileData.userTradeAvailability !== undefined) {
      this.userTradeAvailability = profileData.userTradeAvailability.trim();
      localStorage.setItem('elementales_user_trade_avail', this.userTradeAvailability);
    }
  },

  getUserOrders() {
    const myName = (this.userName || '').toLowerCase().trim();
    const all = this.orders || [];
    const matched = all.filter(o => o.clientName && o.clientName.toLowerCase().trim() === myName);
    if (matched.length > 0) return matched;
    
    // Historial demostrativo inicial del usuario si no hay pedidos guardados todavía con su nombre
    return [
      {
        id: 'ORD-0891',
        number: 891,
        dateStr: '24/09/2026',
        timeStr: '11:30',
        items: [
          { name: 'Canasta Agroecológica Familiar', qty: 1, price: 9500 },
          { name: 'Pan de Masa Madre Orgánico', qty: 2, price: 2500 }
        ],
        total: 14500,
        status: 'Listo para Retirar',
        statusColor: 'emerald',
        deliveryType: 'Retiro en Nodo',
        nodoNombre: 'Nodo La Lucila · Rawson 3450'
      },
      {
        id: 'ORD-0742',
        number: 742,
        dateStr: '10/09/2026',
        timeStr: '16:45',
        items: [
          { name: 'Miel Pura de Pradera 1kg', qty: 1, price: 5400 },
          { name: 'Aceite de Oliva Extra Virgen 1L', qty: 1, price: 6500 }
        ],
        total: 11900,
        status: 'Entregado',
        statusColor: 'stone',
        deliveryType: 'Retiro en Nodo',
        nodoNombre: 'Nodo La Lucila · Rawson 3450'
      },
      {
        id: 'ORD-0610',
        number: 610,
        dateStr: '28/08/2026',
        timeStr: '10:15',
        items: [
          { name: 'Bolsón de Cítricos y Frutales 5kg', qty: 1, price: 7200 },
          { name: 'Queso de Campo Agroecológico 500g', qty: 1, price: 4800 }
        ],
        total: 12000,
        status: 'Entregado',
        statusColor: 'stone',
        deliveryType: 'Retiro en Nodo',
        nodoNombre: 'Nodo La Lucila · Rawson 3450'
      }
    ];
  },

  getUserReviews() {
    const saved = localStorage.getItem('elementales_user_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return [
      { id: 'rev-1', author: 'Clara & Nico', tag: 'Nodo La Lucila', stars: 5, date: 'Hace 2 semanas', comment: 'Las piezas de cerámica para kombucha y masa madre son hermosas y súper resistentes. Trabajo impecable y entrega rápida.' },
      { id: 'rev-2', author: 'Martín R.', tag: 'Círculo Los Aromos', stars: 5, date: 'El mes pasado', comment: 'Nos hizo los delantales de lino para el equipo de empaque del círculo. Gran calidad, durabilidad y calidez humana.' },
      { id: 'rev-3', author: 'Valen Soler', tag: 'Vecina de Florida', stars: 5, date: 'Hace 2 meses', comment: 'Participé del taller de tintes botánicos en Rawson 3450. Hermosa transmisión de saberes y pasión por lo natural!' }
    ];
  },

  getUserSignatures() {
    const saved = localStorage.getItem('elementales_user_signatures');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return [
      { id: 'sig-1', title: 'Manifiesto de Soberanía Alimentaria y Precios Justos', category: 'Principios Fundacionales', date: '15/03/2026', hash: 'SHA256:7f8a9e102bc4...4b12', status: '🟢 Firmado & Vigente', cert: 'CERT-ALIM-2026-0482' },
      { id: 'sig-2', title: 'Acuerdo de Convivencia y Cuidado del Espacio Rawson 3450', category: 'Gobernanza Física', date: '02/02/2026', hash: 'SHA256:a1c3d599f2e1...9e01', status: '🟢 Firmado & Vigente', cert: 'CERT-CONV-2026-0482' },
      { id: 'sig-3', title: 'Compromiso Agroecológico y Residuo Cero en Nodos Barriales', category: 'Cuidado Ambiental', date: '10/01/2026', hash: 'SHA256:d4e6f801aa32...2a33', status: '🟢 Firmado & Vigente', cert: 'CERT-AGRO-2026-0482' }
    ];
  },

  getUserVotes() {
    const saved = localStorage.getItem('elementales_user_votes');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return [
      { id: 'v-1', propTitle: '¿En qué invertimos el 25% del Fondo Barrial este mes?', option: '🌿 Ampliación de bancales y riego por goteo', date: '22/09/2026', status: '✓ Voto Vinculante Registrado' },
      { id: 'v-2', propTitle: 'Horario de la Feria Agroecológica de Verano', option: '🌅 Viernes al atardecer (17:30 a 21:30 hs)', date: '18/09/2026', status: '✓ Voto Vinculante Registrado' }
    ];
  },

  getActiveProducts() {
    return (typeof CAJONES_CENTRAL_COOPERATIVA !== 'undefined') ? CAJONES_CENTRAL_COOPERATIVA : [];
  },

  addCajonShareToCart(shareItem) {
    if (!this.cajonSharesInCart) this.cajonSharesInCart = [];
    this.cajonSharesInCart.push(shareItem);
    try {
      localStorage.setItem('elementales_cajon_shares_cart', JSON.stringify(this.cajonSharesInCart));
    } catch (e) {}
    renderFloatingCart();
    if (typeof sounds !== 'undefined') sounds.playAdd();
  },

  removeCajonShareFromCart(shareId) {
    if (!this.cajonSharesInCart) return;
    this.cajonSharesInCart = this.cajonSharesInCart.filter(s => s.id !== shareId);
    try {
      localStorage.setItem('elementales_cajon_shares_cart', JSON.stringify(this.cajonSharesInCart));
    } catch (e) {}
    renderFloatingCart();
    if (typeof sounds !== 'undefined') sounds.playPop();
  },

  init() {
    // Nodo único y exclusivo de la red: Loma Verde (Escobar)
    this.activeNodeId = 'nodo-lomaverde';
    localStorage.setItem('elementales_active_node', 'nodo-lomaverde');

    // Seguridad estricta: Gestor sólo activo si tiene sesión autenticada con PIN
    const savedRole = localStorage.getItem('elementales_user_role') || 'visitante';
    const isGestorAuth = sessionStorage.getItem('elementales_gestor_auth') === 'true';
    if (savedRole === 'gestor' && !isGestorAuth) {
      this.userRole = 'visitante';
      localStorage.setItem('elementales_user_role', 'visitante');
    } else {
      this.userRole = savedRole;
    }

    this.catalogMode = localStorage.getItem('elementales_catalog_mode') || 'semanal';
    this.userPlan = localStorage.getItem('elementales_user_plan') || 'plan-raices';
    this.userName = localStorage.getItem('elementales_user_name') || 'Lucía Gómez';
    this.userCode = localStorage.getItem('elementales_user_code') || 'CSC-2026-0482';
    this.userEmail = localStorage.getItem('elementales_user_email') || 'lucia.gomez@comunidad.org';
    this.userPhone = localStorage.getItem('elementales_user_phone') || '+54 9 11 5566-7788';
    this.userAddress = localStorage.getItem('elementales_user_address') || 'Av. Maipú 2140, Olivos, Vicente López';
    this.userTrade = localStorage.getItem('elementales_user_trade') || 'Diseñadora Textil & Cerámica Botánica';
    this.userTradeDesc = localStorage.getItem('elementales_user_trade_desc') || 'Confección de prendas en tintes naturales, vajilla artesanal para fermentos y talleres comunitarios de arcilla viva.';
    this.userTradeAvailability = localStorage.getItem('elementales_user_trade_avail') || 'Sábados de 10:00 a 14:00 hs en Rawson 3450 o por encargo';

    // Cargar productos: catálogo exclusivo de cajones Chasqui (+40% al costo base)
    const RESET_PRODS_KEY = 'elementales_products_v5_cajones';
    if (localStorage.getItem(RESET_PRODS_KEY) !== 'true') {
      localStorage.removeItem('elementales_products');
      localStorage.setItem(RESET_PRODS_KEY, 'true');
    }
    this.products = (typeof CAJONES_CENTRAL_COOPERATIVA !== 'undefined') ? CAJONES_CENTRAL_COOPERATIVA : [];
    this.saveProducts();

    // Cargar pedidos
    const savedOrders = localStorage.getItem('elementales_orders');
    if (savedOrders) {
      try {
        this.orders = JSON.parse(savedOrders);
      } catch (e) {
        this.orders = [];
      }
    }

    // Cargar integrantes o inicializar con ejemplos
    const savedMembers = localStorage.getItem('elementales_members');
    if (savedMembers) {
      try {
        this.members = JSON.parse(savedMembers);
      } catch (e) {
        this.members = [];
      }
    }
    
    if (!this.members || this.members.length === 0) {
      this.members = [
        {
          id: 'mem-1',
          name: 'Lucía Gómez',
          phone: '1155667788',
          email: 'lucia.gomez@ejemplo.com',
          neighborhood: 'Florida / Vicente López',
          communityRole: 'Socio CsC (Plan Raíz)',
          nodePreference: 'Nodo Central - Florida / Olivos',
          notes: 'Aporte mensual al día. Retira bolsones los sábados.',
          dateStr: '2026-09-15',
          timestamp: 1789400000000
        },
        {
          id: 'mem-2',
          name: 'Marcos Benítez',
          phone: '1144332211',
          email: 'marcos.b@ejemplo.com',
          neighborhood: 'Palermo Botánico',
          communityRole: 'Socio CsC (Plan Agua)',
          nodePreference: 'Nodo Palermo - Plaza Armenia',
          notes: 'Interés en compras lunares y fermentos.',
          dateStr: '2026-09-18',
          timestamp: 1789600000000
        },
        {
          id: 'mem-3',
          name: 'Valeria Rossi',
          phone: '1166778899',
          email: 'valeria.rossi@ejemplo.com',
          neighborhood: 'San Isidro',
          communityRole: 'Membresía Guardián / Sostén',
          nodePreference: 'Nodo Norte - San Isidro',
          notes: 'Participa activamente en talleres y compras comunitarias.',
          dateStr: '2026-09-19',
          timestamp: 1789700000000
        }
      ];
      this.saveMembers();
    }
  },

  // Obtener precio según modalidad de compra activa
  getProductPrice(prod) {
    if (this.catalogMode === 'semanal') {
      return prod.precioSemanal || Math.round((prod.precioLocal || prod.price) * 0.9);
    }
    if (this.catalogMode === 'lunar') {
      return prod.precioLunar || Math.round((prod.precioLocal || prod.price) * 0.8);
    }
    return prod.precioLocal || prod.price || 0;
  },

  getLocalRetailPrice(prod) {
    return prod.precioLocal || prod.price || 0;
  },

  saveProducts() {
    localStorage.setItem('elementales_products', JSON.stringify(this.products));
  },

  saveOrders() {
    localStorage.setItem('elementales_orders', JSON.stringify(this.orders));
  },

  saveMembers() {
    localStorage.setItem('elementales_members', JSON.stringify(this.members));
  },

  // Operaciones de Carrito
  addToCart(productId, qtyDelta = 1) {
    sounds.playAdd();
    const current = this.cart[productId] || 0;
    const newQty = Math.max(0, current + qtyDelta);
    if (newQty === 0) {
      delete this.cart[productId];
    } else {
      this.cart[productId] = newQty;
    }
    renderOrderCatalog();
    renderFloatingCart();
  },

  setCartQuantity(productId, qty) {
    const quantity = Math.max(0, parseInt(qty) || 0);
    if (quantity === 0) {
      delete this.cart[productId];
    } else {
      this.cart[productId] = quantity;
    }
    renderOrderCatalog();
    renderFloatingCart();
  },

  addCustomItem(name, price, qty = 1) {
    const customItem = {
      id: 'custom-' + Date.now(),
      name: name.trim() || 'Producto Libre',
      price: Math.max(0, parseFloat(price) || 0),
      qty: Math.max(1, parseInt(qty) || 1),
      unit: 'Unidad',
      emoji: '✨',
      isCustom: true
    };
    this.customCartItems.push(customItem);
    sounds.playAdd();
    renderOrderCatalog();
    renderFloatingCart();
  },

  removeCustomItem(customId) {
    this.customCartItems = this.customCartItems.filter(item => item.id !== customId);
    sounds.playPop();
    renderOrderCatalog();
    renderFloatingCart();
  },

  clearCart() {
    this.cart = {};
    this.customCartItems = [];
    this.cajonSharesInCart = [];
    try {
      localStorage.removeItem('elementales_cajon_shares_cart');
    } catch (e) {}
    renderOrderCatalog();
    renderFloatingCart();
  },

  getCartDetails() {
    const items = [];
    let subtotal = 0;
    let retailTotal = 0;
    let totalItems = 0;

    // Productos de catálogo
    const allAvailableProds = this.getActiveProducts();
    for (const [prodId, qty] of Object.entries(this.cart)) {
      const prod = allAvailableProds.find(p => p.id === prodId) || this.products.find(p => p.id === prodId);
      if (prod && qty > 0) {
        const itemPrice = this.getProductPrice(prod);
        const itemRetail = this.getLocalRetailPrice(prod);
        const itemTotal = itemPrice * qty;
        items.push({
          id: prod.id,
          name: prod.name,
          price: itemPrice,
          retailPrice: itemRetail,
          unit: prod.unit,
          qty: qty,
          total: itemTotal,
          emoji: prod.emoji || '📦',
          mode: this.catalogMode,
          elemento: prod.elemento || 'tierra'
        });
        subtotal += itemTotal;
        retailTotal += itemRetail * qty;
        totalItems += qty;
      }
    }

    // Productos personalizados
    for (const custom of this.customCartItems) {
      const itemTotal = custom.price * custom.qty;
      items.push({
        id: custom.id,
        name: custom.name,
        price: custom.price,
        retailPrice: custom.price,
        unit: custom.unit,
        qty: custom.qty,
        total: itemTotal,
        emoji: custom.emoji || '✨',
        isCustom: true
      });
      subtotal += itemTotal;
      retailTotal += itemTotal;
      totalItems += custom.qty;
    }

        // Cuotas de Cajones Compartidos en el Carrito
    if (this.cajonSharesInCart && this.cajonSharesInCart.length > 0) {
      for (const share of this.cajonSharesInCart) {
        items.push({
          id: share.id,
          name: `${share.productName} (${share.kg} kg de ${share.totalKg} kg)`,
          price: share.total,
          retailPrice: share.total,
          unit: `${share.kg} kg en cajón compartido`,
          qty: 1,
          total: share.total,
          emoji: '👥',
          isCajonShare: true,
          shareData: share
        });
        subtotal += share.total;
        retailTotal += share.total;
        totalItems += 1;
      }
    }

    const totalSavings = Math.max(0, retailTotal - subtotal);
    return { items, subtotal, retailTotal, totalSavings, totalItems };
  }
};

// --- NAVEGACIÓN Y VISTAS ---
// --- NAVEGACIÓN Y VISTAS ---
// --- NAVEGACIÓN Y VISTAS ---
function navigateTo(viewName, updateHistory = true) {
  sounds.playPop();

  // Control de Header y Barra de Navegación Inferior (Ocultos en view-landing)
  const mainHeader = document.getElementById('main-app-header');
  const spotifyNav = document.getElementById('spotify-bottom-nav');
  if (viewName === 'landing') {
    if (mainHeader) mainHeader.classList.add('hidden');
    if (spotifyNav) spotifyNav.classList.add('hidden');
  } else {
    if (mainHeader) mainHeader.classList.remove('hidden');
    if (spotifyNav) spotifyNav.classList.remove('hidden');
  }

  // Actualizar estado activo en la barra inferior estilo Spotify
  document.querySelectorAll('.spotify-nav-item').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeSpotifyBtn = document.getElementById(`spotify-nav-${viewName}`);
  if (activeSpotifyBtn) {
    activeSpotifyBtn.classList.add('active');
  } else if (viewName === 'circulos') {
    const bBtn = document.getElementById('spotify-nav-barrio');
    if (bBtn) bBtn.classList.add('active');
  }

  // Actualizar estado del botón Inicio en el header
  const headerHomeBtn = document.getElementById('header-home-btn');
  if (headerHomeBtn) {
    if (viewName === 'barrio') {
      headerHomeBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs border bg-emerald-600 text-white border-emerald-600';
    } else {
      headerHomeBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs border bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100';
    }
  }

  // Mapeo de alias retrocompatibles hacia la arquitectura de 5 Elementos
  if (viewName === 'oficios') {
    navigateTo('agua', updateHistory);
    switchAguaTab('oficios');
    return;
  }
  if (viewName === 'talleres') {
    navigateTo('fuego', updateHistory);
    switchFuegoTab('talleres');
    return;
  }
  if (viewName === 'financiamiento') {
    navigateTo('fuego', updateHistory);
    switchFuegoTab('fondo');
    return;
  }
  if (viewName === 'noticias') {
    navigateTo('aire', updateHistory);
    switchAireTab('noticias');
    return;
  }
  if (viewName === 'hub' || viewName === 'new-order') {
    navigateTo('tierra', updateHistory);
    switchTierraTab('tienda');
    return;
  }
  if (viewName === 'whatsapp') {
    navigateTo('agua', updateHistory);
    switchAguaTab('whatsapp');
    return;
  }
  if (viewName === 'centro-lucila') {
    navigateTo('eter', updateHistory);
    switchEterMainTab('centro');
    showEterModule('centro');
    return;
  }

  AppState.currentView = viewName;

  // Sincronizar URL limpia en la barra del navegador según la vista activa
  try {
    localStorage.setItem('elementales_current_view', viewName);
    if (window.history) {
      const nodeSlug = (AppState.activeNodeId || 'nodo-lomaverde').replace(/^nodo-/, '');
      let targetPath = '/nodo/' + nodeSlug;
      let stateObj = { view: viewName, nodeId: AppState.activeNodeId, circuloId: null };

      if (viewName === 'landing') {
        targetPath = '/';
        stateObj = { view: 'landing', nodeId: AppState.activeNodeId, circuloId: null };
      } else if (viewName === 'barrio') {
        if (typeof CirculosManager !== 'undefined') {
          CirculosManager.setActiveCircleId(null);
        }
        targetPath = '/nodo/' + nodeSlug;
        stateObj = { view: 'barrio', nodeId: AppState.activeNodeId, circuloId: null };
        renderCirculoStoreBanner();
      } else if (viewName === 'circulos') {
        targetPath = '/nodo/' + nodeSlug + '?seccion=circulos';
        stateObj = { view: 'circulos', nodeId: AppState.activeNodeId, circuloId: null };
      } else if (viewName === 'tierra') {
        const activeCId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
        const activeC = activeCId ? CirculosManager.getCircle(activeCId) : null;
        if (activeC) {
          const cSlug = activeC.slug || activeC.id;
          targetPath = '/circulo/' + cSlug;
          stateObj = { view: 'tierra', nodeId: AppState.activeNodeId, circuloId: activeC.id };
        } else {
          targetPath = '/nodo/' + nodeSlug;
          stateObj = { view: 'tierra', nodeId: AppState.activeNodeId, circuloId: null };
        }
      } else {
        targetPath = '/nodo/' + nodeSlug;
        stateObj = { view: viewName, nodeId: AppState.activeNodeId, circuloId: null };
      }

      const currentFullPath = (window.location.pathname || '') + (window.location.search || '');
      if (updateHistory && window.history.pushState) {
        if (currentFullPath !== targetPath) {
          window.history.pushState(stateObj, '', targetPath);
        } else {
          window.history.replaceState(stateObj, '', targetPath);
        }
      } else if (window.history.replaceState) {
        window.history.replaceState(stateObj, '', targetPath);
      }
    }
  } catch (e) {}

  // Actualizar estado de las pestañas en la barra Google Subnav
  document.querySelectorAll('.google-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`tab-btn-${viewName}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Ocultar todas las vistas
  document.querySelectorAll('.app-view').forEach(el => {
    el.classList.add('hidden');
  });

  // Mostrar vista destino
  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Renderizar contenido según la vista
  if (viewName === 'barrio') {
    renderBarrioFeed();
  } else if (viewName === 'circulos') {
    renderCirculosView();
  } else if (viewName === 'tierra') {
    switchTierraTab('tienda');
    renderOrderCatalog();
    renderFloatingCart();
    renderCirculoStoreBanner();
  } else if (viewName === 'agua') {
    switchAguaTab('oficios');
    renderOficios();
  } else if (viewName === 'fuego') {
    switchFuegoTab('talleres');
    renderTalleres();
  } else if (viewName === 'aire') {
    switchAireTab('podcasts');
    renderNoticias();
  } else if (viewName === 'eter') {
    renderEterView();
  } else if (viewName === 'orders-dashboard') {
    renderOrdersDashboard();
  } else if (viewName === 'members-directory') {
    renderMembersDirectory();
  } else if (viewName === 'product-manager') {
    renderProductManager();
  } else if (viewName === 'membership') {
    renderMembership();
  } else if (viewName === 'nodes') {
    renderNodes();
  } else if (viewName === 'profile') {
    renderProfile();
  }
}

// --- RENDERIZADO: HUB PRINCIPAL ---
function renderHubStats() {
  const totalOrders = AppState.orders.length;
  const totalRecaudado = AppState.orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalMembers = AppState.members.length;

  const countBadge = document.getElementById('hub-orders-badge');
  if (countBadge) {
    countBadge.textContent = `${totalOrders} pedidos hoy`;
  }
  const revenueBadge = document.getElementById('hub-revenue-badge');
  if (revenueBadge) {
    revenueBadge.textContent = `$${formatMoney(totalRecaudado)}`;
  }
  const membersBadge = document.getElementById('hub-members-badge');
  if (membersBadge) {
    membersBadge.textContent = `${totalMembers} integrantes`;
  }
}

// --- RENDERIZADO: CATÁLOGO DE PEDIDOS ---
function renderOrderCatalog() {
  const container = document.getElementById('catalog-products-list');
  const categoriesContainer = document.getElementById('catalog-categories-bar');
  if (!container) return;

  const activeCircleId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
  const isCirculoMode = !!activeCircleId;
  const circle = isCirculoMode ? CirculosManager.getCircle(activeCircleId) : null;
  const activeNode = NODOS_COMUNIDAD.find(n => n.id === AppState.activeNodeId) || NODOS_COMUNIDAD[0];
  const feats = activeNode.features || { showLocal: false, showSemanal: true, showLunar: true, showCirculos: true };

  // Determinar modalidades permitidas según nodo y círculo
  let allowLocal = false;
  let allowSemanal = true;
  let allowLunar = true;

  if (isCirculoMode && circle) {
    const circleMod = circle.modalidad || 'ambas';
    allowLocal = false;
    allowSemanal = (circleMod === 'semanal' || circleMod === 'ambas');
    allowLunar = (circleMod === 'lunar' || circleMod === 'ambas');
  } else {
    allowLocal = feats.showLocal !== false;
    allowSemanal = feats.showSemanal !== false;
    allowLunar = feats.showLunar !== false;
  }

  // Actualizar estado visual de los botones de modo (Local, Semanal, Lunar)
  const modeBadge = document.getElementById('catalog-mode-badge');
  const modeDesc = document.getElementById('catalog-mode-description');
  const btnLocal = document.getElementById('btn-mode-local');
  const btnSemanal = document.getElementById('btn-mode-semanal');
  const btnLunar = document.getElementById('btn-mode-lunar');
  const modesGrid = document.getElementById('catalog-modes-grid');

  if (btnLocal) btnLocal.classList.toggle('hidden', !allowLocal);
  if (btnSemanal) btnSemanal.classList.toggle('hidden', !allowSemanal);
  if (btnLunar) btnLunar.classList.toggle('hidden', !allowLunar);

  // Ajustar columnas de la grilla de modos
  if (modesGrid) {
    const visibleModes = (allowLocal ? 1 : 0) + (allowSemanal ? 1 : 0) + (allowLunar ? 1 : 0);
    if (visibleModes <= 1) modesGrid.className = 'grid grid-cols-1 gap-2';
    else if (visibleModes === 2) modesGrid.className = 'grid grid-cols-2 gap-2';
    else modesGrid.className = 'grid grid-cols-3 gap-2';
  }

  // Si el modo actual no está permitido, ajustar al disponible
  if (AppState.catalogMode === 'local' && !allowLocal) {
    AppState.catalogMode = allowSemanal ? 'semanal' : (allowLunar ? 'lunar' : 'semanal');
  } else if (AppState.catalogMode === 'semanal' && !allowSemanal) {
    AppState.catalogMode = allowLunar ? 'lunar' : (allowLocal ? 'local' : 'lunar');
  } else if (AppState.catalogMode === 'lunar' && !allowLunar) {
    AppState.catalogMode = allowSemanal ? 'semanal' : (allowLocal ? 'local' : 'semanal');
  }

  ['local', 'semanal', 'lunar'].forEach(m => {
    const btn = document.getElementById(`btn-mode-${m}`);
    if (btn) {
      btn.classList.toggle('active', AppState.catalogMode === m);
    }
  });

  if (modeBadge && modeDesc) {
    if (isCirculoMode) {
      const circle = CirculosManager.getCircle(activeCircleId);
      modeBadge.textContent = '🤝 ' + (circle ? circle.nombre : 'Círculo Comunitario');
      modeBadge.className = 'text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300';
      const modTxt = circle && circle.modalidad === 'ambas' ? 'Semanal y Lunar' : (circle && circle.modalidad === 'lunar' ? 'Lunar' : 'Semanal');
      modeDesc.innerHTML = `📦 <strong>Círculo de Compra Colectiva (${modTxt}):</strong> Cajones de Central Cooperativa Chasqui (+40% base). Retiro en: ${circle ? circle.direccion : 'Punto Barrial'}.`;
    } else {
      modeBadge.textContent = '🌿 Cajones Chasqui (+40%)';
      modeBadge.className = 'text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200';
      modeDesc.innerHTML = '✨ <strong>Nodo Loma Verde:</strong> Catálogo exclusivo de cajones agroecológicos Chasqui (+40% al costo base).';
    }
  }

  // Renderizar filtros de categorías de cajones
  if (categoriesContainer) {
    const activeCategories = ['Todos', 'Frutas Agroecológicas', 'Verduras & Huerta'];

    if (!activeCategories.includes(AppState.activeCategory)) {
      AppState.activeCategory = 'Todos';
    }

    categoriesContainer.innerHTML = activeCategories.map(cat => `
      <button 
        onclick="setFilterCategory('${cat}')" 
        class="pill-filter ${AppState.activeCategory === cat ? 'active' : ''}">
        ${cat === 'Frutas Agroecológicas' ? '🍊 ' + cat : (cat === 'Verduras & Huerta' ? '🥬 ' + cat : cat)}
      </button>
    `).join('');
  }

  // Filtrar productos según nodo activo
  const allProds = AppState.getActiveProducts();
  const query = AppState.searchQuery.toLowerCase().trim();
  const filtered = allProds.filter(prod => {
    const cat = prod.categoria || prod.category;
    const isProductorMatch = AppState.activeCategory === 'Productorxs Vecinales' && (prod.productorVecinal || cat === 'Productorxs Vecinales');
    const matchesCategory = AppState.activeCategory === 'Todos' || cat === AppState.activeCategory || prod.category === AppState.activeCategory || isProductorMatch;
    const matchesSearch = !query || 
      prod.name.toLowerCase().includes(query) || 
      (cat && cat.toLowerCase().includes(query)) ||
      (prod.producer && prod.producer.toLowerCase().includes(query)) ||
      (prod.productorNombre && prod.productorNombre.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-stone-500">
        <p class="text-4xl mb-3">🔍</p>
        <p class="font-bold text-lg text-stone-700">No se encontraron productos</p>
        <p class="text-sm text-stone-500">Prueba otra categoría o agrega un producto personalizado.</p>
        <button onclick="openCustomProductModal()" class="btn-spotify btn-spotify-secondary mt-4 text-xs">
          + Agregar Producto Libre
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => {
    const qty = AppState.cart[prod.id] || 0;
    const isSelected = qty > 0;
    const activePrice = AppState.getProductPrice(prod);
    const localPrice = AppState.getLocalRetailPrice(prod);
    const hasDiscount = AppState.catalogMode !== 'local' && activePrice < localPrice;
    const discountPercent = hasDiscount ? Math.round(((localPrice - activePrice) / localPrice) * 100) : 0;
    const elementColor = prod.elemento === 'agua' ? '#7ca1b5' : (prod.elemento === 'tierra' ? '#8ca15d' : (prod.elemento === 'fuego' ? '#d97757' : '#aab091'));

    // RENDERIZADO ESPECIAL PARA CAJONES ENTEROS (CENTRAL COOPERATIVA / CHASQUI)
    if (prod.esCajon) {
      const activeShare = (typeof CajonesManager !== 'undefined') ? CajonesManager.getShareForProduct(prod.id, activeCircleId) : null;
      return `
        <div id="prod-card-${prod.id}" class="spotify-card flex flex-col justify-between relative overflow-hidden transition-all ${isSelected ? 'border-amber-500 bg-amber-50/20 ring-2 ring-amber-400/40 shadow-md' : (activeShare ? 'border-amber-300 bg-amber-50/10' : 'border-stone-200')}">
          ${isSelected ? `<div class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse z-10"></div>` : ''}
          
          <!-- Foto del Cajón -->
          <div class="h-36 w-full relative overflow-hidden bg-stone-100">
            ${prod.img ? `
              <img src="${prod.img}" class="w-full h-full object-cover" alt="${escapeHtml(prod.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <div class="w-full h-full hidden items-center justify-center text-4xl bg-stone-50">${prod.emoji || '📦'}</div>
            ` : `
              <div class="w-full h-full flex items-center justify-center text-4xl bg-stone-50">${prod.emoji || '📦'}</div>
            `}
            <div class="absolute top-2 left-2 flex flex-col gap-1">
              <span class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                📦 Cajón ${prod.cajonKg} kg
              </span>
              <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-stone-700 shadow-2xs">
                ${escapeHtml(prod.producer || 'Central Cooperativa')}
              </span>
            </div>
            ${activeShare ? `
              <div class="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center justify-between border border-amber-400/40">
                <span class="flex items-center gap-1">👥 En curso: ${activeShare.percent}%</span>
                <span class="text-amber-300 font-black">¡Faltan ${activeShare.remainingKg} kg!</span>
              </div>
            ` : ''}
          </div>

          <div class="p-3.5 flex flex-col flex-1 justify-between">
            <div>
              <h3 class="font-bold text-sm text-stone-900 leading-snug mb-1">
                ${escapeHtml((typeof getProductCleanName === 'function') ? getProductCleanName(prod) : prod.name)}
              </h3>
              <div class="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                <span>Total: <strong>${prod.cajonKg} kg</strong></span>
                <span>•</span>
                <span class="text-emerald-700 font-bold">$${formatMoney(prod.precioPerKg)} / kg</span>
              </div>

              ${activeShare ? `
                <div class="mt-1 mb-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-950">
                  <div class="flex items-center justify-between font-bold mb-1">
                    <span class="flex items-center gap-1"><span>👥</span> Cajón compartido en curso:</span>
                    <span class="text-amber-900 font-black">Faltan ${activeShare.remainingKg} kg</span>
                  </div>
                  <div class="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-1">
                    <div class="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" style="width: ${activeShare.percent}%;"></div>
                  </div>
                  <span class="text-[10px] text-stone-600 truncate block">
                    Sumados: ${(activeShare.participantes || []).map(p => `${p.name} (${p.kg}kg)`).join(', ')}
                  </span>
                </div>
              ` : ''}
            </div>

            <!-- Precio y Acciones Duales (Entero o Compartido) -->
            <div class="pt-2 border-t border-stone-100 mt-auto">
              <div class="flex items-baseline justify-between mb-2.5">
                <div>
                  <span class="text-[10px] text-stone-400 font-bold block uppercase leading-tight">Cajón Entero</span>
                  <span class="text-base font-black text-stone-900">$${formatMoney(prod.precioCajon)}</span>
                </div>
                <div class="text-right">
                  <span class="text-[10px] text-amber-800 font-bold block uppercase leading-tight">Por Kilo Mayorista</span>
                  <span class="text-xs font-black text-amber-900">$${formatMoney(prod.precioPerKg)}</span>
                </div>
              </div>

              <!-- Botones: Pedir Cajón Completo O Dividir -->
              <div class="grid grid-cols-2 gap-1.5">
                <button 
                  type="button" 
                  onclick="AppState.addToCart('${prod.id}', 1)" 
                  class="py-2 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all"
                  title="Comprar el cajón cerrado completo (${prod.cajonKg} kg)"
                >
                  <span>📦</span>
                  <span>${qty > 0 ? `(${qty}) Entero` : 'Entero'}</span>
                </button>

                <button 
                  type="button" 
                  onclick="openFraccionarCajonModal('${prod.id}')" 
                  class="py-2 px-2 rounded-xl ${activeShare ? '!bg-emerald-600 hover:!bg-emerald-700 text-white ring-2 ring-emerald-400 font-black' : 'bg-amber-500 hover:bg-amber-600 text-white font-bold'} text-[11px] flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all"
                  title="${activeShare ? `Sumarme con los ${activeShare.remainingKg} kg que faltan o una fracción` : 'Dividir este cajón entre varios vecinos (1/2 o 1/3)'}"
                >
                  <span>👥</span>
                  <span>${activeShare ? `Sumarme (${activeShare.remainingKg}kg)` : 'Dividir (½ o ⅓)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="spotify-card flex flex-col justify-between relative overflow-hidden transition-all ${isSelected ? 'border-[#c0826d] bg-[#fdfaf8] ring-2 ring-[#c0826d]/30 shadow-md' : 'border-stone-200' }">
        ${isSelected ? `<div class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#c0826d] animate-pulse z-10"></div>` : ''}
        
        <!-- Foto / Imagen del Producto -->
        <div class="h-32 w-full relative overflow-hidden bg-stone-100">
          ${prod.img ? `
            <img src="${prod.img}" class="w-full h-full object-cover" alt="${escapeHtml(prod.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="w-full h-full hidden items-center justify-center text-4xl bg-stone-50">${prod.emoji || '🌱'}</div>
          ` : `
            <div class="w-full h-full flex items-center justify-center text-4xl bg-stone-50">${prod.emoji || '🌱'}</div>
          `}
          <div class="absolute top-2 left-2">
            <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md shadow-2xs border" style="color: ${elementColor}; border-color: ${elementColor}40;">
              ${prod.categoria || prod.category}
            </span>
          </div>
          ${hasDiscount ? `
            <div class="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
              -${discountPercent}% Ahorro
            </div>
          ` : ''}
        </div>

        <div class="p-3.5 flex flex-col flex-1 justify-between">
          <div>
            <div class="flex items-start justify-between gap-1 mb-1">
              <h3 class="font-bold text-sm text-stone-900 leading-snug">
                ${escapeHtml(prod.name)}
              </h3>
            </div>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 inline-block mb-3">
              ${prod.unit}
            </span>
          </div>

          <div class="pt-2 border-t border-stone-100 flex items-center justify-between mt-auto">
            <div>
              ${hasDiscount ? `
                <span class="text-[10px] text-stone-400 font-bold line-through block leading-tight">$${formatMoney(localPrice)}</span>
                <span class="text-base font-black text-emerald-700">$${formatMoney(activePrice)}</span>
              ` : `
                <span class="text-[10px] text-stone-400 font-bold block uppercase leading-tight">Precio</span>
                <span class="text-base font-black text-[#a6634f]">$${formatMoney(activePrice)}</span>
              `}
            </div>

            <!-- Controles de Cantidad -->
            <div class="flex items-center gap-1.5 bg-stone-100/90 p-1 rounded-full border border-stone-200">
              ${qty > 0 ? `
                <button 
                  onclick="AppState.addToCart('${prod.id}', -1)" 
                  class="stepper-btn hover:bg-stone-200 text-stone-700"
                  title="Restar">
                  −
                </button>
                <span class="font-black text-xs px-1.5 min-w-[20px] text-center text-stone-900">
                  ${qty}
                </span>
              ` : ''}
              
              <button 
                onclick="AppState.addToCart('${prod.id}', 1)" 
                class="stepper-btn ${qty > 0 ? 'bg-[#c0826d] text-white hover:bg-[#a6634f]' : 'bg-white hover:bg-[#c0826d] text-stone-800 hover:text-white'}"
                title="Sumar">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (typeof renderCirculoSharesDashboard === 'function') {
    renderCirculoSharesDashboard();
  }
}

function setCatalogMode(mode) {
  const activeCircleId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
  const node = NODOS_COMUNIDAD.find(n => n.id === AppState.activeNodeId) || NODOS_COMUNIDAD[0];
  const feats = node.features || {};

  if (activeCircleId && mode === 'local') {
    mode = 'semanal'; // Los círculos no son locales
  }
  if (mode === 'local' && feats.showLocal === false) {
    mode = feats.showSemanal !== false ? 'semanal' : (feats.showLunar !== false ? 'lunar' : 'semanal');
  }
  if (mode === 'lunar' && feats.showLunar === false) {
    mode = feats.showSemanal !== false ? 'semanal' : (feats.showLocal !== false ? 'local' : 'semanal');
  }
  if (mode === 'semanal' && feats.showSemanal === false) {
    mode = feats.showLocal !== false ? 'local' : (feats.showLunar !== false ? 'lunar' : 'local');
  }

  AppState.catalogMode = mode;
  localStorage.setItem('elementales_catalog_mode', mode);
  sounds.playPop();
  renderOrderCatalog();
  renderFloatingCart();
}

function setFilterCategory(category) {
  AppState.activeCategory = category;
  sounds.playPop();
  renderOrderCatalog();
}

function handleSearchProducts(value) {
  AppState.searchQuery = value;
  renderOrderCatalog();
}

// --- RENDERIZADO: BARRA FLOTANTE DEL CARRITO ---
function renderFloatingCart() {
  const floatingBar = document.getElementById('floating-cart-bar');
  const cartSummary = AppState.getCartDetails();

  if (!floatingBar) return;

  if (cartSummary.totalItems === 0) {
    floatingBar.classList.add('hidden');
    return;
  }

  floatingBar.classList.remove('hidden');
  const itemsCountEl = document.getElementById('floating-cart-items-count');
  const totalEl = document.getElementById('floating-cart-total');

  if (itemsCountEl) {
    itemsCountEl.textContent = `${cartSummary.totalItems} ${cartSummary.totalItems === 1 ? 'ítem' : 'ítems'}`;
  }
  if (totalEl) {
    if (cartSummary.totalSavings > 0) {
      totalEl.innerHTML = `$${formatMoney(cartSummary.subtotal)} <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-1">Ahorraste $${formatMoney(cartSummary.totalSavings)}</span>`;
    } else {
      totalEl.textContent = `$${formatMoney(cartSummary.subtotal)}`;
    }
  }
}

// --- MODAL DE CIERRE DE PEDIDO (CHECKOUT) ---
function openCheckoutModal() {
  sounds.playPop();
  const summary = AppState.getCartDetails();
  if (summary.totalItems === 0) {
    alert('El carrito está vacío. Selecciona productos antes de continuar.');
    return;
  }

  const modal = document.getElementById('modal-checkout');
  const itemsContainer = document.getElementById('checkout-items-list');
  const totalAmountEl = document.getElementById('checkout-total-amount');

  if (summary.totalSavings > 0) {
    totalAmountEl.innerHTML = `$${formatMoney(summary.subtotal)} <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full block sm:inline mt-1 sm:mt-0 ml-0 sm:ml-2">Ahorro CsC: -$${formatMoney(summary.totalSavings)}</span>`;
  } else {
    totalAmountEl.textContent = `$${formatMoney(summary.subtotal)}`;
  }

  itemsContainer.innerHTML = summary.items.map(item => `
    <div class="flex items-center justify-between py-2.5 border-b border-stone-100 text-sm">
      <div class="flex items-center gap-2 max-w-[65%]">
        <span class="text-lg">${item.emoji}</span>
        <div>
          <p class="font-bold text-stone-800 truncate">${escapeHtml(item.name)}</p>
          <p class="text-xs text-stone-500">${item.qty} x $${formatMoney(item.price)} (${item.unit})</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-extrabold text-[#a6634f]">$${formatMoney(item.total)}</span>
        ${item.isCustom ? `
          <button onclick="AppState.removeCustomItem('${item.id}'); openCheckoutModal();" class="text-red-500 hover:text-red-700 text-xs font-bold">✕</button>
        ` : ''}
      </div>
    </div>
  `).join('');

  // Limpiar campos
  document.getElementById('checkout-client-name').value = '';
  document.getElementById('checkout-client-phone').value = '';
  document.getElementById('checkout-client-notes').value = '';
  document.getElementById('checkout-payment-method').value = 'Efectivo';
  document.getElementById('checkout-cash-amount').value = '';
  document.getElementById('checkout-cash-change-container').classList.add('hidden');

  modal.classList.remove('hidden');
}

function closeCheckoutModal() {
  sounds.playPop();
  document.getElementById('modal-checkout').classList.add('hidden');
}

function handlePaymentMethodChange(method) {
  const cashContainer = document.getElementById('checkout-cash-amount-container');
  if (method === 'Efectivo') {
    cashContainer.classList.remove('hidden');
  } else {
    cashContainer.classList.add('hidden');
    document.getElementById('checkout-cash-change-container').classList.add('hidden');
  }
}

function calculateCashChange() {
  const summary = AppState.getCartDetails();
  const givenCash = parseFloat(document.getElementById('checkout-cash-amount').value) || 0;
  const changeContainer = document.getElementById('checkout-cash-change-container');
  const changeAmountEl = document.getElementById('checkout-cash-change-amount');

  if (givenCash > summary.subtotal) {
    changeContainer.classList.remove('hidden');
    changeAmountEl.textContent = `$${formatMoney(givenCash - summary.subtotal)}`;
  } else {
    changeContainer.classList.add('hidden');
  }
}

// --- CONFIRMAR Y GUARDAR PEDIDO ---
function submitOrder(e) {
  e.preventDefault();
  const summary = AppState.getCartDetails();
  if (summary.totalItems === 0) return;

  const clientName = document.getElementById('checkout-client-name').value.trim() || 'Cliente de Feria';
  const clientPhone = document.getElementById('checkout-client-phone').value.trim();
  const paymentMethod = document.getElementById('checkout-payment-method').value;
  const notes = document.getElementById('checkout-client-notes').value.trim();
  const cashGiven = parseFloat(document.getElementById('checkout-cash-amount').value) || 0;

  // Facultad de Círculo: Detección de entrega individual vs Círculo
  const deliveryTypeEl = document.querySelector('input[name="checkout-delivery-type"]:checked');
  const deliveryType = deliveryTypeEl ? deliveryTypeEl.value : 'nodo';
  const selectedCirculoId = document.getElementById('checkout-selected-circulo')?.value;
  let circuloObj = null;
  const activeCircleId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
  if (typeof CirculosManager !== 'undefined') {
    if (deliveryType === 'circulo' && selectedCirculoId) {
      circuloObj = CirculosManager.getCircle(selectedCirculoId);
    } else if (activeCircleId) {
      circuloObj = CirculosManager.getCircle(activeCircleId);
    }
  }

  const orderNumber = AppState.orders.length + 1;
  const orderId = 'ORD-' + String(orderNumber).padStart(3, '0');
  const dateObj = new Date();

  const newOrder = {
    id: orderId,
    number: orderNumber,
    timestamp: dateObj.getTime(),
    dateStr: dateObj.toLocaleDateString('es-AR'),
    timeStr: dateObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    clientName,
    clientPhone,
    paymentMethod,
    status: paymentMethod === 'Cuenta Corriente / A pagar' ? 'Pendiente' : 'Pagado',
    items: summary.items,
    total: summary.subtotal,
    totalItems: summary.totalItems,
    notes,
    cashGiven: paymentMethod === 'Efectivo' && cashGiven > 0 ? cashGiven : null,
    cashChange: paymentMethod === 'Efectivo' && cashGiven > summary.subtotal ? cashGiven - summary.subtotal : 0,
    deliveryType,
    circuloId: circuloObj ? circuloObj.id : null,
    circuloNombre: circuloObj ? circuloObj.nombre : null,
    nodoId: AppState.activeNodeId
  };

  // Sumar automáticamente al Círculo si corresponde (Autogestión de pedido)
  if (circuloObj && typeof CirculosManager !== 'undefined') {
    const itemsSummary = summary.items.map(i => `${i.qty}x ${i.name}`).join(', ');
    CirculosManager.addOrderToCircle(circuloObj.id, {
      clientName,
      itemsSummary,
      totalAmount: summary.subtotal,
      items: summary.items
    });
  }

  AppState.orders.unshift(newOrder);
  AppState.saveOrders();
  AppState.lastCompletedOrder = newOrder;

  AppState.clearCart();
  closeCheckoutModal();

  sounds.playSuccess();
  triggerCelebrationConfetti();

  openOrderSuccessModal(newOrder);
}

// --- MODAL DE TICKET EXITOSO Y WHATSAPP ---
function openOrderSuccessModal(order) {
  const modal = document.getElementById('modal-order-success');
  document.getElementById('success-order-number').textContent = `#${String(order.number).padStart(3, '0')}`;
  document.getElementById('success-order-client').textContent = order.clientName;
  document.getElementById('success-order-total').textContent = `$${formatMoney(order.total)}`;
  document.getElementById('success-order-method').textContent = order.paymentMethod;

  const itemsContainer = document.getElementById('success-order-items-preview');
  itemsContainer.innerHTML = order.items.map(it => `
    <div class="flex justify-between text-xs py-1 text-stone-700">
      <span>${it.qty}x ${escapeHtml(it.name)}</span>
      <span class="font-bold text-stone-900">$${formatMoney(it.total)}</span>
    </div>
  `).join('');

  const waBtn = document.getElementById('btn-send-whatsapp-ticket');
  if (waBtn) waBtn.onclick = () => sendWhatsAppTicket(order);

  // Botón para avisar al Círculo por WhatsApp (+ compartir enlace de compra)
  const notifyCirculoBtn = document.getElementById('btn-notify-circulo-whatsapp');
  if (notifyCirculoBtn) {
    if (order.circuloId && typeof CirculosManager !== 'undefined') {
      notifyCirculoBtn.classList.remove('hidden');
      notifyCirculoBtn.onclick = () => {
        sounds.playPop();
        const text = CirculosManager.generateNotifyOrderText(order.circuloId, order);
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
      };
    } else {
      notifyCirculoBtn.classList.add('hidden');
    }
  }

  modal.classList.remove('hidden');
}

function closeOrderSuccessModal() {
  sounds.playPop();
  document.getElementById('modal-order-success')?.classList.add('hidden');
  renderFloatingCart();
  if (typeof renderCirculoSharesDashboard === 'function') {
    renderCirculoSharesDashboard();
  }
}

function sendWhatsAppTicket(order) {
  sounds.playPop();
  let message = `🌱 *ELEMENTALES COMUNIDAD* - Feria Comunitaria\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🧾 *Pedido:* #${String(order.number).padStart(3, '0')}\n`;
  message += `👤 *Cliente:* ${order.clientName}\n`;
  message += `📅 *Fecha:* ${order.dateStr} a las ${order.timeStr} hs\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛒 *Detalle de compra:*\n`;

  order.items.forEach(it => {
    message += `• ${it.qty}x ${it.name} - $${formatMoney(it.total)}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL: $${formatMoney(order.total)}*\n`;
  message += `💳 *Forma de pago:* ${order.paymentMethod}\n`;
  if (order.notes) {
    message += `📝 *Nota:* ${order.notes}\n`;
  }
  message += `\n¡Muchas gracias por apoyar la producción agroecológica y el consumo consciente en comunidad! ✨🍃`;

  const phone = cleanPhoneForWhatsApp(order.clientPhone);
  let url = '';
  if (phone) {
    url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  } else {
    url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }

  window.open(url, '_blank');
}

// --- MODALES DE FILOSOFÍA & PROPÓSITO ---
function openManifestoModal() {
  sounds.playPop();
  const modal = document.getElementById('modal-community-manifesto');
  if (modal) modal.classList.remove('hidden');
}

function closeManifestoModal() {
  sounds.playPop();
  const modal = document.getElementById('modal-community-manifesto');
  if (modal) modal.classList.add('hidden');
}

// --- MODAL DE OPCIONES DE CONTACTO WHATSAPP ---
function openMemberContactModal(memberId) {
  const member = AppState.members.find(m => m.id === memberId);
  if (!member) return;
  sounds.playPop();
  AppState.selectedMemberForContact = member;

  const nameEl = document.getElementById('contact-member-modal-name');
  if (nameEl) nameEl.textContent = member.name;

  const btnWelcome = document.getElementById('btn-contact-opt-welcome');
  if (btnWelcome) {
    btnWelcome.onclick = () => {
      sendWhatsAppWelcome(member);
      closeMemberContactModal();
    };
  }

  const btnOrders = document.getElementById('btn-contact-opt-orders-open');
  if (btnOrders) {
    btnOrders.onclick = () => {
      sendWhatsAppOrderAlert(member);
      closeMemberContactModal();
    };
  }

  const btnWorkshop = document.getElementById('btn-contact-opt-workshop');
  if (btnWorkshop) {
    btnWorkshop.onclick = () => {
      sendWhatsAppWorkshopInvite(member);
      closeMemberContactModal();
    };
  }

  const modal = document.getElementById('modal-member-contact');
  if (modal) modal.classList.remove('hidden');
}

function closeMemberContactModal() {
  sounds.playPop();
  const modal = document.getElementById('modal-member-contact');
  if (modal) modal.classList.add('hidden');
}

// --- REGISTRO DE NUEVO INTEGRANTE ---
function submitNewMember(e) {
  e.preventDefault();

  const name = document.getElementById('member-name').value.trim();
  const phone = document.getElementById('member-phone').value.trim();
  const email = document.getElementById('member-email').value.trim();
  const communityRole = document.getElementById('member-community-role') ? document.getElementById('member-community-role').value : 'Consumo Familiar Consciente';
  const neighborhood = document.getElementById('member-neighborhood').value.trim();
  const pickupPoint = document.getElementById('member-pickup-point').value;
  const frequency = document.getElementById('member-frequency').value;
  const notes = document.getElementById('member-notes').value.trim();

  const interests = [];
  document.querySelectorAll('input[name="member-interests"]:checked').forEach(cb => {
    interests.push(cb.value);
  });

  const dateObj = new Date();
  const newMember = {
    id: 'MEM-' + Date.now(),
    timestamp: dateObj.getTime(),
    dateStr: dateObj.toLocaleDateString('es-AR'),
    name,
    phone,
    email,
    communityRole,
    neighborhood,
    pickupPoint,
    frequency,
    interests,
    notes
  };

  AppState.members.unshift(newMember);
  AppState.saveMembers();
  AppState.lastCompletedMember = newMember;

  e.target.reset();
  sounds.playSuccess();
  triggerCelebrationConfetti();

  openMemberSuccessModal(newMember);
}

function openMemberSuccessModal(member) {
  const modal = document.getElementById('modal-member-success');
  document.getElementById('success-member-name').textContent = member.name;
  document.getElementById('success-member-phone').textContent = member.phone ? `📱 ${member.phone}` : 'Sin WhatsApp registrado';
  
  const roleBadge = document.getElementById('success-member-role-badge');
  if (roleBadge) {
    roleBadge.textContent = member.communityRole || 'Consumo Familiar Consciente';
  }

  const waBtn = document.getElementById('btn-send-whatsapp-welcome');
  waBtn.onclick = () => sendWhatsAppWelcome(member);

  modal.classList.remove('hidden');
}

function closeMemberSuccessModal() {
  sounds.playPop();
  document.getElementById('modal-member-success').classList.add('hidden');
}

// --- PLANTILLAS DE MENSAJES WHATSAPP ---
function sendWhatsAppWelcome(member) {
  sounds.playPop();
  let message = `¡Hola ${member.name}! 👋 Te damos una cálida bienvenida a *Elementales Comunidad* 🌱✨\n\n`;
  message += `_“Cada ser humano es un elemento fundamental para la vida sana en la tierra y para ser feliz.”_\n\n`;
  message += `Te registramos con éxito en nuestro nodo barrial:\n`;
  if (member.communityRole) {
    message += `✨ *Participación:* ${member.communityRole}\n`;
  }
  if (member.neighborhood) {
    message += `📍 *Zona:* ${member.neighborhood}\n`;
  }
  if (member.pickupPoint) {
    message += `📦 *Punto de Retiro:* ${member.pickupPoint}\n`;
  }
  if (member.interests && member.interests.length > 0) {
    message += `🧺 *Intereses:* ${member.interests.join(', ')}\n`;
  }
  message += `\nA través de la red *vrde* te avisaremos cada vez que abramos pedidos de bolsones agroecológicos y alimentos sanos de productores locales. Y junto a *En Conjunto*, compartiremos saberes, charlas y encuentros de comunidad.\n\n`;
  message += `¡Un placer enorme sumar tu elemento a nuestra red! 🥬🍎✨`;

  const phone = cleanPhoneForWhatsApp(member.phone);
  let url = '';
  if (phone) {
    url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  } else {
    url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }

  window.open(url, '_blank');
}

function sendWhatsAppOrderAlert(member) {
  sounds.playPop();
  let message = `¡Hola ${member.name}! 🌱 Te avisamos que están *abiertos los pedidos comunitarios* en *Elementales* (red vrde) 🥬🍎\n\n`;
  message += `Ya podés encargar bolsones agroecológicos de huerta fresca y productos de elaboración artesanal.\n\n`;
  if (member.pickupPoint) {
    message += `📦 *Punto de retiro:* ${member.pickupPoint}\n`;
  }
  message += `🔗 Accedé al catálogo y hacé tu pedido en: https://elementales.store\n\n`;
  message += `¡Gracias por apoyar la soberanía alimentaria y la producción local! ✨`;

  const phone = cleanPhoneForWhatsApp(member.phone);
  let url = '';
  if (phone) {
    url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  } else {
    url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }

  window.open(url, '_blank');
}

function sendWhatsAppWorkshopInvite(member) {
  sounds.playPop();
  let message = `¡Hola ${member.name}! ✨ Desde *Elementales* y la comunidad de saberes *En Conjunto*, queremos invitarte a nuestro próximo encuentro y taller de vivencia práctica. 🌱\n\n`;
  message += `Un espacio para aprender técnicas, compartir herramientas y seguir tejiendo una comunidad viva y consciente.\n\n`;
  message += `¿Te gustaría sumarte o conocer el temario? ¡Respondé a este mensaje y te pasamos los datos! 🌿`;

  const phone = cleanPhoneForWhatsApp(member.phone);
  let url = '';
  if (phone) {
    url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  } else {
    url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }

  window.open(url, '_blank');
}

// --- BÚSQUEDA Y FILTRADO DE INTEGRANTES ---
function handleSearchMembers(query) {
  AppState.memberSearchQuery = (query || '').toLowerCase().trim();
  renderMembersDirectory();
}

function handleFilterMemberRole(role) {
  sounds.playPop();
  AppState.memberRoleFilter = role;

  // Actualizar botones de filtro activos
  document.querySelectorAll('#view-members-directory .pill-filter').forEach(btn => {
    btn.classList.remove('pill-filter-active');
  });

  if (role === 'Todos') {
    const el = document.getElementById('filter-role-all');
    if (el) el.classList.add('pill-filter-active');
  } else if (role.includes('Consumo')) {
    const el = document.getElementById('filter-role-consumer');
    if (el) el.classList.add('pill-filter-active');
  } else if (role.includes('Saberes')) {
    const el = document.getElementById('filter-role-learning');
    if (el) el.classList.add('pill-filter-active');
  } else if (role.includes('Voluntariado')) {
    const el = document.getElementById('filter-role-volunteer');
    if (el) el.classList.add('pill-filter-active');
  } else if (role.includes('Productor')) {
    const el = document.getElementById('filter-role-producer');
    if (el) el.classList.add('pill-filter-active');
  }

  renderMembersDirectory();
}

function getRoleBadgeClass(role) {
  if (!role) return 'bg-stone-100 text-stone-700 border-stone-200';
  if (role.includes('Consumo')) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  if (role.includes('Saberes')) return 'bg-amber-100 text-amber-800 border-amber-300';
  if (role.includes('Voluntariado')) return 'bg-[#fcf4f0] text-[#a6634f] border-[#c0826d]/40';
  if (role.includes('Productor')) return 'bg-purple-100 text-purple-800 border-purple-300';
  return 'bg-stone-100 text-stone-700 border-stone-200';
}

function getRoleShortLabel(role) {
  if (!role) return '🛒 Consumo';
  if (role.includes('Consumo')) return '🛒 Consumo Consciente';
  if (role.includes('Saberes')) return '💡 Saberes & Talleres';
  if (role.includes('Voluntariado')) return '🤝 Nodo Activo';
  if (role.includes('Productor')) return '🌾 Productor/a';
  return role;
}

// --- PANEL DE CONTROL Y PEDIDOS ---
function renderOrdersDashboard() {
  const orders = AppState.orders;
  const totalRecaudado = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalEfectivo = orders.filter(o => o.paymentMethod === 'Efectivo').reduce((sum, o) => sum + (o.total || 0), 0);
  const totalDigital = orders.filter(o => o.paymentMethod.includes('Transferencia') || o.paymentMethod.includes('Mercado')).reduce((sum, o) => sum + (o.total || 0), 0);

  document.getElementById('dash-total-revenue').textContent = `$${formatMoney(totalRecaudado)}`;
  document.getElementById('dash-total-cash').textContent = `$${formatMoney(totalEfectivo)}`;
  document.getElementById('dash-total-digital').textContent = `$${formatMoney(totalDigital)}`;
  document.getElementById('dash-total-count').textContent = orders.length;

  const ordersContainer = document.getElementById('dash-orders-table-body');
  if (!ordersContainer) return;

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-12 text-stone-500">
          <p class="text-3xl mb-2">📋</p>
          <p class="font-bold text-stone-600">Aún no hay pedidos registrados hoy en la feria.</p>
          <button onclick="navigateTo('new-order')" class="btn-spotify btn-spotify-primary text-xs mt-3">
            + Tomar Primer Pedido
          </button>
        </td>
      </tr>
    `;
    return;
  }

  ordersContainer.innerHTML = orders.map(order => `
    <tr class="border-b border-stone-100 hover:bg-stone-50/80 transition-colors">
      <td class="py-3.5 px-3 font-mono font-bold text-[#a6634f]">
        #${String(order.number).padStart(3, '0')}
        <span class="block text-[11px] font-normal text-stone-500 font-sans">${order.timeStr} hs</span>
      </td>
      <td class="py-3.5 px-3">
        <span class="font-bold text-stone-900 block">${escapeHtml(order.clientName)}</span>
        ${order.clientPhone ? `
          <a href="https://wa.me/${cleanPhoneForWhatsApp(order.clientPhone)}" target="_blank" class="text-xs text-emerald-600 font-semibold hover:underline inline-flex items-center gap-1">
            📱 ${escapeHtml(order.clientPhone)}
          </a>
        ` : '<span class="text-xs text-stone-400">Sin teléfono</span>'}
      </td>
      <td class="py-3.5 px-3">
        <div class="text-xs text-stone-600 max-w-xs line-clamp-2">
          ${order.items.map(it => `${it.qty}x ${escapeHtml(it.name)}`).join(', ')}
        </div>
      </td>
      <td class="py-3.5 px-3 font-mono font-black text-stone-900">
        $${formatMoney(order.total)}
        <span class="block text-[11px] font-normal font-sans text-stone-500">${order.paymentMethod}</span>
      </td>
      <td class="py-3.5 px-3">
        <button 
          onclick="toggleOrderStatus('${order.id}')" 
          class="badge-status ${order.status === 'Pagado' ? 'badge-paid' : 'badge-pending'} cursor-pointer hover:opacity-80"
          title="Clic para cambiar estado">
          ${order.status}
        </button>
      </td>
      <td class="py-3.5 px-3 text-right whitespace-nowrap">
        <button 
          onclick="viewOrderDetail('${order.id}')" 
          class="p-1.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg mr-1"
          title="Ver detalle / WhatsApp">
          📄
        </button>
        <button 
          onclick="deleteOrder('${order.id}')" 
          class="p-1.5 text-red-500 hover:text-red-700 bg-stone-100 hover:bg-red-50 rounded-lg"
          title="Eliminar">
          🗑️
        </button>
      </td>
    </tr>
  `).join('');
}

function toggleOrderStatus(orderId) {
  const order = AppState.orders.find(o => o.id === orderId);
  if (!order) return;
  sounds.playPop();
  order.status = order.status === 'Pagado' ? 'Pendiente' : 'Pagado';
  AppState.saveOrders();
  renderOrdersDashboard();
}

function viewOrderDetail(orderId) {
  const order = AppState.orders.find(o => o.id === orderId);
  if (!order) return;
  sounds.playPop();
  openOrderSuccessModal(order);
}

function deleteOrder(orderId) {
  if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
    sounds.playPop();
    AppState.orders = AppState.orders.filter(o => o.id !== orderId);
    AppState.saveOrders();
    renderOrdersDashboard();
    renderHubStats();
  }
}

// --- DIRECTORIO DE INTEGRANTES ---
function renderMembersDirectory() {
  const allMembers = AppState.members;
  const countRoleAll = document.getElementById('count-role-all');
  if (countRoleAll) countRoleAll.textContent = allMembers.length;

  let filtered = [...allMembers];

  // Filtro por Rol
  if (AppState.memberRoleFilter && AppState.memberRoleFilter !== 'Todos') {
    filtered = filtered.filter(m => m.communityRole === AppState.memberRoleFilter);
  }

  // Filtro por Búsqueda
  if (AppState.memberSearchQuery) {
    const q = AppState.memberSearchQuery;
    filtered = filtered.filter(m => 
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.neighborhood && m.neighborhood.toLowerCase().includes(q)) ||
      (m.phone && m.phone.includes(q)) ||
      (m.communityRole && m.communityRole.toLowerCase().includes(q)) ||
      (m.notes && m.notes.toLowerCase().includes(q))
    );
  }

  const dirCountEl = document.getElementById('dir-total-members');
  if (dirCountEl) {
    dirCountEl.textContent = `${filtered.length} de ${allMembers.length} personas`;
  }

  const container = document.getElementById('members-cards-container');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-stone-500 bg-white rounded-2xl border border-stone-200 p-6">
        <p class="text-4xl mb-3">👥</p>
        <p class="font-bold text-stone-700 text-lg">No se encontraron integrantes con los filtros actuales.</p>
        <p class="text-xs text-stone-400 mt-1">Prueba cambiando la búsqueda o sumando a una nueva persona al nodo.</p>
        <button onclick="navigateTo('new-member')" class="btn-spotify btn-spotify-green text-xs mt-4">
          + Sumar Nuevo Integrante
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => `
    <div class="spotify-card p-5 flex flex-col justify-between border-stone-200 hover:border-emerald-400 transition-all">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-[#fbf2ee] text-[#a6634f] font-black text-lg flex items-center justify-center border border-[#c0826d]/30 shadow-sm">
              ${m.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 class="font-black text-base text-stone-900 leading-tight">${escapeHtml(m.name)}</h4>
              <span class="text-[11px] text-stone-400 font-medium">Registrado el ${m.dateStr}</span>
            </div>
          </div>

          <button 
            onclick="deleteMember('${m.id}')" 
            class="text-stone-300 hover:text-red-500 text-xs p-1 transition-colors"
            title="Eliminar del directorio">
            ✕
          </button>
        </div>

        <!-- Rol Comunitario Badge -->
        <div class="mb-2.5">
          <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${getRoleBadgeClass(m.communityRole)}">
            ${escapeHtml(getRoleShortLabel(m.communityRole))}
          </span>
        </div>

        <!-- Ubicación & Retiro -->
        <div class="text-xs text-stone-600 space-y-1 mb-3 bg-stone-50/80 p-2.5 rounded-xl border border-stone-100">
          <p class="flex items-center gap-1.5 font-medium">
            <span>📍</span> <span class="text-stone-800 font-semibold">${escapeHtml(m.neighborhood || 'Zona a convenir')}</span>
          </p>
          <p class="flex items-center gap-1.5 text-stone-500 text-[11px]">
            <span>📦</span> <span>Retiro: <strong>${escapeHtml(m.pickupPoint || 'Nodo Principal')}</strong></span>
          </p>
        </div>

        <!-- Intereses -->
        ${m.interests && m.interests.length > 0 ? `
          <div class="flex flex-wrap gap-1 mb-3">
            ${m.interests.map(int => `
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-stone-700 border border-stone-200 shadow-2xs">
                ${escapeHtml(int)}
              </span>
            `).join('')}
          </div>
        ` : ''}

        <!-- Notas / Saberes -->
        ${m.notes ? `
          <p class="text-xs text-stone-600 italic bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/60 mb-3">
            "${escapeHtml(m.notes)}"
          </p>
        ` : ''}
      </div>

      <div class="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
        <span class="text-xs text-stone-500">Freq: <strong>${escapeHtml(m.frequency || 'Ocasional')}</strong></span>
        
        <div class="flex items-center gap-2">
          ${m.phone ? `
            <button 
              onclick="openMemberContactModal('${m.id}')" 
              class="btn-spotify btn-spotify-green text-xs !py-1.5 !px-3.5 font-bold shadow-sm flex items-center gap-1">
              <span>WhatsApp</span> 💬
            </button>
          ` : '<span class="text-xs text-stone-400">Sin teléfono</span>'}
        </div>
      </div>
    </div>
  `).join('');
}

function deleteMember(memberId) {
  if (confirm('¿Eliminar este integrante del directorio?')) {
    sounds.playPop();
    AppState.members = AppState.members.filter(m => m.id !== memberId);
    AppState.saveMembers();
    renderMembersDirectory();
    renderHubStats();
  }
}

// --- GESTOR DE PRODUCTOS DEL CATÁLOGO ---
function renderProductManager() {
  const container = document.getElementById('manager-products-list');
  if (!container) return;

  container.innerHTML = AppState.products.map(prod => `
    <div class="spotify-card p-3.5 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="text-2xl">${prod.emoji || '🌱'}</span>
        <div>
          <h4 class="font-bold text-sm text-stone-900">${escapeHtml(prod.name)}</h4>
          <span class="text-xs text-stone-500">${prod.category} • ${prod.unit}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-300">
          <span class="text-xs text-stone-500 font-bold">$</span>
          <input 
            type="number" 
            value="${prod.price}" 
            onchange="updateProductPrice('${prod.id}', this.value)"
            class="w-20 bg-transparent text-sm font-black text-[#a6634f] focus:outline-none text-right"
          />
        </div>
        <button 
          onclick="deleteProduct('${prod.id}')" 
          class="text-stone-400 hover:text-red-500 p-1.5"
          title="Eliminar producto">
          🗑️
        </button>
      </div>
    </div>
  `).join('');
}

function updateProductPrice(productId, newPrice) {
  const prod = AppState.products.find(p => p.id === productId);
  if (prod) {
    prod.price = Math.max(0, parseFloat(newPrice) || 0);
    AppState.saveProducts();
    sounds.playPop();
  }
}

function deleteProduct(productId) {
  if (confirm('¿Deseas eliminar este producto del catálogo?')) {
    sounds.playPop();
    AppState.products = AppState.products.filter(p => p.id !== productId);
    AppState.saveProducts();
    renderProductManager();
  }
}

function handleAddNewProduct(e) {
  e.preventDefault();
  const name = document.getElementById('new-prod-name').value.trim();
  const category = document.getElementById('new-prod-category').value;
  const price = parseFloat(document.getElementById('new-prod-price').value) || 0;
  const unit = document.getElementById('new-prod-unit').value.trim() || 'Unidad';
  const emoji = document.getElementById('new-prod-emoji').value.trim() || '🌱';

  if (!name) return;

  const newProduct = {
    id: 'prod-' + Date.now(),
    name,
    category,
    price,
    unit,
    emoji
  };

  AppState.products.unshift(newProduct);
  AppState.saveProducts();
  sounds.playSuccess();

  e.target.reset();
  document.getElementById('modal-add-product').classList.add('hidden');
  renderProductManager();
}

// --- MODAL DE PRODUCTO LIBRE / PERSONALIZADO ---
function openCustomProductModal() {
  sounds.playPop();
  document.getElementById('custom-prod-name').value = '';
  document.getElementById('custom-prod-price').value = '';
  document.getElementById('custom-prod-qty').value = '1';
  document.getElementById('modal-custom-product').classList.remove('hidden');
}

function closeCustomProductModal() {
  sounds.playPop();
  document.getElementById('modal-custom-product').classList.add('hidden');
}

function handleAddCustomProductSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('custom-prod-name').value;
  const price = document.getElementById('custom-prod-price').value;
  const qty = document.getElementById('custom-prod-qty').value;

  AppState.addCustomItem(name, price, qty);
  closeCustomProductModal();
}

// --- EXPORTACIÓN DE DATOS (CSV) ---
function exportOrdersToExcel() {
  sounds.playPop();
  if (AppState.orders.length === 0) {
    alert('No hay pedidos para exportar.');
    return;
  }

  const rows = [
    ['N° Pedido', 'Fecha', 'Hora', 'Cliente', 'Teléfono', 'Productos', 'Total ($)', 'Forma de Pago', 'Estado', 'Notas']
  ];

  AppState.orders.forEach(o => {
    const itemsText = o.items.map(it => `${it.qty}x ${it.name} ($${it.total})`).join('; ');
    rows.push([
      `#${String(o.number).padStart(3, '0')}`,
      o.dateStr,
      o.timeStr,
      o.clientName,
      o.clientPhone || '',
      itemsText,
      o.total,
      o.paymentMethod,
      o.status,
      o.notes || ''
    ]);
  });

  downloadCSV(rows, `elementales_pedidos_feria_${getFormattedDateForFile()}.csv`);
}

function exportMembersToExcel() {
  sounds.playPop();
  if (AppState.members.length === 0) {
    alert('No hay integrantes para exportar.');
    return;
  }

  const rows = [
    ['Nombre y Apellido', 'Teléfono / WhatsApp', 'Email', 'Rol Comunitario (En Conjunto)', 'Barrio / Zona', 'Punto de Retiro', 'Frecuencia', 'Intereses (vrde)', 'Notas / Saberes', 'Fecha Registro']
  ];

  AppState.members.forEach(m => {
    rows.push([
      m.name,
      m.phone || '',
      m.email || '',
      m.communityRole || 'Consumo Familiar Consciente',
      m.neighborhood || '',
      m.pickupPoint || '',
      m.frequency || '',
      (m.interests || []).join('; '),
      m.notes || '',
      m.dateStr
    ]);
  });

  downloadCSV(rows, `elementales_integrantes_comunidad_${getFormattedDateForFile()}.csv`);
}

function downloadCSV(rows, filename) {
  const csvContent = "\uFEFF" + rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- UTILIDADES ---
function formatMoney(amount) {
  return Number(amount || 0).toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cleanPhoneForWhatsApp(phone) {
  if (!phone) return '';
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 10 && !clean.startsWith('54')) {
    clean = '549' + clean;
  }
  return clean;
}

function getFormattedDateForFile() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function triggerCelebrationConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c0826d', '#d99a86', '#1db954', '#a6634f', '#fbbf24']
    });
  }
}

// --- MEMBRESÍA CsC (RED ELEMENTAL) ---
function renderMembership() {
  const statusBadge = document.getElementById('membership-status-badge');
  const statusDesc = document.getElementById('membership-status-desc');
  const toggleBtn = document.getElementById('btn-toggle-role-membership');
  const plansContainer = document.getElementById('membership-plans-grid');

  const isSocio = AppState.userRole === 'socio';
  const planInfo = PLANES_MEMBRESIA.find(p => p.id === AppState.userPlan) || PLANES_MEMBRESIA[1];

  if (statusBadge) {
    if (isSocio) {
      statusBadge.textContent = `✓ Socio CsC Activo (${planInfo.name})`;
      statusBadge.className = 'text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300';
    } else {
      statusBadge.textContent = 'Visitante / No Socio';
      statusBadge.className = 'text-xs font-black px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-300';
    }
  }

  if (statusDesc) {
    if (isSocio) {
      statusDesc.innerHTML = `Tu aporte solidario de <strong>$${formatMoney(planInfo.aporteMensual)}/mes</strong> sostiene el nodo y te permite acceder a compras directas al costo campesino.`;
    } else {
      statusDesc.textContent = 'Súmate a la CsC para acceder a compras semanales y lunares a precio directo campesino.';
    }
  }

  if (toggleBtn) {
    toggleBtn.innerHTML = isSocio ? '<span>👤 Probar como Visitante</span>' : '<span>🌱 Probar como Socio CsC</span>';
  }

  if (plansContainer) {
    plansContainer.innerHTML = PLANES_MEMBRESIA.map(plan => {
      const isSelected = isSocio && AppState.userPlan === plan.id;
      const elementColor = plan.element === 'agua' ? '#7ca1b5' : (plan.element === 'tierra' ? '#8ca15d' : '#c59b8b');
      const isPopular = plan.badge === 'Recomendado' || plan.badge === 'Popular';

      return `
        <div class="spotify-card p-6 flex flex-col justify-between relative overflow-hidden transition-all ${isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50/30' : (isPopular ? 'border-2 border-[#8ca15d]/60 shadow-md' : 'border-stone-200')}">
          ${plan.badge ? `
            <div class="absolute top-4 right-4">
              <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${plan.badge === 'Recomendado' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-sky-100 text-sky-800 border border-sky-300'}">
                ${plan.badge}
              </span>
            </div>
          ` : ''}

          <div>
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style="background-color: ${elementColor}20; color: ${elementColor};">
              ${plan.element === 'agua' ? '💧' : (plan.element === 'tierra' ? '🍃' : '✨')}
            </div>

            <h3 class="font-black text-xl text-stone-900 mb-1">${escapeHtml(plan.name)}</h3>
            <p class="text-xs text-stone-500 mb-4 min-h-[32px]">${escapeHtml(plan.desc)}</p>

            <div class="mb-5 pb-4 border-b border-stone-100">
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black text-stone-900">$${formatMoney(plan.aporteMensual)}</span>
                <span class="text-xs text-stone-500 font-semibold">/ mes</span>
              </div>
              <span class="text-[11px] text-stone-400 block mt-0.5">${plan.periodo}</span>
            </div>

            <ul class="space-y-2.5 mb-6 text-xs text-stone-700">
              ${plan.beneficios.map(ben => `
                <li class="flex items-start gap-2">
                  <span class="text-emerald-600 font-bold">✓</span>
                  <span>${escapeHtml(ben)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <button 
            onclick="openJoinModal('${plan.id}')"
            class="btn-spotify ${isSelected ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : (isPopular ? 'btn-spotify-primary' : 'btn-spotify-secondary')} w-full text-xs font-black !py-3 shadow-sm">
            ${isSelected ? '✓ Tu Plan Actual' : 'Quiero sumarme a este Plan'}
          </button>
        </div>
      `;
    }).join('');
  }
}

function openJoinModal(planId = 'plan-raices') {
  sounds.playPop();
  const modal = document.getElementById('modal-join-membership');
  if (!modal) return;

  const select = document.getElementById('join-plan-select');
  if (select && planId) {
    select.value = planId;
  }

  const nameInput = document.getElementById('join-member-name');
  if (nameInput && AppState.userName) {
    nameInput.value = AppState.userName;
  }

  const nodeSelect = document.getElementById('join-member-node');
  if (nodeSelect && AppState.activeNodeId) {
    nodeSelect.value = AppState.activeNodeId;
  }

  modal.classList.remove('hidden');
}

function closeJoinModal() {
  sounds.playPop();
  const modal = document.getElementById('modal-join-membership');
  if (modal) modal.classList.add('hidden');
}

function submitJoinMembership(e) {
  e.preventDefault();
  const planId = document.getElementById('join-plan-select').value;
  const name = document.getElementById('join-member-name').value.trim();
  const phone = document.getElementById('join-member-phone').value.trim();
  const nodeId = document.getElementById('join-member-node').value;
  const paymentPref = document.getElementById('join-payment-pref').value;
  const notes = document.getElementById('join-member-notes').value.trim();

  if (!name || !phone) {
    alert('Por favor completa tu nombre y teléfono.');
    return;
  }

  const plan = PLANES_MEMBRESIA.find(p => p.id === planId) || PLANES_MEMBRESIA[1];
  const node = NODOS_COMUNIDAD.find(n => n.id === nodeId) || NODOS_COMUNIDAD[0];

  // Actualizar estado activo
  AppState.userRole = 'socio';
  AppState.userPlan = planId;
  AppState.userName = name;
  AppState.activeNodeId = nodeId;

  localStorage.setItem('elementales_user_role', 'socio');
  localStorage.setItem('elementales_user_plan', planId);
  localStorage.setItem('elementales_user_name', name);
  localStorage.setItem('elementales_active_node', nodeId);

  // Registrar en la lista de integrantes si no existe
  const existingIndex = AppState.members.findIndex(m => m.phone === phone);
  const memberData = {
    id: 'mem-' + Date.now(),
    name,
    phone,
    email: '',
    neighborhood: node.name,
    communityRole: `Socio CsC (${plan.name})`,
    nodePreference: node.name,
    notes: `Aporte: $${formatMoney(plan.aporteMensual)}/mes - ${paymentPref}. ${notes}`,
    dateStr: new Date().toLocaleDateString('es-AR'),
    timestamp: Date.now()
  };

  if (existingIndex >= 0) {
    AppState.members[existingIndex] = { ...AppState.members[existingIndex], ...memberData };
  } else {
    AppState.members.unshift(memberData);
  }
  AppState.saveMembers();

  closeJoinModal();
  sounds.playSuccess();
  triggerCelebrationConfetti();

  // Generar mensaje para WhatsApp al Guardián del Nodo
  const waMsg = encodeURIComponent(
    `¡Hola ${node.guardian}! 🌱 Me acabo de sumar a la Red Elemental en el *${node.name}*.\n` +
    `Mi nombre es *${name}*.\n` +
    `Elegí el plan: *${plan.name}* ($${formatMoney(plan.aporteMensual)}/mes).\n` +
    `Forma de aporte: ${paymentPref}.\n` +
    (notes ? `Mensaje: ${notes}\n` : '') +
    `¡Gracias por sostener el espacio!`
  );

  const waUrl = `https://wa.me/${node.phone}?text=${waMsg}`;

  // Mostrar confirmación
  alert(`¡Felicitaciones ${name}! Te has sumado como Socio CsC a la Red Elemental 🎉\n\nAhora abriremos WhatsApp para conectarte con ${node.guardian}, el Guardián de tu nodo.`);
  window.open(waUrl, '_blank');

  renderMembership();
  renderProfile();
  renderHubStats();
  navigateTo('profile');
}

// --- RED DE NODOS (RED ELEMENTAL) ---
function renderNodes() {
  const container = document.getElementById('nodes-cards-container');
  const bannerTitle = document.getElementById('active-node-banner-title');
  const bannerInfo = document.getElementById('active-node-banner-info');

  const activeNode = NODOS_COMUNIDAD.find(n => n.id === AppState.activeNodeId) || NODOS_COMUNIDAD[0];

  if (bannerTitle) {
    bannerTitle.textContent = activeNode.name;
  }
  if (bannerInfo) {
    bannerInfo.textContent = `Guardián: ${activeNode.guardian} · ${activeNode.time} · ${activeNode.address}`;
  }

  if (container) {
    container.innerHTML = NODOS_COMUNIDAD.map(node => {
      const isCurrent = node.id === AppState.activeNodeId;
      const waMsg = encodeURIComponent(`Hola ${node.guardian}! Te consulto por el nodo *${node.name}* de Elementales.`);
      const waUrl = `https://wa.me/${node.phone}?text=${waMsg}`;

      return `
        <div class="spotify-card overflow-hidden flex flex-col justify-between border-2 transition-all ${isCurrent ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/10' : 'border-stone-200'}">
          <div>
            <div class="h-36 w-full relative overflow-hidden bg-stone-100">
              <img src="${node.cover}" class="w-full h-full object-cover" alt="${escapeHtml(node.name)}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-3 left-3 text-white">
                <span class="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/30">
                  Nodo Barrial
                </span>
                <h3 class="font-black text-lg text-white leading-tight mt-1">${escapeHtml(node.name)}</h3>
              </div>
              ${isCurrent ? `
                <div class="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                  ✓ Tu Nodo Activo
                </div>
              ` : ''}
            </div>

            <div class="p-5 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-black text-sm text-stone-700 border border-stone-200">
                  👤
                </div>
                <div>
                  <span class="text-[10px] uppercase font-bold text-stone-400 block">Guardián del Nodo</span>
                  <span class="font-black text-sm text-stone-800">${escapeHtml(node.guardian)}</span>
                </div>
              </div>

              <div class="text-xs text-stone-600 space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                <p>📍 <strong>Dirección:</strong> ${escapeHtml(node.address)}</p>
                <p>🕒 <strong>Horarios:</strong> ${escapeHtml(node.time)}</p>
                <p class="text-stone-500 pt-1 text-[11px]">${escapeHtml(node.desc)}</p>
              </div>
            </div>
          </div>

          <div class="p-5 pt-0 grid grid-cols-2 gap-2">
            <button 
              onclick="selectNode('${node.id}')"
              class="btn-spotify ${isCurrent ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'btn-spotify-secondary'} text-xs font-bold !py-2.5">
              ${isCurrent ? '✓ Seleccionado' : 'Elegir Nodo'}
            </button>
            <a 
              href="${waUrl}" 
              target="_blank" 
              class="btn-spotify btn-spotify-green text-xs font-bold !py-2.5 flex items-center justify-center gap-1.5 shadow-sm">
              <span>💬 WhatsApp</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
}

function selectNode(nodeId) {
  AppState.activeNodeId = nodeId;
  localStorage.setItem('elementales_active_node', nodeId);
  sounds.playPop();
  renderNodes();
  renderProfile();
}

// --- PERFIL Y CARNET DIGITAL (RED ELEMENTAL) ---
function renderProfile() {
  const role = AppState.userRole || 'visitante';
  const isSocio = role === 'socio';
  const isGestor = role === 'gestor';
  const planInfo = PLANES_MEMBRESIA.find(p => p.id === AppState.userPlan) || PLANES_MEMBRESIA[1];
  const nodeInfo = NODOS_COMUNIDAD.find(n => n.id === AppState.activeNodeId) || NODOS_COMUNIDAD[0];

  const nameEl = document.getElementById('carnet-member-name');
  const planEl = document.getElementById('carnet-plan-name');
  const codeEl = document.getElementById('carnet-member-code');
  const pillEl = document.getElementById('carnet-status-pill');
  const nodeEl = document.getElementById('carnet-node-name');
  const guardianEl = document.getElementById('carnet-node-guardian');

  if (nameEl) {
    if (isGestor) nameEl.textContent = 'Equipo Guardián La Lucila';
    else if (isSocio) nameEl.textContent = AppState.userName || 'Lucía Gómez';
    else nameEl.textContent = 'Vecino Visitante';
  }

  if (planEl) {
    if (isGestor) planEl.textContent = 'Guardián del Nodo (Rawson 3450)';
    else if (isSocio) planEl.textContent = `${planInfo.name}`;
    else planEl.textContent = 'Acceso Público (Sin Membresía)';
  }

  if (codeEl) {
    if (isGestor) codeEl.textContent = 'NODO-LOMA-GEST';
    else if (isSocio) codeEl.textContent = AppState.userCode || 'CSC-2026-0482';
    else codeEl.textContent = 'VISITANTE-PUBLIC';
  }

  if (nodeEl) nodeEl.textContent = nodeInfo.name;
  if (guardianEl) guardianEl.textContent = isGestor ? 'Gestores: Gonza, Agus, Rami, Cris, Ro' : `Guardián: ${nodeInfo.guardian}`;

  if (pillEl) {
    if (isGestor) {
      pillEl.textContent = '👑 Gestor Activo';
      pillEl.className = 'text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300';
    } else if (isSocio) {
      pillEl.textContent = '💧 Socio CsC Activo';
      pillEl.className = 'text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200';
    } else {
      pillEl.textContent = '👤 No Miembro';
      pillEl.className = 'text-[11px] font-black px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200';
    }
  }

  updateRoleUI();
}

function toggleUserRole(forcedRole = null) {
  if (forcedRole) {
    AppState.userRole = forcedRole;
  } else {
    if (AppState.userRole === 'visitante') AppState.userRole = 'socio';
    else if (AppState.userRole === 'socio') AppState.userRole = 'gestor';
    else AppState.userRole = 'visitante';
  }
  localStorage.setItem('elementales_user_role', AppState.userRole);
  sounds.playPop();

  if (AppState.userRole === 'socio' || AppState.userRole === 'gestor') {
    AppState.catalogMode = 'semanal';
  } else {
    AppState.catalogMode = 'local';
  }
  localStorage.setItem('elementales_catalog_mode', AppState.catalogMode);

  updateRoleUI();
  renderProfile();
  renderMembership();
  renderOrderCatalog();
  renderFloatingCart();
  if (AppState.currentView === 'barrio') renderBarrioFeed();
  if (AppState.currentView === 'eter') showEterModule('elementos');
}

// =========================================================================
// CONTROLADOR DE LANDING PREVIA & ELECCIÓN DE NODO (ESTILO MINIMALISTA)
// =========================================================================
function selectLandingNode(nodeId) {
  AppState.selectedLandingNode = nodeId;
  sounds.playPop();

  const nodeShortName = 'Nodo Loma Verde';

  // Actualizar título dinámico de Paso 2
  const step2Title = document.getElementById('landing-step2-node-name');
  if (step2Title) {
    step2Title.textContent = nodeShortName;
  }

  // Actualizar textos de botones con el nombre del nodo
  const btnVisitante = document.getElementById('landing-btn-visitante-text');
  if (btnVisitante) {
    btnVisitante.textContent = `Ingresar a ${nodeShortName} →`;
  }
  const btnSocio = document.getElementById('landing-btn-socio-text');
  if (btnSocio) {
    btnSocio.textContent = `Ingresar como Socio a ${nodeShortName} →`;
  }

  // Actualizar selección visual de tarjetas y checkmarks
  ['nodo-lomaverde'].forEach(id => {
    const el = document.getElementById(`landing-node-${id}`);
    const checkEl = document.getElementById(`landing-node-check-${id}`);
    if (el) {
      if (id === nodeId) {
        el.className = 'p-3.5 rounded-2xl border-2 border-emerald-600 bg-emerald-50/60 cursor-pointer transition-all flex items-start gap-2.5 shadow-sm ring-2 ring-emerald-500/20 relative';
        if (checkEl) checkEl.classList.remove('hidden');
      } else {
        el.className = 'p-3.5 rounded-2xl border-2 border-stone-200 hover:border-emerald-500 bg-white cursor-pointer transition-all flex items-start gap-2.5 shadow-xs relative';
        if (checkEl) checkEl.classList.add('hidden');
      }
    }
  });

  // En la landing mantenemos la URL raíz mientras se selecciona el nodo
  try {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({ view: 'landing', nodeId: nodeId }, '', '/');
    }
  } catch (e) {}
}

function loginFromLanding(role) {
  const targetNode = AppState.selectedLandingNode || AppState.activeNodeId || 'nodo-lomaverde';
  AppState.activeNodeId = targetNode;
  localStorage.setItem('elementales_active_node', targetNode);
  currentCirculosFilter = targetNode;

  AppState.userRole = role;
  localStorage.setItem('elementales_user_role', role);
  sessionStorage.setItem('elementales_authenticated', 'true');

  const nodeObj = NODOS_COMUNIDAD.find(n => n.id === targetNode);
  const feats = nodeObj ? (nodeObj.features || {}) : {};

  if (feats.showLocal === false) {
    AppState.catalogMode = 'semanal';
  } else if (role === 'socio') {
    AppState.catalogMode = 'semanal';
  } else {
    AppState.catalogMode = 'local';
  }
  localStorage.setItem('elementales_catalog_mode', AppState.catalogMode);

  // Asegurar que al ingresar al nodo no quede ningún círculo viejo como activo
  if (typeof CirculosManager !== 'undefined') {
    CirculosManager.setActiveCircleId(null);
  }

  sounds.playSuccess();
  updateRoleUI();
  updateNodeUI();

  navigateTo('barrio', true);
}

function openAdminPinModal() {
  requestGestorAccess(() => {
    const targetNode = AppState.selectedLandingNode || AppState.activeNodeId || 'nodo-lomaverde';
    AppState.activeNodeId = targetNode;
    localStorage.setItem('elementales_active_node', targetNode);
    currentCirculosFilter = targetNode;
    sessionStorage.setItem('elementales_authenticated', 'true');

    if (typeof CirculosManager !== 'undefined') {
      CirculosManager.setActiveCircleId(null);
    }

    sounds.playSuccess();
    updateRoleUI();
    updateNodeUI();

    navigateTo('barrio', true);
  });
}

function goToLanding() {
  sounds.playPop();
  sessionStorage.removeItem('elementales_authenticated');
  
  if (typeof CirculosManager !== 'undefined') {
    CirculosManager.setActiveCircleId(null);
  }

  AppState.selectedLandingNode = AppState.activeNodeId || 'nodo-lomaverde';
  navigateTo('landing', true);
  selectLandingNode(AppState.selectedLandingNode);
}

// CONTROL DEL MODAL SELECTOR DE ROL
function openRoleSwitcherModal() {
  sounds.playPop();
  const modal = document.getElementById('modal-role-switcher');
  if (modal) modal.classList.remove('hidden');
  updateRoleSwitcherModalActiveCheck();
}

function closeRoleSwitcherModal() {
  const modal = document.getElementById('modal-role-switcher');
  if (modal) modal.classList.add('hidden');
}

function updateRoleSwitcherModalActiveCheck() {
  const currentRole = AppState.userRole || 'visitante';
  ['visitante', 'socio', 'gestor'].forEach(r => {
    const card = document.getElementById(`role-option-${r}`);
    if (card) {
      const check = card.querySelector('.role-active-check');
      if (r === currentRole) {
        card.classList.add('ring-2', 'ring-emerald-500', 'bg-stone-50');
        if (check) check.classList.remove('hidden');
      } else {
        card.classList.remove('ring-2', 'ring-emerald-500', 'bg-stone-50');
        if (check) check.classList.add('hidden');
      }
    }
  });
}

// ACTUALIZACIÓN GLOBAL DE LA INTERFAZ SEGÚN EL ROL ACTIVO
function updateRoleUI() {
  const role = AppState.userRole || 'visitante';

  // 1. Botón de rol en la cabecera
  const badge = document.getElementById('header-role-badge');
  const dot = document.getElementById('header-role-dot');
  const text = document.getElementById('header-role-text');
  if (badge && dot && text) {
    if (role === 'gestor') {
      badge.className = 'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs border bg-amber-100 border-amber-400 text-amber-950 hover:bg-amber-200';
      dot.className = 'w-2 h-2 rounded-full bg-amber-600 animate-pulse';
      text.innerHTML = '👑 Gestor <span class="text-[9px] bg-amber-200/80 px-1.5 py-0.5 rounded-full ml-0.5 hover:bg-amber-300" onclick="event.stopPropagation(); logoutGestor();" title="Cerrar sesión de gestor">Salir</span>';
    } else if (role === 'socio') {
      badge.className = 'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs border bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100';
      dot.className = 'w-2 h-2 rounded-full bg-blue-600';
      text.textContent = '💧 Socio CsC';
    } else {
      badge.className = 'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs border bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200';
      dot.className = 'w-2 h-2 rounded-full bg-stone-400';
      text.textContent = '👤 No Miembro';
    }

    // Actualizar botón de Gestión en Éter según permiso
    const btnGestion = document.getElementById('eter-tab-btn-gestion');
    if (btnGestion) {
      if (role === 'gestor') {
        btnGestion.innerHTML = '👑 Gestión del Nodo (Operativo)';
        btnGestion.classList.remove('opacity-60', 'opacity-80');
      } else {
        btnGestion.innerHTML = '🔒 Gestión del Nodo (Equipo)';
        btnGestion.classList.add('opacity-80');
      }
    }

    // Actualizar estado del círculo en Mi CRM
    const circleStatusEl = document.getElementById('micrm-circle-status');
    if (circleStatusEl && typeof CirculosManager !== 'undefined') {
      const activeCId = CirculosManager.getActiveCircleId();
      const circleObj = activeCId ? CirculosManager.getCircle(activeCId) : null;
      if (circleObj) {
        circleStatusEl.textContent = '✓ ' + circleObj.nombre;
        circleStatusEl.className = 'text-xs text-emerald-800 font-bold mt-0.5';
      } else {
        circleStatusEl.textContent = 'Sin Círculo Activo';
        circleStatusEl.className = 'text-xs text-stone-500 font-semibold mt-0.5';
      }
    }
  }

  // 2. Banners contextuales y Secciones dedicadas en view-barrio
  const bVisitante = document.getElementById('role-banner-visitante');
  const bSocio = document.getElementById('role-banner-socio');
  const bGestor = document.getElementById('role-banner-gestor');
  if (bVisitante) bVisitante.classList.toggle('hidden', role !== 'visitante');
  if (bSocio) bSocio.classList.toggle('hidden', role !== 'socio');
  if (bGestor) bGestor.classList.toggle('hidden', role !== 'gestor');

  const sVisitante = document.getElementById('role-section-visitante');
  const sSocio = document.getElementById('role-section-socio');
  const sGestor = document.getElementById('role-section-gestor');
  if (sVisitante) sVisitante.classList.toggle('hidden', role !== 'visitante');
  if (sSocio) sSocio.classList.toggle('hidden', role !== 'socio');
  if (sGestor) sGestor.classList.toggle('hidden', role !== 'gestor');

  // 2.b Botones de cambio rápido en view-barrio
  const qbVis = document.getElementById('quick-role-btn-visitante');
  const qbSoc = document.getElementById('quick-role-btn-socio');
  const qbGes = document.getElementById('quick-role-btn-gestor');
  if (qbVis && qbSoc && qbGes) {
    qbVis.className = 'px-3 py-1.5 rounded-xl text-xs font-black transition-all text-center border ' + 
      (role === 'visitante' ? 'bg-stone-900 text-white border-stone-900 shadow-xs ring-2 ring-stone-900/20' : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100');
    qbSoc.className = 'px-3 py-1.5 rounded-xl text-xs font-black transition-all text-center border ' + 
      (role === 'socio' ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-600/20' : 'bg-blue-50/50 text-blue-800 border-blue-200 hover:bg-blue-100');
    qbGes.className = 'px-3 py-1.5 rounded-xl text-xs font-black transition-all text-center border ' + 
      (role === 'gestor' ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-2 ring-amber-600/20' : 'bg-amber-50/50 text-amber-900 border-amber-200 hover:bg-amber-100');
  }

  // 3. Tab de Éter en la subnav
  const tabEter = document.getElementById('tab-btn-eter');
  if (tabEter) {
    if (role === 'gestor') {
      tabEter.innerHTML = '<span>👑</span> Éter Admin';
      tabEter.title = 'Panel interno de gestión del nodo';
      tabEter.classList.add('border-b-2', 'border-amber-500');
    } else {
      tabEter.innerHTML = '<span>✨</span> Éter';
      tabEter.title = 'Mi portal comunitario';
      tabEter.classList.remove('border-b-2', 'border-amber-500');
    }
  }

  // 4. Si la vista activa es Éter, refrescar el portal dinámicamente
  if (AppState.currentView === 'eter') {
    renderEterView();
  }

  // 5. Botones de simulación en view-profile
  const btnVis = document.getElementById('btn-role-sim-visitante');
  const btnSoc = document.getElementById('btn-role-sim-socio');
  const btnGes = document.getElementById('btn-role-sim-gestor');
  if (btnVis && btnSoc && btnGes) {
    btnVis.className = 'p-2.5 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ' + (role === 'visitante' ? 'bg-stone-100 border-stone-700 text-stone-900 shadow-xs' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50');
    btnSoc.className = 'p-2.5 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ' + (role === 'socio' ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50');
    btnGes.className = 'p-2.5 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ' + (role === 'gestor' ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-xs' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50');
  }
}

// =========================================================================
// GESTIÓN DEL PORTAL Y RED SOCIAL BARRIAL - ELEMENTALES LA LUCILA
// =========================================================================

let activeBarrioElement = 'todos';
let activeBarrioSearchQuery = '';
let activeOficioCategory = 'todos';

// 1. CONTROL DEL MENÚ WAFFLE DE 9 PUNTOS (GOOGLE SUITE)
function toggleGoogleWaffle() {
  sounds.playPop();
  const menu = document.getElementById('google-waffle-menu');
  const backdrop = document.getElementById('google-waffle-backdrop');
  if (menu) {
    const isNowHidden = menu.classList.toggle('hidden');
    if (backdrop) {
      if (isNowHidden) {
        backdrop.classList.add('hidden');
      } else {
        backdrop.classList.remove('hidden');
      }
    }
  }
}

function closeGoogleWaffle() {
  const menu = document.getElementById('google-waffle-menu');
  const backdrop = document.getElementById('google-waffle-backdrop');
  if (menu) {
    menu.classList.add('hidden');
  }
  if (backdrop) {
    backdrop.classList.add('hidden');
  }
}

// Cerrar waffle si se hace clic afuera o en el telón
document.addEventListener('click', (e) => {
  const menu = document.getElementById('google-waffle-menu');
  const btn = document.getElementById('btn-google-waffle');
  const backdrop = document.getElementById('google-waffle-backdrop');
  if (menu && !menu.classList.contains('hidden')) {
    if (!menu.contains(e.target) && btn && !btn.contains(e.target)) {
      menu.classList.add('hidden');
      if (backdrop) backdrop.classList.add('hidden');
    }
  }
});

// 2. BUSCADOR OMNIBAR Y FILTROS POR ELEMENTO
function handleBarrioSearch(val) {
  activeBarrioSearchQuery = (val || '').trim().toLowerCase();

  // Sincronizar inputs desktop y móvil si difieren
  const inputDesk = document.getElementById('barrio-omnibar-input');
  const inputMob = document.getElementById('barrio-omnibar-input-mobile');
  if (inputDesk && inputDesk.value !== val) inputDesk.value = val;
  if (inputMob && inputMob.value !== val) inputMob.value = val;

  if (AppState.currentView !== 'barrio') {
    navigateTo('barrio');
  } else {
    renderBarrioFeed();
  }
}

function handleBarrioElementChange(elem) {
  selectElementFilter(elem);
}

function selectElementFilter(elemId) {
  sounds.playPop();
  activeBarrioElement = elemId;

  // Sincronizar selector del omnibar
  const omniSelect = document.getElementById('barrio-omnibar-element');
  if (omniSelect) {
    omniSelect.value = elemId;
  }

  // Sincronizar pills de elementos
  document.querySelectorAll('.barrio-pill').forEach(btn => {
    if (btn.getAttribute('data-element') === elemId) {
      btn.className = 'barrio-pill active text-xs font-bold px-3.5 py-1.5 rounded-full border bg-stone-900 text-white transition-all shadow-xs';
    } else {
      btn.className = 'barrio-pill text-xs font-bold px-3.5 py-1.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:border-[#c0826d] transition-all shadow-xs';
    }
  });

  if (AppState.currentView !== 'barrio') {
    navigateTo('barrio');
  } else {
    renderBarrioFeed();
  }
}

function executeGoogleSearch(query) {
  const q = (query || '').trim();
  if (!q) {
    window.open('https://www.google.com/search?q=La+Lucila+Vicente+Lopez+comunidad+noticias', '_blank');
    return;
  }
  window.open(`https://www.google.com/search?q=${encodeURIComponent(q + ' La Lucila Vicente Lopez')}`, '_blank');
}

// 3. RENDERIZADO DEL FEED BARRIAL MULTI-ELEMENTO (TODO EL BARRIO)
function renderBarrioFeed() {
  const container = document.getElementById('barrio-feed-container');
  const countBadge = document.getElementById('barrio-results-count');
  if (!container) return;

  const oficios = BarrioStorage.getOficios();
  const avisos = BarrioStorage.getAvisosWA();
  const noticias = typeof NOTICIAS_BARRIO_INICIALES !== 'undefined' ? NOTICIAS_BARRIO_INICIALES : [];
  const talleres = BarrioStorage.getTalleres();
  const proyectos = BarrioStorage.getProyectos();

  let feedItems = [];

  // Oficios referenciados (Tierra)
  oficios.forEach(o => {
    feedItems.push({
      tipo: 'oficio',
      elemento: o.elemento || 'tierra',
      titulo: o.nombre,
      subtitulo: o.rubro,
      icono: o.icono || '🛠️',
      cuerpo: o.descripcion,
      zona: o.zona,
      badge: 'Oficio Referenciado',
      badgeClass: 'bg-[#f4f6ef] text-[#8ca15d] border-[#c2d49e]',
      calificacion: `⭐ ${o.calificacion || '5.0'} (${o.referencias || 12} vecinos)`,
      accionTexto: 'WhatsApp',
      accionUrl: `https://wa.me/${o.telefonoRaw || '5491144001122'}?text=${encodeURIComponent('Hola ' + o.nombre + '! Te contacto desde la vidriera del Centro Comunitario Elementales La Lucila.')}`,
      keywords: [o.nombre, o.rubro, o.descripcion, ...(o.palabrasClave || [])].join(' ').toLowerCase()
    });
  });

  // Avisos de WhatsApp (Aire / Agua / Tierra)
  avisos.forEach(a => {
    feedItems.push({
      tipo: 'whatsapp',
      elemento: a.elemento || 'aire',
      titulo: a.emisor,
      subtitulo: a.grupo,
      icono: a.icono || '💬',
      cuerpo: a.texto,
      fecha: a.fecha,
      badge: a.badge || 'Aviso WhatsApp',
      badgeClass: a.esAlerta ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200',
      accionTexto: 'Escribir',
      accionUrl: `https://wa.me/5491123456789?text=${encodeURIComponent('Hola! Vi el aviso de ' + a.emisor + ' en el portal barrial de La Lucila: ' + a.texto)}`,
      keywords: [a.emisor, a.grupo, a.texto, a.badge].join(' ').toLowerCase()
    });
  });

  // Noticias locales (Aire)
  noticias.forEach(n => {
    feedItems.push({
      tipo: 'noticia',
      elemento: n.elemento || 'aire',
      titulo: n.titulo,
      subtitulo: n.fuente,
      icono: '📰',
      cuerpo: n.resumen,
      fecha: n.fecha,
      badge: n.etiqueta || 'Noticia Local',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accionTexto: 'Google ↗',
      accionUrl: n.enlaceGoogle,
      keywords: [n.titulo, n.fuente, n.resumen, n.etiqueta].join(' ').toLowerCase()
    });
  });

  // Talleres de vecinos (Agua / Tierra)
  talleres.forEach(t => {
    feedItems.push({
      tipo: 'taller',
      elemento: t.elemento || 'agua',
      titulo: t.titulo,
      subtitulo: `Por ${t.tallerista} • ${t.fecha}`,
      icono: t.icono || '🎨',
      cuerpo: t.descripcion,
      zona: t.lugar,
      badge: `Taller`,
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      accionTexto: 'Inscribirme por WA',
      accionUrl: `https://wa.me/${t.telefonoContacto || '5491133221100'}?text=${encodeURIComponent('Hola! Quiero anotarme al taller de ' + t.titulo + ' en La Lucila.')}`,
      keywords: [t.titulo, t.tallerista, t.descripcion, t.lugar].join(' ').toLowerCase()
    });
  });

  // Proyectos locales (Fuego)
  proyectos.forEach(p => {
    feedItems.push({
      tipo: 'proyecto',
      elemento: p.elemento || 'fuego',
      titulo: p.titulo,
      subtitulo: `Impulsado por ${p.proponente}`,
      icono: p.icono || '💡',
      cuerpo: p.descripcion,
      progreso: `${p.porcentaje}% financiado ($${(p.montoRecaudado || 0).toLocaleString()} de $${(p.montoObjetivo || 0).toLocaleString()})`,
      badge: p.estado || 'Proyecto Local',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      accionTexto: 'Apoyar',
      accionUrl: `https://wa.me/5491123456789?text=${encodeURIComponent('Hola Gonza y equipo! Quiero apoyar el proyecto barrial: ' + p.titulo)}`,
      keywords: [p.titulo, p.proponente, p.descripcion, p.beneficioBarrio].join(' ').toLowerCase()
    });
  });

  // Filtrar por elemento si no es 'todos'
  if (activeBarrioElement && activeBarrioElement !== 'todos') {
    feedItems = feedItems.filter(item => item.elemento === activeBarrioElement);
  }

  // Filtrar por query de búsqueda
  if (activeBarrioSearchQuery) {
    feedItems = feedItems.filter(item => item.keywords.includes(activeBarrioSearchQuery));
  }

  if (countBadge) {
    countBadge.textContent = `${feedItems.length} novedades en La Lucila`;
  }

  if (feedItems.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
        <span class="text-4xl block mb-2">🔍</span>
        <h3 class="text-lg font-bold text-stone-800">No encontramos resultados en esta búsqueda</h3>
        <p class="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mt-1 mb-4">
          No hay publicaciones que coincidan con "${activeBarrioSearchQuery}". Podés buscar en Google o sumar la información al barrio.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button onclick="executeGoogleSearch('${activeBarrioSearchQuery}')" class="btn-spotify !bg-blue-600 !text-white text-xs font-bold px-4 py-2">
            Buscar en Google La Lucila ↗
          </button>
          <button onclick="openModalSumarAlBarrio()" class="btn-spotify !bg-[#c0826d] !text-white text-xs font-bold px-4 py-2">
            + Publicar esta información
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = feedItems.map(item => `
    <div class="bg-white rounded-2xl border border-stone-200 hover:border-[#c0826d]/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${item.icono}</span>
            <div>
              <h3 class="font-bold text-sm text-stone-900 leading-tight">${item.titulo}</h3>
              <p class="text-[11px] text-stone-500 font-medium">${item.subtitulo}</p>
            </div>
          </div>
          <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${item.badgeClass} shrink-0">
            ${item.badge}
          </span>
        </div>

        <p class="text-xs text-stone-600 leading-relaxed mb-3">
          ${item.cuerpo}
        </p>

        ${item.progreso ? `
          <div class="mb-3 bg-stone-100 p-2 rounded-xl text-[11px] font-bold text-stone-700">
            <span>${item.progreso}</span>
          </div>
        ` : ''}

        ${item.calificacion ? `
          <div class="mb-3 flex items-center gap-1.5 text-xs text-amber-700 font-bold">
            <span>${item.calificacion}</span>
            <span class="text-stone-300">•</span>
            <span class="text-stone-500 text-[11px]">${item.zona || 'La Lucila'}</span>
          </div>
        ` : ''}
      </div>

      <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
        <button 
          type="button"
          onclick="openElementInfoModal('${item.elemento}')"
          class="text-[11px] font-bold text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1"
        >
          <span>${item.elemento === 'tierra' ? '🌱 Tierra' : item.elemento === 'agua' ? '💧 Agua' : item.elemento === 'fuego' ? '🔥 Fuego' : item.elemento === 'aire' ? '💨 Aire' : '✨ Éter'}</span>
          <span class="text-stone-400">ℹ️</span>
        </button>

        <a 
          href="${item.accionUrl}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 bg-[#fcf4f0] hover:bg-[#faede7] text-[#a6634f] text-xs font-bold px-3 py-1.5 rounded-full border border-[#c0826d]/30 transition-all active:scale-95"
        >
          <span>${item.accionTexto}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `).join('');
}

// --- NAVEGACIÓN POR CATEGORÍAS DENTRO DE LOS 5 ELEMENTOS ---
function switchTierraTab(tabName) {
  sounds.playPop();
  document.querySelectorAll('#tierra-subnav-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active-tierra');
  });
  const activeBtn = document.getElementById(`tierra-tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-tierra');

  document.querySelectorAll('.tierra-panel').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(`tierra-panel-${tabName}`);
  if (target) target.classList.remove('hidden');

  if (tabName === 'tienda') {
    renderOrderCatalog();
    renderFloatingCart();
  }
}

function switchAguaTab(tabName) {
  sounds.playPop();
  document.querySelectorAll('#agua-subnav-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active-agua');
  });
  const activeBtn = document.getElementById(`agua-tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-agua');

  document.querySelectorAll('.agua-panel').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(`agua-panel-${tabName}`);
  if (target) target.classList.remove('hidden');

  if (tabName === 'oficios') renderOficios();
  if (tabName === 'whatsapp') renderWhatsAppFeed();
}

function switchFuegoTab(tabName) {
  sounds.playPop();
  document.querySelectorAll('#fuego-subnav-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active-fuego');
  });
  const activeBtn = document.getElementById(`fuego-tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-fuego');

  document.querySelectorAll('.fuego-panel').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(`fuego-panel-${tabName}`);
  if (target) target.classList.remove('hidden');

  if (tabName === 'talleres') renderTalleres();
  if (tabName === 'fondo') renderProyectos();
}

function switchAireTab(tabName) {
  sounds.playPop();
  document.querySelectorAll('#aire-subnav-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active-aire');
  });
  const activeBtn = document.getElementById(`aire-tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-aire');

  document.querySelectorAll('.aire-panel').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(`aire-panel-${tabName}`);
  if (target) target.classList.remove('hidden');

  if (tabName === 'noticias') renderNoticias();
}

// =========================================================================
// 5. CONTROLADOR ÉTER: PORTAL PERSONAL (SOCIOS/INVITADOS) & GESTIÓN NODO
// =========================================================================
let currentEterViewMode = 'personal'; // 'personal' | 'gestion'
let currentEterPersonalTab = 'labor'; // 'labor' | 'pedidos' | 'circulos' | 'votos' | 'firmas'
let currentEterGestionTab = 'pedidos'; // 'pedidos' | 'socios' | 'economia' | 'horas' | 'claves' | 'centro'

function renderEterView() {
  const isGestor = AppState.userRole === 'gestor' && sessionStorage.getItem('elementales_gestor_auth') === 'true';
  const gestorBar = document.getElementById('eter-gestor-mode-bar');
  if (gestorBar) {
    gestorBar.classList.toggle('hidden', !isGestor);
  }

  // Si no es gestor autenticado, forzar modo personal siempre
  if (!isGestor) {
    currentEterViewMode = 'personal';
  }

  // Actualizar botones del conmutador de modo si existen
  const btnPersonal = document.getElementById('eter-btn-mode-personal');
  const btnGestion = document.getElementById('eter-btn-mode-gestion');
  if (btnPersonal && btnGestion) {
    if (currentEterViewMode === 'personal') {
      btnPersonal.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-white text-stone-900 shadow-xs';
      btnGestion.className = 'px-3 py-1.5 rounded-xl text-xs font-bold text-stone-300 hover:text-white transition-all';
    } else {
      btnPersonal.className = 'px-3 py-1.5 rounded-xl text-xs font-bold text-stone-300 hover:text-white transition-all';
      btnGestion.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-amber-400 text-stone-900 shadow-xs';
    }
  }

  // Encabezado dinámico
  const mainTitle = document.getElementById('eter-main-title');
  const subtitle = document.getElementById('eter-subtitle');
  const desc = document.getElementById('eter-desc');
  const nodeEl = document.getElementById('eter-header-node-name');
  if (nodeEl) {
    const nodeObj = typeof NODES_DATA !== 'undefined' ? NODES_DATA[AppState.activeNodeId] : null;
    nodeEl.textContent = nodeObj ? nodeObj.name : 'Nodo La Lucila';
  }

  const personalCont = document.getElementById('eter-personal-portal-container');
  const gestionCont = document.getElementById('eter-panel-gestion-nodo');

  if (currentEterViewMode === 'personal') {
    if (mainTitle) mainTitle.textContent = 'Éter · Mi Portal Comunitario';
    if (subtitle) subtitle.textContent = 'Identidad personal, gobernanza, labor barrial y círculos';
    if (desc) desc.textContent = 'Tu espacio personal en la Red Elemental: tus datos de contacto, historial de pedidos, círculos de compra, acuerdos firmados y reputación de tus trabajos en la comunidad.';
    
    if (personalCont) personalCont.classList.remove('hidden');
    if (gestionCont) gestionCont.classList.add('hidden');

    renderEterPersonalData();
    switchEterPersonalTab(currentEterPersonalTab);
  } else {
    if (mainTitle) mainTitle.textContent = 'Éter · Gestión Operativa del Nodo';
    if (subtitle) subtitle.textContent = 'Uso interno del equipo · Administración del nodo';
    if (desc) desc.textContent = 'Gestión centralizada de pedidos de todos los usuarios, directorio de miembros, caja chica, cuadrante de guardias y credenciales seguras.';

    if (personalCont) personalCont.classList.add('hidden');
    if (gestionCont) gestionCont.classList.remove('hidden');

    switchEterGestionTab(currentEterGestionTab);
  }
}

function switchEterViewMode(mode) {
  if (mode === 'gestion') {
    if (AppState.userRole !== 'gestor' || sessionStorage.getItem('elementales_gestor_auth') !== 'true') {
      requestGestorAccess(() => {
        currentEterViewMode = 'gestion';
        renderEterView();
      });
      return;
    }
    currentEterViewMode = 'gestion';
  } else {
    currentEterViewMode = 'personal';
  }
  sounds.playPop();
  renderEterView();
}

function renderEterPersonalData() {
  const isSocio = AppState.userRole === 'socio';
  const isGestor = AppState.userRole === 'gestor';

  // Nombre
  const nameEl = document.getElementById('eter-user-name-display');
  if (nameEl) nameEl.textContent = AppState.userName || 'Usuario Comunitario';

  // Avatar iniciales
  const avatarEl = document.getElementById('eter-profile-avatar');
  if (avatarEl) {
    const rawName = (AppState.userName || 'U C').trim();
    const parts = rawName.split(' ');
    const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : rawName.slice(0, 2).toUpperCase();
    avatarEl.textContent = initials;
  }

  // Rol badge
  const roleBadge = document.getElementById('eter-user-role-badge');
  if (roleBadge) {
    if (isGestor) {
      roleBadge.innerHTML = '👑 Gestor del Nodo';
      roleBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300';
    } else if (isSocio) {
      roleBadge.innerHTML = `💧 Socio CsC <span class="font-mono text-[11px]">${AppState.userCode || '#CSC-2026-0482'}</span>`;
      roleBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200';
    } else {
      roleBadge.innerHTML = '👤 Vecino Invitado';
      roleBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-300';
    }
  }

  // Labor preview
  const tradePreview = document.getElementById('eter-user-trade-preview');
  if (tradePreview) {
    tradePreview.textContent = `🌿 ${AppState.userTrade || 'Miembro Colaborador'}`;
  }

  // Nodo habitual
  const nodeDisplay = document.getElementById('eter-user-node-display');
  if (nodeDisplay) {
    const nodeObj = typeof NODES_DATA !== 'undefined' ? NODES_DATA[AppState.activeNodeId] : null;
    nodeDisplay.textContent = nodeObj ? `${nodeObj.name} · ${nodeObj.address || 'Sede Barrial'}` : 'Nodo La Lucila · Rawson 3450';
  }

  // Contacto & Envío
  const emailEl = document.getElementById('eter-user-email-display');
  if (emailEl) emailEl.textContent = AppState.userEmail || 'sin-correo@comunidad.org';

  const phoneEl = document.getElementById('eter-user-phone-display');
  if (phoneEl) phoneEl.textContent = AppState.userPhone || '+54 9 11 5566-7788';

  const addressEl = document.getElementById('eter-user-address-display');
  if (addressEl) addressEl.textContent = AppState.userAddress || 'Av. Maipú 2140, Olivos, Vicente López';
}

function switchEterPersonalTab(tabName) {
  currentEterPersonalTab = tabName;
  sounds.playPop();

  document.querySelectorAll('#eter-personal-subnav-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active-eter');
  });
  const activeBtn = document.getElementById(`eter-tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-eter');

  const subpanels = ['labor', 'pedidos', 'circulos', 'votos', 'firmas'];
  subpanels.forEach(p => {
    const el = document.getElementById(`eter-subpanel-${p}`);
    if (el) el.classList.toggle('hidden', p !== tabName);
  });

  if (tabName === 'labor') renderEterPersonalLabor();
  if (tabName === 'pedidos') renderEterPersonalPedidos();
  if (tabName === 'circulos') renderEterPersonalCirculos();
  if (tabName === 'votos') renderEterPersonalVotos();
  if (tabName === 'firmas') renderEterPersonalFirmas();
}

function renderEterPersonalLabor() {
  const tEl = document.getElementById('eter-labor-title');
  if (tEl) tEl.textContent = AppState.userTrade || 'Oficio Artesanal & Producción Consciente';

  const dEl = document.getElementById('eter-labor-desc');
  if (dEl) dEl.textContent = AppState.userTradeDesc || 'Confección de productos sustentables y transmisión de saberes comunitarios en el nodo.';

  const aEl = document.getElementById('eter-labor-avail');
  if (aEl) aEl.textContent = `⏰ ${AppState.userTradeAvailability || 'Sábados de 10:00 a 14:00 hs en Rawson 3450 o por encargo'}`;

  // Reviews
  const reviewsContainer = document.getElementById('eter-reviews-list');
  if (!reviewsContainer) return;
  const reviews = AppState.getUserReviews();

  reviewsContainer.innerHTML = reviews.map(r => `
    <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
      <div class="flex items-center justify-between gap-2 mb-1.5">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-[#fcf4f0] border border-[#c0826d]/40 flex items-center justify-center font-bold text-[#a6634f] text-[10px]">
            ${r.author.slice(0, 1)}
          </span>
          <span class="font-bold text-stone-900">${r.author}</span>
          <span class="text-[10px] text-stone-400 font-medium">(${r.tag})</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-amber-500 font-bold text-xs">★ ${r.stars}.0</span>
          <span class="text-[10px] text-stone-400">${r.date}</span>
        </div>
      </div>
      <p class="text-stone-700 leading-relaxed italic pl-8">
        "${r.comment}"
      </p>
    </div>
  `).join('');
}

function renderEterPersonalPedidos() {
  const orders = AppState.getUserOrders();
  const countEl = document.getElementById('eter-my-orders-count');
  if (countEl) countEl.textContent = orders.length;

  const container = document.getElementById('eter-personal-orders-list');
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-3xl border border-stone-200">
        <span class="text-3xl block mb-2">🛍️</span>
        <p class="font-bold text-sm text-stone-800">Aún no registraste pedidos con tu cuenta</p>
        <p class="text-xs text-stone-500 mt-1">Explorá el catálogo de la feria barrial para hacer tu primera compra comunitaria.</p>
        <button onclick="navigateTo('tierra')" class="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">
          Ver Catálogo y Precios →
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(o => {
    const isDone = o.status === 'Entregado';
    const isReady = o.status === 'Listo para Retirar';
    const badgeColor = isReady ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : (isDone ? 'bg-stone-100 text-stone-600 border-stone-200' : 'bg-amber-100 text-amber-800 border-amber-300');
    
    const itemsText = Array.isArray(o.items)
      ? o.items.map(i => `${i.qty}x ${i.name}`).join(', ')
      : (typeof o.items === 'string' ? o.items : 'Canasta de alimentos');

    return `
      <div class="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 mb-3">
          <div>
            <span class="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">Pedido #${o.id || o.number} • ${o.dateStr}</span>
            <h4 class="font-black text-sm text-stone-900 mt-0.5">${itemsText}</h4>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            <span class="px-2.5 py-1 rounded-full text-[11px] font-black border ${badgeColor}">
              ${isReady ? '🟢 ' : (isDone ? '✓ ' : '⏳ ')}${o.status}
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 text-stone-600">
          <div class="flex items-center gap-3">
            <span>📍 <strong>Retiro:</strong> ${o.nodoNombre || 'Nodo La Lucila · Rawson 3450'}</span>
            ${o.circuloNombre ? `<span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">🌀 Círculo: ${o.circuloNombre}</span>` : ''}
          </div>
          <div class="text-right">
            <span class="text-stone-400 text-[11px] mr-1">Total abonado:</span>
            <strong class="font-black text-stone-900 text-sm">$${(o.total || 0).toLocaleString('es-AR')}</strong>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderEterPersonalCirculos() {
  const container = document.getElementById('eter-personal-circulos-list');
  if (!container) return;

  const allCircles = typeof CirculosManager !== 'undefined' ? CirculosManager.getAllCircles() : [];
  const activeCircleId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
  const myName = (AppState.userName || '').toLowerCase().trim();

  // Filtrar círculos del nodo o donde el usuario esté involucrado
  const myCircles = allCircles.filter(c => 
    c.id === activeCircleId || 
    (c.coordinador && c.coordinador.toLowerCase().includes(myName)) ||
    (c.nodoId === AppState.activeNodeId)
  );

  if (myCircles.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-3xl border border-stone-200">
        <span class="text-3xl block mb-2">🌀</span>
        <p class="font-bold text-sm text-stone-800">No participás de un Círculo Barrial actualmente</p>
        <p class="text-xs text-stone-500 mt-1">Podés sumarte a un círculo de compras de tu cuadra o crear el tuyo propio con amigos y vecinos.</p>
        <div class="mt-4 flex justify-center gap-2">
          <button onclick="navigateTo('circulos')" class="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold">
            Explorar Círculos del Nodo →
          </button>
          <button onclick="openCreateCirculoModal()" class="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-200">
            + Crear Círculo
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = myCircles.map(c => {
    const isCoord = c.coordinador && c.coordinador.toLowerCase().includes(myName);
    const shareUrl = typeof CirculosManager !== 'undefined' ? CirculosManager.getShareUrl(c.id) : window.location.href;
    const membersCount = Array.isArray(c.miembros) ? c.miembros.length : (typeof c.miembros === 'number' ? c.miembros : 5);
    const ordersCount = Array.isArray(c.orders) ? c.orders.length : 0;
    const totalAmount = Array.isArray(c.orders) ? c.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) : 0;

    return `
      <div class="p-5 rounded-3xl bg-white border border-stone-200 shadow-2xs text-xs space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center font-black text-base shrink-0">
              🌀
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-black text-sm sm:text-base text-stone-900">${c.nombre}</h4>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isCoord ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
                  ${isCoord ? '👑 Coordinador' : 'Miembro'}
                </span>
              </div>
              <p class="text-stone-500 text-[11px] mt-0.5">Punto de retiro: ${c.barrio || c.direccion || 'Barrio'}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button onclick="selectCircleAndOpenCatalog('${c.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs">
              Ver Catálogo del Círculo →
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 text-center">
          <div>
            <span class="text-[10px] text-stone-400 block font-bold uppercase">Miembros</span>
            <strong class="font-black text-stone-800 text-sm">${membersCount} vecinos</strong>
          </div>
          <div>
            <span class="text-[10px] text-stone-400 block font-bold uppercase">Pedidos Ciclo</span>
            <strong class="font-black text-emerald-700 text-sm">${ordersCount} pedidos</strong>
          </div>
          <div>
            <span class="text-[10px] text-stone-400 block font-bold uppercase">Consolidado</span>
            <strong class="font-black text-stone-900 text-sm">$${totalAmount.toLocaleString('es-AR')}</strong>
          </div>
        </div>

        <!-- Enlace para compartir -->
        <div class="flex items-center justify-between gap-2 pt-1 text-[11px]">
          <span class="text-stone-500 font-mono truncate bg-stone-100 px-2.5 py-1 rounded-lg">
            🔗 ${shareUrl}
          </span>
          <button onclick="navigator.clipboard.writeText('${shareUrl}'); sounds.playSuccess(); alert('¡Enlace del Círculo copiado al portapapeles!');" class="shrink-0 text-emerald-700 font-bold hover:underline">
            Copiar Link
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderEterPersonalVotos() {
  const container = document.getElementById('eter-personal-votes-list');
  if (!container) return;

  const votes = AppState.getUserVotes();
  if (votes.length === 0) {
    container.innerHTML = '<p class="text-stone-400 text-center py-4 text-xs">Aún no participaste de votaciones en el nodo.</p>';
    return;
  }

  container.innerHTML = votes.map(v => `
    <div class="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
      <div>
        <span class="font-bold text-stone-900 block">${v.propTitle}</span>
        <span class="text-stone-600 mt-0.5 block">Opción elegida: <strong class="text-emerald-800">${v.option}</strong></span>
      </div>
      <div class="flex items-center gap-2 self-start sm:self-auto shrink-0">
        <span class="text-[10px] text-stone-400">${v.date}</span>
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          ${v.status}
        </span>
      </div>
    </div>
  `).join('');
}

function renderEterPersonalFirmas() {
  const container = document.getElementById('eter-personal-signatures-list');
  if (!container) return;

  const sigs = AppState.getUserSignatures();
  container.innerHTML = sigs.map(s => `
    <div class="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200 shadow-2xs text-xs space-y-2.5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
        <div>
          <span class="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">${s.category}</span>
          <h4 class="font-black text-sm text-stone-900 mt-0.5">${s.title}</h4>
        </div>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          ${s.status}
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
        <div>
          <span class="text-stone-400 block">Sello Digital SHA-256:</span>
          <code class="font-mono text-stone-700 bg-stone-100 px-2 py-0.5 rounded">${s.hash}</code>
        </div>
        <div>
          <span class="text-stone-400 block">Fecha y Certificado:</span>
          <span class="font-bold text-stone-800">${s.date} · ${s.cert}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ✏️ MODAL EDITAR PERFIL
function openEditProfileModal() {
  sounds.playPop();
  const nameInput = document.getElementById('edit-profile-name');
  const emailInput = document.getElementById('edit-profile-email');
  const phoneInput = document.getElementById('edit-profile-phone');
  const addrInput = document.getElementById('edit-profile-address');
  const tradeInput = document.getElementById('edit-profile-trade');
  const tradeDescInput = document.getElementById('edit-profile-tradedesc');
  const tradeAvailInput = document.getElementById('edit-profile-tradeavail');

  if (nameInput) nameInput.value = AppState.userName || '';
  if (emailInput) emailInput.value = AppState.userEmail || '';
  if (phoneInput) phoneInput.value = AppState.userPhone || '';
  if (addrInput) addrInput.value = AppState.userAddress || '';
  if (tradeInput) tradeInput.value = AppState.userTrade || '';
  if (tradeDescInput) tradeDescInput.value = AppState.userTradeDesc || '';
  if (tradeAvailInput) tradeAvailInput.value = AppState.userTradeAvailability || '';

  const modal = document.getElementById('modal-edit-profile');
  if (modal) modal.classList.remove('hidden');
}

function closeEditProfileModal() {
  const modal = document.getElementById('modal-edit-profile');
  if (modal) modal.classList.add('hidden');
}

function handleSaveProfileSubmit(event) {
  event.preventDefault();
  sounds.playSuccess();

  const name = document.getElementById('edit-profile-name').value;
  const email = document.getElementById('edit-profile-email').value;
  const phone = document.getElementById('edit-profile-phone').value;
  const address = document.getElementById('edit-profile-address').value;
  const trade = document.getElementById('edit-profile-trade').value;
  const tradeDesc = document.getElementById('edit-profile-tradedesc').value;
  const tradeAvail = document.getElementById('edit-profile-tradeavail').value;

  AppState.saveUserProfile({
    userName: name,
    userEmail: email,
    userPhone: phone,
    userAddress: address,
    userTrade: trade,
    userTradeDesc: tradeDesc,
    userTradeAvailability: tradeAvail
  });

  closeEditProfileModal();
  renderEterView();
  if (typeof triggerCelebrationConfetti === 'function') triggerCelebrationConfetti();
}

function copyShareLaborLink() {
  const url = `${window.location.origin}/nodo/${(AppState.activeNodeId || 'lucila').replace(/^nodo-/, '')}`;
  navigator.clipboard.writeText(url);
  sounds.playSuccess();
  alert('¡Ficha de labor copiada al portapapeles!');
}

// 🔐 GESTIÓN OPERATIVA DEL NODO (SOLO GESTORES)
function switchEterGestionTab(tabName) {
  if (AppState.userRole !== 'gestor' || sessionStorage.getItem('elementales_gestor_auth') !== 'true') {
    requestGestorAccess(() => {
      currentEterViewMode = 'gestion';
      renderEterView();
    });
    return;
  }

  currentEterGestionTab = tabName;
  sounds.playPop();

  document.querySelectorAll('#eter-gestion-subnav-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active-eter');
  });
  const activeBtn = document.getElementById(`eter-gestion-tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-eter');

  const gPanels = ['pedidos', 'socios', 'economia', 'horas', 'claves', 'centro'];
  gPanels.forEach(p => {
    const el = document.getElementById(`eter-gestion-panel-${p}`);
    if (el) el.classList.toggle('hidden', p !== tabName);
  });

  if (tabName === 'pedidos') renderEterGestionPedidos();
  if (tabName === 'socios') renderEterGestionSocios();
  if (tabName === 'economia') renderEterEconomia();
  if (tabName === 'centro') renderCentroLucila();
}

function renderEterGestionPedidos() {
  const orders = AppState.orders || [];
  const tbody = document.getElementById('eter-admin-orders-tbody');
  if (!tbody) return;

  const totalRev = orders.reduce((s, o) => s + (o.total || 0), 0);
  const totalCash = orders.filter(o => o.paymentMethod === 'Efectivo').reduce((s, o) => s + (o.total || 0), 0);
  const totalDigital = orders.filter(o => (o.paymentMethod || '').includes('Transferencia') || (o.paymentMethod || '').includes('Mercado')).reduce((s, o) => s + (o.total || 0), 0);

  const elTot = document.getElementById('eter-admin-total-orders');
  const elRev = document.getElementById('eter-admin-total-revenue');
  const elCash = document.getElementById('eter-admin-total-cash');
  const elDig = document.getElementById('eter-admin-total-digital');

  if (elTot) elTot.textContent = orders.length;
  if (elRev) elRev.textContent = `$${totalRev.toLocaleString('es-AR')}`;
  if (elCash) elCash.textContent = `$${totalCash.toLocaleString('es-AR')}`;
  if (elDig) elDig.textContent = `$${totalDigital.toLocaleString('es-AR')}`;

  filterEterGestionPedidos();
}

function filterEterGestionPedidos() {
  const q = (document.getElementById('eter-admin-order-search')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('eter-admin-status-filter')?.value || 'Todos';
  const tbody = document.getElementById('eter-admin-orders-tbody');
  if (!tbody) return;

  let list = [...(AppState.orders || [])];

  if (statusFilter !== 'Todos') {
    list = list.filter(o => o.status === statusFilter);
  }

  if (q) {
    list = list.filter(o => 
      (o.clientName && o.clientName.toLowerCase().includes(q)) ||
      (o.clientPhone && o.clientPhone.includes(q)) ||
      (o.id && o.id.toLowerCase().includes(q)) ||
      (String(o.number || '').includes(q))
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8 text-stone-400">
          No se encontraron pedidos con los filtros aplicados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(o => {
    const isDone = o.status === 'Entregado';
    const isReady = o.status === 'Listo para Retirar';
    const badgeColor = isReady ? 'bg-emerald-100 text-emerald-800' : (isDone ? 'bg-stone-100 text-stone-600' : 'bg-amber-100 text-amber-800');
    
    const itemsSummary = Array.isArray(o.items)
      ? o.items.map(i => `${i.qty}x ${i.name}`).join(', ')
      : (typeof o.items === 'string' ? o.items : 'Items varios');

    return `
      <tr class="hover:bg-stone-50/70 transition-colors">
        <td class="py-2.5 px-3 font-mono font-bold text-stone-800">#${o.id || o.number}</td>
        <td class="py-2.5 px-3 text-stone-500 whitespace-nowrap">${o.dateStr}</td>
        <td class="py-2.5 px-3">
          <strong class="text-stone-900 block">${o.clientName || 'Cliente'}</strong>
          <span class="text-[11px] text-stone-500">${o.clientPhone || 'Sin teléfono'}</span>
        </td>
        <td class="py-2.5 px-3 max-w-xs truncate text-stone-600" title="${itemsSummary}">${itemsSummary}</td>
        <td class="py-2.5 px-3 font-bold text-stone-900 whitespace-nowrap">$${(o.total || 0).toLocaleString('es-AR')}</td>
        <td class="py-2.5 px-3">
          <select onchange="updateOrderStatusFromEter('${o.id}', this.value)" class="text-[11px] font-bold py-1 px-2 rounded-lg border border-stone-200 outline-none ${badgeColor}">
            <option value="Pendiente" ${o.status === 'Pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
            <option value="Pagado" ${o.status === 'Pagado' ? 'selected' : ''}>💳 Pagado</option>
            <option value="Listo para Retirar" ${o.status === 'Listo para Retirar' ? 'selected' : ''}>🟢 Listo para Retirar</option>
            <option value="Entregado" ${o.status === 'Entregado' ? 'selected' : ''}>✓ Entregado</option>
          </select>
        </td>
        <td class="py-2.5 px-3 text-right">
          ${o.clientPhone ? `
            <a href="https://wa.me/${o.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hola ' + o.clientName + '! Te escribimos del Nodo Elementales sobre tu pedido #' + (o.id || o.number))}" target="_blank" class="text-emerald-700 hover:text-emerald-800 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
              WhatsApp ↗
            </a>
          ` : '<span class="text-stone-300">-</span>'}
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatusFromEter(orderId, newStatus) {
  const o = AppState.orders.find(item => item.id === orderId);
  if (o) {
    o.status = newStatus;
    AppState.saveOrders();
    sounds.playSuccess();
    renderEterGestionPedidos();
  }
}

function renderEterGestionSocios() {
  const container = document.getElementById('eter-admin-socios-list');
  if (!container) return;
  filterEterGestionSocios();
}

function filterEterGestionSocios() {
  const q = (document.getElementById('eter-admin-socio-search')?.value || '').toLowerCase().trim();
  const container = document.getElementById('eter-admin-socios-list');
  if (!container) return;

  const members = typeof AppState !== 'undefined' && AppState.members ? AppState.members : [];
  let list = [...members];

  if (q) {
    list = list.filter(m => 
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.phone && m.phone.includes(q)) ||
      (m.neighborhood && m.neighborhood.toLowerCase().includes(q)) ||
      (m.communityRole && m.communityRole.toLowerCase().includes(q))
    );
  }

  if (list.length === 0) {
    container.innerHTML = '<p class="text-stone-400 text-center py-6 text-xs">No se encontraron socios.</p>';
    return;
  }

  container.innerHTML = list.map(m => `
    <div class="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-full bg-[#fcf4f0] border border-[#c0826d]/40 flex items-center justify-center font-bold text-[#a6634f]">
          ${(m.name || '?').charAt(0).toUpperCase()}
        </span>
        <div>
          <strong class="text-stone-900 block text-sm leading-tight">${m.name}</strong>
          <span class="text-stone-500 text-[11px]">${m.neighborhood || 'Vicente López'} · ${m.communityRole || 'Socio CsC'}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          ✓ Al Día
        </span>
        ${m.phone ? `
          <a href="https://wa.me/${m.phone.replace(/\D/g, '')}" target="_blank" class="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[11px]">
            WhatsApp ↗
          </a>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// Retrocompatibilidad
function switchEterMainTab(tabName) {
  if (tabName === 'democracia') switchEterPersonalTab('votos');
  else if (tabName === 'micrm') switchEterPersonalTab('pedidos');
  else if (tabName === 'centro') {
    currentEterViewMode = 'gestion';
    renderEterView();
    switchEterGestionTab('centro');
  } else if (tabName === 'gestion') {
    switchEterViewMode('gestion');
  } else {
    switchEterPersonalTab('labor');
  }
}

// 🗳️ SISTEMA DE VOTACIÓN DEMOCRÁTICA DEL NODO
function castVote(proposalId, option) {
  sounds.playSuccess();
  const key = `elementales_voted_prop_${proposalId}`;
  localStorage.setItem(key, option);

  const el = document.getElementById(`vote-count-${proposalId}-${option}`);
  if (el) {
    el.classList.add('ring-2', 'ring-emerald-500', 'bg-emerald-100', 'text-emerald-950');
    el.innerHTML = '✓ Voto computado';
  }

  // Registrar también en el historial de votos del usuario en Éter
  const propTitles = {
    1: '¿En qué invertimos el 25% del Fondo Barrial este mes?',
    2: 'Horario de la Feria Agroecológica de Verano'
  };
  const optionNames = {
    '1-A': '🌿 Ampliación de bancales y riego por goteo',
    '1-B': '🛠️ Herramientas compartidas para oficios',
    '1-C': '💡 Iluminación solar para el patio',
    '2-A': '🌅 Viernes al atardecer (17:30 a 21:30 hs)',
    '2-B': '☀️ Sábados por la mañana (09:00 a 13:00 hs)'
  };

  const currentVotes = AppState.getUserVotes();
  const optName = optionNames[`${proposalId}-${option}`] || option;
  const existingIdx = currentVotes.findIndex(v => v.id === `v-${proposalId}`);
  const todayStr = new Date().toLocaleDateString('es-AR');

  if (existingIdx >= 0) {
    currentVotes[existingIdx].option = optName;
    currentVotes[existingIdx].date = todayStr;
  } else {
    currentVotes.unshift({
      id: `v-${proposalId}`,
      propTitle: propTitles[proposalId] || `Votación #${proposalId}`,
      option: optName,
      date: todayStr,
      status: '✓ Voto Vinculante Registrado'
    });
  }

  try {
    localStorage.setItem('elementales_user_votes', JSON.stringify(currentVotes));
  } catch (e) {}

  renderEterPersonalVotos();

  if (typeof confetti === 'function') {
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
  }
}

// 🧭 CONTROL DEL ACCESO INICIAL (LANDING PREVIA DE BIENVENIDA)
function checkInitialLogin() {
  if (window.location.hash === '#admin') {
    AppState.userRole = 'gestor';
    sessionStorage.setItem('elementales_authenticated', 'true');
    sessionStorage.setItem('elementales_gestor_auth', 'true');
    updateRoleUI();
    updateNodeUI();
    navigateTo('barrio');
    return;
  }

  const isAuth = sessionStorage.getItem('elementales_authenticated');
  if (!isAuth) {
    goToLanding();
  } else {
    navigateTo('barrio');
  }
}

function openInitialLoginModal() {
  goToLanding();
}

function closeInitialLoginModal() {
  // Sin modal emergente: la selección se hace en view-landing
}

function selectInitialRole(role) {
  loginFromLanding(role);
}

// =========================================================================
// CONTROLADOR DE CAJONES MAYORISTAS Y FRACCIONAMIENTO (CHASQUI / CENTRAL COOP)
// =========================================================================
let currentCajonViewTab = 'catalogo';
let currentModalCajonProduct = null;
let currentModalRequestedKg = 5;

function switchCajonesViewTab(tab) {
  currentCajonViewTab = tab;
  sounds.playPop();

  const btnCat = document.getElementById('btn-cajones-tab-catalogo');
  const btnComp = document.getElementById('btn-cajones-tab-compartidos');
  const contComp = document.getElementById('container-cajones-compartidos');
  const catList = document.getElementById('catalog-products-list');
  const catBars = document.getElementById('catalog-categories-bar');

  if (tab === 'compartidos') {
    if (btnCat) {
      btnCat.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-white text-stone-700 border border-stone-200 hover:bg-stone-100';
    }
    if (btnComp) {
      btnComp.className = 'px-3.5 py-1.5 rounded-full text-xs font-black transition-all bg-amber-600 text-white shadow-xs';
    }
    if (contComp) contComp.classList.remove('hidden');
    if (catList) catList.classList.add('hidden');
    if (catBars) catBars.classList.add('hidden');
    renderCajonesSharesGrid();
  } else {
    if (btnCat) {
      btnCat.className = 'px-3.5 py-1.5 rounded-full text-xs font-black transition-all bg-amber-600 text-white shadow-xs';
    }
    if (btnComp) {
      btnComp.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-white text-stone-700 border border-stone-200 hover:bg-stone-100';
    }
    if (contComp) contComp.classList.add('hidden');
    if (catList) catList.classList.remove('hidden');
    if (catBars) catBars.classList.remove('hidden');
  }
}

function renderCajonesSharesGrid() {
  const grid = document.getElementById('cajones-shares-grid');
  if (!grid || typeof CajonesManager === 'undefined') return;

  const shares = CajonesManager.getAllShares();
  if (shares.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
        <p class="text-3xl mb-2">🧺</p>
        <p class="font-bold text-sm text-stone-800">No hay cajones en proceso de llenado en este momento</p>
        <p class="text-xs text-stone-500 mt-1">Elegí cualquier cajón del catálogo y hacé clic en "Dividir" para ser el primero en abrirlo.</p>
        <button onclick="switchCajonesViewTab('catalogo')" class="mt-4 px-4 py-2 rounded-full bg-amber-600 text-white font-bold text-xs">
          Ver Catálogo de Cajones →
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = shares.map(share => {
    const isCompleted = share.status === 'completo' || share.remainingKg <= 0;
    return `
      <div class="p-4 sm:p-5 rounded-3xl bg-white border ${isCompleted ? 'border-emerald-300 bg-emerald-50/20' : 'border-amber-200'} shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 overflow-hidden flex items-center justify-center shrink-0">
                ${share.image ? `<img src="${share.image}" class="w-full h-full object-cover" onerror="this.remove()" />` : '📦'}
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    ${isCompleted ? '✓ Cajón Completo' : 'En Llenado'}
                  </span>
                  <span class="text-[9px] font-bold text-stone-500">Cajón ${share.totalKg} kg</span>
                </div>
                <h4 class="font-black text-sm text-stone-900 leading-tight mt-0.5">${escapeHtml(share.productName)}</h4>
                <p class="text-[11px] text-stone-500">${escapeHtml(share.producer)}</p>
              </div>
            </div>
            <span class="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg shrink-0">
              $${formatMoney(share.pricePerKg)}/kg
            </span>
          </div>

          <!-- Barra de Progreso -->
          <div class="mb-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
            <div class="flex items-center justify-between text-xs font-bold mb-1">
              <span class="text-stone-700">Llenado: ${share.coveredKg} de ${share.totalKg} kg</span>
              <span class="${isCompleted ? 'text-emerald-700' : 'text-amber-800'} font-black">${share.percent}%</span>
            </div>
            <div class="w-full h-3 bg-stone-200 rounded-full overflow-hidden p-0.5">
              <div class="h-full ${isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-emerald-500'} rounded-full transition-all duration-300" style="width: ${Math.min(100, share.percent)}%;"></div>
            </div>
            <p class="text-[11px] mt-1.5 ${isCompleted ? 'text-emerald-700 font-bold' : 'text-amber-800 font-semibold'}">
              ${isCompleted ? '🎉 ¡Cajón 100% completo! Despachado por quintas.' : `¡Faltan solo ${share.remainingKg} kg para cerrar el cajón!`}
            </p>
          </div>

          <!-- Participantes -->
          <div class="mb-3">
            <span class="text-[10px] font-black uppercase text-stone-400 block mb-1">Vecinos en este cajón:</span>
            <div class="flex flex-wrap gap-1.5">
              ${share.participantes.map(p => `
                <span class="inline-flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-xl text-[11px] font-semibold text-stone-700 border border-stone-200">
                  <span>${p.avatar || '👤'}</span>
                  <span>${escapeHtml(p.name)}: <strong>${p.kg} kg</strong></span>
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="pt-2 border-t border-stone-100 flex items-center gap-2 mt-auto">
          ${!isCompleted ? `
            <button 
              type="button" 
              onclick="openFraccionarCajonModal('${share.productId}')" 
              class="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-transform active:scale-95"
            >
              <span>➕</span> Sumarme con Kilos
            </button>
          ` : `
            <span class="flex-1 py-2 text-center text-xs font-bold text-emerald-800 bg-emerald-100 rounded-xl">
              ✓ Cajón Cerrado
            </span>
          `}
          
          <button 
            type="button" 
            onclick="shareCajonWhatsAppFromCard('${share.id}')" 
            class="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            title="Compartir en WhatsApp"
          >
            <span>💬</span> WhatsApp
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openFraccionarCajonModal(productId) {
  if (typeof CAJONES_CENTRAL_COOPERATIVA === 'undefined') return;
  const q = String(productId || '').toLowerCase().trim();
  const prod = CAJONES_CENTRAL_COOPERATIVA.find(p => 
    p.id.toLowerCase() === q ||
    (p.slug && p.slug.toLowerCase() === q) ||
    (typeof getProductSlug === 'function' && getProductSlug(p) === q) ||
    p.name.toLowerCase().includes(q)
  );
  if (!prod) return;

  currentModalCajonProduct = prod;
  sounds.playPop();

  const activeCircleId = (typeof CirculosManager !== 'undefined') ? CirculosManager.getActiveCircleId() : null;
  const existingShare = (typeof CajonesManager !== 'undefined') ? CajonesManager.getShareForProduct(prod.id, activeCircleId) : null;

  const total = prod.cajonKg;
  const kgMedio = Math.round(total / 2);
  const kgTercio = Math.max(1, Math.round(total / 3));
  const remaining = existingShare ? Math.round(existingShare.remainingKg) : null;

  // Selección inicial de porción (redonda y exacta)
  if (remaining && remaining > 0 && remaining <= kgMedio) {
    currentModalRequestedKg = remaining;
  } else {
    currentModalRequestedKg = kgMedio;
  }

  // Actualizar datos del modal
  const titleEl = document.getElementById('modal-cajon-title');
  const prodEl = document.getElementById('modal-cajon-producer');
  const kgBadgeEl = document.getElementById('modal-cajon-kg-badge');
  const priceTotEl = document.getElementById('modal-cajon-price-total');
  const priceKgEl = document.getElementById('modal-cajon-price-kg');
  const imgEl = document.getElementById('modal-cajon-img');
  const emojiEl = document.getElementById('modal-cajon-emoji');

  const cleanName = (typeof getProductCleanName === 'function') ? getProductCleanName(prod) : prod.name;
  if (titleEl) titleEl.textContent = cleanName;
  if (prodEl) prodEl.textContent = 'Quinta / Productor: ' + (prod.producer || 'Agroecológico');
  if (kgBadgeEl) kgBadgeEl.textContent = `Cajón ${prod.cajonKg} kg`;
  if (priceTotEl) priceTotEl.textContent = `$${formatMoney(prod.precioCajon)}`;
  if (priceKgEl) priceKgEl.textContent = `$${formatMoney(prod.precioPerKg)} / kg`;

  if (imgEl && emojiEl) {
    if (prod.img) {
      imgEl.src = prod.img;
      imgEl.classList.remove('hidden');
      emojiEl.classList.add('hidden');
    } else {
      imgEl.classList.add('hidden');
      emojiEl.classList.remove('hidden');
      emojiEl.textContent = prod.emoji || '📦';
    }
  }

  // Generar botones de fracciones: Entero (1/1), Medio (1/2), Tercio (1/3) y Cerrar Restante
  const quickContainer = document.getElementById('modal-cajon-quick-buttons');
  if (quickContainer) {
    let btnsHtml = `
      <button type="button" onclick="setModalCajonQuickKg(${total})" id="btn-share-entero" class="p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-0.5 text-center ${currentModalRequestedKg === total ? 'border-amber-500 bg-amber-50 text-amber-950 font-black ring-2 ring-amber-400' : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 font-bold'}">
        <span class="text-sm">📦</span>
        <span class="text-xs">Entero</span>
        <span class="text-xs font-black text-amber-900">${total} kg</span>
      </button>
      <button type="button" onclick="setModalCajonQuickKg(${kgMedio})" id="btn-share-medio" class="p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-0.5 text-center ${currentModalRequestedKg === kgMedio ? 'border-amber-500 bg-amber-50 text-amber-950 font-black ring-2 ring-amber-400' : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 font-bold'}">
        <span class="text-sm">½</span>
        <span class="text-xs">Medio</span>
        <span class="text-xs font-black text-amber-900">${kgMedio} kg</span>
      </button>
      <button type="button" onclick="setModalCajonQuickKg(${kgTercio})" id="btn-share-tercio" class="p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-0.5 text-center ${currentModalRequestedKg === kgTercio ? 'border-amber-500 bg-amber-50 text-amber-950 font-black ring-2 ring-amber-400' : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 font-bold'}">
        <span class="text-sm">⅓</span>
        <span class="text-xs">Tercio</span>
        <span class="text-xs font-black text-amber-900">${kgTercio} kg</span>
      </button>
    `;

    if (remaining && remaining > 0 && remaining < total && remaining !== kgMedio && remaining !== kgTercio) {
      btnsHtml += `
        <button type="button" onclick="setModalCajonQuickKg(${remaining})" id="btn-share-cerrar" class="col-span-full p-2.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-black text-xs flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all ${currentModalRequestedKg === remaining ? 'ring-2 ring-emerald-500' : ''}">
          <span>🎯</span>
          <span>Cerrar Cajón con los ${remaining} kg restantes ($${formatMoney(Math.round(remaining * prod.precioPerKg))})</span>
        </button>
      `;
    }

    quickContainer.innerHTML = btnsHtml;
  }

  updateCajonModalPreview();

  const modal = document.getElementById('modal-fraccionar-cajon');
  if (modal) modal.classList.remove('hidden');
}

function closeFraccionarCajonModal() {
  const modal = document.getElementById('modal-fraccionar-cajon');
  if (modal) modal.classList.add('hidden');
  currentModalCajonProduct = null;
}

function setModalCajonQuickKg(kg) {
  if (!currentModalCajonProduct) return;
  const prod = currentModalCajonProduct;
  currentModalRequestedKg = Math.max(1, Math.min(prod.cajonKg, Math.round(kg)));
  sounds.playPop();

  const total = prod.cajonKg;
  const kgMedio = Math.round(total / 2);
  const kgTercio = Math.max(1, Math.round(total / 3));

  const btnEntero = document.getElementById('btn-share-entero');
  const btnMedio = document.getElementById('btn-share-medio');
  const btnTercio = document.getElementById('btn-share-tercio');
  const btnCerrar = document.getElementById('btn-share-cerrar');

  const activeCls = 'p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-0.5 text-center border-amber-500 bg-amber-50 text-amber-950 font-black ring-2 ring-amber-400';
  const inactiveCls = 'p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-0.5 text-center border-stone-200 bg-white text-stone-700 hover:border-amber-300 font-bold';

  if (btnEntero) btnEntero.className = currentModalRequestedKg === total ? activeCls : inactiveCls;
  if (btnMedio) btnMedio.className = currentModalRequestedKg === kgMedio ? activeCls : inactiveCls;
  if (btnTercio) btnTercio.className = currentModalRequestedKg === kgTercio ? activeCls : inactiveCls;
  if (btnCerrar) {
    const isAct = currentModalRequestedKg !== total && currentModalRequestedKg !== kgMedio && currentModalRequestedKg !== kgTercio;
    btnCerrar.className = `col-span-full p-2.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-black text-xs flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all ${isAct ? 'ring-2 ring-emerald-500' : ''}`;
  }

  updateCajonModalPreview();
}

function updateCajonModalPreview() {
  if (!currentModalCajonProduct) return;
  const prod = currentModalCajonProduct;
  const total = prod.cajonKg;
  const kg = Math.round(currentModalRequestedKg);
  const cost = (kg === total) ? Math.round(prod.precioCajon) : Math.round(kg * prod.precioPerKg);
  const percentShare = Math.min(100, Math.round((kg / total) * 100));
  const activeCircleId = (typeof CirculosManager !== 'undefined') ? CirculosManager.getActiveCircleId() : null;

  // Cuadro proporcional
  const shareTextEl = document.getElementById('modal-cajon-my-share-text');
  if (shareTextEl) {
    let porcionLabel = (kg === total) ? 'Cajón Entero' : ((kg === Math.round(total / 2)) ? 'Medio Cajón' : ((kg === Math.max(1, Math.round(total / 3))) ? 'Tercio de Cajón' : `${kg} kg`));
    shareTextEl.textContent = `${kg} kg de ${total} kg (${porcionLabel} · ${percentShare}%)`;
  }
  const sharePriceEl = document.getElementById('modal-cajon-my-share-price');
  if (sharePriceEl) {
    sharePriceEl.textContent = `$${formatMoney(cost)}`;
  }

  // Estado del cajón compartido (en este círculo o general)
  const existingShare = (typeof CajonesManager !== 'undefined') ? CajonesManager.getShareForProduct(prod.id, activeCircleId) : null;
  const alreadyCovered = existingShare ? Math.round(existingShare.coveredKg) : 0;
  const newTotalCovered = Math.min(total, (kg === total ? total : alreadyCovered + kg));
  const newPercent = Math.min(100, Math.round((newTotalCovered / total) * 100));
  const remaining = Math.max(0, Math.round(total - newTotalCovered));

  const pBar = document.getElementById('modal-cajon-progress-bar');
  const pPercent = document.getElementById('modal-cajon-progress-percent');
  const coveredText = document.getElementById('modal-cajon-covered-text');
  const remText = document.getElementById('modal-cajon-remaining-text');

  if (pBar) pBar.style.width = `${newPercent}%`;
  if (pPercent) pPercent.textContent = `${newPercent}%`;
  if (coveredText) coveredText.textContent = `${newTotalCovered} kg cubiertos (${total} kg total)`;
  if (remText) {
    if (remaining <= 0 || kg === total) {
      remText.className = 'font-black text-emerald-700';
      remText.textContent = '🎉 ¡Con tu parte el cajón queda 100% CERRADO y listo para despachar!';
    } else {
      remText.className = 'font-bold text-amber-900';
      remText.textContent = `¡Faltarían ${remaining} kg para cerrarlo a precio de quinta!`;
    }
  }

  // Lista de participantes si ya existe
  const partList = document.getElementById('modal-cajon-participants-list');
  if (partList) {
    if (existingShare && existingShare.participantes.length > 0) {
      partList.innerHTML = `
        <span class="text-[10px] font-bold text-stone-500 block mb-1">Vecinos ya sumados a este cajón:</span>
        <div class="flex flex-wrap gap-1">
          ${existingShare.participantes.map(p => `
            <span class="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded-lg text-stone-700">
              ${p.avatar || '👤'} ${escapeHtml(p.name)} (${p.kg} kg)
            </span>
          `).join('')}
        </div>
      `;
    } else {
      partList.innerHTML = `
        <span class="text-[10px] text-stone-500 italic">
          💡 Serás el primer vecino en abrir este cajón compartido en el Círculo. Luego otro vecino se suma con lo que falta para cerrarlo.
        </span>
      `;
    }
  }

  // Texto del botón de confirmación
  const btnConfirmText = document.getElementById('modal-cajon-confirm-btn-text');
  if (btnConfirmText) {
    if (kg === total) {
      btnConfirmText.textContent = `Sumar Cajón Entero (${kg} kg · $${formatMoney(cost)}) al Carrito`;
    } else if (remaining <= 0) {
      btnConfirmText.textContent = `🎯 Cerrar Cajón con mi parte (${kg} kg · $${formatMoney(cost)}) y Sumar al Carrito`;
    } else {
      btnConfirmText.textContent = `Confirmar mi parte (${kg} kg · $${formatMoney(cost)}) y Sumar al Carrito`;
    }
  }
}

function confirmCajonShare() {
  if (!currentModalCajonProduct) return;
  const prod = currentModalCajonProduct;
  const total = prod.cajonKg;
  const kg = Math.round(currentModalRequestedKg);
  const activeCircleId = (typeof CirculosManager !== 'undefined') ? CirculosManager.getActiveCircleId() : null;

  // Si eligió Cajón Entero completo (1/1)
  if (kg >= total) {
    AppState.addToCart(prod.id, 1);
    closeFraccionarCajonModal();
    sounds.playSuccess();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    }
    renderOrderCatalog();
    renderCirculoStoreBanner();
    renderCirculoSharesDashboard();
    return;
  }

  // Fraccionamiento colectivo (Medio, Tercio, o Restante)
  if (typeof CajonesManager === 'undefined') return;
  const cost = Math.round(kg * prod.precioPerKg);
  const share = CajonesManager.createOrJoinShare(prod.id, kg, AppState.userName, activeCircleId);
  if (!share) return;

  const cleanName = (typeof getProductCleanName === 'function') ? getProductCleanName(prod) : prod.name;

  AppState.addCajonShareToCart({
    id: 'cart-share-' + Date.now(),
    shareId: share.id,
    circleId: activeCircleId,
    productId: prod.id,
    productName: cleanName,
    kg: kg,
    totalKg: prod.cajonKg,
    pricePerKg: prod.precioPerKg,
    total: cost,
    percent: share.percent,
    image: prod.img
  });

  closeFraccionarCajonModal();
  sounds.playSuccess();
  if (typeof confetti === 'function') {
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
  }

  // Refrescar vistas del catálogo y círculo
  renderOrderCatalog();
  renderCirculoStoreBanner();
  renderCirculoSharesDashboard();
  if (currentCajonViewTab === 'compartidos') {
    renderCajonesSharesGrid();
  }
  const badgeCount = document.getElementById('count-cajones-compartidos-badge');
  if (badgeCount && typeof CajonesManager !== 'undefined') {
    badgeCount.textContent = CajonesManager.getAllShares().filter(s => s.status === 'abierto').length;
  }
}

function shareCajonWhatsAppFromModal() {
  if (!currentModalCajonProduct) return;
  const prod = currentModalCajonProduct;
  const kg = currentModalRequestedKg;
  const activeCircleId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
  const circle = activeCircleId ? CirculosManager.getCircle(activeCircleId) : null;
  
  // Revisar si ya hay un cajón compartido abierto
  let remaining = Math.max(0, prod.cajonKg - kg);
  if (typeof CajonesManager !== 'undefined') {
    const existing = CajonesManager.getAllShares().find(s => s.productId === prod.id && s.status === 'abierto');
    if (existing) {
      remaining = existing.remainingKg;
    }
  }

  const cleanName = (typeof getProductCleanName === 'function') ? getProductCleanName(prod) : prod.name;
  const prodEmoji = prod.emoji || '🍊';
  const prodSlug = (typeof getProductSlug === 'function') ? getProductSlug(prod) : prod.id;

  let baseUrl = (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null' && window.location.protocol !== 'file:')
    ? window.location.origin.replace(/\/+$/, '')
    : 'https://elementales.store';

  let shareUrl = circle 
    ? `${baseUrl}/circulo/${circle.slug || circle.id}?cajon=${prodSlug}`
    : `${baseUrl}/nodo/lomaverde?cajon=${prodSlug}`;

  let text = `${prodEmoji} *Cajón Compartido: ${cleanName}*\n`;
  text += `🌱 Quinta: ${prod.producer || 'Agroecológica'}\n`;
  if (circle) {
    text += `🤝 Círculo: *${circle.nombre}* · Retiro: ${circle.direccion}\n`;
  } else {
    text += `📍 *Nodo Loma Verde (Escobar)*\n`;
  }
  text += `\n¡Hola vecinos! 👋 Abrí este cajón para dividirlo a precio directo de quinta:\n\n`;
  text += `• *Cajón total:* ${prod.cajonKg} kg ($${formatMoney(prod.precioPerKg)} / kg)\n`;
  text += `• *Mi parte:* Ya sumé ${kg} kg\n`;
  text += `• *Quedan disponibles:* ${remaining} kg para cerrarlo\n\n`;
  text += `👉 *Elegí cuántos kilos querés y sumate acá:*\n`;
  text += `${shareUrl}\n\n`;
  text += `_Pedí los kilos que necesites. ¡Avisale a más vecinos para cerrarlo rápido!_`;

  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function shareCajonWhatsAppFromCard(shareId) {
  if (typeof CajonesManager === 'undefined') return;
  const share = CajonesManager.getAllShares().find(s => s.id === shareId);
  if (!share) return;

  const prod = (typeof CAJONES_CENTRAL_COOPERATIVA !== 'undefined')
    ? CAJONES_CENTRAL_COOPERATIVA.find(p => p.id === share.productId)
    : null;
  const cleanName = prod 
    ? ((typeof getProductCleanName === 'function') ? getProductCleanName(prod) : prod.name)
    : share.productName;
  const prodEmoji = (prod && prod.emoji) ? prod.emoji : '🧺';
  const prodSlug = prod 
    ? ((typeof getProductSlug === 'function') ? getProductSlug(prod) : prod.id)
    : share.productId;
  const activeCircleId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
  const circle = activeCircleId ? CirculosManager.getCircle(activeCircleId) : null;

  let baseUrl = (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null' && window.location.protocol !== 'file:')
    ? window.location.origin.replace(/\/+$/, '')
    : 'https://elementales.store';

  let shareUrl = circle 
    ? `${baseUrl}/circulo/${circle.slug || circle.id}?cajon=${prodSlug}`
    : `${baseUrl}/nodo/lomaverde?cajon=${prodSlug}`;

  let text = `${prodEmoji} *Cajón Compartido: ${cleanName}*\n`;
  text += `🌱 Quinta: ${share.producer || 'Agroecológica'}\n`;
  if (circle) {
    text += `🤝 Círculo: *${circle.nombre}*\n`;
  } else {
    text += `📍 *Nodo Loma Verde (Escobar)*\n`;
  }
  text += `\n¡Hola vecinos! 👋 Tenemos este cajón en llenado al *${share.percent}%*:\n\n`;
  text += `• *Cajón total:* ${share.totalKg} kg ($${formatMoney(share.pricePerKg)} / kg)\n`;
  text += `• *Faltan solo:* ${share.remainingKg} kg para completarlo y despacharlo\n\n`;
  text += `👉 *Sumate con los kilos que quieras acá:*\n`;
  text += `${shareUrl}\n\n`;
  text += `_¡Avisale a los vecinos para cerrar el cajón a precio directo de quinta!_`;

  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function joinCajonShareDirectly(productId) {
  closeCirculoTableroModal();
  if (AppState.currentView !== 'tierra') {
    navigateTo('tierra');
  }
  switchTierraTab('tienda');
  setTimeout(() => {
    openFraccionarCajonModal(productId);
  }, 120);
}

function renderCirculoSharesDashboard() {
  const container = document.getElementById('circulo-shares-container');
  if (!container) return;

  const activeCircleId = (typeof CirculosManager !== 'undefined') ? CirculosManager.getActiveCircleId() : null;
  if (!activeCircleId) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  const circle = CirculosManager.getCircle(activeCircleId);
  if (!circle) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  // Obtener cajones compartidos de este círculo
  const allShares = (typeof CajonesManager !== 'undefined') ? CajonesManager.getSharesForCircle(activeCircleId) : [];
  const openShares = allShares.filter(s => s.status === 'abierto' && s.remainingKg > 0);
  const closedShares = allShares.filter(s => s.status === 'completo' || s.remainingKg <= 0);

  container.classList.remove('hidden');

  let html = `
    <div class="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-stone-50 rounded-3xl p-4 sm:p-5 border-2 border-amber-300/80 shadow-sm relative overflow-hidden">
      <!-- Decoración de fondo -->
      <div class="absolute -right-6 -bottom-6 text-7xl opacity-10 pointer-events-none select-none">🧺</div>

      <!-- Cabecera del Panel -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-amber-200/60 mb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-black uppercase tracking-wider bg-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
              🧺 Compras Colectivas
            </span>
            <span class="text-xs font-bold text-stone-600">
              Círculo: <strong class="text-stone-900">${escapeHtml(circle.nombre)}</strong>
            </span>
          </div>
          <h3 class="text-base sm:text-lg font-black text-stone-900 mt-1">
            Cajones Compartidos en Curso de tus Vecinos
          </h3>
          <p class="text-xs text-stone-600">
            Juntamos kilos entre vecinos para pedir cajones agroecológicos directos de Chasqui a precio mayorista.
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button 
            type="button" 
            onclick="openCirculoTableroModal('${circle.id}')" 
            class="btn-spotify !py-2 !px-3 text-xs font-black bg-stone-900 text-white hover:bg-stone-800 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span>📊</span> Tablero (${(circle.pedidos || []).length})
          </button>
        </div>
      </div>
  `;

  if (openShares.length > 0) {
    html += `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        ${openShares.map(s => {
          const prod = (typeof CAJONES_CENTRAL_COOPERATIVA !== 'undefined') ? CAJONES_CENTRAL_COOPERATIVA.find(p => p.id === s.productId) : null;
          const cleanName = prod ? ((typeof getProductCleanName === 'function') ? getProductCleanName(prod) : prod.name) : s.productName;
          const emoji = (prod && prod.emoji) ? prod.emoji : '🧺';
          const participantsText = (s.participantes && s.participantes.length > 0)
            ? s.participantes.map(p => `${p.name} (${p.kg} kg)`).join(', ')
            : 'Un vecino';

          return `
            <div class="bg-white rounded-2xl p-3.5 border-2 border-amber-300 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <!-- Top info -->
                <div class="flex items-start justify-between gap-2 mb-2">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-2xl shrink-0">${emoji}</span>
                    <div class="min-w-0">
                      <h4 class="font-black text-sm text-stone-900 truncate leading-tight">${escapeHtml(cleanName)}</h4>
                      <p class="text-[11px] text-stone-500 font-medium">Quinta: ${escapeHtml(s.producer || 'Agroecológica')} · Total: ${s.totalKg} kg</p>
                    </div>
                  </div>
                  <span class="shrink-0 text-[11px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                    ¡Faltan ${s.remainingKg} kg!
                  </span>
                </div>

                <!-- Barra de progreso -->
                <div class="mb-2">
                  <div class="flex items-center justify-between text-[11px] font-bold mb-1">
                    <span class="text-stone-700">${s.coveredKg} kg pedidos (${s.percent}%)</span>
                    <span class="text-emerald-700 font-black">$${formatMoney(s.pricePerKg)} / kg</span>
                  </div>
                  <div class="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                    <div class="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300" style="width: ${s.percent}%;"></div>
                  </div>
                </div>

                <!-- Participantes -->
                <div class="text-[11px] text-stone-600 bg-stone-50 rounded-xl px-2.5 py-1.5 border border-stone-200 mb-3 flex items-center gap-1.5">
                  <span class="shrink-0 font-bold text-stone-700">👥 Sumados:</span>
                  <span class="truncate">${escapeHtml(participantsText)}</span>
                </div>
              </div>

              <!-- Botones de Acción -->
              <div class="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                <button 
                  type="button" 
                  onclick="openFraccionarCajonModal('${s.productId}')" 
                  class="btn-spotify !py-2 !px-2.5 text-xs font-black !bg-emerald-600 hover:!bg-emerald-700 !text-white flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  <span>➕ Sumarme</span>
                  <span class="hidden sm:inline">(${s.remainingKg} kg)</span>
                </button>
                <button 
                  type="button" 
                  onclick="shareCajonWhatsAppFromCard('${s.id}')" 
                  class="btn-spotify !py-2 !px-2.5 text-xs font-bold !bg-white hover:!bg-amber-50 !text-stone-800 border border-amber-300 flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                  title="Avisar a los vecinos por WhatsApp"
                >
                  <span>📲 Avisar</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    html += `
      <div class="bg-white/80 rounded-2xl p-4 border border-stone-200 text-center mb-3">
        <p class="text-xl mb-1">🌱</p>
        <h4 class="font-black text-xs uppercase tracking-wider text-stone-800 mb-0.5">
          No hay cajones compartidos abiertos en este momento
        </h4>
        <p class="text-[11px] text-stone-500 max-w-md mx-auto">
          ¿Querés mandarina, manzana, tomate o papa? Hacé clic en <strong>Dividir (½ o ⅓)</strong> en cualquier cajón del catálogo para pedir tu parte y abrirlo para que otros vecinos se sumen.
        </p>
      </div>
    `;
  }

  if (closedShares.length > 0) {
    html += `
      <div class="flex items-center justify-between text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 px-3.5 py-2 rounded-2xl">
        <span class="font-bold flex items-center gap-1.5">
          <span>🎉</span> <strong>${closedShares.length} cajón(es) cerrado(s) al 100%</strong> listo(s) para pedir a la quinta.
        </span>
        <button 
          type="button" 
          onclick="openCirculoTableroModal('${circle.id}')" 
          class="font-black underline text-emerald-800 hover:text-emerald-950 text-[11px] cursor-pointer"
        >
          Ver en Tablero →
        </button>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function handleDirectCajonOpening(cajonParam, shareParam) {
  setTimeout(() => {
    let targetProd = null;

    if (cajonParam && typeof CAJONES_CENTRAL_COOPERATIVA !== 'undefined') {
      const q = String(cajonParam).toLowerCase().trim();
      targetProd = CAJONES_CENTRAL_COOPERATIVA.find(p => 
        p.id.toLowerCase() === q ||
        (p.slug && p.slug.toLowerCase() === q) ||
        (typeof getProductSlug === 'function' && getProductSlug(p) === q) ||
        p.name.toLowerCase().includes(q)
      );
    } else if (shareParam && typeof CajonesManager !== 'undefined') {
      const share = CajonesManager.getAllShares().find(s => s.id === shareParam);
      if (share && typeof CAJONES_CENTRAL_COOPERATIVA !== 'undefined') {
        targetProd = CAJONES_CENTRAL_COOPERATIVA.find(p => p.id === share.productId);
      }
    }

    if (targetProd) {
      openFraccionarCajonModal(targetProd.id);
      sounds.playPop();
      const card = document.getElementById(`prod-card-${targetProd.id}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('ring-4', 'ring-emerald-400');
        setTimeout(() => card.classList.remove('ring-4', 'ring-emerald-400'), 2500);
      }
    }
  }, 400);
}

// Interceptar rueda del ratón para scroll horizontal fluido en la subnavegación de escritorio
function initSubnavHorizontalScroll() {
  const subnav = document.querySelector('.google-subnav');
  if (!subnav) return;
  subnav.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      subnav.scrollLeft += e.deltaY;
    }
  }, { passive: false });
}

// Escuchar cambios de hash (ej. si el usuario escribe o hace clic en #admin)
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#admin') {
    selectInitialRole('gestor');
  }
});


// 4. RENDERIZADO DE LA VIDRIERA DE OFICIOS
function renderOficios(categoryFilter = null) {
  const container = document.getElementById('oficios-grid-container');
  if (!container) return;

  let oficios = BarrioStorage.getOficios();
  if (categoryFilter && categoryFilter !== 'todos') {
    oficios = oficios.filter(o => o.rubro.toLowerCase().includes(categoryFilter.toLowerCase()));
  }

  container.innerHTML = oficios.map(o => `
    <div class="bg-white rounded-3xl border border-stone-200 hover:border-[#8ca15d]/50 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-3">
            <span class="w-12 h-12 rounded-2xl bg-[#f4f6ef] border border-[#c2d49e]/50 flex items-center justify-center text-2xl shadow-xs">
              ${o.icono || '🔧'}
            </span>
            <div>
              <h3 class="font-black text-base text-stone-900">${o.nombre}</h3>
              <p class="text-xs text-[#75894b] font-bold">${o.rubro}</p>
            </div>
          </div>
          <span class="badge-referenciado shrink-0" title="Verificado por el Centro Comunitario">
            ✓ Referenciado
          </span>
        </div>

        <p class="text-xs text-stone-600 leading-relaxed mb-4">
          ${o.descripcion}
        </p>

        <div class="bg-stone-50 p-3 rounded-2xl border border-stone-100 text-xs space-y-1 mb-4">
          <div class="flex items-center justify-between text-stone-700 font-medium">
            <span>📍 Zona:</span>
            <span class="font-bold text-stone-900">${o.zona}</span>
          </div>
          <div class="flex items-center justify-between text-stone-700 font-medium">
            <span>⏳ Experiencia:</span>
            <span class="font-bold text-stone-900">${o.aniosBarrio}</span>
          </div>
          <div class="flex items-center justify-between text-stone-700 font-medium">
            <span>⭐ Reseñas:</span>
            <span class="font-bold text-amber-700">${o.calificacion || '5.0'} (${o.referencias || 12} vecinos de La Lucila)</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-1 mb-4">
          ${(o.badges || ['Referenciado Centro Elementales']).map(b => `
            <span class="text-[10px] font-bold bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full border border-stone-200">
              ${b}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
        <span class="text-xs text-stone-500 font-semibold">📞 ${o.telefono || '+54 9 11 ...'}</span>
        <a 
          href="https://wa.me/${o.telefonoRaw || '5491144001122'}?text=${encodeURIComponent('Hola ' + o.nombre + '! Te contacto desde la Vidriera de Oficios del Centro Comunitario Elementales La Lucila.')}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-spotify !bg-[#25D366] hover:!bg-[#1ebc59] !text-white text-xs font-bold px-4 py-2 shadow-xs inline-flex items-center gap-1.5"
        >
          <span>💬</span>
          <span>Escribir por WhatsApp</span>
        </a>
      </div>
    </div>
  `).join('');
}

function filterOficiosByCategory(cat) {
  sounds.playPop();
  activeOficioCategory = cat;
  document.querySelectorAll('.oficio-cat-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-stone-900', 'text-white');
    btn.classList.add('bg-white', 'text-stone-700');
  });
  event.target.classList.add('active', 'bg-stone-900', 'text-white');
  event.target.classList.remove('bg-white', 'text-stone-700');
  renderOficios(cat);
}

// 5. RENDERIZADO DEL FEED DE WHATSAPP
function renderWhatsAppFeed() {
  const container = document.getElementById('whatsapp-feed-list');
  if (!container) return;

  const avisos = BarrioStorage.getAvisosWA();

  container.innerHTML = avisos.map(a => `
    <div class="wa-bubble ${a.esAlerta ? 'alert-bubble' : 'agua-bubble'}">
      <div class="flex items-start justify-between gap-3 mb-2">
        <div class="flex items-center gap-2">
          <span class="text-xl">${a.icono || '💬'}</span>
          <div>
            <h4 class="font-bold text-sm text-stone-900">${a.emisor}</h4>
            <span class="text-[11px] text-stone-500 font-semibold">${a.grupo}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${a.esAlerta ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
            ${a.badge || 'Aviso'}
          </span>
          <span class="text-xs text-stone-400 font-medium">${a.fecha}</span>
        </div>
      </div>

      <p class="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
        ${a.texto}
      </p>

      <div class="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
        <span class="text-stone-400 text-[11px]">Enviado desde WhatsApp Barrial</span>
        <a 
          href="https://wa.me/5491123456789?text=${encodeURIComponent('Hola! Vi el aviso de ' + a.emisor + ' en el portal de La Lucila: ' + a.texto)}"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#a6634f] font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>Responder en el grupo →</span>
        </a>
      </div>
    </div>
  `).join('');
}

// 6. RENDERIZADO DE NOTICIAS DE GOOGLE & LA LUCILA
function renderNoticias() {
  const container = document.getElementById('noticias-grid-container');
  if (!container) return;

  const noticias = typeof NOTICIAS_BARRIO_INICIALES !== 'undefined' ? NOTICIAS_BARRIO_INICIALES : [];

  container.innerHTML = noticias.map(n => `
    <div class="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div class="h-44 w-full overflow-hidden bg-stone-100 relative">
        <img src="${n.imagen}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="${n.titulo}" />
        <span class="absolute top-3 right-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white border border-white/20">
          ${n.etiqueta}
        </span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-[11px] text-stone-400 font-bold mb-1.5">
            <span>${n.fuente}</span>
            <span>${n.fecha}</span>
          </div>
          <h3 class="font-black text-base text-stone-900 leading-snug mb-2">${n.titulo}</h3>
          <p class="text-xs text-stone-600 leading-relaxed mb-4">${n.resumen}</p>
        </div>

        <a 
          href="${n.enlaceGoogle}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#fcf4f0] hover:bg-[#faede7] text-[#a6634f] text-xs font-bold border border-[#c0826d]/30 transition-all"
        >
          <span>Ver búsqueda en Google Noticias</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  `).join('');
}

// 7. RENDERIZADO DE TALLERES DE VECINOS
function renderTalleres() {
  const container = document.getElementById('talleres-grid-container');
  if (!container) return;

  const talleres = BarrioStorage.getTalleres();

  container.innerHTML = talleres.map(t => `
    <div class="bg-white rounded-3xl border border-stone-200 hover:border-[#7ca1b5]/50 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div>
        <div class="flex items-start gap-3 mb-2">
          <span class="w-11 h-11 rounded-2xl bg-[#f2f6f9] border border-[#b4cfdf]/50 flex items-center justify-center text-2xl shadow-xs shrink-0">
            ${t.icono || '🌱'}
          </span>
          <div class="min-w-0 flex-1">
            <h3 class="font-black text-sm sm:text-base text-stone-900 leading-tight">${t.titulo}</h3>
            <p class="text-xs text-[#52778c] font-bold mt-0.5">Dictado por: ${t.tallerista}</p>
          </div>
        </div>

        <!-- Badge cupos en fila propia para no desbordar -->
        <div class="mb-3">
          <span class="inline-flex items-center text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
            🎟️ ${t.cupos}
          </span>
        </div>

        <p class="text-xs text-stone-600 leading-relaxed mb-4">
          ${t.descripcion}
        </p>

        <div class="bg-stone-50 p-3 rounded-2xl border border-stone-100 text-xs space-y-1.5 mb-4">
          <div class="flex items-center gap-2 text-stone-700">
            <span>📅</span>
            <span class="font-bold text-stone-900">${t.fecha}</span>
          </div>
          <div class="flex items-center gap-2 text-stone-700">
            <span>📍</span>
            <span class="font-semibold">${t.lugar}</span>
          </div>
          <div class="flex items-center gap-2 text-stone-700">
            <span>⏳</span>
            <span>Duración: ${t.duracion} • Contribución: ${t.contribucion}</span>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
        <span class="text-[11px] text-stone-400">Cupos limitados</span>
        <a 
          href="https://wa.me/${t.telefonoContacto || '5491133221100'}?text=${encodeURIComponent('Hola! Quiero anotarme al taller de ' + t.titulo + ' en La Lucila.')}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-spotify !bg-[#7ca1b5] hover:!bg-[#668fa6] !text-white text-xs font-bold px-4 py-2 shadow-xs inline-flex items-center gap-1.5 shrink-0"
        >
          <span>Anotarme por WhatsApp</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `).join('');
}

// 8. RENDERIZADO DEL CENTRO COMUNITARIO ELEMENTALES (LA LUCILA)
function renderCentroLucila() {
  const gridGuardianes = document.getElementById('guardianes-lucila-grid');
  const gridServicios = document.getElementById('servicios-oficina-grid');
  if (!gridGuardianes || typeof CENTRO_COMUNITARIO_LUCILA === 'undefined') return;

  const data = CENTRO_COMUNITARIO_LUCILA;

  gridGuardianes.innerHTML = data.guardianes.map(g => `
    <div class="bg-white rounded-3xl border border-stone-200 hover:border-[#c0826d]/40 p-5 shadow-xs transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-3 mb-3">
          <span class="w-12 h-12 rounded-full bg-[#fcf4f0] border border-[#c0826d]/30 flex items-center justify-center text-2xl shadow-xs">
            ${g.avatar}
          </span>
          <div>
            <h3 class="font-black text-base text-stone-900">${g.nombre}</h3>
            <span class="text-[11px] font-bold text-[#a6634f] bg-[#fcf4f0] px-2 py-0.5 rounded-full border border-[#c0826d]/25">
              ${g.apodo}
            </span>
          </div>
        </div>

        <h4 class="text-xs font-bold text-stone-800 mb-1.5">${g.rol}</h4>
        <p class="text-xs text-stone-600 leading-relaxed">
          ${g.descripcion}
        </p>
      </div>

      <div class="pt-3 border-t border-stone-100 mt-3 flex items-center justify-between text-xs">
        <span class="text-stone-400 font-semibold">Atiende en local</span>
        <a 
          href="https://wa.me/${data.telefonoRaw}?text=${encodeURIComponent('Hola ' + g.nombre + '! Te contacto desde el portal barrial de La Lucila.')}"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#a6634f] font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>Escribirle →</span>
        </a>
      </div>
    </div>
  `).join('');

  if (gridServicios) {
    gridServicios.innerHTML = data.serviciosOficina.map(s => `
      <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
        <span class="text-2xl shrink-0 mt-0.5">${s.icono}</span>
        <div>
          <h3 class="font-bold text-sm text-stone-900 mb-1">${s.titulo}</h3>
          <p class="text-xs text-stone-600 leading-relaxed">${s.detalle}</p>
        </div>
      </div>
    `).join('');
  }
}

// 9. RENDERIZADO DE PROYECTOS DE FINANCIAMIENTO
function renderFinanciamiento() {
  const container = document.getElementById('proyectos-grid-container');
  if (!container) return;

  const proyectos = BarrioStorage.getProyectos();

  container.innerHTML = proyectos.map(p => `
    <div class="bg-white rounded-3xl border border-stone-200 hover:border-[#d97757]/50 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-3">
            <span class="w-12 h-12 rounded-2xl bg-[#fdf4f0] border border-[#f2b5a2]/50 flex items-center justify-center text-2xl shadow-xs">
              ${p.icono || '💡'}
            </span>
            <div>
              <h3 class="font-black text-base text-stone-900 leading-tight">${p.titulo}</h3>
              <p class="text-xs text-[#b85b3d] font-bold mt-0.5">Impulsa: ${p.proponente}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200 shrink-0">
            ${p.estado}
          </span>
        </div>

        <p class="text-xs text-stone-600 leading-relaxed mb-4">
          ${p.descripcion}
        </p>

        <!-- Barra de Progreso de Financiamiento -->
        <div class="mb-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
          <div class="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
            <span>Recaudado: $${(p.montoRecaudado || 0).toLocaleString()}</span>
            <span class="text-[#d97757]">${p.porcentaje}%</span>
          </div>
          <div class="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-500 to-[#d97757] h-2.5 rounded-full transition-all duration-700" style="width: ${p.porcentaje}%"></div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-stone-500 mt-1.5">
            <span>Objetivo: $${(p.montoObjetivo || 0).toLocaleString()}</span>
            <span>${p.apoyos || 10} vecinos aportaron</span>
          </div>
        </div>

        <div class="text-xs bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 text-emerald-900 mb-4">
          <strong>Beneficio para La Lucila:</strong> ${p.beneficioBarrio || 'Mejora ambiental y social del barrio.'}
        </div>
      </div>

      <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <span class="text-[11px] text-stone-400">Micro-financiamiento ético</span>
        <a 
          href="https://wa.me/5491123456789?text=${encodeURIComponent('Hola Gonza y equipo! Quiero colaborar con financiamiento para el proyecto: ' + p.titulo)}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-spotify !bg-[#d97757] hover:!bg-[#c06345] !text-white text-xs font-bold px-4 py-2 shadow-xs inline-flex items-center gap-1.5"
        >
          <span>Aportar al Fondo</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `).join('');
}

// 10. GESTIÓN DEL MODAL "SUMAR AL BARRIO"
function openModalSumarAlBarrio(initialTab = 'producto') {
  sounds.playPop();
  const modal = document.getElementById('modal-sumar-barrio');
  if (modal) {
    modal.classList.remove('hidden');
    switchSumarTab(initialTab);
  }
}

function closeModalSumarAlBarrio() {
  const modal = document.getElementById('modal-sumar-barrio');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function switchSumarTab(tabName) {
  sounds.playPop();
  document.querySelectorAll('.sumar-tab-pane').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(`tab-content-${tabName}`);
  if (target) target.classList.remove('hidden');

  const tabs = ['producto', 'inquietud', 'oficio', 'proyecto'];
  tabs.forEach(t => {
    const btn = document.getElementById(`btn-tab-modal-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all bg-white text-stone-900 shadow-xs text-center';
      } else {
        btn.className = 'flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-stone-600 hover:text-stone-900 text-center';
      }
    }
  });
}

// MANEJADORES DE FORMULARIOS DEL MODAL SUMAR AL BARRIO
function handleSubirProducto(e) {
  e.preventDefault();
  sounds.playSuccess();

  const nombre = document.getElementById('sumar-prod-nombre').value.trim();
  const categoria = document.getElementById('sumar-prod-categoria').value;
  const precio = Number(document.getElementById('sumar-prod-precio').value) || 0;
  const productor = document.getElementById('sumar-prod-productor').value.trim();
  const whatsapp = document.getElementById('sumar-prod-whatsapp').value.trim();
  const desc = document.getElementById('sumar-prod-desc').value.trim();

  const nuevoProd = {
    id: 'prod-barrio-' + Date.now(),
    name: nombre,
    category: categoria,
    price: precio,
    precioLocal: precio,
    precioSemanal: Math.round(precio * 0.9),
    precioLunar: Math.round(precio * 0.8),
    unit: 'Unidad Artesanal',
    desc: desc ? `${desc} • Elaborado por ${productor}` : `Elaborado por ${productor} en La Lucila`,
    emoji: categoria.includes('Pan') ? '🥖' : categoria.includes('Lácteos') ? '🧀' : categoria.includes('Cosmética') ? '🧴' : '🧺',
    stock: 15,
    productor,
    whatsapp
  };

  BarrioStorage.saveProductoPropuesto(nuevoProd);
  AppState.products.unshift(nuevoProd);
  AppState.saveProducts();

  // Lanzar confeti
  try {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  } catch(err){}

  closeModalSumarAlBarrio();
  document.getElementById('form-sumar-producto').reset();

  alert(`¡Gracias ${productor}! Tu producto "${nombre}" fue sumado con éxito a la feria. Se abrirá WhatsApp para avisarle al Centro Comunitario en La Lucila.`);

  const msgWA = encodeURIComponent(`¡Hola Gonza, Agus, Rami, Cris y Ro! Acabo de cargar un producto para la venta comunitaria en el portal de La Lucila:\n\n*Producto:* ${nombre}\n*Categoría:* ${categoria}\n*Precio sugerido:* $${precio}\n*Elaborador:* ${productor}\n*Contacto:* ${whatsapp}\n*Detalles:* ${desc}`);
  window.open(`https://wa.me/5491123456789?text=${msgWA}`, '_blank');

  navigateTo('barrio');
}

function handleSubirInquietud(e) {
  e.preventDefault();
  sounds.playSuccess();

  const titulo = document.getElementById('sumar-inq-titulo').value.trim();
  const categoria = document.getElementById('sumar-inq-categoria').value;
  const vecino = document.getElementById('sumar-inq-vecino').value.trim() || 'Vecino de La Lucila';
  const detalle = document.getElementById('sumar-inq-detalle').value.trim();
  const propuesta = document.getElementById('sumar-inq-propuesta').value.trim();

  const nuevaInq = {
    id: 'inq-' + Date.now(),
    titulo,
    categoria,
    vecino,
    fecha: 'Recién cargada',
    estado: 'Ingresada al Centro',
    detalle,
    propuesta,
    apoyos: 1
  };

  BarrioStorage.saveInquietud(nuevaInq);

  // También se suma al feed de WhatsApp
  BarrioStorage.saveAvisoWA({
    id: 'wa-inq-' + Date.now(),
    grupo: 'Buzón Vecinal La Lucila',
    emisor: vecino,
    fecha: 'Hoy recién',
    elemento: 'aire',
    texto: `[Inquietud: ${titulo}] ${detalle}. ${propuesta ? 'Propuesta: ' + propuesta : ''}`,
    esAlerta: true,
    tipo: 'inquietud',
    icono: '📢',
    badge: 'Inquietud Barrial'
  });

  try {
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
  } catch(err){}

  closeModalSumarAlBarrio();
  document.getElementById('form-sumar-inquietud').reset();

  alert(`¡Inquietud registrada! Ya está visible en el portal barrial y el Centro Comunitario la sumará a los temas vecinales.`);

  const msgWA = encodeURIComponent(`Hola equipo del Centro Comunitario (Gonza, Agus, Rami, Cris, Ro): Cargué una inquietud en el buzón barrial:\n\n*Tema:* ${titulo}\n*Detalle:* ${detalle}\n*Propuesta:* ${propuesta}\n*Vecino:* ${vecino}`);
  window.open(`https://wa.me/5491123456789?text=${msgWA}`, '_blank');

  navigateTo('barrio');
}

function handleSubirOficio(e) {
  e.preventDefault();
  sounds.playSuccess();

  const nombre = document.getElementById('sumar-oficio-nombre').value.trim();
  const rubro = document.getElementById('sumar-oficio-rubro').value.trim();
  const zona = document.getElementById('sumar-oficio-zona').value.trim();
  const whatsapp = document.getElementById('sumar-oficio-whatsapp').value.trim();
  const desc = document.getElementById('sumar-oficio-desc').value.trim();

  const nuevoOficio = {
    id: 'oficio-' + Date.now(),
    nombre,
    rubro,
    elemento: 'tierra',
    icono: rubro.toLowerCase().includes('carp') ? '🪚' : rubro.toLowerCase().includes('elec') ? '⚡' : '🔧',
    zona,
    aniosBarrio: 'Vecino de La Lucila',
    telefono: whatsapp,
    telefonoRaw: whatsapp.replace(/\D/g, ''),
    descripcion: desc || 'Servicios profesionales y arreglo vecinal en La Lucila.',
    referencias: 1,
    calificacion: 5.0,
    referenciadoPorCentro: true,
    badges: ['Vecino Recomendado', 'En Vidriera']
  };

  BarrioStorage.saveOficio(nuevoOficio);

  try {
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
  } catch(err){}

  closeModalSumarAlBarrio();
  document.getElementById('form-sumar-oficio').reset();

  alert(`¡Genial ${nombre}! Tu oficio ya fue publicado en la Vidriera del Barrio.`);
  navigateTo('oficios');
}

function handleSubirProyecto(e) {
  e.preventDefault();
  sounds.playSuccess();

  const titulo = document.getElementById('sumar-proy-titulo').value.trim();
  const elemento = document.getElementById('sumar-proy-elemento').value;
  const monto = Number(document.getElementById('sumar-proy-monto').value) || 200000;
  const desc = document.getElementById('sumar-proy-desc').value.trim();

  const nuevoProy = {
    id: 'proy-' + Date.now(),
    titulo,
    proponente: 'Vecino de La Lucila',
    elemento,
    icono: elemento === 'tierra' ? '🌱' : elemento === 'fuego' ? '💡' : elemento === 'agua' ? '💧' : '📚',
    estado: 'Presentado al Nodo',
    porcentaje: 10,
    montoObjetivo: monto,
    montoRecaudado: Math.round(monto * 0.1),
    apoyos: 1,
    descripcion: desc,
    beneficioBarrio: 'Impacto comunitario directo en La Lucila.'
  };

  BarrioStorage.saveProyecto(nuevoProy);

  try {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  } catch(err){}

  closeModalSumarAlBarrio();
  document.getElementById('form-sumar-proyecto').reset();

  alert(`¡Proyecto presentado! Se notificará al Centro Comunitario para evaluar el apoyo del fondo barrial.`);

  const msgWA = encodeURIComponent(`Hola Gonza, Agus, Rami, Cris y Ro! Presenté un proyecto para recibir financiamiento barrial:\n\n*Título:* ${titulo}\n*Elemento:* ${elemento}\n*Monto estimado:* $${monto}\n*Descripción:* ${desc}`);
  window.open(`https://wa.me/5491123456789?text=${msgWA}`, '_blank');

  navigateTo('financiamiento');
}

// 11. MODAL EXPLICATIVO DE CADA ELEMENTO
function openElementInfoModal(elementId) {
  sounds.playPop();
  if (typeof ELEMENTOS_BARRIO === 'undefined') return;

  const elem = ELEMENTOS_BARRIO.find(e => e.id === elementId);
  if (!elem) return;

  const modal = document.getElementById('modal-element-info');
  const img = document.getElementById('elem-modal-icon');
  const title = document.getElementById('elem-modal-title');
  const subtitle = document.getElementById('elem-modal-subtitle');
  const desc = document.getElementById('elem-modal-desc');
  const role = document.getElementById('elem-modal-role');
  const filterBtn = document.getElementById('elem-modal-filter-btn');

  if (img) img.src = elem.iconUrl;
  if (title) title.innerHTML = `${elem.emoji} ${elem.name}`;
  if (subtitle) subtitle.textContent = elem.subtitulo;
  if (desc) desc.textContent = elem.descripcion;
  if (role) role.textContent = elem.rolComunitario;
  if (filterBtn) {
    filterBtn.onclick = () => {
      modal.classList.add('hidden');
      selectElementFilter(elem.id);
    };
  }

  if (modal) modal.classList.remove('hidden');
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
  try {
    const savedCajonShares = localStorage.getItem('elementales_cajon_shares_cart');
    if (savedCajonShares) {
      AppState.cajonSharesInCart = JSON.parse(savedCajonShares);
    }
  } catch (e) {
    AppState.cajonSharesInCart = [];
  }
  updateRoleUI();
  updateNodeUI();
  document.body.addEventListener('click', () => sounds.init(), { once: true });
  
  // Cargar notas guardadas del nodo
  const notasGuardadas = localStorage.getItem('eter_notas_internas');
  if (notasGuardadas) {
    const ta = document.getElementById('eter-notas-internas');
    if (ta) ta.value = notasGuardadas;
  }
  
  // Detección de autenticación inicial / hash de admin directo / Círculo compartido / Cajón compartido directo
  const urlParams = new URLSearchParams(window.location.search);
  const pathParts = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').split('/');
  let pathNodo = null;
  let pathCirculo = null;
  let pathCajon = null;
  let pathShare = null;

  if (pathParts[0] === 'nodo' && pathParts[1]) {
    pathNodo = pathParts[1];
  } else if (pathParts[0] === 'circulo' && pathParts[1]) {
    pathCirculo = pathParts[1];
  } else if (pathParts[0] === 'cajon' && pathParts[1]) {
    pathCajon = pathParts[1];
  } else if (pathParts[0] === 'compartido' && pathParts[1]) {
    pathShare = pathParts[1];
  } else if (['lomaverde', 'nodo-lomaverde', 'cooperativa', 'chasqui', 'nodo-cooperativa'].includes(pathParts[0])) {
    pathNodo = 'nodo-lomaverde';
  } else if (pathParts[0] && !pathParts[0].includes('.')) {
    pathCirculo = pathParts[0];
  }

  const circuloParam = urlParams.get('c') || urlParams.get('circulo') || pathCirculo || (window.location.hash.includes('c=') ? window.location.hash.split('c=')[1] : null) || (window.location.hash.includes('circulo=') ? window.location.hash.split('circulo=')[1] : null);
  const isCirculosPilot = urlParams.has('circulos') || urlParams.get('seccion') === 'circulos' || window.location.hash === '#circulos';
  const nodoParam = urlParams.get('nodo') || pathNodo;
  const cajonParam = urlParams.get('cajon') || pathCajon;
  const shareParam = urlParams.get('share') || pathShare;

  // Nodo Loma Verde es el único nodo activo en el sistema
  AppState.activeNodeId = 'nodo-lomaverde';
  localStorage.setItem('elementales_active_node', 'nodo-lomaverde');
  currentCirculosFilter = 'nodo-lomaverde';

  if (circuloParam && typeof CirculosManager !== 'undefined') {
    let found = CirculosManager.getCircle(circuloParam);
    if (!found) {
      found = CirculosManager.registerCircleFromParams(urlParams);
    }
    if (found) {
      CirculosManager.setActiveCircleId(found.id);
      AppState.activeNodeId = found.nodoId || 'nodo-lomaverde';
      currentCirculosFilter = found.nodoId || 'nodo-lomaverde';
      AppState.catalogMode = (found.modalidad === 'lunar') ? 'lunar' : 'semanal';
      sessionStorage.setItem('elementales_authenticated', 'true');

      // Limpiar la barra del navegador dejando la ruta /circulo/nombre-circulo
      const cleanSlug = found.slug || found.id;
      const cleanQuery = cajonParam ? `?cajon=${encodeURIComponent(cajonParam)}` : (shareParam ? `?share=${encodeURIComponent(shareParam)}` : '');
      try {
        if (window.history && window.history.replaceState) {
          window.history.replaceState({ view: 'tierra', circuloId: found.id, nodeId: found.nodoId }, '', '/circulo/' + cleanSlug + cleanQuery);
        }
      } catch (e) {}

      updateRoleUI();
      updateNodeUI();
      navigateTo('tierra', false);
      renderCirculoStoreBanner();
      renderOrderCatalog();

      if (cajonParam || shareParam) {
        handleDirectCajonOpening(cajonParam, shareParam);
      }
      return;
    }
  }

  // Si viene enlace directo a un cajón o cajón compartido sin círculo, abrir Tienda Loma Verde y modal directo
  if (cajonParam || shareParam) {
    sessionStorage.setItem('elementales_authenticated', 'true');
    if (typeof CirculosManager !== 'undefined') {
      CirculosManager.setActiveCircleId(null);
    }

    const cleanQuery = cajonParam ? `?cajon=${encodeURIComponent(cajonParam)}` : `?share=${encodeURIComponent(shareParam)}`;
    try {
      if (window.history && window.history.replaceState) {
        window.history.replaceState({ view: 'tierra', nodeId: 'nodo-lomaverde' }, '', '/nodo/lomaverde' + cleanQuery);
      }
    } catch (e) {}

    updateRoleUI();
    updateNodeUI();
    navigateTo('tierra', false);
    renderCirculoStoreBanner();
    renderOrderCatalog();

    handleDirectCajonOpening(cajonParam, shareParam);
    return;
  }

  if (isCirculosPilot) {
    sessionStorage.setItem('elementales_authenticated', 'true');
    updateRoleUI();
    updateNodeUI();
    navigateTo('circulos', false);
    renderCirculosView();
    return;
  }

  const isAuth = sessionStorage.getItem('elementales_authenticated') === 'true';
  if (window.location.hash === '#admin') {
    AppState.userRole = 'gestor';
    sessionStorage.setItem('elementales_authenticated', 'true');
    sessionStorage.setItem('elementales_gestor_auth', 'true');
    updateRoleUI();
    updateNodeUI();
    navigateTo('barrio', false);
  } else if (!isAuth) {
    if (typeof CirculosManager !== 'undefined') {
      CirculosManager.setActiveCircleId(null);
    }
    navigateTo('landing', false);
    selectLandingNode(AppState.activeNodeId || 'nodo-lomaverde');
  } else {
    if (typeof CirculosManager !== 'undefined' && !circuloParam) {
      CirculosManager.setActiveCircleId(null);
    }
    navigateTo('barrio', false);
    renderCirculoStoreBanner();
  }
});

// --- MANEJO DE NAVEGACIÓN ATRÁS / ADELANTE DEL NAVEGADOR (SPA SIN RECARGA) ---
window.addEventListener('popstate', (e) => {
  const state = e.state;
  const path = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  if (state && state.view) {
    if (state.nodeId && state.nodeId !== AppState.activeNodeId) {
      AppState.activeNodeId = state.nodeId;
      localStorage.setItem('elementales_active_node', state.nodeId);
      updateNodeUI();
    }
    if (state.circuloId) {
      if (typeof CirculosManager !== 'undefined') {
        CirculosManager.setActiveCircleId(state.circuloId);
      }
    } else {
      if (typeof CirculosManager !== 'undefined') {
        CirculosManager.setActiveCircleId(null);
      }
    }
    navigateTo(state.view, false);
    if (state.view === 'landing') {
      selectLandingNode(AppState.activeNodeId || 'nodo-lomaverde');
    }
    return;
  }

  // Fallback si el usuario navegó a una URL directa o sin state previo
  if (!path || path === '') {
    if (typeof CirculosManager !== 'undefined') {
      CirculosManager.setActiveCircleId(null);
    }
    navigateTo('landing', false);
    selectLandingNode(AppState.activeNodeId || 'nodo-lomaverde');
    return;
  }

  const parts = path.split('/');

  // Rutas con prefijo /nodo/...
  if (parts[0] === 'nodo' && parts[1]) {
    const nSlug = parts[1];
    let matchedId = 'nodo-lomaverde';

    AppState.activeNodeId = matchedId;
    localStorage.setItem('elementales_active_node', matchedId);
    currentCirculosFilter = matchedId;
    if (typeof CirculosManager !== 'undefined') CirculosManager.setActiveCircleId(null);
    updateNodeUI();
    if (searchParams.get('seccion') === 'circulos') {
      navigateTo('circulos', false);
    } else {
      navigateTo('barrio', false);
    }
    return;
  }

  // Rutas con prefijo /circulo/...
  if (parts[0] === 'circulo' && parts[1] && typeof CirculosManager !== 'undefined') {
    const circle = CirculosManager.getCircle(parts[1]);
    if (circle) {
      CirculosManager.setActiveCircleId(circle.id);
      AppState.activeNodeId = circle.nodoId;
      currentCirculosFilter = circle.nodoId;
      updateNodeUI();
      navigateTo('tierra', false);
      renderCirculoStoreBanner();
      renderOrderCatalog();
      return;
    }
  }

  // Compatibilidad con rutas legacy sin prefijo (/lomaverde, /lucila, /cooperativa)
  if (path === 'lomaverde' || path === 'nodo-lomaverde') {
    AppState.activeNodeId = 'nodo-lomaverde';
    localStorage.setItem('elementales_active_node', 'nodo-lomaverde');
    currentCirculosFilter = 'nodo-lomaverde';
    if (typeof CirculosManager !== 'undefined') CirculosManager.setActiveCircleId(null);
    updateNodeUI();
    if (searchParams.get('seccion') === 'circulos') {
      navigateTo('circulos', false);
    } else {
      navigateTo('barrio', false);
    }
    return;
  }

  if (path === 'lucila' || path === 'nodo-lucila' || path === 'cooperativa' || path === 'chasqui' || path === 'nodo-cooperativa') {
    AppState.activeNodeId = 'nodo-lomaverde';
    localStorage.setItem('elementales_active_node', 'nodo-lomaverde');
    currentCirculosFilter = 'nodo-lomaverde';
    if (typeof CirculosManager !== 'undefined') CirculosManager.setActiveCircleId(null);
    updateNodeUI();
    navigateTo('barrio', false);
    return;
  }

  if (path === 'cooperativa' || path === 'chasqui' || path === 'nodo-cooperativa') {
    AppState.activeNodeId = 'nodo-cooperativa';
    localStorage.setItem('elementales_active_node', 'nodo-cooperativa');
    currentCirculosFilter = 'nodo-lomaverde';
    if (typeof CirculosManager !== 'undefined') CirculosManager.setActiveCircleId(null);
    updateNodeUI();
    if (searchParams.get('seccion') === 'circulos') {
      navigateTo('circulos', false);
    } else {
      navigateTo('barrio', false);
    }
    return;
  }

  if (typeof CirculosManager !== 'undefined') {
    const circle = CirculosManager.getCircle(path);
    if (circle) {
      CirculosManager.setActiveCircleId(circle.id);
      AppState.activeNodeId = circle.nodoId;
      currentCirculosFilter = circle.nodoId;
      updateNodeUI();
      navigateTo('tierra', false);
      renderCirculoStoreBanner();
      renderOrderCatalog();
      return;
    }
  }

  navigateTo('barrio', false);
});


// =========================================================================
// ÉTER CRM — PANEL INTERNO DEL NODO
// =========================================================================

function showEterModule(moduleName) {
  sounds.playPop();

  // Highlight del botón activo
  document.querySelectorAll('.eter-module-btn').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-[#c0826d]', 'border-[#c0826d]', 'bg-[#fdf4f0]');
    btn.classList.add('border-stone-200', 'bg-white');
  });
  const activeBtn = document.querySelector(`.eter-module-btn[data-module="${moduleName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('ring-2', 'ring-[#c0826d]', 'border-[#c0826d]', 'bg-[#fdf4f0]');
    activeBtn.classList.remove('border-stone-200', 'bg-white');
  }

  // Ocultar todos los paneles
  document.querySelectorAll('.eter-panel').forEach(p => p.classList.add('hidden'));
  const defaultPanel = document.getElementById('eter-panel-default');
  if (defaultPanel) defaultPanel.classList.add('hidden');

  // Mostrar panel activo
  const panel = document.getElementById(`eter-panel-${moduleName}`);
  if (panel) panel.classList.remove('hidden');

  // Cargar datos específicos del módulo
  if (moduleName === 'centro') renderCentroLucila();
  if (moduleName === 'membresia') renderEterMembresia();
  if (moduleName === 'economia') renderEterEconomia();
  if (moduleName === 'vrde') {
    renderCategoryManager();
    renderVRDEProducers();
  }
}

function renderEterMembresia() {
  const miembros = typeof AppState !== 'undefined' && AppState.getMiembros
    ? AppState.getMiembros()
    : JSON.parse(localStorage.getItem('elementales_members') || '[]');

  const activos = miembros.filter(m => m.activo !== false);
  const hoyMs = Date.now();
  const finMes = new Date();
  finMes.setDate(finMes.getDate() + 30);

  const vencenProx = activos.filter(m => {
    if (!m.fechaVencimiento) return false;
    const vence = new Date(m.fechaVencimiento).getTime();
    return vence >= hoyMs && vence <= finMes.getTime();
  });

  // Actualizar contadores
  const elActivos = document.getElementById('memb-activos');
  const elVencen = document.getElementById('memb-vencen');
  const elIngresos = document.getElementById('memb-ingresos');

  if (elActivos) elActivos.textContent = activos.length;
  if (elVencen) elVencen.textContent = vencenProx.length;
  if (elIngresos) {
    const total = activos.reduce((sum, m) => sum + (Number(m.montoCuota) || 0), 0);
    elIngresos.textContent = `$${total.toLocaleString('es-AR')}`;
  }

  // Listado de socios
  const lista = document.getElementById('memb-socios-list');
  if (!lista) return;
  if (activos.length === 0) {
    lista.innerHTML = '<p class="text-stone-400 text-center py-4">Sin socios registrados aún.</p>';
    return;
  }
  lista.innerHTML = activos.slice(0, 8).map(m => `
    <div class="flex items-center justify-between py-1.5 border-b border-stone-50 last:border-0">
      <div class="flex items-center gap-2 min-w-0">
        <span class="w-6 h-6 rounded-full bg-[#fcf4f0] border border-[#c0826d]/30 flex items-center justify-center text-xs font-black text-[#a6634f] shrink-0">
          ${(m.nombre || '?').charAt(0).toUpperCase()}
        </span>
        <span class="font-semibold text-stone-800 truncate">${m.nombre || 'Sin nombre'}</span>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-[10px] font-bold uppercase text-stone-500">${m.plan || 'Base'}</span>
        <span class="w-2 h-2 rounded-full ${m.activo !== false ? 'bg-emerald-500' : 'bg-stone-300'}"></span>
      </div>
    </div>
  `).join('');
  if (activos.length > 8) {
    lista.innerHTML += `<p class="text-xs text-stone-400 text-center pt-2">+${activos.length - 8} socios más en el directorio</p>`;
  }
}

function renderEterEconomia() {
  const movimientos = JSON.parse(localStorage.getItem('eter_movimientos') || '[]');
  const ingresos = movimientos.filter(m => m.tipo === 'ingreso').reduce((s, m) => s + Number(m.monto), 0);
  const egresos = movimientos.filter(m => m.tipo === 'egreso').reduce((s, m) => s + Number(m.monto), 0);
  const balance = ingresos - egresos;

  const elI = document.getElementById('eco-ingresos');
  const elE = document.getElementById('eco-egresos');
  const elB = document.getElementById('eco-balance');
  const elF = document.getElementById('eco-fondo');

  if (elI) elI.textContent = `$${ingresos.toLocaleString('es-AR')}`;
  if (elE) elE.textContent = `$${egresos.toLocaleString('es-AR')}`;
  if (elB) {
    elB.textContent = `$${balance.toLocaleString('es-AR')}`;
    elB.className = `text-xl font-black ${balance >= 0 ? 'text-blue-800' : 'text-red-800'}`;
  }
  if (elF) elF.textContent = `$${Math.max(0, Math.floor(ingresos * 0.1)).toLocaleString('es-AR')}`;

  const lista = document.getElementById('eco-movimientos-list');
  if (!lista) return;
  if (movimientos.length === 0) {
    lista.innerHTML = '<p class="text-stone-400 text-center py-4">Sin movimientos cargados aún.</p>';
    return;
  }
  lista.innerHTML = [...movimientos].reverse().slice(0, 10).map(m => `
    <div class="flex items-center justify-between py-1.5 border-b border-stone-50 last:border-0">
      <div class="flex items-center gap-2 min-w-0">
        <span class="text-sm shrink-0">${m.tipo === 'ingreso' ? '⬆️' : '⬇️'}</span>
        <span class="text-stone-700 truncate">${m.concepto || 'Sin concepto'}</span>
      </div>
      <span class="font-black text-xs shrink-0 ${m.tipo === 'ingreso' ? 'text-emerald-700' : 'text-red-600'}">
        ${m.tipo === 'ingreso' ? '+' : '-'}$${Number(m.monto).toLocaleString('es-AR')}
      </span>
    </div>
  `).join('');
}

function openEterMovimientoForm() {
  const concepto = prompt('Concepto del movimiento:');
  if (!concepto) return;
  const monto = prompt('Monto ($):');
  if (!monto || isNaN(Number(monto))) return;
  const tipo = confirm('¿Es un ingreso? OK = Ingreso | Cancelar = Egreso') ? 'ingreso' : 'egreso';

  const movimientos = JSON.parse(localStorage.getItem('eter_movimientos') || '[]');
  movimientos.push({ concepto, monto: Number(monto), tipo, fecha: new Date().toLocaleDateString('es-AR') });
  localStorage.setItem('eter_movimientos', JSON.stringify(movimientos));
  renderEterEconomia();
  sounds.playPop();
}

function openEterTareaForm() {
  const tarea = prompt('Descripción de la tarea o labor:');
  if (!tarea) return;
  const lista = document.getElementById('horas-tareas-list');
  if (!lista) return;
  const item = document.createElement('label');
  item.className = 'flex items-start gap-2 p-2 rounded-xl hover:bg-stone-50 cursor-pointer';
  item.innerHTML = `<input type="checkbox" class="mt-0.5 rounded shrink-0" /><span class="text-xs text-stone-700">${tarea}</span>`;
  lista.appendChild(item);
  sounds.playPop();
}

function openEterClaveForm() {
  alert('Para agregar claves, editá el listado directamente en el código del panel Éter o contactá a Rami como administrador del nodo.');
}

function saveEterNotas() {
  const ta = document.getElementById('eter-notas-internas');
  if (!ta) return;
  localStorage.setItem('eter_notas_internas', ta.value);
  sounds.playPop();
  // Feedback visual
  const btn = ta.nextElementSibling;
  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Guardado';
    btn.classList.add('text-emerald-700', 'bg-emerald-50', 'border-emerald-200');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('text-emerald-700', 'bg-emerald-50', 'border-emerald-200');
    }, 2000);
  }
}



// =========================================================================
// GESTIÓN DE CATEGORÍAS & CO-CREACIÓN CON VRDE CLUB (CRM NODO LA LUCILA)
// =========================================================================
function renderCategoryManager() {
  const container = document.getElementById('crm-categories-list');
  if (!container || typeof VRDEClubBridge === 'undefined') return;

  const categories = VRDEClubBridge.getCategories();
  container.innerHTML = categories.map(cat => {
    const isFixed = cat === 'Todos';
    const isProductor = cat === 'Productorxs Vecinales';
    return `
      <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
        isProductor
          ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
          : 'bg-stone-50 text-stone-700 border-stone-200'
      }">
        <span>${isProductor ? '🌾' : '🏷️'} ${escapeHtml(cat)}</span>
        ${!isFixed ? `
          <button 
            type="button" 
            onclick="removeCatalogCategory('${escapeHtml(cat)}')" 
            class="text-stone-400 hover:text-red-500 font-bold ml-1 transition-colors" 
            title="Eliminar categoría">
            ✕
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

function handleAddCategoryForm(e) {
  e.preventDefault();
  const input = document.getElementById('input-new-category');
  if (!input || !input.value.trim() || typeof VRDEClubBridge === 'undefined') return;

  const newCat = input.value.trim();
  const ok = VRDEClubBridge.addCategory(newCat);
  if (ok) {
    input.value = '';
    sounds.playSuccess();
    renderCategoryManager();
    renderOrderCatalog();
  } else {
    sounds.playPop();
    alert('La categoría ya existe o no es válida.');
  }
}

function removeCatalogCategory(cat) {
  if (typeof VRDEClubBridge === 'undefined') return;
  if (confirm(`¿Deseas eliminar la categoría "${cat}" del catálogo?`)) {
    VRDEClubBridge.removeCategory(cat);
    sounds.playPop();
    renderCategoryManager();
    renderOrderCatalog();
  }
}

async function syncCategoriesWithVRDE() {
  if (typeof VRDEClubBridge === 'undefined') return;
  sounds.playPop();
  
  const badge = document.getElementById('vrde-sync-badge-crm');
  if (badge) {
    badge.innerHTML = '🔄 Sincronizando con VRDE...';
    badge.className = 'text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-full';
  }

  const res = await VRDEClubBridge.syncCategoriesFromVRDE();
  
  if (badge) {
    badge.innerHTML = '🟢 Red VRDE Sincronizada';
    badge.className = 'text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full';
  }

  sounds.playSuccess();
  if (typeof confetti === 'function') {
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
  }

  renderCategoryManager();
  renderOrderCatalog();
}

function resetCatalogCategories() {
  if (typeof VRDEClubBridge === 'undefined') return;
  if (confirm('¿Restaurar las categorías del catálogo a los valores predeterminados de la Red VRDE Club?')) {
    VRDEClubBridge.resetCategories();
    sounds.playPop();
    renderCategoryManager();
    renderOrderCatalog();
  }
}

function renderVRDEProducers() {
  const container = document.getElementById('crm-vrde-producers-list');
  if (!container || typeof VRDEClubBridge === 'undefined') return;

  const producers = VRDEClubBridge.getProducers();
  if (producers.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-stone-400">
        <p class="text-3xl mb-2">🌾</p>
        <p class="font-bold text-sm">No hay productores barriales registrados aún</p>
        <p class="text-xs">Registra vecinos que elaboren alimentos para subirlos a VRDE Club.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = producers.map(p => {
    const isSynced = p.statusVRDE === 'synced';
    return `
      <div class="p-4 rounded-2xl border ${isSynced ? 'border-emerald-200 bg-emerald-50/40' : 'border-amber-200 bg-amber-50/30'} flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <h4 class="font-black text-sm text-stone-900">${escapeHtml(p.nombre)}</h4>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isSynced 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }">
              ${isSynced ? `🟢 Sincronizado en VRDE (${escapeHtml(p.vrdeId || 'VRDE')})` : '🟡 Pendiente de Subir'}
            </span>
          </div>

          <div class="text-xs text-stone-600 mb-2">
            <p class="font-bold text-[#8ca15d]">${escapeHtml(p.rubro)}</p>
            <p class="text-[11px] text-stone-500 mt-0.5">${escapeHtml(p.descripcion)}</p>
          </div>

          <div class="flex flex-wrap gap-1 mb-3">
            ${(p.productos || []).map(prod => `
              <span class="text-[10px] bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-semibold">
                ${escapeHtml(prod)}
              </span>
            `).join('')}
          </div>

          <div class="text-[11px] text-stone-500 space-y-0.5">
            <p>📍 ${escapeHtml(p.direccion || 'La Lucila')}</p>
            <p>📦 Capacidad: ${escapeHtml(p.capacidad || 'Flexible')}</p>
            ${p.contacto ? `<p>📱 WA: <a href="https://wa.me/${p.contacto}" target="_blank" class="text-emerald-700 underline font-bold">${p.contacto}</a></p>` : ''}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between">
          <span class="text-[10px] text-stone-400">
            ${isSynced && p.fechaSync ? `Sync: ${p.fechaSync}` : 'Disponible localmente'}
          </span>
          ${!isSynced ? `
            <button 
              type="button" 
              onclick="exportProducerToVRDE('${p.id}')" 
              class="btn-spotify !py-1.5 !px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-xs">
              <span>🚀</span> Subir a VRDE Club
            </button>
          ` : `
            <span class="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span>✓</span> Activo en Red Mayor
            </span>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function openAddProducerModal() {
  const modal = document.getElementById('modal-add-vrde-producer');
  if (modal) modal.classList.remove('hidden');
  sounds.playPop();
}

function closeAddProducerModal() {
  const modal = document.getElementById('modal-add-vrde-producer');
  if (modal) modal.classList.add('hidden');
}

function handleSaveVRDEProducer(e) {
  e.preventDefault();
  if (typeof VRDEClubBridge === 'undefined') return;

  const nombre = document.getElementById('vrde-prod-nombre')?.value;
  const contacto = document.getElementById('vrde-prod-contacto')?.value;
  const direccion = document.getElementById('vrde-prod-direccion')?.value;
  const rubro = document.getElementById('vrde-prod-rubro')?.value;
  const productos = document.getElementById('vrde-prod-productos')?.value;
  const capacidad = document.getElementById('vrde-prod-capacidad')?.value;
  const descripcion = document.getElementById('vrde-prod-descripcion')?.value;

  const newProd = VRDEClubBridge.addProducer({
    nombre,
    contacto,
    direccion,
    rubro,
    productos,
    capacidad,
    descripcion
  });

  closeAddProducerModal();
  sounds.playSuccess();
  renderVRDEProducers();
  renderOrderCatalog();

  // Reset form
  e.target.reset();
}

async function exportProducerToVRDE(producerId) {
  if (typeof VRDEClubBridge === 'undefined') return;
  sounds.playPop();

  try {
    const updated = await VRDEClubBridge.exportProducerToVRDE(producerId);
    sounds.playSuccess();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }
    renderVRDEProducers();
    renderOrderCatalog();
  } catch (err) {
    alert('Error al transferir productor a VRDE Club: ' + err.message);
  }
}


// =========================================================================
// SEGURIDAD & AUTENTICACIÓN PIN DE GESTOR DEL NODO
// =========================================================================
const GESTOR_ALLOWED_PINS = ['3450', '1234', 'elementales'];
let pendingGestorCallback = null;

function requestGestorAccess(onSuccess) {
  if (AppState.userRole === 'gestor' && sessionStorage.getItem('elementales_gestor_auth') === 'true') {
    if (typeof onSuccess === 'function') onSuccess();
    return;
  }
  pendingGestorCallback = onSuccess;
  sounds.playPop();
  const modal = document.getElementById('modal-admin-pin-auth');
  const input = document.getElementById('admin-pin-input');
  const err = document.getElementById('admin-pin-error');
  if (err) err.classList.add('hidden');
  if (input) input.value = '';
  if (modal) modal.classList.remove('hidden');
  setTimeout(() => { if (input) input.focus(); }, 150);
}

function closeAdminPinModal() {
  const modal = document.getElementById('modal-admin-pin-auth');
  if (modal) modal.classList.add('hidden');
  pendingGestorCallback = null;
}

function handleAdminPinSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('admin-pin-input');
  const err = document.getElementById('admin-pin-error');
  const val = (input?.value || '').trim();

  if (GESTOR_ALLOWED_PINS.includes(val)) {
    sessionStorage.setItem('elementales_gestor_auth', 'true');
    AppState.userRole = 'gestor';
    localStorage.setItem('elementales_user_role', 'gestor');
    AppState.catalogMode = 'semanal';
    localStorage.setItem('elementales_catalog_mode', 'semanal');
    closeAdminPinModal();
    closeRoleSwitcherModal();
    sounds.playSuccess();
    updateRoleUI();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
    if (typeof pendingGestorCallback === 'function') {
      const cb = pendingGestorCallback;
      pendingGestorCallback = null;
      cb();
    } else {
      navigateTo('eter');
      switchEterMainTab('gestion');
      showEterModule('elementos');
    }
  } else {
    sounds.playPop();
    if (err) {
      err.textContent = '❌ PIN incorrecto. Acceso reservado para el equipo del nodo.';
      err.classList.remove('hidden');
    }
    if (input) {
      input.value = '';
      input.focus();
    }
  }
}

function logoutGestor() {
  sounds.playPop();
  sessionStorage.removeItem('elementales_gestor_auth');
  AppState.userRole = 'visitante';
  localStorage.setItem('elementales_user_role', 'visitante');
  AppState.catalogMode = 'local';
  localStorage.setItem('elementales_catalog_mode', 'local');
  updateRoleUI();
  navigateTo('barrio');
}

function handleGestionNodoClick() {
  if (AppState.userRole === 'gestor' && sessionStorage.getItem('elementales_gestor_auth') === 'true') {
    switchEterMainTab('gestion');
  } else {
    requestGestorAccess(() => switchEterMainTab('gestion'));
  }
}

function handleRoleModalGestorClick() {
  closeRoleSwitcherModal();
  requestGestorAccess(() => {
    updateRoleUI();
  });
}

// =========================================================================
// SELECTOR DE NODO COMUNITARIO (LA LUCILA / LOMA VERDE)
// =========================================================================
function openNodeSelectorModal() {
  sounds.playPop();
  renderNodesModalList();
  const modal = document.getElementById('modal-node-selector');
  if (modal) modal.classList.remove('hidden');
}

function closeNodeSelectorModal() {
  const modal = document.getElementById('modal-node-selector');
  if (modal) modal.classList.add('hidden');
}

function renderNodesModalList() {
  const container = document.getElementById('nodes-modal-list');
  if (!container) return;

  const currentId = AppState.activeNodeId || 'nodo-lomaverde';
  container.innerHTML = NODOS_COMUNIDAD.map(node => {
    const isSelected = node.id === currentId;
    return `
      <div 
        onclick="selectNode('${node.id}')"
        class="p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
          isSelected 
            ? 'border-emerald-500 bg-emerald-50/50 shadow-xs' 
            : 'border-stone-200 hover:border-stone-400 bg-white'
        }"
      >
        <div class="flex items-start gap-3">
          <span class="text-2xl">${node.id === 'nodo-lomaverde' ? '🌿' : '🏡'}</span>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-black text-sm text-stone-900">${escapeHtml(node.name)}</h4>
              ${isSelected ? '<span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Activo</span>' : ''}
            </div>
            <p class="text-xs text-stone-500 mt-0.5">${escapeHtml(node.address)}</p>
            <p class="text-[11px] text-stone-400 mt-1">${escapeHtml(node.desc)}</p>
          </div>
        </div>
        <span class="text-xs font-bold text-stone-400">→</span>
      </div>
    `;
  }).join('');
}

function selectNode(nodeId) {
  AppState.activeNodeId = nodeId;
  localStorage.setItem('elementales_active_node', nodeId);
  currentCirculosFilter = nodeId;
  if (typeof CirculosManager !== 'undefined') {
    CirculosManager.setActiveCircleId(null);
  }
  const nodeSlug = nodeId.replace(/^nodo-/, '');
  try {
    if (window.history && window.history.pushState) {
      window.history.pushState({ view: AppState.currentView, nodeId: nodeId, circuloId: null }, '', '/nodo/' + nodeSlug);
    } else if (window.history && window.history.replaceState) {
      window.history.replaceState({ view: AppState.currentView, nodeId: nodeId, circuloId: null }, '', '/nodo/' + nodeSlug);
    }
  } catch (e) {}
  closeNodeSelectorModal();
  sounds.playSuccess();
  updateNodeUI();
  renderCirculoStoreBanner();
  if (AppState.currentView === 'barrio') renderBarrioFeed();
  if (AppState.currentView === 'tierra') renderOrderCatalog();
  if (AppState.currentView === 'circulos') renderCirculosView();
}

function updateNodeUI() {
  const node = NODOS_COMUNIDAD.find(n => n.id === AppState.activeNodeId) || NODOS_COMUNIDAD[0];
  const isLoma = node.id === 'nodo-lomaverde';
  const isCoop = node.id === 'nodo-cooperativa';

  // 1. Cabecera Minimalista
  const nameEl = document.getElementById('header-node-name');
  if (nameEl) {
    nameEl.textContent = 'Loma Verde';
  }

  const indicatorEl = document.getElementById('header-node-indicator');
  if (indicatorEl) {
    indicatorEl.textContent = 'Loma Verde · Escobar';
  }

  const badgeEl = document.getElementById('header-node-badge');
  if (badgeEl) {
    if (isLoma) {
      badgeEl.className = 'flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs border bg-emerald-100 text-emerald-950 border-emerald-400 hover:bg-emerald-200';
    } else {
      badgeEl.className = 'flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs border bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200';
    }
  }

  // 2. Perfil Limpio del Nodo en view-barrio (Estilo Spotify)
  const coverEl = document.getElementById('node-cover-image');
  if (coverEl) {
    coverEl.src = node.cover || (isLoma 
      ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200&h=400' 
      : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200&h=400');
  }

  const cityEl = document.getElementById('node-header-city');
  if (cityEl) {
    cityEl.textContent = 'Loma Verde';
  }

  const avatarEl = document.getElementById('node-avatar-image');
  if (avatarEl) {
    avatarEl.src = isLoma ? 'public/assets/brand/tierra_clean.png' : 'public/assets/brand/comunidad_emblem_clean.png';
  }

  const categoryTag = document.getElementById('node-category-tag');
  if (categoryTag) {
    categoryTag.textContent = isCoop ? 'Prueba Cajones Chasqui' : (node.circulosEnabled ? 'Círculos VRDE' : 'Sede Central');
  }

  const statusText = document.getElementById('node-status-text');
  if (statusText) {
    statusText.textContent = isCoop ? '📦 Pedidos de Cajón Abiertos' : (isLoma ? '🌿 Círculos Abiertos' : '🟢 Abierto Hoy');
  }

  const mainTitle = document.getElementById('node-main-title');
  if (mainTitle) {
    mainTitle.textContent = node.name || 'Centro Comunitario Elementales';
  }

  const addressChip = document.getElementById('node-address-chip');
  if (addressChip) {
    addressChip.textContent = `📍 ${node.address || 'Rawson 3450'}`;
  }

  const hoursChip = document.getElementById('node-hours-chip');
  if (hoursChip) {
    hoursChip.textContent = `⏰ ${node.time || '09:30 a 19:30 hs'}`;
  }

  const guardiansChip = document.getElementById('node-guardians-chip');
  if (guardiansChip) {
    guardiansChip.textContent = `👥 Atienden: ${node.guardian || 'Equipo del Nodo'}`;
  }

  const descText = document.getElementById('node-description-text');
  if (descText) {
    descText.textContent = node.desc || '';
  }

  const waLink = document.getElementById('node-whatsapp-link');
  if (waLink) {
    waLink.href = `https://wa.me/${node.phone || '5491123456789'}?text=${encodeURIComponent('Hola! Me contacto con el ' + (node.name || 'Nodo Elementales'))}`;
  }

  const currentRoleBadge = document.getElementById('node-current-role-badge');
  if (currentRoleBadge) {
    const role = AppState.userRole || 'visitante';
    if (role === 'gestor') {
      currentRoleBadge.innerHTML = '👑 Gestor';
      currentRoleBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm';
    } else if (role === 'socio') {
      currentRoleBadge.innerHTML = '💧 Socio CsC';
      currentRoleBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300 shadow-sm';
    } else {
      currentRoleBadge.innerHTML = '👤 Visitante';
      currentRoleBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-stone-900 border border-stone-200 shadow-sm';
    }
  }

  // 3. Control Modular de Funcionalidades y Modalidades según Node.features
  const feats = node.features || {
    showTienda: true,
    showLocal: true,
    showSemanal: true,
    showLunar: true,
    showCirculos: true,
    showAgua: true,
    showFuego: true,
    showAire: true,
    showEter: true
  };

  // Control de modalidades activas en catálogo
  if (feats.showLocal === false && AppState.catalogMode === 'local') {
    AppState.catalogMode = feats.showSemanal !== false ? 'semanal' : (feats.showLunar !== false ? 'lunar' : 'semanal');
    localStorage.setItem('elementales_catalog_mode', AppState.catalogMode);
  }
  if (feats.showLunar === false && AppState.catalogMode === 'lunar') {
    AppState.catalogMode = feats.showSemanal !== false ? 'semanal' : (feats.showLocal !== false ? 'local' : 'semanal');
    localStorage.setItem('elementales_catalog_mode', AppState.catalogMode);
  }
  if (feats.showSemanal === false && AppState.catalogMode === 'semanal') {
    AppState.catalogMode = feats.showLocal !== false ? 'local' : (feats.showLunar !== false ? 'lunar' : 'local');
    localStorage.setItem('elementales_catalog_mode', AppState.catalogMode);
  }

  // Ocultar o mostrar botones de modo en catálogo
  const btnLocal = document.getElementById('btn-mode-local');
  const btnSemanal = document.getElementById('btn-mode-semanal');
  const btnLunar = document.getElementById('btn-mode-lunar');
  const modesGrid = document.getElementById('catalog-modes-grid');

  if (btnLocal) btnLocal.classList.toggle('hidden', feats.showLocal === false);
  if (btnSemanal) btnSemanal.classList.toggle('hidden', feats.showSemanal === false);
  if (btnLunar) btnLunar.classList.toggle('hidden', feats.showLunar === false);

  if (modesGrid) {
    let visibleModes = 0;
    if (feats.showLocal !== false) visibleModes++;
    if (feats.showSemanal !== false) visibleModes++;
    if (feats.showLunar !== false) visibleModes++;
    if (visibleModes <= 1) modesGrid.className = 'grid grid-cols-1 gap-2';
    else if (visibleModes === 2) modesGrid.className = 'grid grid-cols-2 gap-2';
    else modesGrid.className = 'grid grid-cols-3 gap-2';
  }

  // Toggling de módulos en la barra inferior Spotify
  const navTierra = document.getElementById('spotify-nav-tierra');
  const navAgua = document.getElementById('spotify-nav-agua');
  const navFuego = document.getElementById('spotify-nav-fuego');
  const navAire = document.getElementById('spotify-nav-aire');
  const navEter = document.getElementById('spotify-nav-eter');

  if (navTierra) navTierra.classList.toggle('hidden', feats.showTienda === false);
  if (navAgua) navAgua.classList.toggle('hidden', feats.showAgua === false);
  if (navFuego) navFuego.classList.toggle('hidden', feats.showFuego === false);
  if (navAire) navAire.classList.toggle('hidden', feats.showAire === false);
  if (navEter) navEter.classList.toggle('hidden', feats.showEter === false);

  // Toggling en la portada del Nodo (view-barrio)
  const cardTierra = document.getElementById('barrio-card-tierra');
  const cardCirculos = document.getElementById('barrio-card-circulos');
  const dimSection = document.getElementById('barrio-dimensiones-section');
  const btnAgua = document.getElementById('barrio-btn-agua');
  const btnFuego = document.getElementById('barrio-btn-fuego');
  const btnAire = document.getElementById('barrio-btn-aire');
  const btnEter = document.getElementById('barrio-btn-eter');

  if (cardTierra) cardTierra.classList.toggle('hidden', feats.showTienda === false);
  if (cardCirculos) cardCirculos.classList.toggle('hidden', feats.showCirculos === false);
  if (btnAgua) btnAgua.classList.toggle('hidden', feats.showAgua === false);
  if (btnFuego) btnFuego.classList.toggle('hidden', feats.showFuego === false);
  if (btnAire) btnAire.classList.toggle('hidden', feats.showAire === false);
  if (btnEter) btnEter.classList.toggle('hidden', feats.showEter === false);

  if (dimSection) {
    const hasAnyDim = (feats.showAgua !== false) || (feats.showFuego !== false) || (feats.showAire !== false) || (feats.showEter !== false);
    dimSection.classList.toggle('hidden', !hasAnyDim);
  }

  // Textos adaptados para cada nodo en view-barrio
  const titleTierra = document.getElementById('barrio-card-tierra-title');
  const descTierra = document.getElementById('barrio-card-tierra-desc');
  const badgeTierra = document.getElementById('barrio-card-tierra-badge');

  const titleCirculos = document.getElementById('barrio-card-circulos-title');
  const descCirculos = document.getElementById('barrio-card-circulos-desc');
  const badgeCirculos = document.getElementById('barrio-card-circulos-badge');

  if (isCoop) {
    if (titleTierra) titleTierra.textContent = 'Cajones Agroecológicos Directo Quinta';
    if (descTierra) descTierra.textContent = 'Cajones cerrados de 15kg, 20kg y 10kg directos de quintas campesinas Chasqui al costo directo.';
    if (badgeTierra) badgeTierra.textContent = '📦 Mayorista Directo';

    if (titleCirculos) titleCirculos.textContent = 'Círculos de Fraccionamiento Mayorista';
    if (descCirculos) descCirculos.textContent = 'Unite o armá un círculo para dividir cajones con vecinos y familias al costo directo.';
    if (badgeCirculos) badgeCirculos.textContent = '🌀 Fraccionamiento';
  } else if (isLoma) {
    if (titleTierra) titleTierra.textContent = 'Cosecha Semanal de Huerta & Cooperativas';
    if (descTierra) descTierra.textContent = 'Bolsones agroecológicos, panadería de masa madre y almacén cooperativo con despacho semanal.';
    if (badgeTierra) badgeTierra.textContent = '🥬 Cosecha Semanal';

    if (titleCirculos) titleCirculos.textContent = 'Círculos Barriales VRDE Club';
    if (descCirculos) descCirculos.textContent = 'Familias autogestionando compras colectivas barriales con retiro barrial coordinado.';
    if (badgeCirculos) badgeCirculos.textContent = '🌀 Círculos VRDE';
  } else {
    if (titleTierra) titleTierra.textContent = 'Tienda Comunitaria & Cosecha Fresca';
    if (descTierra) descTierra.textContent = 'Bolsones de verduras agroecológicas, panadería de masa madre, quesos de campo y almacén.';
    if (badgeTierra) badgeTierra.textContent = '🌱 Elemento Tierra';

    if (titleCirculos) titleCirculos.textContent = 'Círculos de Compra Colectiva';
    if (descCirculos) descCirculos.textContent = 'Comprá junto a familias y amigos de tu cuadra para autogestionar el retiro barrial al costo directo.';
    if (badgeCirculos) badgeCirculos.textContent = '🌀 Círculos Barriales';
  }

  // Banner específico de Central Cooperativa en Tierra
  const bannerCoop = document.getElementById('banner-nodo-cooperativa');
  if (bannerCoop) {
    bannerCoop.classList.add('hidden');
  }
  const badgeSharesCount = document.getElementById('count-cajones-compartidos-badge');
  if (badgeSharesCount && typeof CajonesManager !== 'undefined') {
    badgeSharesCount.textContent = CajonesManager.getAllShares().filter(s => s.status === 'abierto').length;
  }

  populateCheckoutCirculos();
}

// =========================================================================
// FACULTAD DE CÍRCULOS (VRDE CLUB & RED ELEMENTALES)
// =========================================================================
let currentCirculosFilter = null;

function renderCirculosView() {
  const grid = document.getElementById('circulos-cards-grid');
  const activeContainer = document.getElementById('circulos-my-active-circle-container');
  const countIndicator = document.getElementById('circulos-count-indicator');
  const nodeBadge = document.getElementById('circulos-node-badge');
  if (!grid || typeof CirculosManager === 'undefined') return;

  const activeNode = NODOS_COMUNIDAD.find(n => n.id === AppState.activeNodeId) || NODOS_COMUNIDAD[0];
  if (nodeBadge) {
    nodeBadge.textContent = activeNode.name;
  }

  // Aislamiento por nodo: por defecto mostrar sólo los círculos del nodo activo
  if (!currentCirculosFilter) {
    currentCirculosFilter = AppState.activeNodeId || 'nodo-lomaverde';
  }

  // Sincronizar pestañas de filtro en la vista
  document.querySelectorAll('#circulos-node-filter-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const tabId = currentCirculosFilter === 'todos' 
    ? 'circulos-filter-todos' 
    : (currentCirculosFilter === 'nodo-lomaverde' 
      ? 'circulos-filter-lomaverde' 
      : (currentCirculosFilter === 'nodo-cooperativa' 
        ? 'circulos-filter-cooperativa' 
        : 'circulos-filter-lucila'));
  const activeTabBtn = document.getElementById(tabId);
  if (activeTabBtn) activeTabBtn.classList.add('active');

  // Obtener círculos filtrados
  let circles = CirculosManager.getAllCircles();
  if (currentCirculosFilter !== 'todos') {
    circles = circles.filter(c => c.nodoId === currentCirculosFilter);
  }

  if (countIndicator) {
    const fNode = NODOS_COMUNIDAD.find(n => n.id === currentCirculosFilter);
    const fName = currentCirculosFilter === 'todos' ? 'Toda la Red' : (fNode ? fNode.name : 'este Nodo');
    countIndicator.textContent = `${circles.length} círculos en ${fName}`;
  }

  // 1. Renderizar Círculo Activo del Usuario
  const activeCircleId = CirculosManager.getActiveCircleId();
  const activeCircle = activeCircleId ? CirculosManager.getCircle(activeCircleId) : null;

  if (activeContainer) {
    if (activeCircle) {
      const pedidos = activeCircle.pedidos || [];
      const totalPedidos = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);

      activeContainer.innerHTML = `
        <div class="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-500/40 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200/60">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xl">🌀</span>
                <span class="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Tu Círculo Activo</span>
              </div>
              <h3 class="font-black text-xl text-stone-900 mt-1">${escapeHtml(activeCircle.nombre)}</h3>
              <p class="text-xs text-stone-600 mt-0.5">
                📍 <strong>Punto de Retiro:</strong> ${escapeHtml(activeCircle.direccion)} · 👤 Coordina: ${escapeHtml(activeCircle.coordinador)} ${activeCircle.telefono ? `(${escapeHtml(activeCircle.telefono)})` : ''}
              </p>
              <div class="flex flex-wrap items-center gap-2 mt-2 text-xs text-stone-700">
                <span class="bg-emerald-100/70 text-emerald-950 font-bold px-2 py-0.5 rounded-md border border-emerald-300">
                  💳 Alias: <strong class="font-mono">${escapeHtml(activeCircle.alias || 'A convenir')}</strong>
                </span>
                <span class="bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded-md border border-stone-200">
                  🗓️ Modalidad: ${activeCircle.modalidad === 'ambas' ? '🌟 Semanal + Lunar' : (activeCircle.modalidad === 'lunar' ? '🌕 Lunar' : '🥬 Semanal')}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <button onclick="enterCircleStore('${activeCircle.id}')" class="btn-spotify !py-2 !px-3.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm">
                <span>🛍️</span> Tienda de mi Círculo
              </button>
              ${CirculosManager.canEditCircle(activeCircle.id) ? `
                <button onclick="openEditCirculoModal('${activeCircle.id}')" class="btn-spotify !py-2 !px-3 text-xs font-bold bg-white text-stone-800 border border-emerald-300 hover:bg-emerald-50 flex items-center gap-1 shadow-2xs">
                  <span>✏️</span> Editar
                </button>
              ` : ''}
              <button onclick="openCirculoShareModal('${activeCircle.id}')" class="btn-spotify !py-2 !px-3 text-xs font-bold bg-white text-stone-800 border border-emerald-300 hover:bg-emerald-50 flex items-center gap-1 shadow-2xs">
                <span>💬</span> Invitar
              </button>
              <button onclick="openCirculoTableroModal('${activeCircle.id}')" class="btn-spotify !py-2 !px-3 text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 flex items-center gap-1 shadow-2xs">
                <span>📊</span> Tablero (${pedidos.length})
              </button>
            </div>
          </div>

          <!-- CAJONES EN CURSO POR COMPLETAR EN EL CÍRCULO -->
          ${(() => {
            const shares = (typeof CajonesManager !== 'undefined') ? CajonesManager.getSharesForCircle(activeCircle.id) : [];
            const openShares = shares.filter(s => s.status === 'abierto' && s.remainingKg > 0);
            if (openShares.length === 0) return '';
            return `
              <div class="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-300 mb-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-black uppercase text-amber-900 flex items-center gap-1">
                    <span>🧺</span> Cajones en curso por completar (${openShares.length}):
                  </span>
                  <button onclick="enterCircleStore('${activeCircle.id}')" class="text-[10px] font-black underline text-amber-800 hover:text-amber-950 cursor-pointer">
                    Ir a Tienda →
                  </button>
                </div>
                <div class="space-y-2">
                  ${openShares.map(s => `
                    <div class="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between text-xs shadow-2xs">
                      <div class="min-w-0 pr-2">
                        <span class="font-bold text-stone-900 block truncate">${escapeHtml(s.productName)}</span>
                        <span class="text-[11px] text-amber-800 font-black">Faltan ${s.remainingKg} kg de ${s.totalKg} kg (${s.percent}% cubierto)</span>
                      </div>
                      <button onclick="joinCajonShareDirectly('${s.productId}')" class="btn-spotify !py-1.5 !px-3 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 shadow-2xs cursor-pointer">
                        + Sumarme
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          })()}

          <!-- PEDIDOS CONSOLIDADOS DEL CÍRCULO -->
          <div class="bg-white/90 p-4 rounded-2xl border border-emerald-200 mb-4">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-black text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <span>📦</span> Pedidos de Vecinos para esta semana (${pedidos.length})
              </h4>
              <span class="font-black text-sm text-emerald-800">Total: $${totalPedidos.toLocaleString('es-AR')}</span>
            </div>
            
            ${pedidos.length > 0 ? `
              <div class="divide-y divide-stone-100 text-xs text-stone-700 max-h-40 overflow-y-auto pr-1">
                ${pedidos.map(p => `
                  <div class="py-2 flex items-center justify-between">
                    <div>
                      <span class="font-bold text-stone-900">${escapeHtml(p.vecino)}</span>
                      <span class="text-stone-500 block text-[11px]">${escapeHtml(p.items)}</span>
                    </div>
                    <span class="font-bold text-stone-800 shrink-0">$${(p.total || 0).toLocaleString('es-AR')}</span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p class="text-xs text-stone-400 italic py-2">Aún no hay pedidos sumados a este círculo esta semana. ¡Compartí el link para armar la compra grupal!</p>
            `}
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <p class="text-stone-500 text-[11px]">
              La gestión del retiro y la entrega queda a cargo del círculo, reduciendo costos logísticos.
            </p>
            <div class="flex items-center gap-2">
              <button onclick="sendCircleOrderToWhatsApp('${activeCircle.id}')" class="btn-spotify !py-2 !px-3 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1 shadow-xs">
                <span>📦</span> Enviar Consolidado al Nodo
              </button>
              <button onclick="CirculosManager.setActiveCircleId(null); renderCirculosView(); renderCirculoStoreBanner(); sounds.playPop();" class="text-xs text-stone-400 hover:text-stone-600 underline">
                Cambiar de círculo
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      activeContainer.innerHTML = '';
    }
  }

  // 2. Renderizar Grid de Círculos
  if (circles.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-stone-400">
        <p class="text-4xl mb-2">🌀</p>
        <p class="font-bold text-stone-700 text-base">No hay círculos registrados en Nodo Loma Verde aún</p>
        <p class="text-xs text-stone-500 mt-1">Sé el primero en crear un Círculo en tu barrio para comprar juntos con tus vecinos.</p>
        <button onclick="openCreateCirculoModal()" class="btn-spotify !py-2.5 !px-5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white mt-4 shadow-sm">
          + Crear Círculo de Compra
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = circles.map(c => {
    const isCreator = typeof CirculosManager !== 'undefined' && CirculosManager.isCircleCreator(c.id);
    const canEdit = typeof CirculosManager !== 'undefined' && CirculosManager.canEditCircle(c.id);
    const isActive = c.id === activeCircleId;
    const pedidosCount = (c.pedidos || []).length;
    const miembrosCount = (c.miembros || []).length;

    return `
      <div class="bg-white rounded-3xl border-2 transition-all p-5 shadow-2xs hover:shadow-md flex flex-col justify-between ${
        isActive ? 'border-emerald-500 bg-emerald-50/20' : 'border-stone-200'
      }">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              📍 Loma Verde
            </span>
            ${isCreator ? '<span class="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">👑 Tu Círculo (Coordinador)</span>' : (isActive ? '<span class="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">✓ Seleccionado</span>' : '')}
          </div>

          <h3 class="font-black text-base text-stone-900 leading-snug">${escapeHtml(c.nombre)}</h3>
          <p class="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">${escapeHtml(c.descripcion || 'Círculo de compra comunitaria.')}</p>

          <div class="mt-3.5 space-y-1.5 text-xs text-stone-600">
            <p>📍 <strong>Retiro:</strong> ${escapeHtml(c.direccion)}</p>
            <p>👤 <strong>Coordina:</strong> ${escapeHtml(c.coordinador)} ${c.telefono ? `(${escapeHtml(c.telefono)})` : ''}</p>
            <p>💳 <strong>Alias:</strong> <span class="font-mono text-emerald-900 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">${escapeHtml(c.alias || 'A convenir')}</span></p>
            <p>🗓️ <strong>Modalidad:</strong> ${c.modalidad === 'ambas' ? '🌟 Semanal + Lunar' : (c.modalidad === 'lunar' ? '🌕 Lunar' : '🥬 Semanal')}</p>
          </div>

          <!-- Enlace corto para compartir -->
          <div class="mt-3 p-2 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-1 text-[11px]">
            <span class="font-mono text-stone-600 truncate">/circulo/${c.slug || c.id}</span>
            <button 
              type="button" 
              onclick="copyDirectCircleUrl('${c.id}')" 
              class="text-emerald-700 hover:text-emerald-800 font-bold px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 transition-all shrink-0 cursor-pointer"
              title="Copiar enlace rápido"
            >
              Copiar
            </button>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-stone-100 flex flex-col gap-2">
          <div class="flex items-center justify-between text-[11px] font-bold text-stone-500">
            <span>👥 ${miembrosCount} miembros</span>
            <span class="text-emerald-700 font-black">📦 ${pedidosCount} pedidos</span>
          </div>
          <div class="flex items-center gap-1.5">
            <button 
              type="button" 
              onclick="enterCircleStore('${c.id}')" 
              class="flex-1 btn-spotify !py-2 !px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center justify-center gap-1">
              <span>🛍️</span> Pedir en Círculo
            </button>
            ${canEdit ? `
              <button 
                type="button" 
                onclick="openEditCirculoModal('${c.id}')" 
                class="w-9 h-9 rounded-xl border border-stone-200 hover:border-emerald-500 bg-white text-stone-700 flex items-center justify-center text-sm transition-all shadow-2xs"
                title="Editar datos del Círculo (solo creador)">
                ✏️
              </button>
            ` : ''}
            <button 
              type="button" 
              onclick="openCirculoShareModal('${c.id}')" 
              class="w-9 h-9 rounded-xl border border-stone-200 hover:border-emerald-500 flex items-center justify-center text-sm transition-all"
              title="Compartir link del Círculo">
              💬
            </button>
            <button 
              type="button" 
              onclick="openCirculoTableroModal('${c.id}')" 
              class="w-9 h-9 rounded-xl border border-stone-200 hover:border-emerald-500 flex items-center justify-center text-sm transition-all"
              title="Ver Tablero de Pedidos">
              📊
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterCirculosByNode(nodeFilter) {
  currentCirculosFilter = nodeFilter;
  sounds.playPop();

  document.querySelectorAll('#circulos-node-filter-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const tabId = nodeFilter === 'todos' ? 'circulos-filter-todos' : (nodeFilter === 'nodo-lomaverde' ? 'circulos-filter-lomaverde' : (nodeFilter === 'nodo-cooperativa' ? 'circulos-filter-cooperativa' : 'circulos-filter-lucila'));
  const activeBtn = document.getElementById(tabId);
  if (activeBtn) activeBtn.classList.add('active');

  renderCirculosView();
}

function openCreateCirculoModal() {
  sounds.playPop();
  const modal = document.getElementById('modal-create-circulo');
  if (modal) {
    const nodoSelect = document.getElementById('circulo-nodo');
    if (nodoSelect) nodoSelect.value = AppState.activeNodeId || 'nodo-lomaverde';
    const slugInput = document.getElementById('circulo-slug');
    if (slugInput) {
      slugInput.value = '';
      slugInput.dataset.manual = 'false';
    }
    const preview = document.getElementById('circulo-slug-preview');
    if (preview) preview.textContent = 'elementales.store/circulo/mi-circulo';
    modal.classList.remove('hidden');
  }
}

function closeCreateCirculoModal() {
  const modal = document.getElementById('modal-create-circulo');
  if (modal) modal.classList.add('hidden');
}

function handleCirculoNombreInput(input) {
  const slugInput = document.getElementById('circulo-slug');
  const preview = document.getElementById('circulo-slug-preview');
  if (!slugInput || slugInput.dataset.manual === 'true') return;
  const val = (input.value || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/(^-|-$)/g, '');
  slugInput.value = val;
  if (preview) preview.textContent = `elementales.store/circulo/${val || 'mi-circulo'}`;
}

function handleSlugInput(input) {
  input.dataset.manual = 'true';
  const val = (input.value || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^[-_]+/, '');
  input.value = val;
  const preview = document.getElementById('circulo-slug-preview');
  if (preview) preview.textContent = `elementales.store/circulo/${val || 'mi-circulo'}`;
}


function openEditCirculoModal(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  const cId = circleId || CirculosManager.getActiveCircleId();
  if (!cId) return;

  if (!CirculosManager.canEditCircle(cId)) {
    alert('⛔ Solo el/la creador/a de este Círculo puede modificar sus datos.');
    return;
  }

  const circle = CirculosManager.getCircle(cId);
  if (!circle) return;

  sounds.playPop();

  const idEl = document.getElementById('edit-circulo-id');
  if (idEl) idEl.value = circle.id;
  const nomEl = document.getElementById('edit-circulo-nombre');
  if (nomEl) nomEl.value = circle.nombre || '';
  const dirEl = document.getElementById('edit-circulo-direccion');
  if (dirEl) dirEl.value = circle.direccion || '';
  const coordEl = document.getElementById('edit-circulo-coordinador');
  if (coordEl) coordEl.value = circle.coordinador || '';
  const telEl = document.getElementById('edit-circulo-telefono');
  if (telEl) telEl.value = circle.telefono || '';
  const aliasEl = document.getElementById('edit-circulo-alias');
  if (aliasEl) aliasEl.value = circle.alias || '';
  const modEl = document.getElementById('edit-circulo-modalidad');
  if (modEl) modEl.value = circle.modalidad || 'ambas';
  const slugEl = document.getElementById('edit-circulo-slug');
  if (slugEl) slugEl.value = circle.slug || circle.id;
  const descEl = document.getElementById('edit-circulo-descripcion');
  if (descEl) descEl.value = circle.descripcion || '';

  const errEl = document.getElementById('edit-circulo-error-msg');
  if (errEl) errEl.classList.add('hidden');

  document.getElementById('modal-edit-circulo')?.classList.remove('hidden');
}

function closeEditCirculoModal() {
  document.getElementById('modal-edit-circulo')?.classList.add('hidden');
}

function handleEditCirculoSubmit(e) {
  e.preventDefault();
  if (typeof CirculosManager === 'undefined') return;

  const circleId = document.getElementById('edit-circulo-id')?.value;
  const nombre = document.getElementById('edit-circulo-nombre')?.value.trim();
  const direccion = document.getElementById('edit-circulo-direccion')?.value.trim();
  const coordinador = document.getElementById('edit-circulo-coordinador')?.value.trim();
  const telefono = document.getElementById('edit-circulo-telefono')?.value.trim();
  const alias = document.getElementById('edit-circulo-alias')?.value.trim();
  const modalidad = document.getElementById('edit-circulo-modalidad')?.value;
  const slug = document.getElementById('edit-circulo-slug')?.value.trim();
  const descripcion = document.getElementById('edit-circulo-descripcion')?.value.trim();

  const res = CirculosManager.updateCircle(circleId, {
    nombre,
    direccion,
    coordinador,
    telefono,
    alias,
    modalidad,
    slug,
    descripcion
  });

  if (!res.success) {
    const errEl = document.getElementById('edit-circulo-error-msg');
    if (errEl) {
      errEl.textContent = res.error;
      errEl.classList.remove('hidden');
    }
    return;
  }

  closeEditCirculoModal();
  sounds.playSuccess();
  renderCirculosView();
  renderCirculoStoreBanner();
  populateCheckoutCirculos();
}

function handleCreateCirculoSubmit(e) {
  e.preventDefault();
  if (typeof CirculosManager === 'undefined') return;

  const nombre = document.getElementById('circulo-nombre')?.value.trim();
  const slug = document.getElementById('circulo-slug')?.value.trim();
  const coordinador = document.getElementById('circulo-coordinador')?.value.trim();
  const telefono = document.getElementById('circulo-telefono')?.value.trim();
  const direccion = document.getElementById('circulo-direccion')?.value.trim();
  const nodoId = document.getElementById('circulo-nodo')?.value;
  const frecuencia = document.getElementById('circulo-frecuencia')?.value;
  const descripcion = document.getElementById('circulo-descripcion')?.value.trim();

  const newCirculo = CirculosManager.createCircle({
    nombre,
    slug,
    coordinador,
    telefono,
    direccion,
    nodoId,
    frecuencia,
    descripcion
  });

  closeCreateCirculoModal();
  sounds.playSuccess();
  if (typeof confetti === 'function') {
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
  }

  // Ingresar directamente a la tienda del círculo y abrir modal de invitar
  enterCircleStore(newCirculo.id);
  setTimeout(() => {
    openCirculoShareModal(newCirculo.id);
  }, 400);

  e.target.reset();
  const slugInput = document.getElementById('circulo-slug');
  if (slugInput) slugInput.dataset.manual = 'false';
}

function joinCircle(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  sounds.playSuccess();
  CirculosManager.joinCircle(circleId, AppState.userName);
  enterCircleStore(circleId);
}

function shareCircleWhatsApp(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  sounds.playPop();
  const text = CirculosManager.generateShareText(circleId);
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function sendCircleOrderToWhatsApp(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  sounds.playSuccess();
  const text = CirculosManager.generateWhatsAppOrder(circleId);
  window.open(`https://wa.me/5491123456789?text=${encodeURIComponent(text)}`, '_blank');
}

function toggleCheckoutCirculoSelect(isCirculo) {
  const container = document.getElementById('checkout-circulo-container');
  if (container) {
    container.classList.toggle('hidden', !isCirculo);
    if (isCirculo) populateCheckoutCirculos();
  }
}

function populateCheckoutCirculos() {
  const select = document.getElementById('checkout-selected-circulo');
  if (!select || typeof CirculosManager === 'undefined') return;

  const circles = CirculosManager.getCirclesByNode(AppState.activeNodeId);
  const activeCId = CirculosManager.getActiveCircleId();

  if (circles.length === 0) {
    select.innerHTML = '<option value="">No hay círculos en este nodo (crear uno)</option>';
    return;
  }

  select.innerHTML = circles.map(c => `
    <option value="${c.id}" ${c.id === activeCId ? 'selected' : ''}>
      ${escapeHtml(c.nombre)} (Punto: ${escapeHtml(c.direccion)})
    </option>
  `).join('');
}

// --- FUNCIONES DE TIENDA Y COMPARTIR EN CÍRCULOS (VRDE CLUB) ---
function enterCircleStore(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  const circle = CirculosManager.getCircle(circleId);
  if (!circle) return;

  CirculosManager.setActiveCircleId(circle.id);
  AppState.activeNodeId = circle.nodoId;
  AppState.catalogMode = 'semanal'; // En círculos no se usa modo local
  sessionStorage.setItem('elementales_authenticated', 'true');

  updateNodeUI();
  updateRoleUI();
  navigateTo('tierra', true);
  renderCirculoStoreBanner();
  renderOrderCatalog();
  sounds.playSuccess();
}

function renderCirculoStoreBanner() {
  const banner = document.getElementById('banner-circulo-activo');
  const headerIndicator = document.getElementById('header-circulo-indicator');
  const headerName = document.getElementById('header-circulo-name');
  const headerSlug = document.getElementById('header-circulo-slug-preview');
  const genericHeader = document.getElementById('tierra-generic-header');
  const subnavTabs = document.getElementById('tierra-subnav-tabs');
  
  if (typeof CirculosManager === 'undefined') {
    if (banner) banner.classList.add('hidden');
    if (headerIndicator) headerIndicator.classList.add('hidden');
    if (genericHeader) genericHeader.classList.remove('hidden');
    if (subnavTabs) subnavTabs.classList.remove('hidden');
    return;
  }

  const activeCircleId = CirculosManager.getActiveCircleId();
  const circle = activeCircleId ? CirculosManager.getCircle(activeCircleId) : null;

  if (circle) {
    if (banner) {
      banner.classList.remove('hidden');
      const nameEl = document.getElementById('circulo-banner-name');
      if (nameEl) nameEl.textContent = circle.nombre;
      
      const hostEl = document.getElementById('circulo-banner-host');
      if (hostEl) hostEl.textContent = `👑 Coordina: ${circle.coordinador}`;
      
      const nodeEl = document.getElementById('circulo-banner-node');
      const nodeObj = typeof NODOS_COMUNIDAD !== 'undefined' ? NODOS_COMUNIDAD.find(n => n.id === circle.nodoId) : null;
      if (nodeEl) nodeEl.textContent = `📍 Retiro en: ${circle.direccion || (nodeObj ? nodeObj.name : 'Punto Barrial')}`;
      
      const countEl = document.getElementById('circulo-banner-pedidos-count');
      if (countEl) countEl.textContent = (circle.pedidos || []).length;

      const linkBadgeEl = document.getElementById('circulo-banner-short-url');
      if (linkBadgeEl) {
        linkBadgeEl.textContent = `/circulo/${circle.slug || circle.id}`;
      }

      // Solo el creador / coordinador o gestor ve el botón de personalizar URL
      const canEdit = CirculosManager.canEditCircle(circle.id);
      const editBtn = document.getElementById('btn-banner-edit-url');
      if (editBtn) {
        if (canEdit) {
          editBtn.classList.remove('hidden');
        } else {
          editBtn.classList.add('hidden');
        }
      }
    }

    if (genericHeader) genericHeader.classList.add('hidden');
    if (subnavTabs) subnavTabs.classList.add('hidden');

    if (headerIndicator && headerName) {
      headerIndicator.classList.remove('hidden');
      headerName.textContent = circle.nombre;
      if (headerSlug) headerSlug.textContent = `/circulo/${circle.slug || circle.id}`;
    }
  } else {
    if (banner) banner.classList.add('hidden');
    if (headerIndicator) headerIndicator.classList.add('hidden');
    if (genericHeader) genericHeader.classList.remove('hidden');
    if (subnavTabs) subnavTabs.classList.remove('hidden');
  }
}

function exitCircleMode() {
  if (typeof CirculosManager !== 'undefined') {
    CirculosManager.setActiveCircleId(null);
  }
  const nodeSlug = (AppState.activeNodeId || 'nodo-lomaverde').replace(/^nodo-/, '');
  try {
    if (window.history && window.history.pushState) {
      window.history.pushState({ view: 'tierra', nodeId: AppState.activeNodeId, circuloId: null }, '', '/nodo/' + nodeSlug);
    } else if (window.history && window.history.replaceState) {
      window.history.replaceState({ view: 'tierra', nodeId: AppState.activeNodeId, circuloId: null }, '', '/nodo/' + nodeSlug);
    }
  } catch (e) {}
  renderCirculoStoreBanner();
  populateCheckoutCirculos();
  renderOrderCatalog();
  sounds.playPop();
  
  const banner = document.getElementById('banner-circulo-activo');
  if (banner) banner.classList.add('hidden');
}

function openCirculosPilotView() {
  sessionStorage.setItem('elementales_authenticated', 'true');
  updateRoleUI();
  updateNodeUI();
  navigateTo('circulos');
  renderCirculosView();
  sounds.playSuccess();
}

function copyActiveCircleShareUrl() {
  if (typeof CirculosManager === 'undefined') return;
  const activeCircleId = CirculosManager.getActiveCircleId();
  if (!activeCircleId) return;
  const url = CirculosManager.getShareUrl(activeCircleId);
  navigator.clipboard.writeText(url).then(() => {
    sounds.playSuccess();
    const btn = document.getElementById('btn-banner-copy-url');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>✓</span> Copiado!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  });
}

function copyDirectCircleUrl(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  const url = CirculosManager.getShareUrl(circleId);
  navigator.clipboard.writeText(url).then(() => {
    sounds.playSuccess();
    openCirculoShareModal(circleId);
  });
}

function openCirculoTableroModal(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  const cId = circleId || CirculosManager.getActiveCircleId();
  const circle = CirculosManager.getCircle(cId);
  if (!circle) return;

  window.activeCirculoTableroId = circle.id;
  sounds.playPop();

  const modal = document.getElementById('modal-circulo-tablero');
  const titleEl = document.getElementById('tablero-modal-title');
  const subEl = document.getElementById('tablero-modal-subtitle');
  const totalEl = document.getElementById('tablero-modal-total');
  const countEl = document.getElementById('tablero-modal-count');
  const listEl = document.getElementById('tablero-modal-list');
  const cajonesSec = document.getElementById('tablero-cajones-section');

  if (titleEl) titleEl.textContent = `Tablero: ${circle.nombre}`;
  if (subEl) subEl.textContent = `📍 Retiro en: ${circle.direccion} · 👤 Coordina: ${circle.coordinador}`;

  const pedidos = circle.pedidos || [];
  const total = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);

  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-AR')}`;
  if (countEl) countEl.textContent = `${pedidos.length} ${pedidos.length === 1 ? 'pedido' : 'pedidos'}`;

  // 1. SECCIÓN DE CAJONES COMPARTIDOS (EN CURSO vs CERRADOS)
  const allShares = (typeof CajonesManager !== 'undefined') ? CajonesManager.getSharesForCircle(circle.id) : [];
  const openShares = allShares.filter(s => s.status === 'abierto' && s.remainingKg > 0);
  const closedShares = allShares.filter(s => s.status === 'completo' || s.remainingKg <= 0);

  if (cajonesSec) {
    let cajonesHtml = '';

    // A) Cajones en curso esperando que alguien se sume
    if (openShares.length > 0) {
      cajonesHtml += `
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <span>🧺</span> Cajones en Curso (Falta sumar kilos):
            </h4>
            <span class="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
              ${openShares.length} en llenado
            </span>
          </div>
          <div class="space-y-2.5">
            ${openShares.map(s => {
              const prod = (typeof CAJONES_CENTRAL_COOPERATIVA !== 'undefined') ? CAJONES_CENTRAL_COOPERATIVA.find(p => p.id === s.productId) : null;
              const cleanName = prod ? ((typeof getProductCleanName === 'function') ? getProductCleanName(prod) : prod.name) : s.productName;
              const emoji = (prod && prod.emoji) ? prod.emoji : '🧺';
              const participantsText = (s.participantes && s.participantes.length > 0)
                ? s.participantes.map(p => `${p.name} (${p.kg} kg)`).join(', ')
                : 'Vecinos';

              return `
                <div class="p-3.5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 shadow-2xs">
                  <div class="flex items-start justify-between gap-2 mb-1.5">
                    <div class="flex items-center gap-2">
                      <span class="text-xl">${emoji}</span>
                      <div>
                        <h5 class="font-black text-xs text-stone-900 leading-tight">${escapeHtml(cleanName)}</h5>
                        <p class="text-[10px] text-stone-500">Cajón ${s.totalKg} kg · $${formatMoney(s.pricePerKg)}/kg</p>
                      </div>
                    </div>
                    <span class="text-[11px] font-black text-amber-950 bg-amber-200 border border-amber-300 px-2 py-0.5 rounded-full shrink-0">
                      ¡Faltan ${s.remainingKg} kg!
                    </span>
                  </div>

                  <!-- Barra -->
                  <div class="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden p-0.5 mb-1.5">
                    <div class="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" style="width: ${s.percent}%;"></div>
                  </div>

                  <div class="flex items-center justify-between text-[10px] text-stone-600 mb-2.5">
                    <span>👥 Sumados: <strong>${escapeHtml(participantsText)}</strong></span>
                    <span class="font-bold text-stone-700">${s.coveredKg} kg de ${s.totalKg} kg (${s.percent}%)</span>
                  </div>

                  <!-- Botón para sumarse -->
                  <div class="grid grid-cols-2 gap-2 pt-1 border-t border-amber-200/60">
                    <button 
                      type="button" 
                      onclick="joinCajonShareDirectly('${s.productId}')" 
                      class="btn-spotify !py-1.5 !px-2.5 text-xs font-black !bg-emerald-600 hover:!bg-emerald-700 !text-white flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <span>➕ Sumarme</span>
                      <span>(Faltan ${s.remainingKg} kg)</span>
                    </button>
                    <button 
                      type="button" 
                      onclick="shareCajonWhatsAppFromCard('${s.id}')" 
                      class="btn-spotify !py-1.5 !px-2.5 text-xs font-bold !bg-white hover:!bg-amber-100 !text-stone-800 border border-amber-300 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>📲 Avisar</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // B) Cajones ya cerrados al 100%
    if (closedShares.length > 0) {
      cajonesHtml += `
        <div class="mb-4">
          <h4 class="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
            <span>✅</span> Cajones 100% Cerrados (Listos para despachar):
          </h4>
          <div class="space-y-1.5">
            ${closedShares.map(s => {
              const participantsText = (s.participantes && s.participantes.length > 0)
                ? s.participantes.map(p => `${p.name} (${p.kg}kg)`).join(', ')
                : '';
              return `
                <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div>
                    <span class="font-black text-emerald-950">${escapeHtml(s.productName)}</span>
                    <span class="text-[10px] text-emerald-700 block">(${s.totalKg} kg cerrados: ${escapeHtml(participantsText)})</span>
                  </div>
                  <span class="font-black text-xs text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">Listo</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    cajonesSec.innerHTML = cajonesHtml;
  }

  // 2. LISTA DE PEDIDOS POR VECINO
  if (listEl) {
    if (pedidos.length === 0) {
      listEl.innerHTML = `
        <div class="text-center py-6 text-stone-400 bg-stone-50 rounded-2xl border border-stone-200">
          <p class="text-2xl mb-1">🧺</p>
          <p class="text-xs font-bold text-stone-700">Aún no hay pedidos sumados a este Círculo</p>
          <p class="text-[11px] text-stone-500 mt-0.5">Compartí el link del círculo con tus vecinos para que sumen sus compras.</p>
        </div>
      `;
    } else {
      listEl.innerHTML = pedidos.map((p, idx) => `
        <div class="p-3 rounded-2xl bg-white border border-stone-200 flex items-center justify-between shadow-2xs">
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-black text-xs text-stone-900">${idx + 1}. ${escapeHtml(p.vecino)}</span>
              <span class="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Listo</span>
            </div>
            <p class="text-[11px] text-stone-500 mt-0.5 leading-snug">${escapeHtml(p.items)}</p>
          </div>
          <span class="font-black text-xs text-emerald-900 shrink-0 ml-2">$${(p.total || 0).toLocaleString('es-AR')}</span>
        </div>
      `).join('');
    }
  }

  if (modal) modal.classList.remove('hidden');
}

function closeCirculoTableroModal() {
  document.getElementById('modal-circulo-tablero')?.classList.add('hidden');
}

function openCirculoShareModal(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  const cId = circleId || CirculosManager.getActiveCircleId();
  const circle = CirculosManager.getCircle(cId);
  if (!circle) return;

  window.activeShareCircleId = circle.id;
  sounds.playPop();

  const modal = document.getElementById('modal-circulo-invitar');
  const nameEl = document.getElementById('share-modal-circulo-name');
  const inputEl = document.getElementById('share-circulo-link-input');
  const copyBtnText = document.getElementById('btn-copy-circulo-text');

  if (nameEl) nameEl.textContent = `${circle.nombre} (Retiro: ${circle.direccion})`;
  
  // Generar link directo simple
  const url = CirculosManager.getShareUrl(circle.id);
  
  if (inputEl) inputEl.value = url;
  if (copyBtnText) copyBtnText.textContent = 'Copiar';

  // CONTROL ESTRICTO DE PERMISOS: Solo el creador / coordinador o gestor ve el formulario de editar link
  const canEdit = CirculosManager.canEditCircle(circle.id);
  const editSection = document.getElementById('section-personalizar-circulo-slug');
  const coordInfoSection = document.getElementById('section-circulo-info-coordinador');
  const coordNameEl = document.getElementById('info-circulo-coordinador-nombre');

  if (editSection) {
    if (canEdit) {
      editSection.classList.remove('hidden');
      const editSlugInput = document.getElementById('edit-circulo-slug-input');
      if (editSlugInput) {
        editSlugInput.value = circle.slug || circle.id;
      }
    } else {
      editSection.classList.add('hidden');
    }
  }

  if (coordInfoSection) {
    if (!canEdit) {
      coordInfoSection.classList.remove('hidden');
      if (coordNameEl) coordNameEl.textContent = `Coordinado por: ${circle.coordinador}`;
    } else {
      coordInfoSection.classList.add('hidden');
    }
  }

  const feedback = document.getElementById('slug-feedback-msg');
  if (feedback) feedback.classList.add('hidden');

  if (modal) modal.classList.remove('hidden');
}

function closeCirculoShareModal() {
  document.getElementById('modal-circulo-invitar')?.classList.add('hidden');
}

function copyCirculoLinkFromInput() {
  const inputEl = document.getElementById('share-circulo-link-input');
  if (!inputEl) return;

  navigator.clipboard.writeText(inputEl.value).then(() => {
    sounds.playSuccess();
    const btnText = document.getElementById('btn-copy-circulo-text');
    if (btnText) {
      btnText.textContent = '¡Copiado! ✓';
      setTimeout(() => { btnText.textContent = 'Copiar'; }, 2000);
    }
  }).catch(() => {
    inputEl.select();
    document.execCommand('copy');
    sounds.playSuccess();
  });
}

function saveCustomCircleSlug() {
  const cId = window.activeShareCircleId || (typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null);
  if (!cId || typeof CirculosManager === 'undefined') return;

  const slugInput = document.getElementById('edit-circulo-slug-input');
  const feedback = document.getElementById('slug-feedback-msg');
  if (!slugInput) return;

  const newSlug = slugInput.value.trim();
  const res = CirculosManager.updateCircleSlug(cId, newSlug);

  if (!res.success) {
    if (feedback) {
      feedback.textContent = res.error;
      feedback.className = 'text-[11px] text-rose-600 mt-1.5 block font-semibold';
      feedback.classList.remove('hidden');
    }
    return;
  }

  sounds.playSuccess();
  slugInput.value = res.slug;
  
  // Actualizar el input del link principal
  const mainInput = document.getElementById('share-circulo-link-input');
  if (mainInput) mainInput.value = res.url;

  // Actualizar la URL en la barra de direcciones del navegador
  try {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({ circuloId: res.circle.id }, '', res.url);
    }
  } catch (e) {}

  // Actualizar feedback
  if (feedback) {
    feedback.textContent = `✓ ¡Enlace actualizado con éxito a: /circulo/${res.slug}!`;
    feedback.className = 'text-[11px] text-emerald-700 mt-1.5 block font-bold';
    feedback.classList.remove('hidden');
    setTimeout(() => { feedback.classList.add('hidden'); }, 3000);
  }

  // Actualizar banner y vista de círculos
  renderCirculoStoreBanner();
  renderCirculosView();
}

function copyCirculoLink() {
  const activeCircleId = typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null;
  if (activeCircleId) {
    openCirculoShareModal(activeCircleId);
  }
}

function shareCirculoDirectWhatsApp() {
  const cId = window.activeShareCircleId || (typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null);
  if (!cId) return;
  shareCircleWhatsApp(cId);
}

function sendConsolidatedToWhatsApp() {
  const cId = window.activeCirculoTableroId || (typeof CirculosManager !== 'undefined' ? CirculosManager.getActiveCircleId() : null);
  if (!cId) return;
  sendCircleOrderToWhatsApp(cId);
}
