// =========================================================================
// ELEMENTALES COMUNIDAD - BASE DE DATOS Y GESTIÓN DE SESIONES UNIFICADA
// =========================================================================
// Arquitectura de persistencia para Pedidos, Círculos, Cajones y Sesiones:
// 1. Sesión de Visitante (Vecino invitado que pide por link de WhatsApp)
// 2. Sesión de Miembro / Socio (Integrante de la red con código y perfil)
// 3. Sesión de Administrador / Gestor (Control y visualización de toda la red)
//
// Soporte dual:
// - Servidor local / producción REST API (/api/...)
// - Almacenamiento local indexado para funcionamiento offline / GitHub Pages

const ElementalesDB = {
  KEYS: {
    SESSION: 'elementales_session_v1',
    USERS: 'elementales_users_v1',
    ORDERS: 'elementales_orders_db_v1',
    CIRCULOS: 'elementales_circulos',
    SHARES: 'elementales_cajones_compartidos',
    DB_INITIALIZED: 'elementales_db_init_v1'
  },

  apiBase: '', // Rutas relativas /api/...

  // -----------------------------------------------------------------------
  // 1. GESTIÓN DE SESIONES DE USUARIOS (Visitante, Socio, Admin)
  // -----------------------------------------------------------------------
  getSession() {
    try {
      const raw = localStorage.getItem(this.KEYS.SESSION);
      if (raw) {
        const sess = JSON.parse(raw);
        if (sess && sess.sessionId) return sess;
      }
    } catch (e) {
      console.warn('Error leyendo sesión:', e);
    }

    // Si no existe, inicializar sesión de Visitante por defecto
    const newSession = {
      sessionId: 'vis-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 4),
      role: 'visitante', // 'visitante' | 'socio' | 'admin'
      userName: (typeof localStorage !== 'undefined' ? (localStorage.getItem('elementales_user_name') || '') : ''),
      userPhone: (typeof localStorage !== 'undefined' ? (localStorage.getItem('elementales_user_phone') || '') : ''),
      userEmail: '',
      userCode: '',
      plan: 'libre',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      pedidos: []
    };

    this.saveSession(newSession);
    return newSession;
  },

  saveSession(session) {
    if (!session) return;
    session.lastActive = new Date().toISOString();
    try {
      localStorage.setItem(this.KEYS.SESSION, JSON.stringify(session));
      // Sincronizar en variables clave de AppState si está disponible
      if (typeof AppState !== 'undefined') {
        if (session.userName) AppState.userName = session.userName;
        if (session.userPhone) AppState.userPhone = session.userPhone;
        if (session.role) AppState.userRole = session.role;
      }
      this.syncToServer('sessions', session);
    } catch (e) {
      console.error('Error guardando sesión:', e);
    }
  },

  setUserName(name) {
    if (!name) return;
    const clean = name.trim();
    const sess = this.getSession();
    sess.userName = clean;
    localStorage.setItem('elementales_user_name', clean);
    this.saveSession(sess);
  },

  setUserPhone(phone) {
    if (!phone) return;
    const clean = phone.trim();
    const sess = this.getSession();
    sess.userPhone = clean;
    localStorage.setItem('elementales_user_phone', clean);
    this.saveSession(sess);
  },

  loginAsSocio(socioData) {
    const sess = this.getSession();
    sess.role = 'socio';
    sess.userCode = socioData.codigo || 'SOC-' + Date.now().toString(36).toUpperCase();
    sess.userName = socioData.nombre || sess.userName;
    sess.userEmail = socioData.email || '';
    sess.userPhone = socioData.telefono || sess.userPhone;
    sess.userAddress = socioData.direccion || '';
    sess.plan = socioData.plan || 'plan-raices';
    sess.labor = socioData.labor || '';
    sess.lastActive = new Date().toISOString();
    this.saveSession(sess);
    return sess;
  },

  loginAsAdmin(pin) {
    // Verificación de credencial de Gestor / Admin (PIN barrial o PIN maestro)
    if (pin === '1234' || pin === '2026') {
      const sess = this.getSession();
      sess.role = 'admin';
      sess.isAdmin = true;
      sess.userName = sess.userName || 'Administrador Loma Verde';
      this.saveSession(sess);
      sessionStorage.setItem('elementales_gestor_auth', 'true');
      return { success: true, session: sess };
    }
    return { success: false, error: 'PIN incorrecto' };
  },

  logoutSession() {
    localStorage.removeItem(this.KEYS.SESSION);
    sessionStorage.removeItem('elementales_gestor_auth');
    return this.getSession();
  },

  // -----------------------------------------------------------------------
  // 2. GESTIÓN CENTRALIZADA DE PEDIDOS (Orders Store)
  // -----------------------------------------------------------------------
  getAllOrders() {
    try {
      const raw = localStorage.getItem(this.KEYS.ORDERS) || localStorage.getItem('elementales_orders');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error cargando pedidos:', e);
    }
    return [];
  },

  saveOrder(order) {
    if (!order) return;
    const orders = this.getAllOrders();
    const sess = this.getSession();

    // Enriquecer el pedido con los datos de sesión y usuario real
    order.sessionId = sess.sessionId;
    order.userRole = sess.role;
    if (!order.clientName || order.clientName === 'Vecin@' || order.clientName === 'Cliente de Feria') {
      if (sess.userName) order.clientName = sess.userName;
    }
    if (!order.clientPhone && sess.userPhone) {
      order.clientPhone = sess.userPhone;
    }

    // Registrar en lista general de pedidos
    const existingIdx = orders.findIndex(o => o.id === order.id);
    if (existingIdx >= 0) {
      orders[existingIdx] = order;
    } else {
      orders.unshift(order);
    }

    try {
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem('elementales_orders', JSON.stringify(orders));
    } catch (e) {}

    // Asociar a la sesión actual
    if (!sess.pedidos) sess.pedidos = [];
    if (!sess.pedidos.includes(order.id)) {
      sess.pedidos.unshift(order.id);
      this.saveSession(sess);
    }

    // Sincronizar en servidor si hay API disponible
    this.syncToServer('orders', order);
    return order;
  },

  getOrdersForUser(sessionIdOrName) {
    const orders = this.getAllOrders();
    const q = String(sessionIdOrName || '').toLowerCase().trim();
    return orders.filter(o => 
      (o.sessionId && o.sessionId === sessionIdOrName) ||
      (o.clientName && o.clientName.toLowerCase().includes(q))
    );
  },

  getOrdersForCircle(circleId) {
    const orders = this.getAllOrders();
    return orders.filter(o => o.circuloId === circleId);
  },

  // -----------------------------------------------------------------------
  // 3. PERSISTENCIA DE CAJONES COMPARTIDOS Y CÍRCULOS
  // -----------------------------------------------------------------------
  saveShare(share) {
    if (!share) return;
    this.syncToServer('shares', share);
  },

  saveCircle(circle) {
    if (!circle) return;
    this.syncToServer('circulos', circle);
  },

  // -----------------------------------------------------------------------
  // 4. SINCRONIZACIÓN CON BACKEND REST API (/api/...)
  // -----------------------------------------------------------------------
  async syncToServer(endpoint, data) {
    try {
      if (typeof window === 'undefined' || !window.fetch) return;
      const res = await fetch(`${this.apiBase}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Servidor no disponible (ej. GitHub Pages estático o sin conexión), se mantiene local
    }
  },

  async fetchFromServer() {
    try {
      if (typeof window === 'undefined' || !window.fetch) return false;
      const res = await fetch(`${this.apiBase}/api/db`);
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(data.orders));
          localStorage.setItem('elementales_orders', JSON.stringify(data.orders));
        }
        if (data.circulos && Array.isArray(data.circulos)) {
          localStorage.setItem(this.KEYS.CIRCULOS, JSON.stringify(data.circulos));
        }
        if (data.shares && Array.isArray(data.shares)) {
          localStorage.setItem(this.KEYS.SHARES, JSON.stringify(data.shares));
        }
        return true;
      }
    } catch (e) {
      return false;
    }
  },

  // Inicialización y limpieza de datos ficticios antiguos
  init() {
    // Si el nombre guardado es el antiguo ficticio "Lucía Gómez", limpiarlo para permitir nombres reales
    const savedName = localStorage.getItem('elementales_user_name');
    if (savedName === 'Lucía Gómez') {
      localStorage.removeItem('elementales_user_name');
      localStorage.removeItem('elementales_user_email');
    }
    this.getSession();
    this.fetchFromServer();
  }
};

// Auto-inicializar base de datos
if (typeof window !== 'undefined') {
  ElementalesDB.init();
}
