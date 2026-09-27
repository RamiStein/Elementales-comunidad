// Datos del Ecosistema Red Elemental & Elementales Comunidad

// 1. LOS 5 ELEMENTOS
const ELEMENTOS = [
  { id: 'tierra', name: 'Tierra', emoji: '🌱', color: '#8ca15d', bgTint: '#f4f6ef', desc: 'Huerta, bolsones frescos, verduras, frutas de estación y suelo vivo' },
  { id: 'agua', name: 'Agua', emoji: '💧', color: '#7ca1b5', bgTint: '#f2f6f9', desc: 'Membresía CsC, fermentos, lácteos de pastura, tinturas y fluir comunitario' },
  { id: 'fuego', name: 'Fuego', emoji: '🔥', color: '#d97757', bgTint: '#fdf4f0', desc: 'Panificados de masa madre, mermeladas, aceites, miel y transformación' },
  { id: 'aire', name: 'Aire', emoji: '💨', color: '#aab091', bgTint: '#f6f7f3', desc: 'Harinas orgánicas, legumbres, yerbas, secos y hierbas medicinales' },
  { id: 'espiritu', name: 'Éter', emoji: '✨', color: '#c59b8b', bgTint: '#fcf4f0', desc: 'Comunidad, talleres, carnet de socio CsC, aprendizaje y conexión humana' }
];

// 2. NODOS Y GUARDIANES
const NODOS_COMUNIDAD = [
  {
    id: 'nodo-lucila',
    name: 'Centro Comunitario Elementales - La Lucila',
    address: 'Calle Rawson 3450 (e/ Roma y Debenedetti), La Lucila',
    time: 'Lunes a Sábados 09:30 a 19:30 hs (Oficina Barrial)',
    guardian: 'Gonza, Agus, Rami, Cris & Ro',
    phone: '5491123456789',
    desc: 'Oficina Barrial de la Nueva Era: gestión comunitaria, recepción de proyectos, financiamiento y feria activa.',
    cover: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200&h=400',
    slug: 'lucila',
    modalidades: ['local', 'semanal', 'lunar'],
    features: {
      showTienda: true,
      showLocal: true,        // Feria presencial en Rawson 3450
      showSemanal: true,      // Cosecha semanal de huerta
      showLunar: true,        // Compra comunitaria mensual por ciclo lunar
      showCirculos: true,     // Círculos comunitarios
      showAgua: true,         // Comunidad & Oficios
      showFuego: true,        // Talleres
      showAire: true,         // Podcasts & Noticias
      showEter: true          // Gestión del nodo
    }
  },
  {
    id: 'nodo-lomaverde',
    name: 'Nodo Loma Verde (Escobar)',
    address: 'Loma Verde, Partido de Escobar, Zona Norte',
    time: 'Pedidos semanales autogestionados por Círculos de Vecinos',
    guardian: 'Coordinación de Círculos Loma Verde & VRDE Club',
    phone: '5491133445566',
    desc: 'Nodo autogestionado por Círculos de Compra Colectiva: las familias se agrupan en Círculos para pedir juntos y autogestionar el retiro barrial.',
    cover: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200&h=400',
    slug: 'lomaverde',
    circulosEnabled: true,
    modalidades: ['semanal'],
    features: {
      showTienda: true,
      showLocal: false,       // En Loma Verde NO hay feria física
      showSemanal: true,      // Compra semanal de huerta y cooperativa
      showLunar: false,       // No hay compra lunar física
      showCirculos: true,     // Círculos vecinales VRDE Club
      showAgua: true,
      showFuego: true,
      showAire: true,
      showEter: true
    }
  },
  {
    id: 'nodo-cooperativa',
    name: 'Central Cooperativa Chasqui (Mayorista)',
    address: 'Quintas de Productores & Central Mayorista Chasqui',
    time: 'Pedidos y fraccionamiento de cajones semanales',
    guardian: 'Central Cooperativa & Red Chasqui ESSP',
    phone: '5491123456789',
    desc: 'Central mayorista de cajones directos de quintas campesinas. Venta exclusiva de cajones completos o fraccionados en Círculos.',
    cover: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1200&h=400',
    slug: 'cooperativa',
    circulosEnabled: true,
    cajonesMode: true,
    modalidades: ['semanal'],
    features: {
      showTienda: true,       // Catálogo de cajones de quintas
      showLocal: false,       // No es tienda física minorista
      showSemanal: true,      // Despacho semanal mayorista
      showLunar: false,       // No hay compra lunar
      showCirculos: true,     // Círculos de fraccionamiento mayorista
      soloCirculos: true,     // Especializado en compras colectivas
      showAgua: false,        // Nodo enfocado exclusivamente en logística
      showFuego: false,
      showAire: false,
      showEter: true
    }
  },

  {
    id: 'nodo-central',
    name: 'Nodo Central - Florida / Olivos',
    address: 'Av. Maipú 1420, Vicente López',
    time: 'Miércoles y Sábados 10:00 a 18:00 hs',
    guardian: 'JuanEco',
    phone: '5491122334455',
    desc: 'Espacio físico principal de acopio y feria agroecológica.',
    cover: 'https://images.unsplash.com/photo-1595858348981-b55d7f1d4188?auto=format&fit=crop&q=80&w=1200&h=400'
  },
  {
    id: 'nodo-sur',
    name: 'Nodo Sur - Barracas / La Boca',
    address: 'Av. Patricios 850, CABA',
    time: 'Jueves 14:00 a 19:00 hs',
    guardian: 'MariaTierra',
    phone: '5491155667788',
    desc: 'Punto barrial de retiro comunitario y talleres de permacultura.',
    cover: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200&h=400'
  },
  {
    id: 'nodo-norte',
    name: 'Nodo Norte - San Isidro',
    address: 'Av. Centenario 450, San Isidro',
    time: 'Viernes 11:00 a 17:00 hs',
    guardian: 'LucasSol',
    phone: '5491144556677',
    desc: 'Encuentro de familias y distribución de cosechas frescas.',
    cover: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200&h=400'
  },
  {
    id: 'nodo-palermo',
    name: 'Nodo Palermo - Plaza Armenia',
    address: 'Armenia 1680, CABA',
    time: 'Sábados 10:00 a 15:00 hs',
    guardian: 'ClaraBio',
    phone: '5491166778899',
    desc: 'Feria abierta, retiro de pedidos y difusión comunitaria.',
    cover: 'https://images.unsplash.com/photo-1615486511484-92e172fc34ea?auto=format&fit=crop&q=80&w=1200&h=400'
  }
];

