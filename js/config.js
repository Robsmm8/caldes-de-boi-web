/* =========================================================================
   CONFIG.JS — punto único de configuración del sitio
   =========================================================================
   Este es el ÚNICO archivo que el equipo de marketing/contenido debería
   necesitar tocar en el día a día:
     1. IMAGES        -> todas las fotografías del sitio (una clave = una foto)
     2. BOOKING_ENGINES-> conexión con los dos motores de reserva (Manantial/Caldas)
     3. HOTELS        -> datos de cada hotel
     4. SPA_SERVICES  -> listado de servicios termales del balneario
     5. RESTAURANTS   -> restaurantes del complejo y sus cartas
     6. ENTORNO_ITEMS -> puntos de interés del entorno
   Ningún HTML contiene rutas de imágenes ni textos "hardcodeados" de estas
   listas: todo se pinta en pantalla leyendo este objeto.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1) IMÁGENES
   Para cambiar cualquier foto de la web, sustituye la URL/ruta de la derecha.

   Fuentes:
   - assets/img/...            → fotos propias del hotel (las que nos
     facilitasteis directamente: aérea del Manantial, patio del Caldas,
     logo). Estas son las que hay que ir ampliando con vuestro banco de
     fotos real — es la carpeta que manda.
   - caldesdeboi.com/...       → fotos reales ya publicadas en vuestra
     propia web actual (habitaciones, tratamientos de spa, senderismo).
     Son vuestras, no hace falta crédito, pero al ser hotlink a vuestro
     propio servidor lo ideal es copiarlas también a assets/img/ cuando
     migréis de verdad.
   - upload.wikimedia.org/...  → fotos reales del entorno (Parque
     Nacional, iglesia de Taüll, estación de esquí, platos típicos) que si
     no son propiedad del hotel, así que llevan crédito obligatorio en
     CREDITS.md.
   ------------------------------------------------------------------------- */
