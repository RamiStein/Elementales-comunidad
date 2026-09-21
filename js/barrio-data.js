// Datos del Portal y Red Social Barrial - Elementales (Nodo La Lucila)

// 1. LOS 5 ELEMENTOS EN EL CONTEXTO BARRIAL
const ELEMENTOS_BARRIO = [
  {
    id: 'tierra',
    name: 'Tierra',
    emoji: '🌱',
    subtitulo: 'Sostén, Oficios y Alimentos',
    color: '#8ca15d',
    bgColor: '#f4f6ef',
    borderColor: '#c2d49e',
    iconUrl: 'public/assets/brand/tierra_clean.png',
    descripcion: 'Plomeros, carpinteros, electricistas, huertas agroecológicas, compostaje y trabajo con la materia.',
    rolComunitario: 'El sostén material del barrio: los vecinos que construyen, arreglan y nutren con sus manos.',
    palabrasClave: ['plomero', 'carpintero', 'electricista', 'gasista', 'jardinero', 'huerta', 'compost', 'herramientas', 'oficio']
  },
  {
    id: 'agua',
    name: 'Agua',
    emoji: '💧',
    subtitulo: 'Flujo, Vínculos y Talleres',
    color: '#7ca1b5',
    bgColor: '#f2f6f9',
    borderColor: '#b4cfdf',
    iconUrl: 'public/assets/brand/agua_clean.png',
    descripcion: 'Talleres de vecinos, círculos de encuentro, salud emocional, actividades en el río y grupos de WhatsApp.',
    rolComunitario: 'La unión y el movimiento: cómo los vecinos nos comunicamos, aprendemos juntos y nos cuidamos.',
    palabrasClave: ['taller', 'yoga', 'circulo', 'salud', 'rio', 'whatsapp', 'encuentro', 'vecinos', 'vínculo']
  },
  {
    id: 'fuego',
    name: 'Fuego',
    emoji: '🔥',
    subtitulo: 'Acción, Proyectos y Financiamiento',
    color: '#d97757',
    bgColor: '#fdf4f0',
    borderColor: '#f2b5a2',
    iconUrl: 'public/assets/brand/fuego_clean.png',
    descripcion: 'Financiamiento para proyectos locales, incubación de ideas barriales, ferias y energía activa.',
    rolComunitario: 'El motor transformador: el impulso para financiar y hacer realidad las ideas de los vecinos.',
    palabrasClave: ['proyecto', 'financiamiento', 'fondos', 'emprendimiento', 'feria', 'impulso', 'energia', 'ideas']
  },
  {
    id: 'aire',
    name: 'Aire',
    emoji: '💨',
    subtitulo: 'Difusión, Noticias y Avisos',
    color: '#aab091',
    bgColor: '#f6f7f3',
    borderColor: '#d2d7c1',
    iconUrl: 'public/assets/brand/aire_clean.png',
    descripcion: 'Noticias importantes de La Lucila, alertas vecinales de WhatsApp, tránsito, clima y avisos comunitarios.',
    rolComunitario: 'La claridad y la información: mantener a todo el barrio comunicado, enterado y protegido.',
    palabrasClave: ['noticia', 'aviso', 'alerta', 'clima', 'seguridad', 'mascota', 'transito', 'comunicado', 'tren']
  },
  {
    id: 'espiritu',
    name: 'Éter',
    emoji: '✨',
    subtitulo: 'Centro Comunitario y Nueva Era',
    color: '#c59b8b',
    bgColor: '#fcf4f0',
    borderColor: '#dfc2b7',
    iconUrl: 'public/assets/brand/eter_clean.png',
    descripcion: 'Oficina Barrial de la Nueva Era en La Lucila: gestión vecinal humana atendida por Gonza, Agus, Rami, Cris y Ro.',
    rolComunitario: 'El corazón del nodo: el espacio físico y espiritual para resolver dudas y coordinar la vida en común.',
    palabrasClave: ['centro', 'oficina', 'lucila', 'gonza', 'agus', 'rami', 'cris', 'ro', 'dudas', 'gestion', 'nueva era']
  }
];

