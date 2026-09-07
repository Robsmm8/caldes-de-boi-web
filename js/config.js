/* =========================================================================
   CONFIG.JS — punto único de configuración del sitio
   =========================================================================
   Este es el ÚNICO archivo que el equipo de marketing/contenido debería
   necesitar tocar en el día a día:
     1. IMAGES          -> todas las fotografías del sitio (una clave = una foto)
     2. BOOKING_ENGINES  -> conexión con los dos motores de reserva (Manantial/Caldas)
     3. HOTELS           -> datos de cada hotel
     4. SPA_CATEGORIES   -> carta de servicios termales (acordeón por categorías)
     5. HEALTH_PROGRAMS  -> programas de salud y bienestar (con PDF descargable)
     6. RESTAURANTS      -> restaurantes del complejo y sus cartas
     7. ENTORNO_ITEMS    -> puntos de interés del entorno

   IDIOMAS: todos los textos visibles para el usuario (nombres,
   descripciones, cartas...) son objetos {ca, es, en, fr}. La función
   tr(campo) de js/i18n.js devuelve el texto en el idioma activo. Para
   añadir contenido nuevo, rellena SIEMPRE los 4 idiomas.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1) IMÁGENES
   Fuentes: assets/img (fotos propias del hotel), caldesdeboi.com (fotos
   reales ya publicadas en vuestra web), upload.wikimedia.org (entorno,
   licencia libre con crédito obligatorio — ver CREDITS.md).
   ------------------------------------------------------------------------- */
const IMAGES = {
  heroHome:            "assets/img/hero-manantial-aerea.jpg",
  hotelManantialThumb: "assets/img/hero-manantial-aerea.jpg",
  hotelManantialHero:  "assets/img/hero-manantial-aerea.jpg",
  hotelCaldasThumb:    "assets/img/hotel-caldas-patio.jpg",
  hotelCaldasHero:     "assets/img/hotel-caldas-patio.jpg",
  spaBanner:           "https://www.caldesdeboi.com/wp-content/uploads/2021/06/Balneario-Caldes-2018-0143-1.jpg",
  spaInterior:         "https://www.caldesdeboi.com/wp-content/uploads/2021/08/BOI07311-scaled.jpg",
  roomSuite:           "https://www.caldesdeboi.com/wp-content/uploads/2021/05/Hotel-Manatial-2018-0049.jpg",
  experienceWellness:  "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Balneario-Caldes-2018-0075-copia-scaled.jpg",
  experienceNature:    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Llac_de_Sant_Maurici_%28Catalonia%29.jpg/500px-Llac_de_Sant_Maurici_%28Catalonia%29.jpg",
  experienceGastronomy:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Escudella_Catalana_-_Barcelona_%282011%29.JPG/500px-Escudella_Catalana_-_Barcelona_%282011%29.JPG",
  entornoParque:       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Llac_de_Sant_Maurici_%28Catalonia%29.jpg/500px-Llac_de_Sant_Maurici_%28Catalonia%29.jpg",
  entornoIglesia:      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Sant_Climent_de_Ta%C3%BCll%2C_campanar_i_absis.jpg/500px-Sant_Climent_de_Ta%C3%BCll%2C_campanar_i_absis.jpg",
  entornoEsqui:        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Ski_resort_Bo%C3%AD-Ta%C3%BCll.jpg/500px-Ski_resort_Bo%C3%AD-Ta%C3%BCll.jpg",
  entornoPueblos:      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Vall_de_Bo%C3%AD._Ta%C3%BCll._Sant_Mart%C3%AD_1.JPG/500px-Vall_de_Bo%C3%AD._Ta%C3%BCll._Sant_Mart%C3%AD_1.JPG",
  entornoRutas:        "https://www.caldesdeboi.com/wp-content/uploads/2021/06/Caldes-50-2.jpg",
  restauranteManantial:"https://www.caldesdeboi.com/wp-content/uploads/2021/05/Hotel-Manatial-2018-0016.jpg",
  barManantial:        "https://www.caldesdeboi.com/wp-content/uploads/2021/05/Hotel-Caldas-2018-0014-1024x683.jpg",
  restauranteCaldas:   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Trinxat_de_La_Cerdanya.jpg/960px-Trinxat_de_La_Cerdanya.jpg",
  clubPiscina:         "https://www.caldesdeboi.com/wp-content/uploads/2021/08/DSCF9537-1.jpg",

  // Modalidades de habitación — fotos reales caldesdeboi.com
  roomManantialEstandar:      "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Estandar.jpg",
  roomManantialSuperior:      "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Doble-Superior.jpg",
  roomManantialFamiliar:      "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Familiar-Sup-1.jpg",
  roomManantialJuniorSuite:   "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Junior-Suite.jpg",
  roomManantialSuite:         "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Suite.jpg",
  roomManantialSuiteAdaptada: "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Suite-2.jpg",
  roomCaldasEstandar:         "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Hotel-Caldas-2018-0027.jpg",
  roomCaldasSuperior:         "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Hotel-Caldas-2018-0032-scaled.jpg",
  roomCaldasIndividual:       "https://www.caldesdeboi.com/wp-content/uploads/2021/09/Hotel-Caldas-2018-0020.jpg",
};

/* Vídeo de portada (opcional, desactivado). Ver README para reactivarlo. */
const HERO_VIDEO = "";

/* -------------------------------------------------------------------------
   2) MOTORES DE RESERVA (parametrizado, ver js/main.js -> buildBookingUrl)
   ------------------------------------------------------------------------- */
