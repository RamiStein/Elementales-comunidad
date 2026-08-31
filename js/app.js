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
}

const sounds = new SoundManager();

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

  init() {
    // Cargar productos
    const savedProducts = localStorage.getItem('elementales_products');
    if (savedProducts) {
      try {
        this.products = JSON.parse(savedProducts);
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

    // Cargar integrantes
    const savedMembers = localStorage.getItem('elementales_members');
    if (savedMembers) {
      try {
        this.members = JSON.parse(savedMembers);
      } catch (e) {
        this.members = [];
      }
    }
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
    let totalItems = 0;

    // Productos de catálogo
    for (const [prodId, qty] of Object.entries(this.cart)) {
      const prod = this.products.find(p => p.id === prodId);
      if (prod && qty > 0) {
        const itemTotal = prod.price * qty;
        items.push({
          id: prod.id,
          name: prod.name,
          price: prod.price,
          unit: prod.unit,
          qty: qty,
          total: itemTotal,
          emoji: prod.emoji || '📦'
        });
        subtotal += itemTotal;
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
        unit: custom.unit,
        qty: custom.qty,
        total: itemTotal,
        emoji: custom.emoji || '✨',
        isCustom: true
      });
      subtotal += itemTotal;
      totalItems += custom.qty;
    }

    return { items, subtotal, totalItems };
  }
};

// --- NAVEGACIÓN Y VISTAS ---
function navigateTo(viewName) {
  sounds.playPop();
  AppState.currentView = viewName;

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
  if (viewName === 'hub') {
    renderHubStats();
  } else if (viewName === 'new-order') {
    renderOrderCatalog();
    renderFloatingCart();
  } else if (viewName === 'orders-dashboard') {
    renderOrdersDashboard();
  } else if (viewName === 'members-directory') {
    renderMembersDirectory();
  } else if (viewName === 'product-manager') {
    renderProductManager();
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

  // Renderizar filtros de categorías
  if (categoriesContainer) {
    categoriesContainer.innerHTML = CATEGORIES.map(cat => `
      <button 
        onclick="setFilterCategory('${cat}')" 
        class="pill-filter ${AppState.activeCategory === cat ? 'active' : ''}">
        ${cat}
      </button>
    `).join('');
  }

  // Filtrar productos
  const query = AppState.searchQuery.toLowerCase().trim();
  const filtered = AppState.products.filter(prod => {
    const matchesCategory = AppState.activeCategory === 'Todos' || prod.category === AppState.activeCategory;
    const matchesSearch = !query || prod.name.toLowerCase().includes(query) || (prod.category && prod.category.toLowerCase().includes(query));
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

    return `
      <div class="spotify-card p-4 flex flex-col justify-between relative overflow-hidden transition-all ${isSelected ? 'border-[#c0826d] bg-[#fdfaf8] ring-2 ring-[#c0826d]/30 shadow-md' : 'border-stone-200' }">
        ${isSelected ? `<div class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#c0826d] animate-pulse"></div>` : ''}
        
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <span class="text-3xl filter drop-shadow-sm">${prod.emoji || '🌱'}</span>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              ${prod.unit}
            </span>
          </div>

          <h3 class="font-bold text-base text-stone-900 leading-tight mb-1">
            ${escapeHtml(prod.name)}
          </h3>
          <p class="text-xs font-medium text-stone-500 mb-3">${prod.category}</p>
        </div>

        <div class="pt-2 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div>
            <span class="text-[11px] text-stone-400 font-bold block uppercase">Precio</span>
            <span class="text-lg font-black text-[#a6634f]">$${formatMoney(prod.price)}</span>
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
              <span class="font-black text-sm px-2 min-w-[24px] text-center text-stone-900">
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
    `;
  }).join('');
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
  document.getElementById('floating-cart-items-count').textContent = `${cartSummary.totalItems} ${cartSummary.totalItems === 1 ? 'ítem' : 'ítems'}`;
  document.getElementById('floating-cart-total').textContent = `$${formatMoney(cartSummary.subtotal)}`;
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

  totalAmountEl.textContent = `$${formatMoney(summary.subtotal)}`;

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
    cashChange: paymentMethod === 'Efectivo' && cashGiven > summary.subtotal ? cashGiven - summary.subtotal : 0
  };

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

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
  document.body.addEventListener('click', () => sounds.init(), { once: true });
});