// 3. PLANES DE MEMBRESÍA CsC (Comunidades que Sostienen el Campo / la Cultura)
const PLANES_MEMBRESIA = [
  {
    id: 'plan-flujo',
    name: 'Membresía Agua (Flujo Básico)',
    element: 'agua',
    aporteMensual: 5000,
    periodo: 'Aporte mensual sugerido',
    badge: 'Popular',
    desc: 'Ideal para quienes compran bolsones y productos frescos quincenalmente.',
    beneficios: [
      'Acceso a Precios Red (5% a 10% de ahorro directo)',
      'Acceso al catálogo Lunar y Semanal con precio de productor',
      'Reserva prioritaria de bolsones de verdura agroecológica',
      'Carnet digital de Socio CsC en la Red',
      'Apoyo directo al sostén operativo del nodo local'
    ]
  },
  {
    id: 'plan-raices',
    name: 'Membresía Tierra (Raíces Fuertes)',
    element: 'tierra',
    aporteMensual: 9000,
    periodo: 'Aporte mensual sugerido',
    badge: 'Recomendado',
    desc: 'Para familias que canalizan gran parte de su alimentación en la red comunitaria.',
    beneficios: [
      'Precios de Costo Comunitario (hasta 15% de ahorro)',
      '1 Bolsón de estación bonificado cada 3 meses',
      'Prioridad máxima en aperturas de listas lunares',
      'Participación en decisiones de compras colectivas',
      'Acceso gratuito a talleres de huerta y cocina viva en el nodo'
    ]
  },
  {
    id: 'plan-guardian',
    name: 'Membresía Guardián / Sostén',
    element: 'espiritu',
    aporteMensual: 15000,
    periodo: 'Aporte solidario mensual',
    badge: 'Comunitario',
    desc: 'Para quienes desean apadrinar la red, financiar nuevos proyectos y expandir el nodo.',
    beneficios: [
      'Todos los beneficios de Socio CsC pleno',
      'Descuento máximo en todos los productos de todos los nodos',
      'Caja degustación bimestral con productos sorpresa de pequeños productores',
      'Participación en asambleas de guardianes de la red',
      'Fondo rotatorio para microcréditos a productores campesinos'
    ]
  }
];