// 2. VIDRIERA DE OFICIOS Y SERVICIOS DEL BARRIO (Referenciados por el Centro Elementales)
const OFICIOS_BARRIO_INICIALES = [
  {
    id: 'oficio-1',
    nombre: 'Don Carlos Benítez',
    rubro: 'Plomería, Gas & Destapaciones',
    elemento: 'tierra',
    icono: '🔧',
    zona: 'La Lucila Centro (Rawson y Roma)',
    aniosBarrio: '28 años en el barrio',
    telefono: '+5491144001122',
    telefonoRaw: '5491144001122',
    descripcion: 'Instalaciones completas de agua termofusión, gas matriculado, colocación de griferías, tanques y arreglos de urgencia.',
    referencias: 24,
    calificacion: 4.9,
    referenciadoPorCentro: true,
    palabrasClave: ['plomero', 'gasista', 'agua', 'termofusion', 'canilla', 'inodoro', 'tanque'],
    badges: ['Matriculado', 'Urgencias 24hs', 'Referenciado Centro Elementales']
  },
  {
    id: 'oficio-2',
    nombre: 'Esteban Maderera & Taller',
    rubro: 'Carpintería, Muebles a Medida & Restauración',
    elemento: 'tierra',
    icono: '🪚',
    zona: 'La Lucila (Cerca de Av. del Libertador)',
    aniosBarrio: '14 años en el barrio',
    telefono: '+5491155112233',
    telefonoRaw: '5491155112233',
    descripcion: 'Diseño y armado de muebles en maderas nobles y recuperadas, aberturas, mesas vivas, alacenas y laqueados ecológicos.',
    referencias: 19,
    calificacion: 5.0,
    referenciadoPorCentro: true,
    palabrasClave: ['carpintero', 'muebles', 'madera', 'mesa', 'estante', 'puerta', 'restauracion'],
    badges: ['Madera Recuperada', 'Trabajo Artesanal', 'Referenciado Centro Elementales']
  },
  {
    id: 'oficio-3',
    nombre: 'Mariana Ruiz',
    rubro: 'Electricidad Domiciliaria & Paneles Solares',
    elemento: 'fuego',
    icono: '⚡',
    zona: 'La Lucila / Olivos',
    aniosBarrio: '9 años en la zona',
    telefono: '+5491166223344',
    telefonoRaw: '5491166223344',
    descripcion: 'Técnica electricista habilitada. Tableros modernos, disyuntores, iluminación LED inteligente, termotanques solares y eficiencia energética.',
    referencias: 31,
    calificacion: 4.9,
    referenciadoPorCentro: true,
    palabrasClave: ['electricista', 'luz', 'tablero', 'solar', 'termotanque', 'cortocircuito', 'led'],
    badges: ['Energía Renovable', 'Técnica Matriculada', 'Referenciado Centro Elementales']
  },
  {
    id: 'oficio-4',
    nombre: 'Lucas & Equipo BioJardín',
    rubro: 'Jardinería Agroecológica, Poda & Huerta',
    elemento: 'tierra',
    icono: '🌿',
    zona: 'La Lucila Costera & Vías',
    aniosBarrio: '11 años en el barrio',
    telefono: '+5491177334455',
    telefonoRaw: '5491177334455',
    descripcion: 'Mantenimiento de jardines nativos, podas de altura conscientes, composteras domésticas y control biológico de plagas sin químicos.',
    referencias: 42,
    calificacion: 5.0,
    referenciadoPorCentro: true,
    palabrasClave: ['jardinero', 'poda', 'pasto', 'huerta', 'plantas', 'nativas', 'compost'],
    badges: ['Sin Químicos', 'Especialista Nativas', 'Referenciado Centro Elementales']
  },
  {
    id: 'oficio-5',
    nombre: 'Elena Costuras & Telas',
    rubro: 'Costura, Arreglos de Ropa & Tapicería Liviana',
    elemento: 'agua',
    icono: '🧵',
    zona: 'La Lucila (Calle Díaz Vélez)',
    aniosBarrio: '22 años en el barrio',
    telefono: '+5491188445566',
    telefonoRaw: '5491188445566',
    descripcion: 'Arreglos de prendas, dobladillos, cambios de cierres, cortinas a medida, fundas de sillones y confección sustentable con descartes textiles.',
    referencias: 16,
    calificacion: 4.8,
    referenciadoPorCentro: true,
    palabrasClave: ['costurera', 'costura', 'ropa', 'pantalon', 'cortinas', 'cierre', 'tapiceria'],
    badges: ['Puntualidad', 'Precio Vecinal', 'Referenciado Centro Elementales']
  },
  {
    id: 'oficio-6',
    nombre: 'Martín y Julieta (Paseos & Cuidados)',
    rubro: 'Cuidado y Paseo Consciente de Mascotas',
    elemento: 'agua',
    icono: '🐾',
    zona: 'La Lucila & Paseo del Viento',
    aniosBarrio: '6 años en el barrio',
    telefono: '+5491199556677',
    telefonoRaw: '5491199556677',
    descripcion: 'Paseos en grupos reducidos con adiestramiento positivo, cuidados en casa particular para viajes y primeros auxilios veterinarios.',
    referencias: 27,
    calificacion: 5.0,
    referenciadoPorCentro: true,
    palabrasClave: ['paseador', 'perro', 'gato', 'mascotas', 'guarderia', 'cuidado'],
    badges: ['Adiestramiento Positivo', 'Grupos Chicos', 'Referenciado Centro Elementales']
  }
];