const BOOKING_ENGINES = {
  manantial: {
    provider: "generic",
    engineName: "Motor de reservas Hotel Manantial (pendiente de asignar)",
    baseUrl: "https://booking-engine-pendiente.example.com/manantial",
    hotelCode: "MANANTIAL",
  },
  caldas: {
    provider: "generic",
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
    name: { ca: "Hotel Manantial", es: "Hotel Manantial", en: "Hotel Manantial", fr: "Hotel Manantial" },
    tagline: {
      ca: "Benestar, tranquil·litat i elegància",
      es: "Bienestar, tranquilidad y elegancia",
      en: "Wellness, tranquility and elegance",
      fr: "Bien-être, tranquillité et élégance",
    },
    description: {
      ca: "Envoltat de bosc i amb vistes a la vall, l'Hotel Manantial és la proposta més exclusiva de Caldes de Boí: habitacions elegants, accés directe al balneari termal i una cuina d'autor que posa en valor el producte de temporada del Pirineu.",
      es: "Rodeado de bosque y con vistas al valle, el Hotel Manantial es la propuesta más exclusiva de Caldes de Boí: habitaciones elegantes, acceso directo al balneario termal y una cocina de autor que pone en valor el producto de temporada del Pirineo.",
      en: "Surrounded by forest and overlooking the valley, Hotel Manantial is the most exclusive option at Caldes de Boí: elegant rooms, direct access to the thermal spa and signature cuisine celebrating seasonal Pyrenean produce.",
      fr: "Entouré de forêt et avec vue sur la vallée, l'Hotel Manantial est la proposition la plus exclusive de Caldes de Boí : chambres élégantes, accès direct aux thermes et une cuisine d'auteur qui met en valeur les produits de saison des Pyrénées.",
    },
    heroImage: "hotelManantialHero",
    thumbImage: "hotelManantialThumb",
    bookingEngine: "manantial",
    highlights: {
      ca: ["Accés directe al circuit termal", "Piscina exterior amb vistes a la muntanya", "Restaurant d'autor", "Habitacions i suites amb balcó"],
      es: ["Acceso directo al circuito termal", "Piscina exterior con vistas a la montaña", "Restaurante de autor", "Habitaciones y suites con balcón"],
      en: ["Direct access to the thermal circuit", "Outdoor pool with mountain views", "Signature restaurant", "Rooms and suites with balcony"],
      fr: ["Accès direct au circuit thermal", "Piscine extérieure avec vue sur la montagne", "Restaurant gastronomique", "Chambres et suites avec balcon"],
    },
  },
  caldas: {
    id: "caldas",
    name: { ca: "Hotel Caldas", es: "Hotel Caldas", en: "Hotel Caldas", fr: "Hotel Caldas" },
    tagline: {
      ca: "Confort, natura i esperit familiar",
      es: "Confort, naturaleza y espíritu familiar",
      en: "Comfort, nature and a family spirit",
      fr: "Confort, nature et esprit familial",
    },
    description: {
      ca: "Amb l'encant d'un edifici històric de la vall, l'Hotel Caldas ofereix una experiència propera i familiar, ideal per desconnectar en plena natura sense renunciar a les aigües termals ni a la gastronomia tradicional del Pirineu.",
      es: "Con el encanto de un edificio histórico del valle, el Hotel Caldas ofrece una experiencia cercana y familiar, ideal para desconectar en plena naturaleza sin renunciar a las aguas termales ni a la gastronomía tradicional del Pirineo.",
      en: "With the charm of a historic building in the valley, Hotel Caldas offers a warm, family-friendly experience — ideal for disconnecting surrounded by nature, without giving up thermal waters or traditional Pyrenean cuisine.",
      fr: "Avec le charme d'un bâtiment historique de la vallée, l'Hotel Caldas offre une expérience chaleureuse et familiale, idéale pour se déconnecter en pleine nature sans renoncer aux eaux thermales ni à la gastronomie traditionnelle des Pyrénées.",
    },
    heroImage: "hotelCaldasHero",
    thumbImage: "hotelCaldasThumb",
    bookingEngine: "caldas",
    highlights: {
      ca: ["Ambient familiar i de muntanya", "A pocs minuts del balneari", "Restaurant de cuina tradicional", "Punt de partida ideal per a rutes de senderisme"],
      es: ["Ambiente familiar y de montaña", "A pocos minutos del balneario", "Restaurante de cocina tradicional", "Punto de partida ideal para rutas de senderismo"],
      en: ["Family, mountain atmosphere", "A few minutes from the spa", "Traditional-cuisine restaurant", "Ideal starting point for hiking trails"],
      fr: ["Ambiance familiale et montagnarde", "À quelques minutes des thermes", "Restaurant de cuisine traditionnelle", "Point de départ idéal pour les randonnées"],
    },
  },
};

/* -------------------------------------------------------------------------
   3b) MODALIDADES DE HABITACIÓN
   Categorías y fotos reales de caldesdeboi.com/es/hotel-manatial/ y
   /es/hotel-caldas/. Los textos NO son una copia literal de la web: se han
   reformulado para resultar más atractivos comercialmente, mantenimiento
   los datos reales (nº de habitaciones, vistas, comodidades).
   ------------------------------------------------------------------------- */
