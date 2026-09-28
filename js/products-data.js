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
    id: 'nodo-lomaverde',
    name: 'Nodo Loma Verde (Escobar)',
    address: 'Loma Verde, Partido de Escobar, Zona Norte',
    time: 'Pedidos y entregas autogestionados por Círculos de Vecinos',
    guardian: 'Coordinación de Círculos Loma Verde & VRDE Club',
    phone: '5491133445566',
    desc: 'Nodo autogestionado por Círculos de Compra Colectiva: las familias se agrupan en Círculos para pedir juntos cajones agroecológicos de Chasqui (+40% al costo base) y autogestionar el retiro barrial.',
    cover: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200&h=400',
    slug: 'lomaverde',
    circulosEnabled: true,
    cajonesMode: true,
    modalidades: ['semanal', 'lunar'],
    features: {
      showTienda: true,
      showLocal: false,
      showSemanal: true,
      showLunar: true,
      showCirculos: true,
      showAgua: true,
      showFuego: true,
      showAire: true,
      showEter: true
    }
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

// Utilidades de nombres limpios y slugs para Cajones Chasqui
function getProductCleanName(prodOrName) {
  const rawName = (typeof prodOrName === 'string') ? prodOrName : (prodOrName ? (prodOrName.name || '') : '');
  if (!rawName) return '';
  return rawName
    .replace(/cajon\s*/gi, '')
    .replace(/zucchiniiagroecologico/gi, 'Zucchini')
    .replace(/\s*x\s*\d+\s*(kg|kilos|un|unidades)?(\s*aprox\.?)?/gi, '')
    .replace(/\s*\d+\s*(kg|kilos)(\s*aprox\.?)?/gi, '')
    .replace(/\b(agroecol[oó]gicos?|agroecol[oó]gicas?|org[aá]nicos?|org[aá]nicas?|certificado|invernadero)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getProductSlug(prodOrName) {
  if (typeof prodOrName === 'object' && prodOrName && prodOrName.slug) {
    return prodOrName.slug;
  }
  return getProductCleanName(prodOrName)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 4. CATÁLOGO CON ESCALAS DE PRECIO: Local (Feria/Visitante), Semanal (Socio) y Lunar (Costo de Red)
const CAJONES_CENTRAL_COOPERATIVA = [
  {
    "id": "chasqui-2528",
    "name": "MANDARINA DANCY AGROECOLOGICA x 15 KG",
    "cleanName": "Mandarina Dancy",
    "slug": "mandarina-dancy",
    "fullName": "MANDARINA DANCY AGROECOLOGICA x 15 KG (DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 8980,
    "precioCajon": 12572,
    "precioPerKg": 838.13,
    "precioLocal": 12572,
    "precioSemanal": 12572,
    "precioLunar": 12572,
    "price": 12572,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/1b/mandarina__preview.jpg",
    "producer": "DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-6042",
    "name": "BATATIN BEAUREGARD X 20 KG APROX. AGROECOLOGICO",
    "cleanName": "Batatin Beauregard",
    "slug": "batatin-beauregard",
    "fullName": "BATATIN BEAUREGARD X 20 KG APROX. AGROECOLOGICO (FINCA VERDE)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 20,
    "costoBase": 10530,
    "precioCajon": 14742,
    "precioPerKg": 737.1,
    "precioLocal": 14742,
    "precioSemanal": 14742,
    "precioLunar": 14742,
    "price": 14742,
    "stock": 15,
    "unit": "Cajón 20kg",
    "emoji": "🍠",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/5e/batatin__preview.jpg",
    "producer": "FINCA VERDE",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-15784",
    "name": "NARANJA OMBLIGO AGROECOLOGICO 15 KG APROX",
    "cleanName": "Naranja Ombligo",
    "slug": "naranja-ombligo",
    "fullName": "NARANJA OMBLIGO AGROECOLOGICO 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 10820,
    "precioCajon": 15148,
    "precioPerKg": 1009.87,
    "precioLocal": 15148,
    "precioSemanal": 15148,
    "precioLunar": 15148,
    "price": 15148,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/f0/naranja-ombligo-400g-1-45038__preview.webp",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-6984",
    "name": "NARANJA SALUSTIANA AGROECOLOGICO X 15 KG APROX",
    "cleanName": "Naranja Salustiana",
    "slug": "naranja-salustiana",
    "fullName": "NARANJA SALUSTIANA AGROECOLOGICO X 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 11560,
    "precioCajon": 16184,
    "precioPerKg": 1078.93,
    "precioLocal": 16184,
    "precioSemanal": 16184,
    "precioLunar": 16184,
    "price": 16184,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/8e/naranja-jaff__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-7361",
    "name": "MANDARINA ELLENDALE AGROECOLOGICO 15 KG APROX",
    "cleanName": "Mandarina Ellendale",
    "slug": "mandarina-ellendale",
    "fullName": "MANDARINA ELLENDALE AGROECOLOGICO 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 12300,
    "precioCajon": 17220,
    "precioPerKg": 1148,
    "precioLocal": 17220,
    "precioSemanal": 17220,
    "precioLunar": 17220,
    "price": 17220,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/8a/ellendale__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-2526",
    "name": "LIMON GENOVA AGROECOLÓGICO x 15 KG Aprox.",
    "cleanName": "Limon Genova",
    "slug": "limon-genova",
    "fullName": "LIMON GENOVA AGROECOLÓGICO x 15 KG Aprox. (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 13770,
    "precioCajon": 19278,
    "precioPerKg": 1285.2,
    "precioLocal": 19278,
    "precioSemanal": 19278,
    "precioLunar": 19278,
    "price": 19278,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍋",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/f1/cajon-de-limon__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-13646",
    "name": "MANDARINA ENCORE AGROECOLOGICA X 15 KG APROX",
    "cleanName": "Mandarina Encore",
    "slug": "mandarina-encore",
    "fullName": "MANDARINA ENCORE AGROECOLOGICA X 15 KG APROX (DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 13770,
    "precioCajon": 19278,
    "precioPerKg": 1285.2,
    "precioLocal": 19278,
    "precioSemanal": 19278,
    "precioLunar": 19278,
    "price": 19278,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/e5/mandarina-encore__preview.jpg",
    "producer": "DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-8324",
    "name": "POMELO ROJO AGROECOLOGICO 15 KG APROX",
    "cleanName": "Pomelo Rojo",
    "slug": "pomelo-rojo",
    "fullName": "POMELO ROJO AGROECOLOGICO 15 KG APROX (FINCA DON LUIS)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 14500,
    "precioCajon": 20300,
    "precioPerKg": 1353.33,
    "precioLocal": 20300,
    "precioSemanal": 20300,
    "precioLunar": 20300,
    "price": 20300,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/63/pomelos_-_grapefruits__preview.jpg",
    "producer": "FINCA DON LUIS",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-9839",
    "name": "ZAPALLO KABUTIA ORGANICO X 14 KG APROX",
    "cleanName": "Zapallo Kabutia",
    "slug": "zapallo-kabutia",
    "fullName": "ZAPALLO KABUTIA ORGANICO X 14 KG APROX (PUENTE BLANCO)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 14,
    "costoBase": 19470,
    "precioCajon": 27258,
    "precioPerKg": 1947,
    "precioLocal": 27258,
    "precioSemanal": 27258,
    "precioLunar": 27258,
    "price": 27258,
    "stock": 15,
    "unit": "Cajón 14kg",
    "emoji": "🎃",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/7a/d_nq_np_991988-mla86886359536_072025-o__preview.webp",
    "producer": "PUENTE BLANCO",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-14813",
    "name": "ZANAHORIA SIN HOJAS AGROECOLOGICAS X 9 KG",
    "cleanName": "Zanahoria Sin Hojas",
    "slug": "zanahoria-sin-hojas",
    "fullName": "ZANAHORIA SIN HOJAS AGROECOLOGICAS X 9 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 9,
    "costoBase": 21840,
    "precioCajon": 30576,
    "precioPerKg": 3397.33,
    "precioLocal": 30576,
    "precioSemanal": 30576,
    "precioLunar": 30576,
    "price": 30576,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🥕",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/5a/zanahoria-sachet__preview.webp",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-7625",
    "name": "BATATA MORADA ARAPEY AGROECOLOGICO 11 KG APROX",
    "cleanName": "Batata Morada Arapey",
    "slug": "batata-morada-arapey",
    "fullName": "BATATA MORADA ARAPEY AGROECOLOGICO 11 KG APROX (FINCA VERDE)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 11,
    "costoBase": 25110,
    "precioCajon": 35154,
    "precioPerKg": 3195.82,
    "precioLocal": 35154,
    "precioSemanal": 35154,
    "precioLunar": 35154,
    "price": 35154,
    "stock": 15,
    "unit": "Cajón 11kg",
    "emoji": "🍠",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/72/batata-morada-inta__preview.jpg",
    "producer": "FINCA VERDE",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-6966",
    "name": "NARANJA SANGUINA ROSA AGROECOLOGICO 16 KG APROX",
    "cleanName": "Naranja Sanguina Rosa",
    "slug": "naranja-sanguina-rosa",
    "fullName": "NARANJA SANGUINA ROSA AGROECOLOGICO 16 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 16,
    "costoBase": 26490,
    "precioCajon": 37086,
    "precioPerKg": 2317.88,
    "precioLocal": 37086,
    "precioSemanal": 37086,
    "precioLunar": 37086,
    "price": 37086,
    "stock": 15,
    "unit": "Cajón 16kg",
    "emoji": "🍊",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/92/naranja-sanguina__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-17633",
    "name": "QUINOTO AGROECOLÓGICO 9 KG APROX",
    "cleanName": "Quinoto",
    "slug": "quinoto",
    "fullName": "QUINOTO AGROECOLÓGICO 9 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 9,
    "costoBase": 27010,
    "precioCajon": 37814,
    "precioPerKg": 4201.56,
    "precioLocal": 37814,
    "precioSemanal": 37814,
    "precioLunar": 37814,
    "price": 37814,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🍊",
    "img": "",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-2541",
    "name": "PALTA SILVESTRE AGROECOLOGICA X 9 KG",
    "cleanName": "Palta Silvestre",
    "slug": "palta-silvestre",
    "fullName": "PALTA SILVESTRE AGROECOLOGICA X 9 KG ( FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 9,
    "costoBase": 35930,
    "precioCajon": 50302,
    "precioPerKg": 5589.11,
    "precioLocal": 50302,
    "precioSemanal": 50302,
    "precioLunar": 50302,
    "price": 50302,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🥑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/7f/paltas-silvestre__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-6398",
    "name": "BATATA BUENA BONIATO AGROECOLOGICA  12 KG APROX",
    "cleanName": "Batata Buena Boniato",
    "slug": "batata-buena-boniato",
    "fullName": "BATATA BUENA BONIATO AGROECOLOGICA  12 KG APROX (FINCA VERDE)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 12,
    "costoBase": 33060,
    "precioCajon": 46284,
    "precioPerKg": 3857,
    "precioLocal": 46284,
    "precioSemanal": 46284,
    "precioLunar": 46284,
    "price": 46284,
    "stock": 15,
    "unit": "Cajón 12kg",
    "emoji": "🍠",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/74/batata-boniato__preview.jpg",
    "producer": "FINCA VERDE",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-14028",
    "name": "FRUTILLAS AGROECOLOGICAS CAJON 5 KG APROX",
    "cleanName": "Frutillas",
    "slug": "frutillas",
    "fullName": "FRUTILLAS AGROECOLOGICAS CAJON 5 KG APROX (COMUNIDADA SEMBRANDO CONCIENCIA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 5,
    "costoBase": 33760,
    "precioCajon": 47264,
    "precioPerKg": 9452.8,
    "precioLocal": 47264,
    "precioSemanal": 47264,
    "precioLunar": 47264,
    "price": 47264,
    "stock": 15,
    "unit": "Cajón 5kg",
    "emoji": "🍓",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/4b/frutillas-1610__preview.jpg",
    "producer": "COMUNIDADA SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-2513",
    "name": "BANANAS ORGANICO CERTIFICADO 16 KG APROX",
    "cleanName": "Bananas",
    "slug": "bananas",
    "fullName": "BANANAS ORGANICO CERTIFICADO 16 KG APROX (FINCA LA LUCRECIA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 16,
    "costoBase": 40620,
    "precioCajon": 56868,
    "precioPerKg": 3554.25,
    "precioLocal": 56868,
    "precioSemanal": 56868,
    "precioLunar": 56868,
    "price": 56868,
    "stock": 15,
    "unit": "Cajón 16kg",
    "emoji": "🍌",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/6e/beneficios-da-banana-verde_7527_l__preview.webp",
    "producer": "FINCA LA LUCRECIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-9714",
    "name": "PERA PACKHAM ORGANICO CERTIFICADO 18 KG APROX",
    "cleanName": "Pera Packham",
    "slug": "pera-packham",
    "fullName": "PERA PACKHAM ORGANICO CERTIFICADO 18 KG APROX (PLUMA AZUL)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 18,
    "costoBase": 38340,
    "precioCajon": 53676,
    "precioPerKg": 2982,
    "precioLocal": 53676,
    "precioSemanal": 53676,
    "precioLunar": 53676,
    "price": 53676,
    "stock": 15,
    "unit": "Cajón 18kg",
    "emoji": "🍐",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/17/pera-packhams__preview.webp",
    "producer": "PLUMA AZUL",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-14820",
    "name": "BERENJENA AGROECOLOGICA X 10 KG",
    "cleanName": "Berenjena",
    "slug": "berenjena",
    "fullName": "BERENJENA AGROECOLOGICA X 10 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 10,
    "costoBase": 38440,
    "precioCajon": 53816,
    "precioPerKg": 5381.6,
    "precioLocal": 53816,
    "precioSemanal": 53816,
    "precioLunar": 53816,
    "price": 53816,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🍆",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/c8/berenjena__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-17363",
    "name": "BERENJENA RAYADA AGROECOLÓGICA INVERNADERO 10 KG APROX",
    "cleanName": "Berenjena Rayada",
    "slug": "berenjena-rayada",
    "fullName": "BERENJENA RAYADA AGROECOLÓGICA INVERNADERO 10 KG APROX (SEMRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 10,
    "costoBase": 38440,
    "precioCajon": 53816,
    "precioPerKg": 5381.6,
    "precioLocal": 53816,
    "precioSemanal": 53816,
    "precioLunar": 53816,
    "price": 53816,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🍆",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/3f/berenjena-rayada__preview.jpg",
    "producer": "SEMRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-2512",
    "name": "BANANAS AGROECOLOGICA PRATA 17 KG APROX",
    "cleanName": "Bananas Prata",
    "slug": "bananas-prata",
    "fullName": "BANANAS AGROECOLOGICA PRATA 17 KG APROX (ALEJANDRO CLANCI)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 17,
    "costoBase": 42420,
    "precioCajon": 59388,
    "precioPerKg": 3493.41,
    "precioLocal": 59388,
    "precioSemanal": 59388,
    "precioLunar": 59388,
    "price": 59388,
    "stock": 15,
    "unit": "Cajón 17kg",
    "emoji": "🍌",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/2b/banana__preview.jpg",
    "producer": "ALEJANDRO CLANCI",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-13550",
    "name": "TOMATE REDONDO AGROECOLOGICO X 15 KG APROX",
    "cleanName": "Tomate Redondo",
    "slug": "tomate-redondo",
    "fullName": "TOMATE REDONDO AGROECOLOGICO X 15 KG APROX (FINCA LA LUCRECIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 43270,
    "precioCajon": 60578,
    "precioPerKg": 4038.53,
    "precioLocal": 60578,
    "precioSemanal": 60578,
    "precioLunar": 60578,
    "price": 60578,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🍅",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/58/tomate-redondo__preview.jpg",
    "producer": "FINCA LA LUCRECIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-13014",
    "name": "MANZANA CRIPPS PINK ORGANICA X 20 KG",
    "cleanName": "Manzana Cripps Pink",
    "slug": "manzana-cripps-pink",
    "fullName": "MANZANA CRIPPS PINK ORGANICA X 20 KG (FINCA PLUMA AZUL)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 20,
    "costoBase": 43840,
    "precioCajon": 61376,
    "precioPerKg": 3068.8,
    "precioLocal": 61376,
    "precioSemanal": 61376,
    "precioLunar": 61376,
    "price": 61376,
    "stock": 15,
    "unit": "Cajón 20kg",
    "emoji": "🍎",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/e8/pink-lady__preview.jpg",
    "producer": "FINCA PLUMA AZUL",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-17267",
    "name": "KIWI ORGANICO X 10 KG",
    "cleanName": "Kiwi",
    "slug": "kiwi",
    "fullName": "KIWI ORGANICO X 10 KG  (PLUMA AZUL)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 10,
    "costoBase": 45490,
    "precioCajon": 63686,
    "precioPerKg": 6368.6,
    "precioLocal": 63686,
    "precioSemanal": 63686,
    "precioLunar": 63686,
    "price": 63686,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🥝",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/bd/kiwis-frescos-na-mesa-de-pedra_458909-106__preview.avif",
    "producer": "PLUMA AZUL",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-6447",
    "name": "MARACUYA AGROECOLOGICO 10 KG APROX",
    "cleanName": "Maracuya",
    "slug": "maracuya",
    "fullName": "MARACUYA AGROECOLOGICO 10 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 10,
    "costoBase": 46370,
    "precioCajon": 64918,
    "precioPerKg": 6491.8,
    "precioLocal": 64918,
    "precioSemanal": 64918,
    "precioLunar": 64918,
    "price": 64918,
    "stock": 15,
    "unit": "Cajón 10kg",
    "emoji": "🫐",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/ed/img_22971-61703277fd711877cc15330139528264-1024-1024__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-8416",
    "name": "PIMIENTO ROJO AGROECOLÓGICO 7 KG APROX",
    "cleanName": "Pimiento Rojo",
    "slug": "pimiento-rojo",
    "fullName": "PIMIENTO ROJO AGROECOLÓGICO 7 KG APROX  (ROY CORRIENTES)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 7,
    "costoBase": 48890,
    "precioCajon": 68446,
    "precioPerKg": 9778,
    "precioLocal": 68446,
    "precioSemanal": 68446,
    "precioLunar": 68446,
    "price": 68446,
    "stock": 15,
    "unit": "Cajón 7kg",
    "emoji": "🫑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/78/morron-calahorra__preview.jpg",
    "producer": "ROY CORRIENTES",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-13939",
    "name": "ZAPALLITO AGROECOLOGICO X 15 KG",
    "cleanName": "Zapallito",
    "slug": "zapallito",
    "fullName": "ZAPALLITO AGROECOLOGICO X 15 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 50370,
    "precioCajon": 70518,
    "precioPerKg": 4701.2,
    "precioLocal": 70518,
    "precioSemanal": 70518,
    "precioLunar": 70518,
    "price": 70518,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🥒",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/98/zapallito-1__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-13992",
    "name": "ZUCCHINIIAGROECOLOGICO X 15 KG",
    "cleanName": "Zucchini",
    "slug": "zucchini",
    "fullName": "ZUCCHINIIAGROECOLOGICO X 15 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 15,
    "costoBase": 52940,
    "precioCajon": 74116,
    "precioPerKg": 4941.07,
    "precioLocal": 74116,
    "precioSemanal": 74116,
    "precioLunar": 74116,
    "price": 74116,
    "stock": 15,
    "unit": "Cajón 15kg",
    "emoji": "🥒",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/b3/zuchini-agroecologico__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-9713",
    "name": "PALTA HASS AGROECOLOGICA 9 KG APROX",
    "cleanName": "Palta Hass",
    "slug": "palta-hass",
    "fullName": "PALTA HASS AGROECOLOGICA 9 KG APROX (FINCA ECOTIPA)",
    "categoria": "Frutas Agroecológicas",
    "category": "Frutas Agroecológicas",
    "elemento": "tierra",
    "cajonKg": 9,
    "costoBase": 59120,
    "precioCajon": 82768,
    "precioPerKg": 9196.44,
    "precioLocal": 82768,
    "precioSemanal": 82768,
    "precioLunar": 82768,
    "price": 82768,
    "stock": 15,
    "unit": "Cajón 9kg",
    "emoji": "🥑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/24/palta-hass__preview.jpg",
    "producer": "FINCA ECOTIPA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  },
  {
    "id": "chasqui-14463",
    "name": "MORRON ROJO AGROECOLOGICO X 8 KG",
    "cleanName": "Morron Rojo",
    "slug": "morron-rojo",
    "fullName": "MORRON ROJO AGROECOLOGICO X 8 KG (COMUNIDAD SEMBRANDO CONCIENCIA)",
    "categoria": "Verduras & Huerta",
    "category": "Verduras & Huerta",
    "elemento": "tierra",
    "cajonKg": 8,
    "costoBase": 86650,
    "precioCajon": 121310,
    "precioPerKg": 15163.75,
    "precioLocal": 121310,
    "precioSemanal": 121310,
    "precioLunar": 121310,
    "price": 121310,
    "stock": 15,
    "unit": "Cajón 8kg",
    "emoji": "🫑",
    "img": "https://panel.tiendaschasqui.ar/panel-assets/channel-68/preview/bf/morron-rojo-x-kg-venta-al-peso__preview.jpg",
    "producer": "COMUNIDAD SEMBRANDO CONCIENCIA",
    "esCajon": true,
    "nodoId": "nodo-lomaverde"
  }
];

// Catálogo del Nodo Loma Verde: Exclusivo Cajones Chasqui con +40% sobre costo base
const INITIAL_PRODUCTS = CAJONES_CENTRAL_COOPERATIVA;

const CATEGORIES = [
  'Todos',
  'Frutas Agroecológicas',
  'Verduras & Huerta'
];

// =========================================================================
// 5. CAJONES MAYORISTAS DE QUINTAS - CENTRAL COOPERATIVA (CHASQUI ESSP)
// Extraídos directamente de https://tiendaschasqui.ar/centralcooperativa
// =========================================================================
// CAJONES_CENTRAL_COOPERATIVA declarado arriba junto a INITIAL_PRODUCTS

// =========================================================================
// 6. GESTOR DE CAJONES COMPARTIDOS (COMPRAS Y FRACCIONAMIENTO COLECTIVO)
// =========================================================================
const CajonesManager = {
  STORAGE_KEY: 'elementales_cajones_compartidos',

  getInitialShares() {
    return [];
  },

  getAllShares() {
    const resetKey = 'elementales_shares_v5_reset';
    if (localStorage.getItem(resetKey) !== 'true') {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.setItem(resetKey, 'true');
    }
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  },

  saveShares(shares) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(shares));
  },

  getShareForProduct(productId, circleId) {
    const shares = this.getAllShares();
    const cId = circleId || null;
    return shares.find(s => s.productId === productId && (s.circleId === cId || (!s.circleId && !cId)) && s.status === 'abierto');
  },

  getSharesForCircle(circleId) {
    const shares = this.getAllShares();
    if (!circleId) return shares.filter(s => !s.circleId);
    return shares.filter(s => s.circleId === circleId);
  },

  createOrJoinShare(productId, requestedKg, userName, circleId) {
    const shares = this.getAllShares();
    const prod = CAJONES_CENTRAL_COOPERATIVA.find(p => p.id === productId);
    if (!prod) return null;

    const cId = circleId || null;
    const actualKg = Math.max(0.5, Math.round(parseFloat(requestedKg) * 100) / 100);
    const cost = Math.round(actualKg * prod.precioPerKg);
    const participantName = (userName || (typeof AppState !== 'undefined' ? AppState.userName : '') || 'Vecino/a').trim();

    let share = shares.find(s => s.productId === productId && (s.circleId === cId || (!s.circleId && !cId)) && s.status === 'abierto');

    if (share) {
      share.participantes.push({
        id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        name: participantName,
        kg: actualKg,
        total: cost,
        avatar: '👤',
        isCurrentUser: true
      });
      share.coveredKg = Math.min(share.totalKg, Math.round((share.coveredKg + actualKg) * 100) / 100);
      share.remainingKg = Math.max(0, Math.round((share.totalKg - share.coveredKg) * 100) / 100);
      share.percent = Math.min(100, Math.round((share.coveredKg / share.totalKg) * 100));
      if (share.remainingKg <= 0.05) {
        share.remainingKg = 0;
        share.status = 'completo';
      }
    } else {
      const remaining = Math.max(0, Math.round((prod.cajonKg - actualKg) * 100) / 100);
      share = {
        id: 'share-' + Date.now(),
        circleId: cId,
        productId: prod.id,
        productName: prod.cleanName || getProductCleanName(prod),
        producer: prod.producer,
        totalKg: prod.cajonKg,
        priceCajon: prod.precioCajon,
        pricePerKg: prod.precioPerKg,
        image: prod.img,
        status: remaining <= 0.05 ? 'completo' : 'abierto',
        participantes: [
          {
            id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            name: participantName,
            kg: actualKg,
            total: cost,
            avatar: '👤',
            isCurrentUser: true
          }
        ],
        coveredKg: actualKg,
        remainingKg: remaining <= 0.05 ? 0 : remaining,
        percent: Math.min(100, Math.round((actualKg / prod.cajonKg) * 100))
      };
      shares.unshift(share);
    }

    this.saveShares(shares);
    return share;
  }
};

function formatKg(kg) {
  if (kg === null || kg === undefined) return '0';
  const val = typeof kg === 'number' ? kg : parseFloat(kg);
  if (isNaN(val)) return '0';
  if (Math.abs(val - Math.round(val)) < 0.001) {
    return String(Math.round(val));
  }
  return val.toFixed(2).replace(/\.?0+$/, '');
}
