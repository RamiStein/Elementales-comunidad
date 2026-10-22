// =========================================================================
// VRDE CLUB x ELEMENTALES - SINCRONIZACIÓN FEDERADA DE NODO (PROVIDER_ID: 1)
// =========================================================================
// Este módulo conecta a Elementales (Nodo Loma Verde / Red Fractal) con la
// plataforma central VRDE Club (vrde.club).
//
// Funcionalidades:
// 1. Prestación de servicios de compras colectivas (Proveedor ID 1).
// 2. Traer compras abiertas centrales (Compra Lunar, Compra Semanal).
// 3. Traer y proponer compras abiertas de nodos comunitarios (ej. Frutillas Loma Verde,
//    Verdura de huerta Maschwitz, Cítricos del Delta).
// 4. Curación de catálogo: el nodo selecciona qué alimentos publica a su comunidad.
// =========================================================================

const VrdeSync = {
  CONFIG: {
    apiUrl: 'https://vrde.club',
    providerId: 1, // Sincronizado con VITE_PROVIDER_ID=1 de VRDE Club
    nodeId: 'nodo-lomaverde',
    nodeName: 'Loma Verde (Escobar)',
    storageKey: 'elementales_vrde_campaigns',
    syncTimestampKey: 'elementales_vrde_last_sync'
  },

  // Campañas semilla de la red VRDE Club
  DEFAULT_CAMPAIGNS: [
    {
      id: 'camp-lunar',
      slug: 'lunar',
      nombre: 'Compra Lunar - Ciclos Comunitarios',
      subtitulo: 'Ciclos Comunitarios · Almacén al Costo de Red',
      tipo: 'lunar',
      estado: 'abierta', // 'abierta' | 'futura'
      origen: 'VRDE Club Central',
      origenNodo: 'central',
      esCentral: true,
      icono: '🌕',
      badge: 'Luna Nueva a Luna Llena',
      descripcion: 'Compras comunitarias organizadas al costo (-25%). Harinas integrales, legumbres, miel pura de monte, yerba y frutos secos.',
      apertura: 'Abierta ahora',
      cierre: 'Cierre ciclo lunar: 30 de Octubre',
      entrega: 'Entrega comunitaria: Primer sábado de Noviembre',
      habilitadoEnNodo: true,
      url: '/compralunar',
      productos: [
        {
          id: 'vrde-prod-harina-5k',
          name: 'Harina Integral Agroecológica Molino (5 kg)',
          cleanName: 'Harina Integral',
          producer: 'Molino Campesino Chasqui',
          category: 'Almacén',
          unit: 'Bolsa 5kg',
          costVRDE: 4200,
          priceSocio: 5000,
          priceRetail: 5800,
          emoji: '🌾',
          img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        },
        {
          id: 'vrde-prod-miel-1k',
          name: 'Miel Pura de Monte y Delta (1 kg)',
          cleanName: 'Miel Pura de Monte',
          producer: 'Apícola Islas del Delta',
          category: 'Almacén',
          unit: 'Frasco 1kg',
          costVRDE: 4800,
          priceSocio: 5900,
          priceRetail: 6800,
          emoji: '🍯',
          img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        },
        {
          id: 'vrde-prod-yerba-2k',
          name: 'Yerba Mate Agroecológica Secado Barbaquá (2 kg)',
          cleanName: 'Yerba Agroecológica',
          producer: 'Cooperativa Ybira Porá',
          category: 'Almacén',
          unit: 'Paquete 2kg',
          costVRDE: 5600,
          priceSocio: 6800,
          priceRetail: 8200,
          emoji: '🧉',
          img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        },
        {
          id: 'vrde-prod-arroz-3k',
          name: 'Arroz Yamaní Integral Agroecológico (3 kg)',
          cleanName: 'Arroz Yamaní',
          producer: 'Molino Río de la Plata',
          category: 'Almacén',
          unit: 'Bolsa 3kg',
          costVRDE: 3900,
          priceSocio: 4800,
          priceRetail: 5900,
          emoji: '🍚',
          img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        },
        {
          id: 'vrde-prod-aceite-2l',
          name: 'Aceite de Oliva Extra Virgen Primera Prensión (2 L)',
          cleanName: 'Aceite de Oliva Extra Virgen',
          producer: 'Finca Los Olivos Traslasierra',
          category: 'Almacén',
          unit: 'Bidón 2L',
          costVRDE: 11000,
          priceSocio: 13500,
          priceRetail: 16000,
          emoji: '🫒',
          img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        }
      ]
    },
    {
      id: 'camp-frutilla',
      slug: 'frutilla',
      nombre: 'Compra comunitaria frutilla',
      subtitulo: 'Finca Ecotipa · Cosecha Directa en Origen',
      tipo: 'abierta',
      estado: 'abierta',
      origen: 'Nodo Loma Verde',
      origenNodo: 'nodo-lomaverde',
      esCentral: false,
      icono: '🍓',
      badge: 'Finca Ecotipa',
      descripcion: 'Frutillas agroecológicas seleccionadas en origen directo de Finca Ecotipa. Cajón cooperativo de 5 kg.',
      apertura: 'Abierta ahora',
      cierre: '23/10 - 15hs',
      entrega: 'Viernes 23 en Loma Verde',
      habilitadoEnNodo: true,
      url: 'frutilla.html',
      productos: [
        {
          id: 'vrde-prod-frutilla-5k',
          name: 'Cajón Frutillas Agroecológicas Entero (5 kg)',
          cleanName: 'Cajón Frutillas Entero (5 kg)',
          producer: 'Finca Ecotipa (Loma Verde)',
          category: 'Frutas Agroecológicas',
          unit: 'Cajón 5kg',
          cajonKg: 5,
          costVRDE: 29000,
          priceSocio: 34000,
          priceRetail: 38000,
          emoji: '🍓',
          img: 'public/assets/frutillas_ecotipa.jpg',
          enabled: true,
          esCajon: true
        },
        {
          id: 'vrde-prod-frutilla-2k5',
          name: 'Medio Cajón Frutillas Agroecológicas (2.5 kg)',
          cleanName: 'Medio Cajón Frutillas (2.5 kg)',
          producer: 'Finca Ecotipa (Loma Verde)',
          category: 'Frutas Agroecológicas',
          unit: 'Medio Cajón 2.5kg',
          cajonKg: 2.5,
          costVRDE: 15500,
          priceSocio: 18000,
          priceRetail: 21000,
          emoji: '🍓',
          img: 'public/assets/frutillas_ecotipa.jpg',
          enabled: true,
          esCajon: true
        },
        {
          id: 'vrde-prod-frutilla-1k6',
          name: 'Tercio de Cajón Frutillas Agroecológicas (1.6 kg)',
          cleanName: 'Tercio de Cajón Frutillas (1.6 kg)',
          producer: 'Finca Ecotipa (Loma Verde)',
          category: 'Frutas Agroecológicas',
          unit: 'Porción 1.6kg',
          cajonKg: 1.6,
          costVRDE: 10500,
          priceSocio: 12500,
          priceRetail: 14500,
          emoji: '🍓',
          img: 'public/assets/frutillas_ecotipa.jpg',
          enabled: true,
          esCajon: true
        }
      ]
    },
    {
      id: 'camp-semanal',
      slug: 'semanal',
      nombre: 'Compra semanal',
      subtitulo: 'Huerta & Frescos · Cosecha Viva de Quinteros',
      tipo: 'semanal',
      estado: 'futura',
      origen: 'VRDE Club Central',
      origenNodo: 'central',
      esCentral: true,
      icono: '☀️',
      badge: 'Huerta & Frescos',
      descripcion: 'Bolsones de verdura fresca de estación, frutas de quinteros y huevos pastoriles de granja.',
      apertura: 'Sábado 24 de octubre, 12hs',
      cierre: 'Domingo 00hs',
      entrega: 'Miércoles en Punto Nodo',
      habilitadoEnNodo: true,
      url: '/lomaverde/tierra/semanal',
      productos: [
        {
          id: 'vrde-prod-bolson-8k',
          name: 'Bolsón de Verduras de Huerta Agroecológica (8 kg)',
          cleanName: 'Bolsón de Verduras Huerta (8 kg)',
          producer: 'Quintas de Maschwitz & Escobar',
          category: 'Verduras & Huerta',
          unit: 'Bolsón 8kg',
          cajonKg: 8,
          costVRDE: 9800,
          priceSocio: 12500,
          priceRetail: 14500,
          emoji: '🥬',
          img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: true
        },
        {
          id: 'vrde-prod-huevos-30',
          name: 'Huevos de Gallinas Libres Pastoriles (Maple 30u)',
          cleanName: 'Huevos Pastoriles (Maple 30u)',
          producer: 'Granja La Providencia',
          category: 'Granja',
          unit: 'Maple 30u',
          costVRDE: 5200,
          priceSocio: 6800,
          priceRetail: 7500,
          emoji: '🥚',
          img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        },
        {
          id: 'vrde-prod-pan-masa',
          name: 'Pan de Campo Masa Madre Trigo Orgánico (1 kg)',
          cleanName: 'Pan de Campo Masa Madre',
          producer: 'Panadería Comunitaria Raíz',
          category: 'Panadería',
          unit: 'Hogaza 1kg',
          costVRDE: 2800,
          priceSocio: 3500,
          priceRetail: 4200,
          emoji: '🍞',
          img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        },
        {
          id: 'vrde-prod-citricos-4k',
          name: 'Cítricos de Estación - Naranjas y Mandarinas (4 kg)',
          cleanName: 'Cítricos de Estación (4 kg)',
          producer: 'Quinta San Pedro',
          category: 'Frutas Agroecológicas',
          unit: 'Bolsa 4kg',
          cajonKg: 4,
          costVRDE: 4100,
          priceSocio: 5200,
          priceRetail: 6500,
          emoji: '🍊',
          img: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        }
      ]
    },
    {
      id: 'camp-verdura-huerta',
      slug: 'verdura-huerta',
      nombre: 'Verdura de huerta viva',
      subtitulo: 'Cosecha de Bancales · Nodo Chasqui',
      tipo: 'abierta',
      estado: 'futura',
      origen: 'Nodo Chasqui Maschwitz',
      origenNodo: 'nodo-cooperativa',
      esCentral: false,
      icono: '🥬',
      badge: 'Huerta Viva',
      descripcion: 'Hojas verdes recién cortadas de bancales biodinámicos, rúcula, acelga criolla y aromáticas vivas.',
      apertura: 'Abre Viernes 10hs',
      cierre: 'Sábado 21hs',
      entrega: 'Cosecha fresca del día',
      habilitadoEnNodo: true,
      url: '/lomaverde/tierra/semanal',
      productos: [
        {
          id: 'vrde-prod-pack-verdes',
          name: 'Pack Verde Crocante: Acelga, Rúcula, Espinaca y Kale',
          cleanName: 'Pack Verde Crocante',
          producer: 'Huerta La Soñada (Chasqui)',
          category: 'Verduras & Huerta',
          unit: 'Atado Familiar 2kg',
          costVRDE: 3800,
          priceSocio: 4800,
          priceRetail: 5900,
          emoji: '🥗',
          img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        },
        {
          id: 'vrde-prod-aromaticas',
          name: 'Atado de Aromáticas Frescas (Albahaca, Cilantro, Romero)',
          cleanName: 'Aromáticas Frescas Vivas',
          producer: 'Huerta La Soñada (Chasqui)',
          category: 'Verduras & Huerta',
          unit: 'Atado x 3 variedades',
          costVRDE: 1400,
          priceSocio: 1900,
          priceRetail: 2400,
          emoji: '🌿',
          img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=80',
          enabled: true,
          esCajon: false
        }
      ]
    }
  ],

  // Obtener todas las campañas sincronizadas
  getCampaigns() {
    try {
      const raw = localStorage.getItem(this.CONFIG.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error leyendo campañas VRDE:', e);
    }
    // Inicializar semillas
    this.saveCampaigns(this.DEFAULT_CAMPAIGNS);
    return this.DEFAULT_CAMPAIGNS;
  },

  // Guardar campañas
  saveCampaigns(campaigns) {
    if (!Array.isArray(campaigns)) return;
    try {
      localStorage.setItem(this.CONFIG.storageKey, JSON.stringify(campaigns));
      localStorage.setItem(this.CONFIG.syncTimestampKey, new Date().toISOString());
      // Notificar eventos para que la UI se actualice
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('elementales_vrde_updated', { detail: campaigns }));
      }
    } catch (e) {
      console.error('Error guardando campañas VRDE:', e);
    }
  },

  // Obtener una campaña por id o slug
  getCampaign(idOrSlug) {
    const camps = this.getCampaigns();
    return camps.find(c => c.id === idOrSlug || c.slug === idOrSlug) || null;
  },

  // Conmutar si la campaña está habilitada en este nodo
  toggleCampaignInNode(campId, enabledState) {
    const camps = this.getCampaigns();
    const camp = camps.find(c => c.id === campId);
    if (camp) {
      camp.habilitadoEnNodo = (typeof enabledState === 'boolean') ? enabledState : !camp.habilitadoEnNodo;
      this.saveCampaigns(camps);
      return camp;
    }
    return null;
  },

  // Actualizar productos curados de una campaña
  updateCampaignProducts(campId, newProducts) {
    const camps = this.getCampaigns();
    const camp = camps.find(c => c.id === campId);
    if (camp && Array.isArray(newProducts)) {
      camp.productos = newProducts;
      this.saveCampaigns(camps);
      return camp;
    }
    return null;
  },

  // Proponer y agregar una nueva compra a la red
  addCampaign(campaignData) {
    const camps = this.getCampaigns();
    const newCamp = {
      id: 'camp-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 4),
      slug: (campaignData.slug || campaignData.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')),
      nombre: campaignData.nombre || 'Nueva Compra Colectiva',
      subtitulo: campaignData.subtitulo || (campaignData.productor || 'Compra Comunitaria'),
      tipo: campaignData.tipo || 'abierta', // 'abierta' | 'semanal' | 'lunar'
      estado: campaignData.estado || 'abierta', // 'abierta' | 'futura'
      origen: 'Nodo ' + (this.CONFIG.nodeName || 'Loma Verde'),
      origenNodo: this.CONFIG.nodeId,
      esCentral: false,
      icono: campaignData.icono || '🌾',
      badge: campaignData.badge || 'Compra Comunitaria',
      descripcion: campaignData.descripcion || 'Compra colectiva autogestionada por la red.',
      apertura: campaignData.apertura || 'Abierta ahora',
      cierre: campaignData.cierre || 'Consultar cronograma',
      entrega: campaignData.entrega || 'Retiro en Nodo Loma Verde',
      habilitadoEnNodo: true,
      url: campaignData.url || '/lomaverde/tierra',
      productos: Array.isArray(campaignData.productos) ? campaignData.productos : []
    };

    camps.unshift(newCamp);
    this.saveCampaigns(camps);
    return newCamp;
  },

  // Obtener productos activos curados para una modalidad (lunar o semanal)
  getActiveProductsForMode(mode) {
    const normalized = (mode === 'luanar' || mode === 'lunar') ? 'lunar' : (mode === 'semanal' ? 'semanal' : mode);
    const camp = this.getCampaign(normalized);
    if (!camp || !Array.isArray(camp.productos)) return null;

    // Retorna productos curados que estén habilitados
    return camp.productos
      .filter(p => p.enabled !== false)
      .map(p => ({
        id: p.id,
        name: p.name,
        cleanName: p.cleanName || p.name,
        slug: p.id,
        fullName: p.name + ' (' + (p.producer || 'VRDE Club') + ')',
        categoria: p.category || 'Almacén',
        category: p.category || 'Almacén',
        elemento: 'tierra',
        cajonKg: p.cajonKg || 1,
        costoBase: p.costVRDE || p.costoBase || 1000,
        precioCajon: p.priceSocio || p.precioCajon || 1200,
        precioPerKg: p.cajonKg ? Math.round((p.priceSocio || 1200) / p.cajonKg) : (p.priceSocio || 1200),
        precioLocal: p.priceRetail || Math.round((p.priceSocio || 1200) * 1.15),
        precioSemanal: p.priceSocio || 1200,
        precioLunar: (camp.tipo === 'lunar') ? (p.priceSocio || 1200) : Math.round((p.priceSocio || 1200) * 0.9),
        price: p.priceSocio || 1200,
        stock: true,
        unit: p.unit || 'Unidad',
        emoji: p.emoji || '🌾',
        img: p.img || '',
        producer: p.producer || 'VRDE Club',
        esCajon: !!p.esCajon,
        nodoId: this.CONFIG.nodeId
      }));
  },

  // Simular o conectar con VRDE Club
  async syncWithVrdeClub() {
    try {
      // Registrar intento de contacto
      const timestamp = new Date().toISOString();
      localStorage.setItem(this.CONFIG.syncTimestampKey, timestamp);
      return {
        success: true,
        providerId: this.CONFIG.providerId,
        nodeId: this.CONFIG.nodeId,
        campaignsCount: this.getCampaigns().length,
        timestamp: timestamp
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  getLastSyncDate() {
    try {
      const raw = localStorage.getItem(this.CONFIG.syncTimestampKey);
      if (raw) return new Date(raw);
    } catch (e) {}
    return new Date();
  }
};

// Exportar en window para uso global
if (typeof window !== 'undefined') {
  window.VrdeSync = VrdeSync;
}