const ROOM_TYPES = {
  manantial: [
    {
      image: "roomManantialEstandar",
      name: { ca: "Doble Estàndard", es: "Doble Estándar", en: "Standard Double", fr: "Double Standard" },
      description: {
        ca: "El teu punt de partida ideal a Caldes de Boí: habitacions acollidores al cor de l'hotel, amb accés directe al centre termal sense sortir a l'exterior. Tria l'opció amb vistes a la vall i desperta't cada matí davant del verd infinit del Pirineu.",
        es: "Tu punto de partida ideal en Caldes de Boí: habitaciones acogedoras en el corazón del hotel, con acceso directo al centro termal sin salir al exterior. Elige la opción con vistas al valle y despierta cada mañana frente al verde infinito del Pirineo.",
        en: "Your ideal home base at Caldes de Boí: cosy rooms right at the heart of the hotel, with direct indoor access to the thermal spa. Choose the valley-view option and wake up every morning to endless Pyrenean green.",
        fr: "Votre point de départ idéal à Caldes de Boí : des chambres chaleureuses au cœur de l'hôtel, avec accès direct aux thermes sans sortir. Optez pour la vue sur la vallée et réveillez-vous chaque matin face au vert infini des Pyrénées.",
      },
    },
    {
      image: "roomManantialSuperior",
      name: { ca: "Doble Superior", es: "Doble Superior", en: "Superior Double", fr: "Double Supérieure" },
      description: {
        ca: "Un pas més de confort: el mateix benestar de sempre, amb espais més amplis i les millors vistes a la vall de Boí des de la teva pròpia finestra.",
        es: "Un escalón más de confort: el mismo bienestar de siempre, con espacios más amplios y las mejores vistas al valle de Boí desde tu propia ventana.",
        en: "A step up in comfort: the same wellbeing you love, with more space and the finest views over the Vall de Boí right from your window.",
        fr: "Un cran de confort supplémentaire : le même bien-être, avec plus d'espace et les plus belles vues sur la Vall de Boí depuis votre fenêtre.",
      },
    },
    {
      image: "roomManantialFamiliar",
      name: { ca: "Familiar Superior (4 persones)", es: "Familiar Superior (4 personas)", en: "Superior Family Room (4 guests)", fr: "Familiale Supérieure (4 personnes)" },
      description: {
        ca: "Pensada per compartir: amplitud i comoditat perquè tota la família desconnecti junta, sense renunciar a res.",
        es: "Pensada para compartir: amplitud y comodidad para que toda la familia desconecte junta, sin renunciar a nada.",
        en: "Designed for togetherness: room to breathe and every comfort, so the whole family can disconnect side by side.",
        fr: "Pensée pour se retrouver : espace et confort pour que toute la famille se ressource ensemble, sans rien sacrifier.",
      },
    },
    {
      image: "roomManantialJuniorSuite",
      name: { ca: "Junior Suite", es: "Junior Suite", en: "Junior Suite", fr: "Junior Suite" },
      description: {
        ca: "Una zona d'estar pròpia per allargar la sobretaula o simplement gaudir de més espai i llum, amb vistes privilegiades al Pirineu.",
        es: "Una zona de estar propia para alargar la sobremesa o simplemente disfrutar de más espacio y luz, con vistas privilegiadas al Pirineo.",
        en: "Your own sitting area to linger over coffee, or simply enjoy extra space and light, with privileged views of the Pyrenees.",
        fr: "Un coin salon à vous pour prolonger la conversation, ou simplement profiter de plus d'espace et de lumière, avec une vue privilégiée sur les Pyrénées.",
      },
    },
    {
      image: "roomManantialSuite",
      name: { ca: "Suite", es: "Suite", en: "Suite", fr: "Suite" },
      description: {
        ca: "L'opció més exclusiva de l'hotel: amplitud, elegància i tots els detalls pensats per a una estada inoblidable en plena natura.",
        es: "La opción más exclusiva del hotel: amplitud, elegancia y todos los detalles pensados para una estancia inolvidable en plena naturaleza.",
        en: "The hotel's most exclusive option: space, elegance and every detail designed for an unforgettable stay surrounded by nature.",
        fr: "L'option la plus exclusive de l'hôtel : espace, élégance et une attention portée à chaque détail pour un séjour inoubliable en pleine nature.",
      },
    },
    {
      image: "roomManantialSuiteAdaptada",
      name: { ca: "Suite Adaptada", es: "Suite Adaptada", en: "Accessible Suite", fr: "Suite Adaptée" },
      description: {
        ca: "El mateix luxe i confort de les nostres suites, amb totes les adaptacions necessàries per a la màxima accessibilitat i tranquil·litat.",
        es: "El mismo lujo y confort de nuestras suites, con todas las adaptaciones necesarias para la máxima accesibilidad y tranquilidad.",
        en: "The same luxury and comfort as our suites, fully adapted for maximum accessibility and peace of mind.",
        fr: "Le même luxe et le même confort que nos suites, entièrement adaptée pour une accessibilité et une tranquillité maximales.",
      },
    },
  ],
  caldas: [
    {
      image: "roomCaldasEstandar",
      name: { ca: "Doble Estàndard", es: "Doble Estándar", en: "Standard Double", fr: "Double Standard" },
      description: {
        ca: "Habitacions amb ànima: parets de pedra, terres de fusta i tot l'encant d'un edifici amb més de tres segles d'història. Amb vistes al riu Noguera de Tor o al pati on batega el cor de l'hotel.",
        es: "Habitaciones con alma: paredes de piedra, suelos de madera y todo el encanto de un edificio con más de tres siglos de historia. Con vistas al río Noguera de Tor o al patio donde late el corazón del hotel.",
        en: "Rooms with soul: stone walls, wooden floors and the charm of a building with over three centuries of history. With views over the Noguera de Tor river or the courtyard at the hotel's heart.",
        fr: "Des chambres pleines d'âme : murs en pierre, sols en bois et tout le charme d'un bâtiment de plus de trois siècles. Avec vue sur la rivière Noguera de Tor ou sur la cour, cœur battant de l'hôtel.",
      },
    },
    {
      image: "roomCaldasSuperior",
      name: { ca: "Doble Superior", es: "Doble Superior", en: "Superior Double", fr: "Double Supérieure" },
      description: {
        ca: "Un plus d'espai i confort sense perdre ni un bri del caràcter rústic que fa únic l'Hotel Caldas.",
        es: "Un plus de espacio y confort sin perder ni un ápice del carácter rústico que hace único al Hotel Caldas.",
        en: "Extra space and comfort without losing a hint of the rustic character that makes Hotel Caldas unique.",
        fr: "Un supplément d'espace et de confort sans rien perdre du caractère rustique qui fait le charme de l'Hotel Caldas.",
      },
    },
    {
      image: "roomCaldasIndividual",
      name: { ca: "Individual", es: "Individual", en: "Single Room", fr: "Chambre Individuelle" },
      description: {
        ca: "Perfecta per viatjar en solitari sense renunciar a l'encant de la muntanya: acollidora, tranquil·la i amb tot el necessari per descansar.",
        es: "Perfecta para viajar en solitario sin renunciar al encanto de la montaña: acogedora, tranquila y con todo lo necesario para descansar.",
        en: "Perfect for solo travellers who won't compromise on mountain charm: cosy, quiet and with everything you need to rest.",
        fr: "Parfaite pour voyager seul sans renoncer au charme de la montagne : chaleureuse, calme et tout le confort pour se reposer.",
      },
    },
  ],
};

/* -------------------------------------------------------------------------
   4) SERVICIOS TERMALES — carta completa (balneario.html, formato acordeón)
   Estructura real y nombres de categoría tomados de
   caldesdeboi.com/es/carta-de-servicios-termales/. Los precios de
   "Servicios de agua termal" son reales; el resto de categorías llevan
   servicios representativos pendientes de confirmar con el balneario
   (marcados con priceApprox: true) — sustituir por la lista de precios
   real en cuanto esté disponible.
   ------------------------------------------------------------------------- */
