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
  activeNodeId: 'nodo-central',
  userRole: 'visitante', // 'visitante' | 'socio'
  userPlan: 'plan-raices',
  userName: 'Lucía Gómez',
  userCode: 'CSC-2026-0482',

  init() {
    // Detección automática de Nodo Loma Verde por URL / subdominio / parámetro
    const host = (window.location.hostname || '').toLowerCase();
    const search = (window.location.search || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();
    if (host.includes('lomaverde') || search.includes('lomaverde') || hash.includes('lomaverde')) {
      this.activeNodeId = 'nodo-lomaverde';
      localStorage.setItem('elementales_active_node', 'nodo-lomaverde');
    } else {
      this.activeNodeId = localStorage.getItem('elementales_active_node') || 'nodo-lucila';
    }

    // Seguridad estricta: Gestor sólo activo si tiene sesión autenticada con PIN
    const savedRole = localStorage.getItem('elementales_user_role') || 'visitante';
    const isGestorAuth = sessionStorage.getItem('elementales_gestor_auth') === 'true';
    if (savedRole === 'gestor' && !isGestorAuth) {
      this.userRole = 'visitante';
      localStorage.setItem('elementales_user_role', 'visitante');
    } else {
      this.userRole = savedRole;
    }

    this.catalogMode = localStorage.getItem('elementales_catalog_mode') || (this.userRole === 'socio' || this.userRole === 'gestor' ? 'semanal' : 'local');
    this.userPlan = localStorage.getItem('elementales_user_plan') || 'plan-raices';
    this.userName = localStorage.getItem('elementales_user_name') || 'Lucía Gómez';
    this.userCode = localStorage.getItem('elementales_user_code') || 'CSC-2026-0482';

    // Cargar productos asegurando que contengan los precios escalonados
    const savedProducts = localStorage.getItem('elementales_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (parsed.length > 0 && parsed[0].precioSemanal !== undefined) {
          this.products = parsed;
        } else {
          this.products = [...INITIAL_PRODUCTS];
          this.saveProducts();
        }
      } catch (e) {
        this.products = [...INITIAL_PRODUCTS];
      }
    } else {
      this.products = [...INITIAL_PRODUCTS];
      this.saveProducts();
    }

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
    renderOrderCatalog();
    renderFloatingCart();
  },

  getCartDetails() {
    const items = [];
    let subtotal = 0;
    let retailTotal = 0;
    let totalItems = 0;

    // Productos de catálogo
    for (const [prodId, qty] of Object.entries(this.cart)) {
      const prod = this.products.find(p => p.id === prodId);
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

    const totalSavings = Math.max(0, retailTotal - subtotal);
    return { items, subtotal, retailTotal, totalSavings, totalItems };
  }
};