const IMAGES = {
  // Foto aérea real del Hotel Manantial (facilitada directamente por el hotel)
  heroHome:            "assets/img/hero-manantial-aerea.jpg",

  // Hotel Manantial: misma aérea real + habitación real (caldesdeboi.com)
  hotelManantialThumb: "assets/img/hero-manantial-aerea.jpg",
  hotelManantialHero:  "assets/img/hero-manantial-aerea.jpg",

  // Hotel Caldas: patio interior real (facilitada directamente por el hotel)
  hotelCaldasThumb:    "assets/img/hotel-caldas-patio.jpg",
  hotelCaldasHero:     "assets/img/hotel-caldas-patio.jpg",

  // Tratamiento con chorros de agua termal, foto real caldesdeboi.com
  spaBanner:           "https://www.caldesdeboi.com/wp-content/uploads/2021/06/Balneario-Caldes-2018-0143-1.jpg",
  // Tratamiento facial, foto real caldesdeboi.com
  spaInterior:         "https://www.caldesdeboi.com/wp-content/uploads/2021/08/BOI07311-scaled.jpg",

  // Habitación real del Hotel Manantial, foto caldesdeboi.com
  roomSuite:           "https://www.caldesdeboi.com/wp-content/uploads/2021/05/Hotel-Manatial-2018-0049.jpg",

  // Masaje/tratamiento con barro termal, foto real caldesdeboi.com
  experienceWellness:  "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Balneario-Caldes-2018-0075-copia-scaled.jpg",
  // Estany de Sant Maurici (Merdaseca, CC BY-SA 3.0)
  experienceNature:    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Llac_de_Sant_Maurici_%28Catalonia%29.jpg/500px-Llac_de_Sant_Maurici_%28Catalonia%29.jpg",
  // Escudella catalana (Tamorlan, CC BY 3.0)
  experienceGastronomy:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Escudella_Catalana_-_Barcelona_%282011%29.JPG/500px-Escudella_Catalana_-_Barcelona_%282011%29.JPG",

  // Parque Nacional Aigüestortes i Estany de Sant Maurici (Merdaseca, CC BY-SA 3.0)
  entornoParque:       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Llac_de_Sant_Maurici_%28Catalonia%29.jpg/500px-Llac_de_Sant_Maurici_%28Catalonia%29.jpg",
  // Iglesia de Sant Climent de Taüll (Jordi Domènech, CC BY-SA 3.0)
  entornoIglesia:      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Sant_Climent_de_Ta%C3%BCll%2C_campanar_i_absis.jpg/500px-Sant_Climent_de_Ta%C3%BCll%2C_campanar_i_absis.jpg",
  // Estación de esquí Boí Taüll (Antoni_mo, dominio público)
  entornoEsqui:        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Ski_resort_Bo%C3%AD-Ta%C3%BCll.jpg/500px-Ski_resort_Bo%C3%AD-Ta%C3%BCll.jpg",
  // Taüll, iglesia de Sant Martí en el propio núcleo del pueblo (Gustau Erill i Pinyot, CC BY-SA 3.0+)
  entornoPueblos:      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Vall_de_Bo%C3%AD._Ta%C3%BCll._Sant_Mart%C3%AD_1.JPG/500px-Vall_de_Bo%C3%AD._Ta%C3%BCll._Sant_Mart%C3%AD_1.JPG",
  // Senderistas junto a un puente del valle, foto real caldesdeboi.com
  entornoRutas:        "https://www.caldesdeboi.com/wp-content/uploads/2021/06/Caldes-50-2.jpg",

  // Interior/lobby real del Hotel Manantial, foto caldesdeboi.com
  restauranteManantial:"https://www.caldesdeboi.com/wp-content/uploads/2021/05/Hotel-Manatial-2018-0016.jpg",
  // Salón/lounge acogedor con chimenea, foto real caldesdeboi.com
  barManantial:        "https://www.caldesdeboi.com/wp-content/uploads/2021/05/Hotel-Caldas-2018-0014-1024x683.jpg",
  // Trinxat de la Cerdanya, plato de la carta del Restaurante Caldas (Kronologiko, CC BY-SA 4.0)
  restauranteCaldas:   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Trinxat_de_La_Cerdanya.jpg/960px-Trinxat_de_La_Cerdanya.jpg",
  // Piscina exterior con tumbonas, foto real caldesdeboi.com
  clubPiscina:         "https://www.caldesdeboi.com/wp-content/uploads/2021/08/DSCF9537-1.jpg",
};

/* -------------------------------------------------------------------------
   1b) VÍDEO DE PORTADA (opcional, desactivado)
   El hero de la home admite también vídeo de fondo en lugar de imagen fija
   (usando IMAGES.heroHome como "poster"/respaldo). De momento se deja
   desactivado ("") porque la portada usa la foto aérea real del Manantial;
   para reactivarlo basta con poner aquí la URL de un .mp4 — por ejemplo,
   el vídeo real que ya tiene caldesdeboi.com:
   "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Naturaleza-02.mp4"
   ------------------------------------------------------------------------- */
const HERO_VIDEO = "";

/* -------------------------------------------------------------------------
   2) MOTORES DE RESERVA
   Hoy no sabemos qué motor usará cada hotel, así que se deja PARAMETRIZADO:
   cada hotel apunta a un "engine" con su propio provider/URL/códigos.
   Cuando se contrate el motor real, solo hay que rellenar estos campos.

   `provider` admite: "generic" | "avirato" | "paraty" | "siteminder" | "witbooking"
   (añade más casos en buildBookingUrl() de js/main.js si hace falta un
   formato de URL distinto para el motor que finalmente contratéis).
   ------------------------------------------------------------------------- */