const SPA_CATEGORIES = [
  {
    slug: "agua-termal",
    name: { ca: "Serveis d'aigua termal", es: "Servicios de agua termal", en: "Thermal water services", fr: "Services d'eau thermale" },
    items: [
      { name: { ca: "Inhalació", es: "Inhalación", en: "Inhalation", fr: "Inhalation" }, duration: "10 min", price: "8,50 €" },
      { name: { ca: "Aerosol", es: "Aerosol", en: "Aerosol", fr: "Aérosol" }, duration: "10 min", price: "8,50 €" },
      { name: { ca: "Hammam", es: "Hammam", en: "Hammam", fr: "Hammam" }, duration: "10 min", price: "23,00 €" },
      { name: { ca: "Estufa natural individual", es: "Estufa natural individual", en: "Individual natural steam bath", fr: "Étuve naturelle individuelle" }, duration: "10 min", price: "26,00 €" },
      { name: { ca: "Estufa natural compartida", es: "Estufa natural compartida", en: "Shared natural steam bath", fr: "Étuve naturelle partagée" }, duration: "10 min", price: "31,50 €" },
      { name: { ca: "Bany tartera amb hidromassatge i cromoteràpia", es: "Baño tartera con hidromasaje y cromoterapia", en: "Thermal tub bath with hydromassage and chromotherapy", fr: "Bain avec hydromassage et chromothérapie" }, duration: "20 min", price: "31,50 €" },
      { name: { ca: "Dutxa circular", es: "Ducha circular", en: "Circular shower", fr: "Douche circulaire" }, duration: "10 min", price: "21,00 €" },
      { name: { ca: "Gran dutxa universal", es: "Gran ducha universal", en: "Large universal shower", fr: "Grande douche universelle" }, duration: "10 min", price: "27,00 €" },
      { name: { ca: "Dutxa especial lumbar i renal", es: "Ducha especial lumbar y renal", en: "Special lumbar and renal shower", fr: "Douche spéciale lombaire et rénale" }, duration: "10 min", price: "21,00 €" },
    ],
  },
  {
    slug: "fangoterapia",
    name: { ca: "Fangoteràpia", es: "Fangoterapia", en: "Mud therapy", fr: "Fangothérapie" },
    items: [
      { name: { ca: "Fangoteràpia mitjana i dutxa", es: "Fangoterapia media y ducha", en: "Half-body mud wrap and shower", fr: "Enveloppement de boue partiel et douche" }, duration: "20 min", price: "24,00 €", priceApprox: true },
      { name: { ca: "Fangoteràpia total i dutxa", es: "Fangoterapia total y ducha", en: "Full-body mud wrap and shower", fr: "Enveloppement de boue intégral et douche" }, duration: "20 min", price: "32,00 €", priceApprox: true },
    ],
  },
  {
    slug: "circuitos-termales",
    name: { ca: "Circuits d'aigües termals", es: "Circuitos de aguas termales", en: "Thermal water circuits", fr: "Circuits d'eaux thermales" },
    items: [
      { name: { ca: "Circuit termal mineromedicinal", es: "Circuito termal mineromedicinal", en: "Mineral-medicinal thermal circuit", fr: "Circuit thermal minéro-médicinal" }, duration: "90 min", price: "38,00 €", priceApprox: true },
      { name: { ca: "Circuit termal + sauna i bany de vapor", es: "Circuito termal + sauna y baño de vapor", en: "Thermal circuit + sauna and steam bath", fr: "Circuit thermal + sauna et bain de vapeur" }, duration: "120 min", price: "48,00 €", priceApprox: true },
    ],
  },
  {
    slug: "packs-familiares",
    name: { ca: "Packs familiars", es: "Packs familiares", en: "Family packages", fr: "Forfaits familiaux" },
    items: [
      { name: { ca: "Pack familiar circuit termal (2 adults + 2 nens)", es: "Pack familiar circuito termal (2 adultos + 2 niños)", en: "Family thermal circuit package (2 adults + 2 children)", fr: "Forfait familial circuit thermal (2 adultes + 2 enfants)" }, duration: "90 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "servicios-infantiles",
    name: { ca: "Serveis infantils", es: "Servicios infantiles", en: "Children's services", fr: "Services pour enfants" },
    items: [
      { name: { ca: "Circuit termal infantil supervisat", es: "Circuito termal infantil supervisado", en: "Supervised children's thermal circuit", fr: "Circuit thermal enfants supervisé" }, duration: "45 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "visitas-medicas",
    name: { ca: "Visites mèdiques", es: "Visitas médicas", en: "Medical consultations", fr: "Consultations médicales" },
    items: [
      { name: { ca: "Visita mèdica hidrològica inicial", es: "Visita médica hidrológica inicial", en: "Initial hydrological medical consultation", fr: "Consultation médicale hydrologique initiale" }, duration: "30 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "masajes",
    name: { ca: "Massatges", es: "Masajes", en: "Massages", fr: "Massages" },
    items: [
      { name: { ca: "Massatge relaxant", es: "Masaje relajante", en: "Relaxing massage", fr: "Massage relaxant" }, duration: "50 min", price: "45,00 €", priceApprox: true },
      { name: { ca: "Massatge esportiu de descàrrega", es: "Masaje deportivo de descarga", en: "Sports recovery massage", fr: "Massage sportif décontractant" }, duration: "50 min", price: "45,00 €", priceApprox: true },
    ],
  },
  {
    slug: "masajes-con-agua",
    name: { ca: "Massatges amb aigua", es: "Masajes con agua", en: "Water massages", fr: "Massages dans l'eau" },
    items: [
      { name: { ca: "Massatge subaquàtic", es: "Masaje subacuático", en: "Underwater massage", fr: "Massage sous-marin" }, duration: "20 min", price: "31,50 €", priceApprox: true },
      { name: { ca: "Massatge Vichy", es: "Masaje Vichy", en: "Vichy shower massage", fr: "Massage Vichy" }, duration: "20 min", price: "31,50 €", priceApprox: true },
    ],
  },
  {
    slug: "dermatologia",
    name: { ca: "Àrea de dermatologia", es: "Área de dermatología", en: "Dermatology area", fr: "Espace dermatologie" },
    items: [
      { name: { ca: "Bany d'aigua sulfurosa amb seguiment dermatològic", es: "Baño de agua sulfurosa con seguimiento dermatológico", en: "Sulphurous water bath with dermatological follow-up", fr: "Bain d'eau sulfureuse avec suivi dermatologique" }, duration: "20 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "fisioterapia",
    name: { ca: "Àrea de fisioteràpia", es: "Área de fisioterapia", en: "Physiotherapy area", fr: "Espace physiothérapie" },
    items: [
      { name: { ca: "Sessió de fisioteràpia individual", es: "Sesión de fisioterapia individual", en: "Individual physiotherapy session", fr: "Séance de physiothérapie individuelle" }, duration: "30 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "osteopatia",
    name: { ca: "Àrea d'osteopatia", es: "Área de osteopatía", en: "Osteopathy area", fr: "Espace ostéopathie" },
    items: [
      { name: { ca: "Sessió d'osteopatia", es: "Sesión de osteopatía", en: "Osteopathy session", fr: "Séance d'ostéopathie" }, duration: "45 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "ayurveda",
    name: { ca: "Tractaments ayurvèdics", es: "Tratamientos ayurvédicos", en: "Ayurvedic treatments", fr: "Soins ayurvédiques" },
    items: [
      { name: { ca: "Massatge ayurvèdic Abhyanga", es: "Masaje ayurvédico Abhyanga", en: "Abhyanga ayurvedic massage", fr: "Massage ayurvédique Abhyanga" }, duration: "60 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "estetica",
    name: { ca: "Estètica", es: "Estética", en: "Beauty", fr: "Esthétique" },
    items: [
      { name: { ca: "Neteja facial", es: "Limpieza facial", en: "Facial cleansing", fr: "Nettoyage du visage" }, duration: "45 min", price: "40,00 €", priceApprox: true },
      { name: { ca: "Manicura i pedicura", es: "Manicura y pedicura", en: "Manicure and pedicure", fr: "Manucure et pédicure" }, duration: "45 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "bioenergeticos-bosch",
    name: { ca: "Tractaments Bioenergètics Dr. Bosch", es: "Tratamientos Bioenergéticos Dr. Bosch", en: "Dr. Bosch Bioenergetic Treatments", fr: "Soins bioénergétiques Dr. Bosch" },
    items: [
      { name: { ca: "Sessió bioenergètica Dr. Bosch", es: "Sesión bioenergética Dr. Bosch", en: "Dr. Bosch bioenergetic session", fr: "Séance bioénergétique Dr. Bosch" }, duration: "45 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "bioestetics",
    name: { ca: "Tractaments Bioestètics", es: "Tratamientos Bioestéticos", en: "Bioaesthetic Treatments", fr: "Soins bioesthétiques" },
    items: [
      { name: { ca: "Tractament bioestètic facial", es: "Tratamiento bioestético facial", en: "Bioaesthetic facial treatment", fr: "Soin bioesthétique du visage" }, duration: "45 min", price: "Consultar", priceApprox: true },
    ],
  },
  {
    slug: "experiencias-termales",
    name: { ca: "Experiències termals", es: "Experiencias termales", en: "Thermal experiences", fr: "Expériences thermales" },
    items: [
      { name: { ca: "Ritual termal de benvinguda", es: "Ritual termal de bienvenida", en: "Welcome thermal ritual", fr: "Rituel thermal de bienvenue" }, duration: "90 min", price: "Consultar", priceApprox: true },
    ],
  },
];

/* -------------------------------------------------------------------------
   5) PROGRAMAS DE SALUD Y BIENESTAR
   Contenido y PDFs reales, tomados de
   caldesdeboi.com/es/programas-de-salud-y-bienestar/ (son documentos
   propios del hotel, ya publicados en su web — no llevan crédito externo).
   `category` es orientativo (Salud/Bienestar/Belleza), pendiente de
   confirmar la clasificación exacta con el equipo médico del balneario.
   ------------------------------------------------------------------------- */
const HEALTH_PROGRAMS = [
  {
    slug: "antiestres",
    category: "bienestar",
    name: { ca: "Programa Antiestrès Wellness", es: "Programa Antiestrés Wellness", en: "Anti-Stress Wellness Programme", fr: "Programme Anti-Stress Wellness" },
    description: {
      ca: "Programa de recuperació i relaxació del sistema nerviós amb saunes naturals, mindfulness i massatges amb aigua mineromedicinal.",
      es: "Programa de recuperación y relajación del sistema nervioso con saunas naturales, mindfulness y masajes con agua mineromedicinal.",
      en: "A recovery and relaxation programme for the nervous system with natural saunas, mindfulness and mineral-medicinal water massages.",
      fr: "Programme de récupération et de relaxation du système nerveux avec saunas naturels, pleine conscience et massages à l'eau minéro-médicinale.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/05/programa-antiestres-caldes-de-boi.pdf",
  },
  {
    slug: "adelgazamiento",
    category: "bienestar",
    name: { ca: "Programa Aprimament", es: "Programa Adelgazamiento", en: "Weight-Loss Programme", fr: "Programme Amincissant" },
    description: {
      ca: "Programa desintoxicant i d'aprimament amb tractament de fangoteràpia pròpia i saunes naturals que activen el metabolisme.",
      es: "Programa desintoxicante y de adelgazamiento con tratamiento de fangoterapia propia y saunas naturales que activan el metabolismo.",
      en: "A detox and weight-loss programme with our own mud therapy treatment and natural saunas that activate metabolism.",
      fr: "Programme détoxifiant et amincissant avec fangothérapie maison et saunas naturels qui activent le métabolisme.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/05/programa-adelgazante-caldes-de-boi.pdf",
  },
  {
    slug: "antitabaco",
    category: "salud",
    name: { ca: "Programa Antitabac", es: "Programa Antitabaco", en: "Stop-Smoking Programme", fr: "Programme Anti-Tabac" },
    description: {
      ca: "Especialment dissenyat pel nostre equip mèdic per acompanyar la persona que decideix deixar de fumar, perquè ho pugui aconseguir amb èxit.",
      es: "Especialmente diseñado por nuestro equipo médico para apoyar a la persona que decide dejar de fumar, con el fin de que pueda dejarlo de manera exitosa.",
      en: "Specially designed by our medical team to support people who decide to quit smoking, helping them succeed.",
      fr: "Spécialement conçu par notre équipe médicale pour accompagner les personnes qui décident d'arrêter de fumer, afin qu'elles y parviennent avec succès.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/05/programa-antitabaco-caldes-de-boi.pdf",
  },
  {
    slug: "dermatologico",
    category: "salud",
    name: { ca: "Programa Dermatològic", es: "Programa Dermatológico", en: "Dermatological Programme", fr: "Programme Dermatologique" },
    description: {
      ca: "Programa per al tractament dermatològic i de regeneració de la pell amb aplicació de banys d'aigua sulfurosa.",
      es: "Programa para el tratamiento dermatológico y de regeneración de la piel con aplicación de baños de agua sulfurosa.",
      en: "A programme for dermatological treatment and skin regeneration using sulphurous water baths.",
      fr: "Programme de traitement dermatologique et de régénération de la peau avec des bains d'eau sulfureuse.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/05/programa-dermatologico-caldes-de-boi.pdf",
  },
  {
    slug: "intensivo-psoriasis",
    category: "salud",
    name: { ca: "Programa Intensiu Psoriasi", es: "Programa Intensivo Psoriasis", en: "Intensive Psoriasis Programme", fr: "Programme Intensif Psoriasis" },
    description: {
      ca: "Un programa de tractament integral per abordar no només les lesions psoriàtiques a la pell, sinó també l'aspecte psicològic.",
      es: "Un programa de tratamiento integral para abordar no sólo las lesiones psoriáticas en la piel, si no abordar conjuntamente el aspecto psicológico.",
      en: "A comprehensive treatment programme addressing not only psoriatic skin lesions but also the psychological aspect.",
      fr: "Un programme de traitement complet qui aborde non seulement les lésions psoriasiques sur la peau, mais aussi l'aspect psychologique.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/05/caldes-tratamiento-psoriasis-2022.pdf",
  },
  {
    slug: "respiratorio",
    category: "salud",
    name: { ca: "Programa Respiratori", es: "Programa Respiratorio", en: "Respiratory Programme", fr: "Programme Respiratoire" },
    description: {
      ca: "Programa de rehabilitació respiratòria a base d'aigua termal sulfurada amb estufes naturals i inhalacions.",
      es: "Programa de rehabilitación respiratoria a base de agua termal sulfurada con estufas naturales e inhalaciones.",
      en: "A respiratory rehabilitation programme based on sulphurated thermal water, with natural steam baths and inhalations.",
      fr: "Programme de rééducation respiratoire à base d'eau thermale sulfurée, avec étuves naturelles et inhalations.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/05/programa-respiratorio-caldes-de-boi.pdf",
  },
  {
    slug: "reumatologico",
    category: "salud",
    name: { ca: "Programa Reumatològic", es: "Programa Reumatológico", en: "Rheumatology Programme", fr: "Programme Rhumatologique" },
    description: {
      ca: "Programa antiinflamatori amb aplicació de fangoteràpia pròpia de Caldes de Boí i sessions de rehabilitació aquàtica.",
      es: "Programa antiinflamatorio con aplicación de fangoterapia propia Caldes de Boí y sesiones de rehabilitación acuática.",
      en: "An anti-inflammatory programme using Caldes de Boí's own mud therapy and aquatic rehabilitation sessions.",
      fr: "Programme anti-inflammatoire avec fangothérapie maison de Caldes de Boí et séances de rééducation aquatique.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/05/programa-reumatologico-caldes-de-boi.pdf",
  },
  {
    slug: "wellness-integral",
    category: "bienestar",
    name: { ca: "Programa Wellness Integral", es: "Programa Wellness Integral", en: "Integral Wellness Programme", fr: "Programme Wellness Intégral" },
    description: {
      ca: "Programa integral de benestar que combina circuit termal, massatges i tractaments facials per a una desconnexió completa.",
      es: "Programa integral de bienestar que combina circuito termal, masajes y tratamientos faciales para una desconexión completa.",
      en: "A comprehensive wellness programme combining thermal circuit, massages and facial treatments for total disconnection.",
      fr: "Programme de bien-être intégral combinant circuit thermal, massages et soins du visage pour une déconnexion totale.",
    },
    pdf: "https://www.caldesdeboi.com/wp-content/uploads/2021/09/tratamiento-wellnes-antiestres-2025.pdf",
  },
];

/* -------------------------------------------------------------------------
   6) RESTAURANTES Y CARTAS
   Orden = orden de aparición en restauracion.html. Cada uno tiene su
   propio "slug" (usado en la URL restaurante.html?r=slug).
   ------------------------------------------------------------------------- */
const RESTAURANTS = [
  {
    slug: "restaurante-manantial",
    name: { ca: "Restaurant Manantial", es: "Restaurante Manantial", en: "Restaurant Manantial", fr: "Restaurant Manantial" },
    hotel: { ca: "Hotel Manantial", es: "Hotel Manantial", en: "Hotel Manantial", fr: "Hotel Manantial" },
    style: { ca: "Cuina d'autor de temporada", es: "Cocina de autor de temporada", en: "Seasonal signature cuisine", fr: "Cuisine d'auteur de saison" },
    image: "restauranteManantial",
    description: {
      ca: "Cuina d'autor que reinterpreta el receptari del Pirineu amb producte de proximitat i presentacions actuals.",
      es: "Cocina de autor que reinterpreta el recetario del Pirineo con producto de proximidad y presentaciones actuales.",
      en: "Signature cuisine reinterpreting Pyrenean recipes with local produce and contemporary presentation.",
      fr: "Cuisine d'auteur qui réinterprète les recettes des Pyrénées avec des produits locaux et une présentation contemporaine.",
    },
    menu: [
      {
        section: { ca: "Entrants", es: "Entrantes", en: "Starters", fr: "Entrées" },
        items: [
          { name: { ca: "Crema de bolets de temporada i tòfona", es: "Crema de setas de temporada y trufa", en: "Seasonal mushroom cream with truffle", fr: "Crème de champignons de saison à la truffe" }, price: "14€" },
          { name: { ca: "Truita de la vall de Boí marinada", es: "Trucha del valle de Boí marinada", en: "Marinated Vall de Boí trout", fr: "Truite marinée de la Vall de Boí" }, price: "16€" },
          { name: { ca: "Amanida d'escarola, codony i formatge de Taüll", es: "Ensalada de escarola, membrillo y queso de Taüll", en: "Escarole salad with quince and Taüll cheese", fr: "Salade de scarole, coing et fromage de Taüll" }, price: "13€" },
        ],
      },
      {
        section: { ca: "Principals", es: "Principales", en: "Main courses", fr: "Plats principaux" },
        items: [
          { name: { ca: "Vedella del Pirineu a baixa temperatura", es: "Ternera de los Pirineos a baja temperatura", en: "Slow-cooked Pyrenean veal", fr: "Veau des Pyrénées cuit à basse température" }, price: "26€" },
          { name: { ca: "Bacallà confitat amb pil-pil d'aigües termals de vegetals", es: "Bacalao confitado con pil-pil de aguas termales de vegetales", en: "Confit cod with vegetable-thermal-water pil-pil", fr: "Morue confite, pil-pil aux eaux thermales de légumes" }, price: "24€" },
          { name: { ca: "Risotto de bolets i parmesà", es: "Risotto de boletus y parmesano", en: "Porcini mushroom and parmesan risotto", fr: "Risotto aux cèpes et parmesan" }, price: "19€" },
        ],
      },
      {
        section: { ca: "Postres", es: "Postres", en: "Desserts", fr: "Desserts" },
        items: [
          { name: { ca: "Crema catalana de la casa", es: "Crema catalana de la casa", en: "House crema catalana", fr: "Crème catalane maison" }, price: "8€" },
          { name: { ca: "Pastís de poma de la vall", es: "Tarta de manzana del valle", en: "Valley apple tart", fr: "Tarte aux pommes de la vallée" }, price: "8€" },
        ],
      },
    ],
  },
  {
    slug: "bar-manantial",
    name: { ca: "Bar del Manantial", es: "Bar del Manantial", en: "Bar del Manantial", fr: "Bar del Manantial" },
    hotel: { ca: "Hotel Manantial", es: "Hotel Manantial", en: "Hotel Manantial", fr: "Hotel Manantial" },
    style: { ca: "Aperitius i coctelera vora el lobby", es: "Picoteo y coctelería junto al lobby", en: "Small plates and cocktails by the lobby", fr: "Tapas et cocktails près du hall" },
    image: "barManantial",
    description: {
      ca: "El punt de trobada informal de l'Hotel Manantial: tapes, vins de la zona i coctelera en un ambient càlid vora la llar de foc.",
      es: "El punto de encuentro informal del Hotel Manantial: tapas, vinos de la zona y coctelería en un ambiente cálido junto a la chimenea.",
      en: "Hotel Manantial's casual meeting spot: tapas, local wines and cocktails in a warm setting by the fireplace.",
      fr: "Le point de rencontre informel de l'Hotel Manantial : tapas, vins locaux et cocktails dans une ambiance chaleureuse près de la cheminée.",
    },
    menu: [
      {
        section: { ca: "Per picar", es: "Para picar", en: "Small plates", fr: "À grignoter" },
        items: [
          { name: { ca: "Taula de formatges del Pirineu", es: "Tabla de quesos de los Pirineos", en: "Pyrenean cheese board", fr: "Plateau de fromages des Pyrénées" }, price: "16€" },
          { name: { ca: "Croquetes de pernil ibèric", es: "Croquetas de jamón ibérico", en: "Iberian ham croquettes", fr: "Croquettes au jambon ibérique" }, price: "9€" },
          { name: { ca: "Patates braves de la casa", es: "Patatas bravas de la casa", en: "House patatas bravas", fr: "Patatas bravas maison" }, price: "7€" },
        ],
      },
      {
        section: { ca: "Begudes", es: "Bebidas", en: "Drinks", fr: "Boissons" },
        items: [
          { name: { ca: "Copa de vi DO Costers del Segre", es: "Copa de vino DO Costers del Segre", en: "Glass of Costers del Segre DO wine", fr: "Verre de vin DO Costers del Segre" }, price: "5€" },
          { name: { ca: "Còctel Manantial (signature)", es: "Cóctel Manantial (signature)", en: "Manantial signature cocktail", fr: "Cocktail signature Manantial" }, price: "9€" },
          { name: { ca: "Infusió d'herbes de muntanya", es: "Infusión de hierbas de montaña", en: "Mountain herb tea", fr: "Infusion aux herbes de montagne" }, price: "3.5€" },
        ],
      },
    ],
  },
  {
    slug: "restaurante-caldas",
    name: { ca: "Restaurant Caldas", es: "Restaurante Caldas", en: "Restaurant Caldas", fr: "Restaurant Caldas" },
    hotel: { ca: "Hotel Caldas", es: "Hotel Caldas", en: "Hotel Caldas", fr: "Hotel Caldas" },
    style: { ca: "Cuina tradicional del Pirineu", es: "Cocina tradicional del Pirineo", en: "Traditional Pyrenean cuisine", fr: "Cuisine traditionnelle des Pyrénées" },
    image: "restauranteCaldas",
    description: {
      ca: "Sabors de sempre en un ambient familiar: guisats, carns a la brasa i receptes tradicionals de la Vall de Boí.",
      es: "Sabores de siempre en un ambiente familiar: guisos, carnes a la brasa y recetas tradicionales del Valle de Boí.",
      en: "Timeless flavours in a family setting: stews, grilled meats and traditional recipes from the Vall de Boí.",
      fr: "Des saveurs authentiques dans une ambiance familiale : ragoûts, grillades et recettes traditionnelles de la Vall de Boí.",
    },
    menu: [
      {
        section: { ca: "Entrants", es: "Entrantes", en: "Starters", fr: "Entrées" },
        items: [
          { name: { ca: "Escudella de l'àvia", es: "Escudella de la abuela", en: "Grandma's escudella stew", fr: "Escudella de grand-mère" }, price: "10€" },
          { name: { ca: "Embotits artesans de la Vall de Boí", es: "Embutidos artesanos de la Vall de Boí", en: "Handcrafted Vall de Boí charcuterie", fr: "Charcuterie artisanale de la Vall de Boí" }, price: "15€" },
        ],
      },
      {
        section: { ca: "Principals", es: "Principales", en: "Main courses", fr: "Plats principaux" },
        items: [
          { name: { ca: "Costelló de porc a la brasa", es: "Costillar de cerdo a la brasa", en: "Grilled pork ribs", fr: "Travers de porc grillé" }, price: "20€" },
          { name: { ca: "Trinxat de la Cerdanya amb botifarra", es: "Trinxat de la Cerdanya con butifarra", en: "Cerdanya trinxat with sausage", fr: "Trinxat de la Cerdagne à la saucisse" }, price: "17€" },
          { name: { ca: "Graellada de verdures de temporada", es: "Parrillada de verduras de temporada", en: "Grilled seasonal vegetables", fr: "Grillade de légumes de saison" }, price: "14€" },
        ],
      },
      {
        section: { ca: "Postres", es: "Postres", en: "Desserts", fr: "Desserts" },
        items: [
          { name: { ca: "Mel i mató", es: "Mel i mató (requesón con miel)", en: "Fresh cheese with honey", fr: "Fromage frais au miel" }, price: "7€" },
          { name: { ca: "Coca de recapte", es: "Coca de recapte", en: "Traditional savoury flatbread", fr: "Coca de recapte" }, price: "7€" },
        ],
      },
    ],
  },
  {
    slug: "club-piscina",
    name: { ca: "Restaurant Club Piscina", es: "Restaurante Club Piscina", en: "Club Piscina Restaurant", fr: "Restaurant Club Piscina" },
    hotel: { ca: "Balneari", es: "Balneario", en: "Spa", fr: "Thermes" },
    style: { ca: "Cuina informal vora la piscina exterior", es: "Cocina informal junto a la piscina exterior", en: "Casual dining by the outdoor pool", fr: "Cuisine décontractée près de la piscine extérieure" },
    image: "clubPiscina",
    description: {
      ca: "Menjar lleuger i de temporada per gaudir a l'aire lliure, vora la piscina exterior amb vistes a la muntanya. Obert en temporada.",
      es: "Comida ligera y de temporada para disfrutar al aire libre, junto a la piscina exterior con vistas a la montaña. Abierto en temporada.",
      en: "Light, seasonal food to enjoy outdoors, by the outdoor pool with mountain views. Open seasonally.",
      fr: "Une cuisine légère et de saison à savourer en plein air, près de la piscine extérieure avec vue sur la montagne. Ouvert en saison.",
    },
    menu: [
      {
        section: { ca: "Per compartir", es: "Para compartir", en: "To share", fr: "À partager" },
        items: [
          { name: { ca: "Amanida de temporada amb formatge de cabra", es: "Ensalada de temporada con queso de cabra", en: "Seasonal salad with goat cheese", fr: "Salade de saison au fromage de chèvre" }, price: "12€" },
          { name: { ca: "Taula d'embotits i formatges de la vall", es: "Tabla de embutidos y quesos del valle", en: "Valley charcuterie and cheese board", fr: "Plateau de charcuterie et fromages de la vallée" }, price: "17€" },
          { name: { ca: "Nachos amb guacamole", es: "Nachos con guacamole", en: "Nachos with guacamole", fr: "Nachos au guacamole" }, price: "9€" },
        ],
      },
      {
        section: { ca: "Plats lleugers", es: "Platos ligeros", en: "Light dishes", fr: "Plats légers" },
        items: [
          { name: { ca: "Hamburguesa de vedella del Pirineu", es: "Hamburguesa de ternera del Pirineo", en: "Pyrenean beef burger", fr: "Burger de bœuf des Pyrénées" }, price: "15€" },
          { name: { ca: "Wrap de pollastre i verdures a la brasa", es: "Wrap de pollo y verduras a la brasa", en: "Grilled chicken and vegetable wrap", fr: "Wrap au poulet et légumes grillés" }, price: "12€" },
          { name: { ca: "Poke bowl de truita marinada", es: "Poke bowl de trucha marinada", en: "Marinated trout poke bowl", fr: "Poke bowl à la truite marinée" }, price: "14€" },
        ],
      },
      {
        section: { ca: "Begudes i gelats", es: "Bebidas y helados", en: "Drinks & ice cream", fr: "Boissons et glaces" },
        items: [
          { name: { ca: "Còctel sense alcohol de fruits del bosc", es: "Cóctel sin alcohol de frutas del bosque", en: "Alcohol-free forest fruit cocktail", fr: "Cocktail sans alcool aux fruits des bois" }, price: "6€" },
          { name: { ca: "Sangria de la casa (copa)", es: "Sangría de la casa (copa)", en: "House sangria (glass)", fr: "Sangria maison (verre)" }, price: "5€" },
          { name: { ca: "Selecció de gelats artesans", es: "Selección de helados artesanos", en: "Selection of artisan ice creams", fr: "Sélection de glaces artisanales" }, price: "5€" },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------
   7) ENTORNO — puntos de interés
   ------------------------------------------------------------------------- */
const ENTORNO_ITEMS = [
  {
    slug: "parque-nacional",
    name: {
      ca: "Parc Nacional d'Aigüestortes i Estany de Sant Maurici",
      es: "Parque Nacional d'Aigüestortes i Estany de Sant Maurici",
      en: "Aigüestortes i Estany de Sant Maurici National Park",
      fr: "Parc National d'Aigüestortes i Estany de Sant Maurici",
    },
    image: "entornoParque",
    longDescription: {
      ca: "Llacs glacials, boscos i alta muntanya a l'únic Parc Nacional de Catalunya, a pocs minuts de Caldes de Boí.",
      es: "Lagos glaciares, bosques y alta montaña en el único Parque Nacional de Cataluña, a pocos minutos de Caldes de Boí.",
      en: "Glacial lakes, forests and high mountains in Catalonia's only National Park, just minutes from Caldes de Boí.",
      fr: "Lacs glaciaires, forêts et haute montagne dans l'unique Parc National de Catalogne, à quelques minutes de Caldes de Boí.",
    },
    linkLabel: { ca: "Descobrir el Parc", es: "Descubrir el Parque", en: "Discover the Park", fr: "Découvrir le Parc" },
    externalLink: "https://parcsnaturals.gencat.cat/es/xarxa-de-parcs/aiguestortes/inici/index.html",
  },
  {
    slug: "iglesia-taull",
    name: { ca: "Sant Climent de Taüll", es: "Sant Climent de Taüll", en: "Sant Climent de Taüll", fr: "Sant Climent de Taüll" },
    image: "entornoIglesia",
    longDescription: {
      ca: "Una de les grans joies del romànic de la Vall de Boí i part del conjunt declarat Patrimoni Mundial per la UNESCO.",
      es: "Una de las grandes joyas del románico del Valle de Boí y parte del conjunto declarado Patrimonio Mundial por la UNESCO.",
      en: "One of the great Romanesque jewels of the Vall de Boí, part of the group declared a UNESCO World Heritage Site.",
      fr: "L'un des grands joyaux de l'art roman de la Vall de Boí, faisant partie de l'ensemble classé au patrimoine mondial de l'UNESCO.",
    },
    linkLabel: { ca: "Visitar Sant Climent", es: "Visitar Sant Climent", en: "Visit Sant Climent", fr: "Visiter Sant Climent" },
    externalLink: "https://www.centreromanic.com/es/visita/",
  },
  {
    slug: "boi-taull-resort",
    name: { ca: "Estació de muntanya Boí Taüll", es: "Estación de montaña Boí Taüll", en: "Boí Taüll mountain resort", fr: "Station de montagne Boí Taüll" },
    image: "entornoEsqui",
    longDescription: {
      ca: "Esquí i muntanya en un dels dominis més alts del Pirineu, envoltat pel paisatge de la Vall de Boí.",
      es: "Esquí y montaña en uno de los dominios más altos del Pirineo, rodeado por el paisaje de la Vall de Boí.",
      en: "Skiing and mountains in one of the highest resorts in the Pyrenees, surrounded by the Vall de Boí landscape.",
      fr: "Ski et montagne dans l'un des domaines les plus élevés des Pyrénées, entouré par le paysage de la Vall de Boí.",
    },
    linkLabel: { ca: "Descobrir Boí Taüll", es: "Descubrir Boí Taüll", en: "Discover Boí Taüll", fr: "Découvrir Boí Taüll" },
    externalLink: "https://pirineu365.cat/es/boitaull/inicio/",
  },
  {
    slug: "pueblos-con-encanto",
    name: { ca: "Pobles amb encant de la Vall de Boí", es: "Pueblos con encanto de la Vall de Boí", en: "Charming villages of the Vall de Boí", fr: "Villages de charme de la Vall de Boí" },
    image: "entornoPueblos",
    longDescription: {
      ca: "Boí, Taüll, Barruera i altres petits pobles conserven l'arquitectura, les tradicions i el ritme de vida del Pirineu.",
      es: "Boí, Taüll, Barruera y otros pequeños pueblos conservan la arquitectura, las tradiciones y el ritmo de vida del Pirineo.",
      en: "Boí, Taüll, Barruera and other small villages preserve the architecture, traditions and pace of life of the Pyrenees.",
      fr: "Boí, Taüll, Barruera et d'autres petits villages préservent l'architecture, les traditions et le rythme de vie des Pyrénées.",
    },
    linkLabel: { ca: "Descobrir els pobles", es: "Descubrir los pueblos", en: "Discover the villages", fr: "Découvrir les villages" },
    externalLink: "https://www.vallboi.cat/es/pueblos-con-encanto",
  },
  {
    slug: "rutas-senderos",
    name: { ca: "Rutes i senders", es: "Rutas y senderos", en: "Trails & hiking routes", fr: "Sentiers et randonnées" },
    image: "entornoRutas",
    longDescription: {
      ca: "Camins per a tots els nivells, des de tranquils passejos per la vall fins a rutes d'alta muntanya i recorreguts per Aigüestortes.",
      es: "Caminos para todos los niveles, desde tranquilos paseos por el valle hasta rutas de alta montaña y recorridos por Aigüestortes.",
      en: "Trails for every level, from gentle valley walks to high-mountain routes through Aigüestortes.",
      fr: "Des chemins pour tous les niveaux, de la promenade tranquille dans la vallée aux itinéraires de haute montagne à Aigüestortes.",
    },
    linkLabel: { ca: "Veure rutes", es: "Ver rutas", en: "View trails", fr: "Voir les sentiers" },
    externalLink: "https://www.vallboi.cat/es/senderismo",
  },
];