// 4. CATÁLOGO CON ESCALAS DE PRECIO: Local (Feria/Visitante), Semanal (Socio) y Lunar (Costo de Red)
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Bolsón de Verduras Agroecológicas (7kg)',
    categoria: 'Verduras & Huerta',
    category: 'Verduras & Huerta',
    elemento: 'tierra',
    precioLocal: 9500,
    precioSemanal: 8500,
    precioLunar: 7800,
    price: 9500,
    stock: 25,
    unit: 'Bolsón 7kg',
    emoji: '🥬',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-2',
    name: 'Bolsón de Fruta de Estación (3kg)',
    categoria: 'Verduras & Huerta',
    category: 'Verduras & Huerta',
    elemento: 'tierra',
    precioLocal: 7200,
    precioSemanal: 6500,
    precioLunar: 5900,
    price: 7200,
    stock: 20,
    unit: 'Bolsón 3kg',
    emoji: '🍎',
    img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-3',
    name: 'Huevos de Campo Pastoriles Agroecológicos',
    categoria: 'Granja & Lácteos',
    category: 'Granja & Lácteos',
    elemento: 'agua',
    precioLocal: 4800,
    precioSemanal: 4200,
    precioLunar: 3800,
    price: 4800,
    stock: 30,
    unit: 'Docena',
    emoji: '🥚',
    img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-4',
    name: 'Miel Pura de Monte Nativo / Sin pasteurizar',
    categoria: 'Almacén Agroecológico',
    category: 'Almacén Agroecológico',
    productorVecinal: true,
    productorNombre: 'Don Carlos & Familia (La Lucila)',
    elemento: 'fuego',
    precioLocal: 6200,
    precioSemanal: 5500,
    precioLunar: 4900,
    price: 6200,
    stock: 18,
    unit: 'Frasco 1kg',
    emoji: '🍯',
    img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-5',
    name: 'Aceite de Oliva Extra Virgen Primera Prensada',
    categoria: 'Almacén Agroecológico',
    category: 'Almacén Agroecológico',
    elemento: 'fuego',
    precioLocal: 8900,
    precioSemanal: 7800,
    precioLunar: 7200,
    price: 8900,
    stock: 15,
    unit: 'Botella 500ml',
    emoji: '🫒',
    img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-6',
    name: 'Pan de Masa Madre Integral con Semillas',
    categoria: 'Panadería & Masa Madre',
    category: 'Panadería & Masa Madre',
    productorVecinal: true,
    productorNombre: 'Lucía Masa Madre (La Lucila)',
    elemento: 'fuego',
    precioLocal: 3800,
    precioSemanal: 3200,
    precioLunar: 2900,
    price: 3800,
    stock: 12,
    unit: 'Hogaza 750g',
    emoji: '🍞',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-7',
    name: 'Mermelada Artesanal de Frutos Rojos / Pampa',
    categoria: 'Almacén Agroecológico',
    category: 'Almacén Agroecológico',
    elemento: 'fuego',
    precioLocal: 4400,
    precioSemanal: 3800,
    precioLunar: 3400,
    price: 4400,
    stock: 16,
    unit: 'Frasco 450g',
    emoji: '🫐',
    img: 'https://images.unsplash.com/photo-1590483256037-14227092147a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-8',
    name: 'Yerba Mate Agroecológica Secado Barbaquá',
    categoria: 'Almacén Agroecológico',
    category: 'Almacén Agroecológico',
    elemento: 'aire',
    precioLocal: 5200,
    precioSemanal: 4600,
    precioLunar: 4100,
    price: 5200,
    stock: 22,
    unit: 'Paquete 1kg',
    emoji: '🧉',
    img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-9',
    name: 'Harina Integral Orgánica Molida a Piedra',
    categoria: 'Almacén Agroecológico',
    category: 'Almacén Agroecológico',
    elemento: 'aire',
    precioLocal: 2800,
    precioSemanal: 2400,
    precioLunar: 2100,
    price: 2800,
    stock: 25,
    unit: 'Bolsa 1kg',
    emoji: '🌾',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-10',
    name: 'Queso Criollo de Campo Estacionado',
    categoria: 'Granja & Lácteos',
    category: 'Granja & Lácteos',
    elemento: 'agua',
    precioLocal: 7200,
    precioSemanal: 6200,
    precioLunar: 5600,
    price: 7200,
    stock: 10,
    unit: 'Pieza ~500g',
    emoji: '🧀',
    img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-11',
    name: 'Tintura Madre Fitoterapéutica (Jarilla / Propóleo)',
    categoria: 'Cosmética & Botiquín',
    category: 'Cosmética & Botiquín',
    elemento: 'agua',
    precioLocal: 5100,
    precioSemanal: 4500,
    precioLunar: 3900,
    price: 5100,
    stock: 14,
    unit: 'Gotero 50ml',
    emoji: '🌿',
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-12',
    name: 'Jabón Vegetal Puro con Aceites Esenciales',
    categoria: 'Cosmética & Botiquín',
    category: 'Cosmética & Botiquín',
    productorVecinal: true,
    productorNombre: 'Martina & Taller Botánico (La Lucila)',
    elemento: 'tierra',
    precioLocal: 3200,
    precioSemanal: 2800,
    precioLunar: 2400,
    price: 3200,
    stock: 18,
    unit: 'Pastilla 100g',
    emoji: '🧼',
    img: 'https://images.unsplash.com/photo-1607006314592-367cb97cb4ad?auto=format&fit=crop&q=80&w=400'
  }
];