// 3. AVISOS DE GRUPOS DE WHATSAPP DEL BARRIO
const WHATSAPP_AVISOS_INICIALES = [
  {
    id: 'wa-1',
    grupo: 'Vecinos La Lucila Centro & Estación',
    emisor: 'Valeria (calle Roma)',
    fecha: 'Hoy 11:20 hs',
    elemento: 'aire',
    texto: '¡Aviso a la comunidad! Encontré un caniche blanco con collar azul cerca de la Plaza La Lucila (calle Tucumán). Está en mi casa a resguardo, por favor si conocen al dueño avísenme por privado.',
    esAlerta: true,
    tipo: 'mascota',
    icono: '🐕',
    badge: 'Mascota Perdida'
  },
  {
    id: 'wa-2',
    grupo: 'Trueque & Economía Circular La Lucila',
    emisor: 'Ignacio (calle Debenedetti)',
    fecha: 'Hoy 09:45 hs',
    elemento: 'fuego',
    texto: 'Tengo 6 cajones de madera reforzados tipo huerta y herramientas de mano que ya no uso. Me gustaría intercambiarlos por frascos grandes de vidrio o plantines aromáticos para la huerta.',
    esAlerta: false,
    tipo: 'trueque',
    icono: '🔄',
    badge: 'Canje Vecinal'
  },
  {
    id: 'wa-3',
    grupo: 'Comunidad Huerta & Compost La Lucila',
    emisor: 'Cris (Guardián Elementales)',
    fecha: 'Ayer 18:30 hs',
    elemento: 'tierra',
    texto: 'Familia: este sábado abrimos la zafra de compost maduro en el Centro Comunitario de Rawson. Los vecinos que traen residuos orgánicos pueden venir con su balde a retirar tierra negra abonada gratis.',
    esAlerta: false,
    tipo: 'compost',
    icono: '🌱',
    badge: 'Compost Comunitario'
  },
  {
    id: 'wa-4',
    grupo: 'Alertas & Seguridad Vecinal La Lucila',
    emisor: 'Roberto (calle Rawson)',
    fecha: 'Ayer 15:10 hs',
    elemento: 'aire',
    texto: 'Recordamos que hoy entre las 14 y las 18 hs la cuadrilla municipal de Vicente López estará realizando poda correctiva de ramas sobre calle Díaz Vélez al 1200. Conducir con precaución.',
    esAlerta: true,
    tipo: 'transito',
    icono: '⚠️',
    badge: 'Corte Programado'
  },
  {
    id: 'wa-5',
    grupo: 'Cultura, Talleres & Vínculos La Lucila',
    emisor: 'Agus (Centro Elementales)',
    fecha: 'Hace 2 días',
    elemento: 'agua',
    texto: 'El viernes a las 18:30 hs nos juntamos a orillas del río en el Paseo del Viento para un círculo de respiración y mate compartido al atardecer. Abierto y libre para todos los vecinos.',
    esAlerta: false,
    tipo: 'encuentro',
    icono: '🌅',
    badge: 'Encuentro en el Río'
  }
];