const BOOKING_ENGINES = {
  manantial: {
    provider: "generic",          // TODO: sustituir por el motor real
    engineName: "Motor de reservas Hotel Manantial (pendiente de asignar)",
    baseUrl: "https://booking-engine-pendiente.example.com/manantial",
    hotelCode: "MANANTIAL",
  },
  caldas: {
    provider: "generic",          // TODO: sustituir por el motor real
    engineName: "Motor de reservas Hotel Caldas (pendiente de asignar)",
    baseUrl: "https://booking-engine-pendiente.example.com/caldas",
    hotelCode: "CALDAS",
  },
};

/* -------------------------------------------------------------------------
   3) HOTELES
   ------------------------------------------------------------------------- */
const HOTELS = {
  manantial: {
    id: "manantial",
    name: "Hotel Manantial",
    tagline: "Bienestar, tranquilidad y elegancia",
    description:
      "Rodeado de bosque y con vistas al valle, el Hotel Manantial es la propuesta más exclusiva de Caldes de Boí: habitaciones elegantes, acceso directo al balneario termal y una cocina de autor que pone en valor el producto de temporada del Pirineo.",
    heroImage: "hotelManantialHero",
    thumbImage: "hotelManantialThumb",
    bookingEngine: "manantial",
    highlights: [
      "Acceso directo al circuito termal",
      "Piscina exterior con vistas a la montaña",
      "Restaurante de autor",
      "Habitaciones y suites con balcón",
    ],
  },
  caldas: {
    id: "caldas",
    name: "Hotel Caldas",
    tagline: "Confort, naturaleza y espíritu familiar",
    description:
      "Con el encanto de un edificio histórico del valle, el Hotel Caldas ofrece una experiencia cercana y familiar, ideal para desconectar en plena naturaleza sin renunciar a las aguas termales ni a la gastronomía tradicional del Pirineo.",
    heroImage: "hotelCaldasHero",
    thumbImage: "hotelCaldasThumb",
    bookingEngine: "caldas",
    highlights: [
      "Ambiente familiar y de montaña",
      "A pocos minutos del balneario",
      "Restaurante de cocina tradicional",
      "Punto de partida ideal para rutas de senderismo",
    ],
  },
};

/* -------------------------------------------------------------------------
   4) SERVICIOS TERMALES (balneario / wellness & spa)
   Añadir o quitar un servicio es simplemente añadir/quitar un objeto de
   este array: la página balneario.html se regenera sola.
   ------------------------------------------------------------------------- */
const SPA_SERVICES = [
  {
    category: "Circuitos termales",
    name: "Circuito termal mineromedicinal",
    duration: "90 min",
    description:
      "Recorrido libre por piscinas termales, cascadas, chorros de contraste y zona de relax con aguas procedentes de los 37 manantiales de Caldes de Boí.",
  },
  {
    category: "Circuitos termales",
    name: "Circuito termal + acceso a sauna y baño de vapor",
    duration: "120 min",
    description: "El circuito termal completo combinado con sauna finlandesa y baño de vapor aromático.",
  },
  {
    category: "Masajes",
    name: "Masaje relajante con aguas termales",
    duration: "50 min",
    description: "Masaje corporal completo con aceites esenciales pensado para liberar tensión muscular.",
  },
  {
    category: "Masajes",
    name: "Masaje deportivo de descarga",
    duration: "50 min",
    description: "Técnica de presión profunda enfocada en piernas y espalda, ideal tras una jornada de senderismo o esquí.",
  },
  {
    category: "Tratamientos faciales",
    name: "Ritual facial mineromedicinal",
    duration: "45 min",
    description: "Limpieza, exfoliación e hidratación facial con activos derivados del agua termal de Caldes.",
  },
  {
    category: "Tratamientos corporales",
    name: "Envoltura de lodo termal",
    duration: "40 min",
    description: "Envoltura corporal con lodo mineromedicinal para nutrir la piel en profundidad.",
  },
  {
    category: "Tratamientos corporales",
    name: "Duchas Vichy",
    duration: "20 min",
    description: "Chorros de agua termal a presión controlada combinados con masaje manual.",
  },
  {
    category: "Programas",
    name: "Programa antiestrés (medio día)",
    duration: "4 h",
    description: "Circuito termal, masaje relajante y ritual facial en un único programa de bienestar.",
  },
];