const CATEGORIES = [
  'Todos',
  'Verduras & Huerta',
  'Granja & Lácteos',
  'Almacén Agroecológico',
  'Panadería & Masa Madre',
  'Fermentos & Conservas',
  'Cosmética & Botiquín',
  'Productorxs Vecinales'
];

// =========================================================================
// 5. CAJONES MAYORISTAS DE QUINTAS - CENTRAL COOPERATIVA (CHASQUI ESSP)
// Extraídos directamente de https://tiendaschasqui.ar/centralcooperativa
// =========================================================================
const CAJONES_CENTRAL_COOPERATIVA = [
  {
    "id": "chasqui-2528",
    "name": "MANDARINA DANCY AGROECOLOGICA x 15 KG",
    "fullName": "MANDARINA DANCY AGROECOLOGICA x 15 KG (DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 8980.0,
    "precioPerKg": 598.67,
    "precioLocal": 8980.0,
    "precioSemanal": 8531,
    "precioLunar": 8082,
    "price": 8980.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/1b/mandarina__preview.jpg",
    "producer": "DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-6042",
    "name": "BATATIN BEAUREGARD X 20 KG APROX. AGROECOLOGICO",
    "fullName": "BATATIN BEAUREGARD X 20 KG APROX. AGROECOLOGICO (FINCA VERDE)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 20,
    "precioCajon": 10530.0,
    "precioPerKg": 526.5,
    "precioLocal": 10530.0,
    "precioSemanal": 10004,
    "precioLunar": 9477,
    "price": 10530.0,
    "stock": 15,
    "unit": "Cajón 20kg",
    "emoji": "🍠",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/5e/batatin__preview.jpg",
    "producer": "FINCA VERDE",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-15784",
    "name": "NARANJA OMBLIGO AGROECOLOGICO 15 KG APROX",
    "fullName": "NARANJA OMBLIGO AGROECOLOGICO 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 10820.0,
    "precioPerKg": 721.33,
    "precioLocal": 10820.0,
    "precioSemanal": 10279,
    "precioLunar": 9738,
    "price": 10820.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/f0/naranja-ombligo-400g-1-45038__preview.webp",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-6984",
    "name": "NARANJA SALUSTIANA AGROECOLOGICO X 15 KG APROX",
    "fullName": "NARANJA SALUSTIANA AGROECOLOGICO X 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 11560.0,
    "precioPerKg": 770.67,
    "precioLocal": 11560.0,
    "precioSemanal": 10982,
    "precioLunar": 10404,
    "price": 11560.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/8e/naranja-jaff__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-7361",
    "name": "MANDARINA ELLENDALE AGROECOLOGICO 15 KG APROX",
    "fullName": "MANDARINA ELLENDALE AGROECOLOGICO 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 12300.0,
    "precioPerKg": 820.0,
    "precioLocal": 12300.0,
    "precioSemanal": 11685,
    "precioLunar": 11070,
    "price": 12300.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/8a/ellendale__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-2526",
    "name": "LIMON GENOVA AGROECOLÓGICO x 15 KG Aprox.",
    "fullName": "LIMON GENOVA AGROECOLÓGICO x 15 KG Aprox. (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 13770.0,
    "precioPerKg": 918.0,
    "precioLocal": 13770.0,
    "precioSemanal": 13082,
    "precioLunar": 12393,
    "price": 13770.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍋",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/f1/cajon-de-limon__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-13646",
    "name": "MANDARINA ENCORE AGROECOLOGICA X 15 KG APROX",
    "fullName": "MANDARINA ENCORE AGROECOLOGICA X 15 KG APROX (DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 13770.0,
    "precioPerKg": 918.0,
    "precioLocal": 13770.0,
    "precioSemanal": 13082,
    "precioLunar": 12393,
    "price": 13770.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/e5/mandarina-encore__preview.jpg",
    "producer": "DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-8324",
    "name": "POMELO ROJO AGROECOLOGICO 15 KG APROX",
    "fullName": "POMELO ROJO AGROECOLOGICO 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 14500.0,
    "precioPerKg": 966.67,
    "precioLocal": 14500.0,
    "precioSemanal": 13775,
    "precioLunar": 13050,
    "price": 14500.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/63/pomelos_-_grapefruits__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-9839",
    "name": "ZAPALLO KABUTIA ORGANICO X 14 KG APROX",
    "fullName": "ZAPALLO KABUTIA ORGANICO X 14 KG APROX (PUENTE BLANCO)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 14,
    "precioCajon": 19470.0,
    "precioPerKg": 1390.71,
    "precioLocal": 19470.0,
    "precioSemanal": 18496,
    "precioLunar": 17523,
    "price": 19470.0,
    "stock": 15,
    "unit": "Cajón 14kg",
    "emoji": "🎃",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/7a/d_nq_np_991988-mla86886359536_072025-o__preview.webp",
    "producer": "PUENTE BLANCO",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-14813",
    "name": "ZANAHORIA SIN HOJAS AGROECOLOGICAS X 9 KG",
    "fullName": "ZANAHORIA SIN HOJAS AGROECOLOGICAS X 9 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 9,
    "precioCajon": 21840.0,
    "precioPerKg": 2426.67,
    "precioLocal": 21840.0,
    "precioSemanal": 20748,
    "precioLunar": 19656,
    "price": 21840.0,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🥕",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/5a/zanahoria-sachet__preview.webp",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-7625",
    "name": "BATATA MORADA ARAPEY AGROECOLOGICO 11 KG APROX",
    "fullName": "BATATA MORADA ARAPEY AGROECOLOGICO 11 KG APROX (FINCA VERDE)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 11,
    "precioCajon": 25110.0,
    "precioPerKg": 2282.73,
    "precioLocal": 25110.0,
    "precioSemanal": 23854,
    "precioLunar": 22599,
    "price": 25110.0,
    "stock": 15,
    "unit": "Cajón 11kg",
    "emoji": "🍠",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/72/batata-morada-inta__preview.jpg",
    "producer": "FINCA VERDE",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-6966",
    "name": "NARANJA SANGUINA ROSA AGROECOLOGICO 16 KG APROX",
    "fullName": "NARANJA SANGUINA ROSA AGROECOLOGICO 16 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 16,
    "precioCajon": 26490.0,
    "precioPerKg": 1655.62,
    "precioLocal": 26490.0,
    "precioSemanal": 25166,
    "precioLunar": 23841,
    "price": 26490.0,
    "stock": 15,
    "unit": "Cajón 16kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/92/naranja-sanguina__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-17633",
    "name": "QUINOTO AGROECOLÓGICO 9 KG APROX",
    "fullName": "QUINOTO AGROECOLÓGICO 9 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 9,
    "precioCajon": 27010.0,
    "precioPerKg": 3001.11,
    "precioLocal": 27010.0,
    "precioSemanal": 25660,
    "precioLunar": 24309,
    "price": 27010.0,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🍊",
    "img": "",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-2541",
    "name": "PALTA SILVESTRE AGROECOLOGICA X 9 KG",
    "fullName": "PALTA SILVESTRE AGROECOLOGICA X 9 KG ( FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 9,
    "precioCajon": 35930.0,
    "precioPerKg": 3992.22,
    "precioLocal": 35930.0,
    "precioSemanal": 34134,
    "precioLunar": 32337,
    "price": 35930.0,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🥑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/7f/paltas-silvestre__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-6398",
    "name": "BATATA BUENA BONIATO AGROECOLOGICA  12 KG APROX",
    "fullName": "BATATA BUENA BONIATO AGROECOLOGICA  12 KG APROX (FINCA VERDE)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 12,
    "precioCajon": 33060.0,
    "precioPerKg": 2755.0,
    "precioLocal": 33060.0,
    "precioSemanal": 31407,
    "precioLunar": 29754,
    "price": 33060.0,
    "stock": 15,
    "unit": "Cajón 12kg",
    "emoji": "🍠",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/74/batata-boniato__preview.jpg",
    "producer": "FINCA VERDE",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-14028",
    "name": "FRUTILLAS AGROECOLOGICAS CAJON 5 KG APROX",
    "fullName": "FRUTILLAS AGROECOLOGICAS CAJON 5 KG APROX (COMUNIDADA SEMBRANDO CONCIENCIA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 5,
    "precioCajon": 33760.0,
    "precioPerKg": 6752.0,
    "precioLocal": 33760.0,
    "precioSemanal": 32072,
    "precioLunar": 30384,
    "price": 33760.0,
    "stock": 15,
    "unit": "Cajón 5kg",
    "emoji": "🍓",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/4b/frutillas-1610__preview.jpg",
    "producer": "COMUNIDADA SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-2513",
    "name": "BANANAS ORGANICO CERTIFICADO 16 KG APROX",
    "fullName": "BANANAS ORGANICO CERTIFICADO 16 KG APROX (FINCA LA LUCRECIA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 16,
    "precioCajon": 40620.0,
    "precioPerKg": 2538.75,
    "precioLocal": 40620.0,
    "precioSemanal": 38589,
    "precioLunar": 36558,
    "price": 40620.0,
    "stock": 15,
    "unit": "Cajón 16kg",
    "emoji": "🍌",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/6e/beneficios-da-banana-verde_7527_l__preview.webp",
    "producer": "FINCA LA LUCRECIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-9714",
    "name": "PERA PACKHAM ORGANICO CERTIFICADO 18 KG APROX",
    "fullName": "PERA PACKHAM ORGANICO CERTIFICADO 18 KG APROX (PLUMA AZUL)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 18,
    "precioCajon": 38340.0,
    "precioPerKg": 2130.0,
    "precioLocal": 38340.0,
    "precioSemanal": 36423,
    "precioLunar": 34506,
    "price": 38340.0,
    "stock": 15,
    "unit": "Cajón 18kg",
    "emoji": "🍐",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/17/pera-packhams__preview.webp",
    "producer": "PLUMA AZUL",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-14820",
    "name": "BERENJENA AGROECOLOGICA X 10 KG",
    "fullName": "BERENJENA AGROECOLOGICA X 10 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 10,
    "precioCajon": 38440.0,
    "precioPerKg": 3844.0,
    "precioLocal": 38440.0,
    "precioSemanal": 36518,
    "precioLunar": 34596,
    "price": 38440.0,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🍆",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/c8/berenjena__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-17363",
    "name": "BERENJENA RAYADA AGROECOLÓGICA INVERNADERO 10 KG APROX",
    "fullName": "BERENJENA RAYADA AGROECOLÓGICA INVERNADERO 10 KG APROX (SEMRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 10,
    "precioCajon": 38440.0,
    "precioPerKg": 3844.0,
    "precioLocal": 38440.0,
    "precioSemanal": 36518,
    "precioLunar": 34596,
    "price": 38440.0,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🍆",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/3f/berenjena-rayada__preview.jpg",
    "producer": "SEMRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-2512",
    "name": "BANANAS AGROECOLOGICA PRATA 17 KG APROX",
    "fullName": "BANANAS AGROECOLOGICA PRATA 17 KG APROX (ALEJANDRO CLANCI)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 17,
    "precioCajon": 42420.0,
    "precioPerKg": 2495.29,
    "precioLocal": 42420.0,
    "precioSemanal": 40299,
    "precioLunar": 38178,
    "price": 42420.0,
    "stock": 15,
    "unit": "Cajón 17kg",
    "emoji": "🍌",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/2b/banana__preview.jpg",
    "producer": "ALEJANDRO CLANCI",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-13550",
    "name": "TOMATE REDONDO AGROECOLOGICO X 15 KG APROX",
    "fullName": "TOMATE REDONDO AGROECOLOGICO X 15 KG APROX (FINCA LA LUCRECIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 43270.0,
    "precioPerKg": 2884.67,
    "precioLocal": 43270.0,
    "precioSemanal": 41106,
    "precioLunar": 38943,
    "price": 43270.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍅",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/58/tomate-redondo__preview.jpg",
    "producer": "FINCA LA LUCRECIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-13014",
    "name": "MANZANA CRIPPS PINK ORGANICA X 20 KG",
    "fullName": "MANZANA CRIPPS PINK ORGANICA X 20 KG (FINCA PLUMA AZUL)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 20,
    "precioCajon": 43840.0,
    "precioPerKg": 2192.0,
    "precioLocal": 43840.0,
    "precioSemanal": 41648,
    "precioLunar": 39456,
    "price": 43840.0,
    "stock": 15,
    "unit": "Cajón 20kg",
    "emoji": "🍎",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/e8/pink-lady__preview.jpg",
    "producer": "FINCA PLUMA AZUL",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-17267",
    "name": "KIWI ORGANICO X 10 KG",
    "fullName": "KIWI ORGANICO X 10 KG  (PLUMA AZUL)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 10,
    "precioCajon": 45490.0,
    "precioPerKg": 4549.0,
    "precioLocal": 45490.0,
    "precioSemanal": 43216,
    "precioLunar": 40941,
    "price": 45490.0,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🥝",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/bd/kiwis-frescos-na-mesa-de-pedra_458909-106__preview.avif",
    "producer": "PLUMA AZUL",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-6447",
    "name": "MARACUYA AGROECOLOGICO 10 KG APROX",
    "fullName": "MARACUYA AGROECOLOGICO 10 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 10,
    "precioCajon": 46370.0,
    "precioPerKg": 4637.0,
    "precioLocal": 46370.0,
    "precioSemanal": 44052,
    "precioLunar": 41733,
    "price": 46370.0,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🫐",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/ed/img_22971-61703277fd711877cc15330139528264-1024-1024__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-8416",
    "name": "PIMIENTO ROJO AGROECOLÓGICO 7 KG APROX",
    "fullName": "PIMIENTO ROJO AGROECOLÓGICO 7 KG APROX  (ROY CORRIENTES)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 7,
    "precioCajon": 48890.0,
    "precioPerKg": 6984.29,
    "precioLocal": 48890.0,
    "precioSemanal": 46446,
    "precioLunar": 44001,
    "price": 48890.0,
    "stock": 15,
    "unit": "Cajón 7kg",
    "emoji": "🫑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/78/morron-calahorra__preview.jpg",
    "producer": "ROY CORRIENTES",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-13939",
    "name": "ZAPALLITO AGROECOLOGICO X 15 KG",
    "fullName": "ZAPALLITO AGROECOLOGICO X 15 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 50370.0,
    "precioPerKg": 3358.0,
    "precioLocal": 50370.0,
    "precioSemanal": 47852,
    "precioLunar": 45333,
    "price": 50370.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🥒",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/98/zapallito-1__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-13992",
    "name": "ZUCCHINIIAGROECOLOGICO X 15 KG",
    "fullName": "ZUCCHINIIAGROECOLOGICO X 15 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 15,
    "precioCajon": 52940.0,
    "precioPerKg": 3529.33,
    "precioLocal": 52940.0,
    "precioSemanal": 50293,
    "precioLunar": 47646,
    "price": 52940.0,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🥒",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/b3/zuchini-agroecologico__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-9713",
    "name": "PALTA HASS AGROECOLOGICA 9 KG APROX",
    "fullName": "PALTA HASS AGROECOLOGICA 9 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 9,
    "precioCajon": 59120.0,
    "precioPerKg": 6568.89,
    "precioLocal": 59120.0,
    "precioSemanal": 56164,
    "precioLunar": 53208,
    "price": 59120.0,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🥑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/24/palta-hass__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  },
  {
    "id": "chasqui-14463",
    "name": "MORRON ROJO AGROECOLOGICO X 8 KG",
    "fullName": "MORRON ROJO AGROECOLOGICO X 8 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 8,
    "precioCajon": 86650.0,
    "precioPerKg": 10831.25,
    "precioLocal": 86650.0,
    "precioSemanal": 82318,
    "precioLunar": 77985,
    "price": 86650.0,
    "stock": 15,
    "unit": "Cajón 8kg",
    "emoji": "🫑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/bf/morron-rojo-x-kg-venta-al-peso__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-cooperativa"
  }
];