// 4. NOTICIAS IMPORTANTES DE LA LUCILA & VICENTE LÓPEZ (Salen de Google & Prensa Barrial)
const NOTICIAS_BARRIO_INICIALES = [
  {
    id: 'noticia-1',
    titulo: 'Punto Verde Móvil en Plaza La Lucila este sábado',
    fuente: 'Vicente López Sustentable / Google News',
    fecha: '20 de Septiembre 2026',
    elemento: 'tierra',
    resumen: 'Recolección especial de aparatos eléctricos y electrónicos en desuso (RAEE), aceite vegetal usado, pilas y lámparas bajo consumo frente a la estación.',
    enlaceGoogle: 'https://www.google.com/search?q=punto+verde+movil+vicente+lopez+la+lucila',
    imagen: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800&h=450',
    etiqueta: 'Reciclaje & Ecología'
  },
  {
    id: 'noticia-2',
    titulo: 'Nivel y Mareas del Río de la Plata en la Costa de La Lucila',
    fuente: 'Servicio de Hidrografía Naval & Google Clima',
    fecha: 'Actualizado hoy',
    elemento: 'agua',
    resumen: 'Marea normal con viento suave del sudeste. El Paseo de la Costa y el Parque del Viento se encuentran plenamente habilitados para caminatas y bicisenda.',
    enlaceGoogle: 'https://www.google.com/search?q=marea+rio+de+la+plata+vicente+lopez+olivos+la+lucila',
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800&h=450',
    etiqueta: 'Clima & Río'
  },
  {
    id: 'noticia-3',
    titulo: 'Ciclo de Arte y Naturaleza en la Quinta Trabucco',
    fuente: 'Cultura Vicente López',
    fecha: 'Fin de semana',
    elemento: 'aire',
    resumen: 'Exposiciones de esculturas botánicas, música acústica bajo los árboles añosos y feria de artesanos locales con entrada gratuita para vecinos.',
    enlaceGoogle: 'https://www.google.com/search?q=quinta+trabucco+vicente+lopez+actividades',
    imagen: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=800&h=450',
    etiqueta: 'Cultura Local'
  }
];