/* -------------------------------------------------------------------------
   5) RESTAURANTES Y CARTAS
   Cada restaurante tiene su propio "slug" (usado en la URL
   restaurante.html?r=slug) y su carta dividida en secciones.
   ------------------------------------------------------------------------- */
const RESTAURANTS = [
  {
    slug: "restaurante-manantial",
    name: "Restaurante Manantial",
    hotel: "Hotel Manantial",
    style: "Cocina de autor de temporada",
    image: "restauranteManantial",
    description:
      "Cocina de autor que reinterpreta el recetario del Pirineo con producto de proximidad y presentaciones actuales.",
    menu: [
      {
        section: "Entrantes",
        items: [
          { name: "Crema de setas de temporada y trufa", price: "14€" },
          { name: "Trucha del valle de Boí marinada", price: "16€" },
          { name: "Ensalada de escarola, membrillo y queso de Taüll", price: "13€" },
        ],
      },
      {
        section: "Principales",
        items: [
          { name: "Ternera de los Pirineos a baja temperatura", price: "26€" },
          { name: "Bacalao confitado con pil-pil de aguas termales de vegetales", price: "24€" },
          { name: "Risotto de boletus y parmesano", price: "19€" },
        ],
      },
      {
        section: "Postres",
        items: [
          { name: "Crema catalana de la casa", price: "8€" },
          { name: "Tarta de manzana del valle", price: "8€" },
        ],
      },
    ],
  },
  {
    slug: "restaurante-caldas",
    name: "Restaurante Caldas",
    hotel: "Hotel Caldas",
    style: "Cocina tradicional del Pirineo",
    image: "restauranteCaldas",
    description:
      "Sabores de siempre en un ambiente familiar: guisos, carnes a la brasa y recetas tradicionales del Valle de Boí.",
    menu: [
      {
        section: "Entrantes",
        items: [
          { name: "Escudella de la abuela", price: "10€" },
          { name: "Embutidos artesanos de la Vall de Boí", price: "15€" },
        ],
      },
      {
        section: "Principales",
        items: [
          { name: "Costillar de cerdo a la brasa", price: "20€" },
          { name: "Trinxat de la Cerdanya con butifarra", price: "17€" },
          { name: "Parrillada de verduras de temporada", price: "14€" },
        ],
      },
      {
        section: "Postres",
        items: [
          { name: "Mel i mató (requesón con miel)", price: "7€" },
          { name: "Coca de recapte", price: "7€" },
        ],
      },
    ],
  },
  {
    slug: "bar-manantial",
    name: "Bar del Manantial",
    hotel: "Hotel Manantial",
    style: "Picoteo y coctelería junto al lobby",
    image: "barManantial",
    description:
      "El punto de encuentro informal del Hotel Manantial: tapas, vinos de la zona y coctelería en un ambiente cálido junto a la chimenea.",
    menu: [
      {
        section: "Para picar",
        items: [
          { name: "Tabla de quesos de los Pirineos", price: "16€" },
          { name: "Croquetas de jamón ibérico", price: "9€" },
          { name: "Patatas bravas de la casa", price: "7€" },
        ],
      },
      {
        section: "Bebidas",
        items: [
          { name: "Copa de vino DO Costers del Segre", price: "5€" },
          { name: "Cóctel Manantial (signature)", price: "9€" },
          { name: "Infusión de hierbas de montaña", price: "3.5€" },
        ],
      },
    ],
  },
  {
    slug: "club-piscina",
    name: "Restaurante Club Piscina",
    hotel: "Balneario",
    style: "Cocina informal junto a la piscina exterior",
    image: "clubPiscina",
    description:
      "Comida ligera y de temporada para disfrutar al aire libre, junto a la piscina exterior con vistas a la montaña. Abierto en temporada.",
    menu: [
      {
        section: "Para compartir",
        items: [
          { name: "Ensalada de temporada con queso de cabra", price: "12€" },
          { name: "Tabla de embutidos y quesos del valle", price: "17€" },
          { name: "Nachos con guacamole", price: "9€" },
        ],
      },
      {
        section: "Platos ligeros",
        items: [
          { name: "Hamburguesa de ternera del Pirineo", price: "15€" },
          { name: "Wrap de pollo y verduras a la brasa", price: "12€" },
          { name: "Poke bowl de trucha marinada", price: "14€" },
        ],
      },
      {
        section: "Bebidas y helados",
        items: [
          { name: "Cóctel sin alcohol de frutas del bosque", price: "6€" },
          { name: "Sangría de la casa (copa)", price: "5€" },
          { name: "Selección de helados artesanos", price: "5€" },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------
   6) ENTORNO — puntos de interés
   `externalLink` apunta a la web oficial de cada sitio; `linkLabel` es el
   texto del botón que precede a la flecha (p. ej. "Descubrir el Parque").
   Si `externalLink` se deja en "#", la tarjeta muestra un aviso de que
   falta asignar el enlace en vez del botón.
   ------------------------------------------------------------------------- */
const ENTORNO_ITEMS = [
  {
    slug: "parque-nacional",
    name: "Parque Nacional d'Aigüestortes i Estany de Sant Maurici",
    image: "entornoParque",
    shortDescription: "El único Parque Nacional de Cataluña, a un paso del resort.",
    longDescription:
      "Lagos glaciares, bosques y alta montaña en el único Parque Nacional de Cataluña, a pocos minutos de Caldes de Boí.",
    linkLabel: "Descubrir el Parque",
    externalLink: "https://parcsnaturals.gencat.cat/es/xarxa-de-parcs/aiguestortes/inici/index.html",
  },
  {
    slug: "iglesia-taull",
    name: "Sant Climent de Taüll",
    image: "entornoIglesia",
    shortDescription: "Patrimonio Mundial de la UNESCO, joya del arte románico.",
    longDescription:
      "Una de las grandes joyas del románico del Valle de Boí y parte del conjunto declarado Patrimonio Mundial por la UNESCO.",
    linkLabel: "Visitar Sant Climent",
    externalLink: "https://www.centreromanic.com/es/visita/",
  },
  {
    slug: "boi-taull-resort",
    name: "Estación de montaña Boí Taüll",
    image: "entornoEsqui",
    shortDescription: "Esquí y montaña en uno de los dominios más altos del Pirineo.",
    longDescription:
      "Esquí y montaña en uno de los dominios más altos del Pirineo, rodeado por el paisaje de la Vall de Boí.",
    linkLabel: "Descubrir Boí Taüll",
    externalLink: "https://pirineu365.cat/es/boitaull/inicio/",
  },
  {
    slug: "pueblos-con-encanto",
    name: "Pueblos con encanto de la Vall de Boí",
    image: "entornoPueblos",
    shortDescription: "Arquitectura de montaña y tradición viva en cada rincón del valle.",
    longDescription:
      "Boí, Taüll, Barruera y otros pequeños pueblos conservan la arquitectura, las tradiciones y el ritmo de vida del Pirineo.",
    linkLabel: "Descubrir los pueblos",
    externalLink: "https://www.vallboi.cat/es/pueblos-con-encanto",
  },
  {
    slug: "rutas-senderos",
    name: "Rutas y senderos",
    image: "entornoRutas",
    shortDescription: "Del paseo familiar a la travesía de alta montaña.",
    longDescription:
      "Caminos para todos los niveles, desde tranquilos paseos por el valle hasta rutas de alta montaña y recorridos por Aigüestortes.",
    linkLabel: "Ver rutas",
    externalLink: "https://www.vallboi.cat/es/senderismo",
  },
];