// =========================================================================
// 6. GESTOR DE CAJONES COMPARTIDOS (COMPRAS Y FRACCIONAMIENTO COLECTIVO)
// =========================================================================
const CajonesManager = {
  STORAGE_KEY: 'elementales_cajones_compartidos',

  getInitialShares() {
    return [
      {
        id: 'share-frutillas',
        productId: 'chasqui-14028',
        productName: 'FRUTILLAS AGROECOLOGICAS CAJON 5 KG APROX',
        producer: 'COMUNIDAD SEMBRANDO CONCIENCIA',
        totalKg: 5,
        priceCajon: 33760,
        pricePerKg: 6752,
        image: 'https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/4b/frutillas-1610__preview.jpg',
        status: 'abierto',
        participantes: [
          { id: 'usr-agus', name: 'Agustina (Vecina de Rawson)', kg: 2, total: 13504, avatar: '👩' },
          { id: 'usr-gonza', name: 'Gonza (Equipo Nodo)', kg: 1, total: 6752, avatar: '👨' }
        ],
        coveredKg: 3,
        remainingKg: 2,
        percent: 60
      },
      {
        id: 'share-naranjas',
        productId: 'chasqui-6984',
        productName: 'NARANJA SALUSTIANA AGROECOLOGICO X 15 KG APROX',
        producer: 'FINCA DON LUIS',
        totalKg: 15,
        priceCajon: 11560,
        pricePerKg: 770.67,
        image: 'https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/8e/naranja-jaff__preview.jpg',
        status: 'abierto',
        participantes: [
          { id: 'usr-lucia', name: 'Lucía Gómez', kg: 5, total: 3853.33, avatar: '🌱' },
          { id: 'usr-rami', name: 'Rami (La Lucila)', kg: 5, total: 3853.33, avatar: '🌿' }
        ],
        coveredKg: 10,
        remainingKg: 5,
        percent: 66.7
      },
      {
        id: 'share-tomates',
        productId: 'chasqui-13550',
        productName: 'TOMATE REDONDO AGROECOLOGICO X 15 KG APROX',
        producer: 'FINCA LA LUCRECIA',
        totalKg: 15,
        priceCajon: 43270,
        pricePerKg: 2884.67,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
        status: 'abierto',
        participantes: [
          { id: 'usr-cris', name: 'Cris & Ro (Vecinos)', kg: 7.5, total: 21635, avatar: '🍅' }
        ],
        coveredKg: 7.5,
        remainingKg: 7.5,
        percent: 50
      }
    ];
  },

  getAllShares() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      const init = this.getInitialShares();
      this.saveShares(init);
      return init;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return this.getInitialShares();
    }
  },

  saveShares(shares) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(shares));
  },

  getShareForProduct(productId) {
    const shares = this.getAllShares();
    return shares.find(s => s.productId === productId && s.status === 'abierto');
  },

  createOrJoinShare(productId, requestedKg, userName) {
    const shares = this.getAllShares();
    const prod = CAJONES_CENTRAL_COOPERATIVA.find(p => p.id === productId);
    if (!prod) return null;

    let share = shares.find(s => s.productId === productId && s.status === 'abierto');
    const cost = Math.round(requestedKg * prod.precioPerKg);

    if (share) {
      share.participantes.push({
        id: 'usr-' + Date.now(),
        name: userName || (typeof AppState !== 'undefined' ? AppState.userName : 'Vecin@'),
        kg: requestedKg,
        total: cost,
        avatar: '👤',
        isCurrentUser: true
      });
      share.coveredKg = Math.min(share.totalKg, Math.round((share.coveredKg + requestedKg) * 100) / 100);
      share.remainingKg = Math.max(0, Math.round((share.totalKg - share.coveredKg) * 100) / 100);
      share.percent = Math.min(100, Math.round((share.coveredKg / share.totalKg) * 100));
      if (share.remainingKg <= 0) {
        share.status = 'completo';
      }
    } else {
      const remaining = Math.max(0, Math.round((prod.cajonKg - requestedKg) * 100) / 100);
      share = {
        id: 'share-' + Date.now(),
        productId: prod.id,
        productName: prod.name,
        producer: prod.producer,
        totalKg: prod.cajonKg,
        priceCajon: prod.precioCajon,
        pricePerKg: prod.precioPerKg,
        image: prod.img,
        status: remaining <= 0 ? 'completo' : 'abierto',
        participantes: [
          {
            id: 'usr-' + Date.now(),
            name: userName || (typeof AppState !== 'undefined' ? AppState.userName : 'Vecin@'),
            kg: requestedKg,
            total: cost,
            avatar: '👤',
            isCurrentUser: true
          }
        ],
        coveredKg: requestedKg,
        remainingKg: remaining,
        percent: Math.min(100, Math.round((requestedKg / prod.cajonKg) * 100))
      };
      shares.unshift(share);
    }

    this.saveShares(shares);
    return share;
  }
};
