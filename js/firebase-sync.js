// =========================================================================
// ELEMENTALES COMUNIDAD - CLIENTE Y SINCRONIZADOR DE FIREBASE FIRESTORE
// =========================================================================
// Sincronización bidireccional y en tiempo real para compras comunitarias,
// pedidos de aceite de oliva, frutillas y compras lunares.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ElementalesFirebase = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const COLLECTION_NAME = 'pedidos';

  const ElementalesFirebase = {
    isReady: false,
    isOnline: false,
    db: null,
    app: null,
    activeUnsubscribe: null,
    statusText: 'Iniciando conexión con Firebase...',

    // -----------------------------------------------------------------------
    // 1. INICIALIZACIÓN DE FIREBASE & FIRESTORE
    // -----------------------------------------------------------------------
    init() {
      if (this.isReady && this.db) return true;

      const config = (typeof window !== 'undefined' && window.ELEMENTALES_FIREBASE_CONFIG)
        ? window.ELEMENTALES_FIREBASE_CONFIG
        : (typeof firebaseConfig !== 'undefined' ? firebaseConfig : null);

      if (!config) {
        console.warn('[Firebase] No se encontró la configuración ELEMENTALES_FIREBASE_CONFIG');
        this.statusText = 'Falta configuración de Firebase';
        return false;
      }

      if (typeof firebase === 'undefined') {
        console.warn('[Firebase] El SDK de Firebase no está cargado aún en el navegador.');
        this.statusText = 'Cargando SDK de Firebase...';
        return false;
      }

      try {
        if (!firebase.apps || firebase.apps.length === 0) {
          this.app = firebase.initializeApp(config);
        } else {
          this.app = firebase.app();
        }

        this.db = firebase.firestore();

        // Configuración de persistencia offline en caché local
        if (typeof this.db.enablePersistence === 'function') {
          this.db.enablePersistence({ synchronizeTabs: true }).catch(err => {
            if (err.code === 'failed-precondition') {
              console.warn('[Firebase] Persistencia offline habilitada solo en una pestaña activa.');
            } else if (err.code === 'unimplemented') {
              console.warn('[Firebase] El navegador actual no soporta persistencia offline.');
            }
          });
        }

        this.isReady = true;
        this.isOnline = true;
        this.statusText = 'Conectado a Firebase Firestore en tiempo real';
        console.log('[Firebase] Cloud Firestore conectado con éxito. Colección principal:', COLLECTION_NAME);

        this.emitStatusChange('ready');
        return true;
      } catch (err) {
        console.error('[Firebase] Error inicializando Firebase:', err);
        this.statusText = 'Error conectando a Firebase: ' + (err.message || err);
        this.emitStatusChange('error', err);
        return false;
      }
    },

    // -----------------------------------------------------------------------
    // 2. LIMPIEZA DE DATOS (Elimina undefined para Firestore)
    // -----------------------------------------------------------------------
    cleanData(obj) {
      if (obj === null || obj === undefined) return null;
      if (typeof obj !== 'object') return obj;

      if (Array.isArray(obj)) {
        return obj.map(item => this.cleanData(item)).filter(item => item !== undefined);
      }

      const cleanObj = {};
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (val !== undefined && typeof val !== 'function') {
          cleanObj[key] = this.cleanData(val);
        }
      });
      return cleanObj;
    },

    normalizeDocId(order) {
      let rawId = (order && (order.id || order.number)) || ('PED-' + Date.now());
      let cleanId = String(rawId).replace(/[\/\s#?]+/g, '-').trim();
      if (!cleanId) cleanId = 'ORD-' + Date.now();
      return cleanId;
    },

    // -----------------------------------------------------------------------
    // 3. GUARDAR O ACTUALIZAR PEDIDO EN FIRESTORE
    // -----------------------------------------------------------------------
    async saveOrder(order) {
      if (!order) return { success: false, error: 'Pedido vacío' };

      if (!this.init()) {
        console.warn('[Firebase] No se pudo guardar en Firestore (servicio no listo). Se mantiene copia local.');
        return { success: false, error: 'Firebase no inicializado' };
      }

      try {
        const docId = this.normalizeDocId(order);
        const orderToSave = this.cleanData(order);

        // Enriquecer con metadata de sincronización
        orderToSave.id = orderToSave.id || docId;
        orderToSave.updatedAt = Date.now();
        orderToSave.syncSource = 'elementales-web';
        if (!orderToSave.timestamp) orderToSave.timestamp = Date.now();

        await this.db.collection(COLLECTION_NAME).doc(docId).set(orderToSave, { merge: true });
        console.log(`[Firebase] ✓ Pedido #${docId} guardado/actualizado con éxito en Firestore`);

        this.emitOrderEvent('order_saved', orderToSave);
        return { success: true, id: docId, order: orderToSave };
      } catch (err) {
        console.error('[Firebase] Error guardando pedido en Firestore:', err);
        return { success: false, error: err.message || err };
      }
    },

    // -----------------------------------------------------------------------
    // 4. ELIMINAR PEDIDO DE FIRESTORE
    // -----------------------------------------------------------------------
    async deleteOrder(orderId) {
      if (!orderId) return { success: false, error: 'ID de pedido inválido' };

      if (!this.init()) {
        return { success: false, error: 'Firebase no inicializado' };
      }

      try {
        const docId = this.normalizeDocId({ id: orderId });
        await this.db.collection(COLLECTION_NAME).doc(docId).delete();
        console.log(`[Firebase] ✓ Pedido #${docId} eliminado de Firestore`);

        // Si existe variante con o sin prefijo ORD-
        if (docId.startsWith('ORD-')) {
          const alternateId = docId.replace('ORD-', '');
          this.db.collection(COLLECTION_NAME).doc(alternateId).delete().catch(() => {});
        } else {
          const alternateId = 'ORD-' + docId;
          this.db.collection(COLLECTION_NAME).doc(alternateId).delete().catch(() => {});
        }

        this.emitOrderEvent('order_deleted', { id: docId });
        return { success: true, id: docId };
      } catch (err) {
        console.error('[Firebase] Error eliminando pedido en Firestore:', err);
        return { success: false, error: err.message || err };
      }
    },

    // -----------------------------------------------------------------------
    // 5. OBTENER TODOS LOS PEDIDOS (Lectura única)
    // -----------------------------------------------------------------------
    async getAllOrders() {
      if (!this.init()) return [];

      try {
        const snapshot = await this.db.collection(COLLECTION_NAME).get();
        const orders = [];
        snapshot.forEach(doc => {
          orders.push({ id: doc.id, ...doc.data() });
        });

        // Ordenar del más reciente al más antiguo
        orders.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
        return orders;
      } catch (err) {
        console.error('[Firebase] Error obteniendo pedidos de Firestore:', err);
        return [];
      }
    },

    // -----------------------------------------------------------------------
    // 6. ESCUCHAR PEDIDOS EN TIEMPO REAL (onSnapshot)
    // -----------------------------------------------------------------------
    listenToOrders(onUpdateCallback, onErrorCallback) {
      if (!this.init()) {
        // Reintentar cuando el DOM esté listo o se carguen los scripts
        setTimeout(() => this.listenToOrders(onUpdateCallback, onErrorCallback), 800);
        return null;
      }

      if (this.activeUnsubscribe) {
        try { this.activeUnsubscribe(); } catch (e) {}
      }

      console.log('[Firebase] 🎧 Activando escucha en tiempo real de pedidos...');

      try {
        this.activeUnsubscribe = this.db.collection(COLLECTION_NAME)
          .onSnapshot(
            snapshot => {
              const orders = [];
              snapshot.forEach(doc => {
                orders.push({ id: doc.id, ...doc.data() });
              });

              orders.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
              this.isOnline = true;
              this.statusText = `Conectado · ${orders.length} pedidos en la nube`;

              if (typeof onUpdateCallback === 'function') {
                onUpdateCallback(orders);
              }
              this.emitStatusChange('snapshot', { count: orders.length });
            },
            err => {
              console.error('[Firebase] Error en escucha en tiempo real:', err);
              this.isOnline = false;
              this.statusText = 'Error de conexión: ' + (err.message || err);
              if (typeof onErrorCallback === 'function') {
                onErrorCallback(err);
              }
              this.emitStatusChange('error', err);
            }
          );

        return this.activeUnsubscribe;
      } catch (err) {
        console.error('[Firebase] Excepción al suscribir onSnapshot:', err);
        return null;
      }
    },

    // -----------------------------------------------------------------------
    // 7. SUBIR PEDIDOS LOCALES A FIREBASE (Migración inicial transparente)
    // -----------------------------------------------------------------------
    async syncLocalOrdersToFirebase(localOrders) {
      if (!Array.isArray(localOrders) || localOrders.length === 0) return { uploaded: 0 };
      if (!this.init()) return { uploaded: 0, error: 'Firebase no listo' };

      let uploaded = 0;
      for (const order of localOrders) {
        if (!order || (!order.clientName && !order.items)) continue;
        const res = await this.saveOrder(order);
        if (res && res.success) uploaded++;
      }
      console.log(`[Firebase] Sincronización completada: ${uploaded} pedidos respaldados en la nube.`);
      return { uploaded };
    },

    // -----------------------------------------------------------------------
    // 8. EVENTOS INTERNOS DEL NAVEGADOR
    // -----------------------------------------------------------------------
    emitStatusChange(type, detail) {
      if (typeof window === 'undefined' || !window.dispatchEvent) return;
      try {
        window.dispatchEvent(new CustomEvent('elementales:firebaseStatus', {
          detail: { type, isReady: this.isReady, isOnline: this.isOnline, text: this.statusText, data: detail }
        }));
      } catch (e) {}
    },

    emitOrderEvent(type, order) {
      if (typeof window === 'undefined' || !window.dispatchEvent) return;
      try {
        window.dispatchEvent(new CustomEvent('elementales:firebaseOrder', {
          detail: { type, order }
        }));
      } catch (e) {}
    }
  };

  // Auto-inicializar si las librerías de Firebase ya están presentes
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => ElementalesFirebase.init());
    } else {
      setTimeout(() => ElementalesFirebase.init(), 100);
    }
  }

  return ElementalesFirebase;
}));