// 5. TALLERES DE VECINOS (Agenda de Saberes Compartidos)
const TALLERES_BARRIO_INICIALES = [
  {
    id: 'taller-1',
    titulo: 'Huertas Regenerativas en Balcones & Terrazas',
    tallerista: 'Cris (Guardián del Suelo Vivo)',
    elemento: 'tierra',
    icono: '🌱',
    fecha: 'Sábado 26 de Septiembre - 10:30 hs',
    lugar: 'Centro Comunitario Elementales (Rawson 3450, La Lucila)',
    duracion: '2 horas',
    cupos: '15 personas (quedan 4 lugares)',
    contribucion: 'Aporte voluntario / Alimentos agroecológicos',
    descripcion: 'Aprende a sembrar hortalizas de temporada, hacer sustrato vivo con lombrices californianas y asociar plantas aromáticas protectoras.',
    telefonoContacto: '5491133221100'
  },
  {
    id: 'taller-2',
    titulo: 'Carpintería Básica & Creación de Composteras con Pallets',
    tallerista: 'Esteban (Carpintero del Barrio) & Gonza',
    elemento: 'fuego',
    icono: '🪚',
    fecha: 'Domingo 27 de Septiembre - 15:00 hs',
    lugar: 'Taller de Esteban (cerca de Libertador y Rawson)',
    duracion: '3 horas',
    cupos: '10 personas (quedan 2 lugares)',
    contribucion: 'Materiales incluidos',
    descripcion: 'Uso seguro de caladora, atornilladora y lija. Cada vecino aprende a armar una compostera domiciliaria ventilada y se lleva planos guía.',
    telefonoContacto: '5491155112233'
  },
  {
    id: 'taller-3',
    titulo: 'Alquimia de Fermentos: Kéfir, Chucrut y Pan de Masa Madre',
    tallerista: 'Ro (Nutrición & Alquimia)',
    elemento: 'agua',
    icono: '🏺',
    fecha: 'Martes 29 de Septiembre - 18:00 hs',
    lugar: 'Centro Comunitario Elementales (La Lucila)',
    duracion: '2 horas y media',
    cupos: '12 personas',
    contribucion: 'Incluye degustación y nódulos de kéfir de regalo',
    descripcion: 'Descubrí el poder de la microbiota viva para fortalecer el sistema inmunológico con técnicas ancestrales simples y deliciosas.',
    telefonoContacto: '5491122334411'
  },
  {
    id: 'taller-4',
    titulo: 'Círculo de Respiración Consciente & Meditación al Río',
    tallerista: 'Agus (Vínculos Comunitarios)',
    elemento: 'aire',
    icono: '🌬️',
    fecha: 'Viernes 2 de Octubre - 18:30 hs',
    lugar: 'Paseo del Viento (Río de La Lucila)',
    duracion: '1 hora y media',
    cupos: 'Abierto y sin límite',
    contribucion: 'Libre y consciente',
    descripcion: 'Técnicas de Pranayama, grounding sobre el pasto frente al agua y círculo de palabra para aquietar la mente y conectar con el barrio.',
    telefonoContacto: '5491144556622'
  }
];

// 6. PROYECTOS LOCALES Y FONDO DE FINANCIAMIENTO BARRIAL
const PROYECTOS_FINANCIAMIENTO_INICIALES = [
  {
    id: 'proyecto-1',
    titulo: 'Composteras Vecinales en Esquinas Estratégicas de La Lucila',
    proponente: 'Vecinos Unidos por el Reciclaje & Cris',
    elemento: 'tierra',
    icono: '🪱',
    estado: 'En Recaudación Activa',
    porcentaje: 78,
    montoObjetivo: 450000,
    montoRecaudado: 351000,
    apoyos: 38,
    descripcion: 'Instalación de 4 módulos de composteras comunitarias de madera plástica reciclada en esquinas de La Lucila con candado numérico y talleres de uso para reducir el 50% de la basura.',
    beneficioBarrio: 'Disminución de residuos en volquetes y producción de abono natural para las veredas arboladas.'
  },
  {
    id: 'proyecto-2',
    titulo: 'Iluminación Solar Autónoma en Pasaje Peatonal del Tren',
    proponente: 'Mariana Ruiz (Electricista) & Rami',
    elemento: 'fuego',
    icono: '💡',
    estado: 'Financiado 100% - En Ejecución',
    porcentaje: 100,
    montoObjetivo: 320000,
    montoRecaudado: 320000,
    apoyos: 45,
    descripcion: 'Colocación de 3 luminarias LED con paneles solares y sensor de movimiento en el sendero peatonal entre vías para que los vecinos caminen seguros de noche.',
    beneficioBarrio: 'Seguridad nocturna con 0 costo de energía de red y tecnología sustentable de bajo impacto.'
  },
  {
    id: 'proyecto-3',
    titulo: 'Biblioteca Popular & Banco de Semillas al Paso en la Estación',
    proponente: 'Agus, Ro & Colectivo Vecinal',
    elemento: 'agua',
    icono: '📚',
    estado: 'En Recaudación Activa',
    porcentaje: 45,
    montoObjetivo: 210000,
    montoRecaudado: 94500,
    apoyos: 26,
    descripcion: 'Mueble de madera protegido contra lluvia junto al andén de La Lucila con intercambio libre de libros, revistas de cultivo y sobres de semillas nativas y comestibles.',
    beneficioBarrio: 'Cultura libre, lectura y multiplicación de semillas libres entre los vecinos que viajan cada día.'
  }
];

