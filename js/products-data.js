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
    cover: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200&h=400'
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
    categoria: 'Tierra',
    category: 'Verduras & Frutas',
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
    categoria: 'Tierra',
    category: 'Verduras & Frutas',
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
    categoria: 'Agua',
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
    categoria: 'Fuego',
    category: 'Almacén',
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
    categoria: 'Fuego',
    category: 'Almacén',
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
    categoria: 'Fuego',
    category: 'Panificados',
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
    categoria: 'Fuego',
    category: 'Almacén',
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
    categoria: 'Aire',
    category: 'Almacén',
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
    categoria: 'Aire',
    category: 'Almacén',
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
    categoria: 'Agua',
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
    categoria: 'Agua',
    category: 'Cosmética Natural',
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
    categoria: 'Tierra',
    category: 'Cosmética Natural',
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
  'Tierra',
  'Agua',
  'Fuego',
  'Aire'
];