// --- NAVEGACIÓN Y VISTAS ---
// --- NAVEGACIÓN Y VISTAS ---
// --- NAVEGACIÓN Y VISTAS ---
function navigateTo(viewName) {
  sounds.playPop();

  // Mapeo de alias retrocompatibles hacia la arquitectura de 5 Elementos
  if (viewName === 'oficios') {
    navigateTo('agua');
    switchAguaTab('oficios');
    return;
  }
  if (viewName === 'talleres') {
    navigateTo('fuego');
    switchFuegoTab('talleres');
    return;
  }
  if (viewName === 'financiamiento') {
    navigateTo('fuego');
    switchFuegoTab('fondo');
    return;
  }
  if (viewName === 'noticias') {
    navigateTo('aire');
    switchAireTab('noticias');
    return;
  }
  if (viewName === 'hub' || viewName === 'new-order') {
    navigateTo('tierra');
    switchTierraTab('tienda');
    return;
  }
  if (viewName === 'whatsapp') {
    navigateTo('agua');
    switchAguaTab('whatsapp');
    return;
  }
  if (viewName === 'centro-lucila') {
    navigateTo('eter');
    switchEterMainTab('centro');
    showEterModule('centro');
    return;
  }

  AppState.currentView = viewName;

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
    if (AppState.userRole === 'gestor' || window.location.hash === '#admin') {
      switchEterMainTab('gestion');
      showEterModule('elementos');
    } else {
      switchEterMainTab('democracia');
    }
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

  // Actualizar estado visual de los botones de modo (Local, Semanal, Lunar)
  const modeBadge = document.getElementById('catalog-mode-badge');
  const modeDesc = document.getElementById('catalog-mode-description');
  ['local', 'semanal', 'lunar'].forEach(m => {
    const btn = document.getElementById(`btn-mode-${m}`);
    if (btn) {
      btn.classList.toggle('active', AppState.catalogMode === m);
    }
  });

  if (modeBadge && modeDesc) {
    if (AppState.catalogMode === 'local') {
      modeBadge.textContent = '🏪 Local / Feria';
      modeBadge.className = 'text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200';
      modeDesc.innerHTML = 'Precios regulares de feria para público visitante.';
    } else if (AppState.catalogMode === 'semanal') {
      modeBadge.textContent = '🥬 Semanal (-10% Socio CsC)';
      modeBadge.className = 'text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200';
      modeDesc.innerHTML = '✨ <strong>Compras Semanales de Huerta:</strong> 10% de ahorro directo para socios CsC.';
    } else if (AppState.catalogMode === 'lunar') {
      modeBadge.textContent = '🌕 Lunar (-20% Costo Red)';
      modeBadge.className = 'text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#c0826d]/15 text-[#a6634f] border border-[#c0826d]/30';
      modeDesc.innerHTML = '🌕 <strong>Compras Lunares al Costo:</strong> 20% de ahorro directo a precio de productor campesino.';
    }
  }

  // Renderizar filtros de categorías (Tomadas dinámicamente de VRDE Club y configuradas por el gestor)
  if (categoriesContainer) {
    const activeCategories = (typeof VRDEClubBridge !== 'undefined' && VRDEClubBridge.getCategories)
      ? VRDEClubBridge.getCategories()
      : (typeof CATEGORIES !== 'undefined' ? CATEGORIES : ['Todos', 'Verduras & Huerta', 'Granja & Lácteos', 'Almacén Agroecológico', 'Panadería & Masa Madre', 'Cosmética & Botiquín', 'Productorxs Vecinales']);

    categoriesContainer.innerHTML = activeCategories.map(cat => `
      <button 
        onclick="setFilterCategory('${cat}')" 
        class="pill-filter ${AppState.activeCategory === cat ? 'active' : ''}">
        ${cat === 'Productorxs Vecinales' ? '🌾 ' + cat : cat}
      </button>
    `).join('');
  }

  // Filtrar productos con soporte para Productorxs Vecinales y búsqueda ampliada
  const query = AppState.searchQuery.toLowerCase().trim();
  const filtered = AppState.products.filter(prod => {
    const cat = prod.categoria || prod.category;
    const isProductorMatch = AppState.activeCategory === 'Productorxs Vecinales' && (prod.productorVecinal || cat === 'Productorxs Vecinales');
    const matchesCategory = AppState.activeCategory === 'Todos' || cat === AppState.activeCategory || prod.category === AppState.activeCategory || isProductorMatch;
    const matchesSearch = !query || 
      prod.name.toLowerCase().includes(query) || 
      (cat && cat.toLowerCase().includes(query)) ||
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
}

function setCatalogMode(mode) {
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
  if (deliveryType === 'circulo' && selectedCirculoId && typeof CirculosManager !== 'undefined') {
    circuloObj = CirculosManager.getCircle(selectedCirculoId);
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
      totalAmount: summary.subtotal
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
  waBtn.onclick = () => sendWhatsAppTicket(order);

  modal.classList.remove('hidden');
}

function closeOrderSuccessModal() {
  sounds.playPop();
  document.getElementById('modal-order-success').classList.add('hidden');
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
    if (isGestor) codeEl.textContent = 'NODO-LUCILA-GEST';
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
      tabEter.innerHTML = '<span>👑</span> Éter CRM';
      tabEter.title = 'Panel interno de gestión del nodo';
      tabEter.classList.add('border-b-2', 'border-amber-500');
    } else {
      tabEter.innerHTML = '<span>✨</span> Éter CRM';
      tabEter.title = 'Centro y gestión del nodo';
      tabEter.classList.remove('border-b-2', 'border-amber-500');
    }
  }

  // 4. Banner de acceso en Éter CRM
  const eterRoleCard = document.getElementById('eter-role-access-card');
  if (eterRoleCard) {
    if (role === 'gestor') {
      eterRoleCard.className = 'mb-6 p-4 rounded-2xl border bg-amber-50/90 border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs';
      eterRoleCard.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-2xl">👑</span>
          <div>
            <h4 class="font-black text-sm text-amber-950">Modo Gestor del Nodo Activo</h4>
            <p class="text-xs text-amber-900/80">Acceso irrestricto: administración de caja chica, altas de socios, cuadrante de guardia y claves seguras.</p>
          </div>
        </div>
        <span class="text-xs font-bold text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full shrink-0">Permisos Totales</span>
      `;
    } else if (role === 'socio') {
      eterRoleCard.className = 'mb-6 p-4 rounded-2xl border bg-blue-50/90 border-blue-200 text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs';
      eterRoleCard.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-2xl">💧</span>
          <div>
            <h4 class="font-black text-sm text-blue-950">Vista Comunitaria de Socia CsC</h4>
            <p class="text-xs text-blue-800/80">Podes consultar los 5 Elementos, la agenda de talleres y notas del nodo. La caja interna y claves están reservadas para los 5 guardianes.</p>
          </div>
        </div>
        <button onclick="openRoleSwitcherModal()" class="text-xs font-bold text-blue-800 bg-blue-100 hover:bg-blue-200 border border-blue-300 px-3 py-1.5 rounded-full shrink-0">Cambiar a Gestor ⇄</button>
      `;
    } else {
      eterRoleCard.className = 'mb-6 p-4 rounded-2xl border bg-stone-100 border-stone-200 text-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs';
      eterRoleCard.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-2xl">👤</span>
          <div>
            <h4 class="font-black text-sm text-stone-900">Vista Institucional (Vecino No Miembro)</h4>
            <p class="text-xs text-stone-600">Éter es el centro de mando del Nodo La Lucila. Para gestionar el nodo podés activar el Modo Gestor o sumarte como Socio CsC.</p>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="toggleUserRole('gestor')" class="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-full">Activar Modo Gestor 👑</button>
          <button onclick="navigateTo('membership')" class="text-xs font-bold text-white bg-[#c0826d] hover:bg-[#a6634f] px-3 py-1.5 rounded-full">Hacerme Socio 💧</button>
        </div>
      `;
    }
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

function switchEterMainTab(tabName) {
  sounds.playPop();
  document.querySelectorAll('#eter-main-subnav-tabs .element-subtab-btn').forEach(btn => {
    btn.classList.remove('active-eter');
  });
  const activeBtn = document.getElementById(`eter-tab-btn-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-eter');

  // Ocultar paneles principales de Éter
  const panDemo = document.getElementById('eter-panel-democracia');
  const panCrm = document.getElementById('eter-panel-micrm');
  const modulesGrid = document.getElementById('eter-modules-grid');
  
  if (panDemo) panDemo.classList.toggle('hidden', tabName !== 'democracia');
  if (panCrm) panCrm.classList.toggle('hidden', tabName !== 'micrm');

  if (tabName === 'centro') {
    if (modulesGrid) modulesGrid.classList.remove('hidden');
    showEterModule('centro');
  } else if (tabName === 'gestion') {
    if (AppState.userRole !== 'gestor' || sessionStorage.getItem('elementales_gestor_auth') !== 'true') {
      requestGestorAccess(() => switchEterMainTab('gestion'));
      return;
    }
    if (modulesGrid) modulesGrid.classList.remove('hidden');
    showEterModule('elementos');
  } else {
    // En democracia o micrm, ocultar el grid de gestión interna para no saturar
    if (modulesGrid) modulesGrid.classList.add('hidden');
    document.querySelectorAll('.eter-panel').forEach(p => p.classList.add('hidden'));
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

  if (typeof confetti === 'function') {
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
  }
}

// 🧭 CONTROL DEL MODAL DE LOGIN INICIAL & ACCESO #admin
function checkInitialLogin() {
  if (window.location.hash === '#admin') {
    selectInitialRole('gestor');
    return;
  }

  const chosen = sessionStorage.getItem('elementales_initial_role_chosen');
  if (!chosen) {
    openInitialLoginModal();
  }
}

function openInitialLoginModal() {
  const modal = document.getElementById('modal-initial-login');
  if (modal) modal.classList.remove('hidden');
}

function closeInitialLoginModal() {
  const modal = document.getElementById('modal-initial-login');
  if (modal) modal.classList.add('hidden');
}

function selectInitialRole(role) {
  AppState.userRole = role;
  localStorage.setItem('elementales_user_role', role);
  sessionStorage.setItem('elementales_initial_role_chosen', 'true');

  if (role === 'socio' || role === 'gestor') {
    AppState.catalogMode = 'semanal';
  } else {
    AppState.catalogMode = 'local';
  }
  localStorage.setItem('elementales_catalog_mode', AppState.catalogMode);

  closeInitialLoginModal();
  updateRoleUI();
  sounds.playPop();

  if (role === 'gestor') {
    navigateTo('eter');
    switchEterMainTab('gestion');
    showEterModule('elementos');
  } else {
    navigateTo('barrio');
  }
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
  updateRoleUI();
  document.body.addEventListener('click', () => sounds.init(), { once: true });
  
  // Cargar notas guardadas del nodo
  const notasGuardadas = localStorage.getItem('eter_notas_internas');
  if (notasGuardadas) {
    const ta = document.getElementById('eter-notas-internas');
    if (ta) ta.value = notasGuardadas;
  }
  
  // Iniciar en la vista del Portal Barrial
  navigateTo('barrio');
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

  const currentId = AppState.activeNodeId || 'nodo-lucila';
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
  closeNodeSelectorModal();
  sounds.playSuccess();
  updateNodeUI();
  if (AppState.currentView === 'barrio') renderBarrioFeed();
  if (AppState.currentView === 'tierra') renderOrderCatalog();
  if (AppState.currentView === 'circulos') renderCirculosView();
}

function updateNodeUI() {
  const node = NODOS_COMUNIDAD.find(n => n.id === AppState.activeNodeId) || NODOS_COMUNIDAD[0];
  const nameEl = document.getElementById('header-node-name');
  if (nameEl) {
    nameEl.textContent = node.id === 'nodo-lomaverde' ? 'Loma Verde' : 'La Lucila';
  }

  const badgeEl = document.getElementById('header-node-badge');
  if (badgeEl) {
    if (node.id === 'nodo-lomaverde') {
      badgeEl.className = 'flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs border bg-emerald-100 text-emerald-950 border-emerald-400 hover:bg-emerald-200';
    } else {
      badgeEl.className = 'flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs border bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200';
    }
  }

  // Banner Loma Verde en view-barrio
  const bannerLV = document.getElementById('banner-nodo-lomaverde');
  if (bannerLV) {
    bannerLV.classList.toggle('hidden', AppState.activeNodeId !== 'nodo-lomaverde');
  }

  populateCheckoutCirculos();
}

// =========================================================================
// FACULTAD DE CÍRCULOS (VRDE CLUB & RED ELEMENTALES)
// =========================================================================
let currentCirculosFilter = 'todos';

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

  // Obtener círculos
  let circles = CirculosManager.getAllCircles();
  if (currentCirculosFilter !== 'todos') {
    circles = circles.filter(c => c.nodoId === currentCirculosFilter);
  }

  if (countIndicator) {
    countIndicator.textContent = `${circles.length} círculos disponibles`;
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
                📍 <strong>Punto de Retiro:</strong> ${escapeHtml(activeCircle.direccion)} · 👤 Coordina: ${escapeHtml(activeCircle.coordinador)}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="shareCircleWhatsApp('${activeCircle.id}')" class="btn-spotify !py-2 !px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-xs">
                <span>📲</span> Compartir Círculo
              </button>
            </div>
          </div>

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
              <button onclick="CirculosManager.setActiveCircleId(null); renderCirculosView(); sounds.playPop();" class="text-xs text-stone-400 hover:text-stone-600 underline">
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
        <p class="font-bold text-stone-700 text-base">No hay círculos registrados en este nodo aún</p>
        <p class="text-xs text-stone-500 mt-1">Sé el primero en crear un Círculo en tu barrio para comprar juntos con tus vecinos.</p>
        <button onclick="openCreateCirculoModal()" class="btn-spotify !py-2 !px-4 text-xs font-bold bg-emerald-600 text-white mt-4 shadow-sm">
          + Crear Círculo de Compra
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = circles.map(c => {
    const isMyCircle = c.id === activeCircleId;
    const pedidosCount = (c.pedidos || []).length;
    const miembrosCount = (c.miembros || []).length;
    const nodeName = c.nodoId === 'nodo-lomaverde' ? 'Loma Verde' : 'La Lucila';

    return `
      <div class="bg-white rounded-3xl border-2 transition-all p-5 shadow-2xs hover:shadow-md flex flex-col justify-between ${
        isMyCircle ? 'border-emerald-500 bg-emerald-50/20' : 'border-stone-200'
      }">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              📍 ${nodeName}
            </span>
            ${isMyCircle ? '<span class="text-xs font-black text-emerald-600">✓ Tu Círculo</span>' : ''}
          </div>

          <h3 class="font-black text-base text-stone-900 leading-snug">${escapeHtml(c.nombre)}</h3>
          <p class="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">${escapeHtml(c.descripcion || 'Círculo de compra comunitaria.')}</p>

          <div class="mt-3.5 space-y-1 text-xs text-stone-600">
            <p>📍 <strong>Retiro:</strong> ${escapeHtml(c.direccion)}</p>
            <p>👤 <strong>Coordina:</strong> ${escapeHtml(c.coordinador)}</p>
            <p>📅 <strong>Frecuencia:</strong> ${escapeHtml(c.frecuencia || 'Semanal')}</p>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <span class="text-[11px] font-bold text-stone-400">
            👥 ${miembrosCount} miembros · ${pedidosCount} pedidos
          </span>
          <button 
            type="button" 
            onclick="joinCircle('${c.id}')" 
            class="btn-spotify !py-1.5 !px-3 text-xs font-bold ${
              isMyCircle 
                ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }">
            ${isMyCircle ? 'Seleccionado' : 'Unirme'}
          </button>
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

  const tabId = nodeFilter === 'todos' ? 'circulos-filter-todos' : (nodeFilter === 'nodo-lomaverde' ? 'circulos-filter-lomaverde' : 'circulos-filter-lucila');
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
    modal.classList.remove('hidden');
  }
}

function closeCreateCirculoModal() {
  const modal = document.getElementById('modal-create-circulo');
  if (modal) modal.classList.add('hidden');
}

function handleCreateCirculoSubmit(e) {
  e.preventDefault();
  if (typeof CirculosManager === 'undefined') return;

  const nombre = document.getElementById('circulo-nombre')?.value.trim();
  const coordinador = document.getElementById('circulo-coordinador')?.value.trim();
  const telefono = document.getElementById('circulo-telefono')?.value.trim();
  const direccion = document.getElementById('circulo-direccion')?.value.trim();
  const nodoId = document.getElementById('circulo-nodo')?.value;
  const frecuencia = document.getElementById('circulo-frecuencia')?.value;
  const descripcion = document.getElementById('circulo-descripcion')?.value.trim();

  const newCirculo = CirculosManager.createCircle({
    nombre,
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

  renderCirculosView();
  updateRoleUI();
  populateCheckoutCirculos();
  e.target.reset();
}

function joinCircle(circleId) {
  if (typeof CirculosManager === 'undefined') return;
  sounds.playSuccess();
  CirculosManager.joinCircle(circleId, AppState.userName);
  renderCirculosView();
  updateRoleUI();
  populateCheckoutCirculos();
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