// 7. CENTRO COMUNITARIO ELEMENTALES (LA LUCILA) - OFICINA BARRIAL DE LA NUEVA ERA
const CENTRO_COMUNITARIO_LUCILA = {
  nombre: 'Centro Comunitario Elementales - La Lucila',
  subtitulo: 'Oficina Barrial de la Nueva Era para la Gestión Comunitaria',
  direccion: 'Calle Rawson 3450 (e/ Roma y Debenedetti), La Lucila, Vicente López',
  coordenadasMaps: 'https://www.google.com/maps/search/La+Lucila+Vicente+Lopez',
  horarios: 'Lunes a Sábados de 09:30 a 19:30 hs (Abierto al vecino)',
  telefonoWhatsApp: '+5491123456789',
  telefonoRaw: '5491123456789',
  lema: 'Un espacio físico donde no hay trámites burocráticos, sino seres humanos facilitando la vida en común, financiando proyectos y tejiendo comunidad.',
  guardianes: [
    {
      nombre: 'Rami',
      apodo: 'Coordinador del Nodo',
      rol: 'Tecnología Barrial & Articulación General',
      elemento: 'espiritu',
      avatar: '🌿',
      descripcion: 'Encargado de la plataforma digital barrial, conexión entre proyectos, sistemas transparentes y soporte técnico para los vecinos.'
    },
    {
      nombre: 'Gonza',
      apodo: 'Un Ser Elemental',
      rol: 'Guardianía, Energía Vital & Proyectos en Acción',
      elemento: 'fuego',
      avatar: '🔥',
      descripcion: 'Acompañamiento a emprendedores locales, activación de ferias, financiamiento comunitario y espíritu impulsor del nodo.'
    },
    {
      nombre: 'Agus',
      apodo: 'Vínculos & Atención',
      rol: 'Bienvenida Vecinal & Círculos Comunitarios',
      elemento: 'agua',
      avatar: '💧',
      descripcion: 'Te recibe en el local con mate listo, escucha tus inquietudes para el barrio, coordina talleres y teje redes entre vecinos.'
    },
    {
      nombre: 'Cris',
      apodo: 'Guardián del Suelo',
      rol: 'Huerta Regenerativa, Semillas & Compost',
      elemento: 'tierra',
      avatar: '🌱',
      descripcion: 'Asesora en agroecología urbana, organiza la entrega de compost barrial y ayuda a vecinos y escuelas a diseñar huertas vivas.'
    },
    {
      nombre: 'Ro',
      apodo: 'Alquimista Natural',
      rol: 'Nutrición Consciente, Botánica & Salud',
      elemento: 'agua',
      avatar: '✨',
      descripcion: 'Curaduría de alimentos agroecológicos de la feria, recetas medicinales, cosmética limpia y armonización del espacio comunitario.'
    }
  ],
  serviciosOficina: [
    {
      titulo: 'Atención Directa & Sacarse Dudas',
      icono: '🤝',
      detalle: 'Vení a charlar con Gonza, Agus, Rami, Cris o Ro. No necesitás turno previo. Te explicamos cómo funciona la red, cómo asociarte y cómo participar.'
    },
    {
      titulo: 'Financiamiento de Proyectos Locales',
      icono: '💡',
      detalle: 'Contanos tu idea para mejorar La Lucila (huertas, energía limpia, arte, oficios). Evaluamos el proyecto y activamos el fondo de apoyo vecinal.'
    },
    {
      titulo: 'Sumar Productos a la Venta',
      icono: '🧺',
      detalle: 'Si elaborás panificados, miel, mermeladas, plantas o artesanías sustentables, podés sumarlos a la vidriera física y digital de la feria.'
    },
    {
      titulo: 'Buzón de Inquietudes Barriales',
      icono: '📢',
      detalle: 'Traé problemas de iluminación, poda, animales o tránsito. Gestionamos soluciones colectivas y reclamos coordinados ante el municipio.'
    }
  ]
};

// 8. CAPA DE PERSISTENCIA LOCAL (localStorage)
const BarrioStorage = {
  getOficios: function() {
    try {
      const stored = localStorage.getItem('elementales_oficios_barrio');
      if (stored) return JSON.parse(stored);
    } catch(e) { console.error(e); }
    return OFICIOS_BARRIO_INICIALES;
  },
  saveOficio: function(oficio) {
    const list = this.getOficios();
    list.unshift(oficio);
    try {
      localStorage.setItem('elementales_oficios_barrio', JSON.stringify(list));
    } catch(e) { console.error(e); }
    return list;
  },

  getAvisosWA: function() {
    try {
      const stored = localStorage.getItem('elementales_avisos_wa');
      if (stored) return JSON.parse(stored);
    } catch(e) { console.error(e); }
    return WHATSAPP_AVISOS_INICIALES;
  },
  saveAvisoWA: function(aviso) {
    const list = this.getAvisosWA();
    list.unshift(aviso);
    try {
      localStorage.setItem('elementales_avisos_wa', JSON.stringify(list));
    } catch(e) { console.error(e); }
    return list;
  },

  getTalleres: function() {
    try {
      const stored = localStorage.getItem('elementales_talleres_barrio');
      if (stored) return JSON.parse(stored);
    } catch(e) { console.error(e); }
    return TALLERES_BARRIO_INICIALES;
  },
  saveTaller: function(taller) {
    const list = this.getTalleres();
    list.unshift(taller);
    try {
      localStorage.setItem('elementales_talleres_barrio', JSON.stringify(list));
    } catch(e) { console.error(e); }
    return list;
  },

  getProyectos: function() {
    try {
      const stored = localStorage.getItem('elementales_proyectos_barrio');
      if (stored) return JSON.parse(stored);
    } catch(e) { console.error(e); }
    return PROYECTOS_FINANCIAMIENTO_INICIALES;
  },
  saveProyecto: function(proyecto) {
    const list = this.getProyectos();
    list.unshift(proyecto);
    try {
      localStorage.setItem('elementales_proyectos_barrio', JSON.stringify(list));
    } catch(e) { console.error(e); }
    return list;
  },

  getInquietudes: function() {
    try {
      const stored = localStorage.getItem('elementales_inquietudes_barrio');
      if (stored) return JSON.parse(stored);
    } catch(e) { console.error(e); }
    return [
      {
        id: 'inq-1',
        titulo: 'Arbolado añoso y veredas levantadas en calle Quintana',
        categoria: 'arbolado',
        vecino: 'Marta (vecina hace 40 años)',
        fecha: 'Hace 3 días',
        estado: 'En gestión con el Centro',
        detalle: 'Las tipas de la vereda son hermosas pero levantaron las baldosas. Proponemos canteros amplios con cubre-suelo nativo para no cortar raíces.',
        apoyos: 18
      },
      {
        id: 'inq-2',
        titulo: 'Campana para reciclado de vidrio en Plaza La Lucila',
        categoria: 'reciclaje',
        vecino: 'Tomás',
        fecha: 'Ayer',
        estado: 'Aprobado por el nodo',
        detalle: 'Muchos vecinos consumimos botellas de salsa y bebidas retornables pero no hay contenedor exclusivo para vidrio en la plaza de la estación.',
        apoyos: 32
      }
    ];
  },
  saveInquietud: function(inq) {
    const list = this.getInquietudes();
    list.unshift(inq);
    try {
      localStorage.setItem('elementales_inquietudes_barrio', JSON.stringify(list));
    } catch(e) { console.error(e); }
    return list;
  },

  getProductosPropuestos: function() {
    try {
      const stored = localStorage.getItem('elementales_productos_propuestos');
      if (stored) return JSON.parse(stored);
    } catch(e) { console.error(e); }
    return [];
  },
  saveProductoPropuesto: function(prod) {
    const list = this.getProductosPropuestos();
    list.unshift(prod);
    try {
      localStorage.setItem('elementales_productos_propuestos', JSON.stringify(list));
    } catch(e) { console.error(e); }
    return list;
  }
};
