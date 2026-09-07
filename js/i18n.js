/* =========================================================================
   I18N.JS — sitio en 4 idiomas: catalán (ca), español (es), inglés (en),
   francés (fr). Catalán es el idioma por defecto.

   Cómo funciona:
   - UI_STRINGS contiene todos los textos "fijos" de la interfaz (menú,
     botones, títulos de sección...), agrupados por idioma.
   - Cualquier elemento con data-i18n="clave" recibe el texto
     UI_STRINGS[idioma]["clave"] al cargar la página o al cambiar de idioma.
   - data-i18n-placeholder="clave" hace lo mismo con el atributo placeholder.
   - El contenido dinámico (hoteles, servicios, restaurantes, entorno,
     programas — en config.js) usa campos {ca,es,en,fr} y se lee con la
     función tr(campo), que ya tiene en cuenta el idioma activo.
   - setLang(idioma) cambia el idioma, lo guarda en localStorage y vuelve a
     pintar toda la página (tanto los textos fijos como las listas
     dinámicas, llamando a window.rerenderDynamicContent si la página la
     ha definido).
   ========================================================================= */

const LANGS = ["ca", "es", "en", "fr"];
const LANG_LABELS = { ca: "Català", es: "Español", en: "English", fr: "Français" };

function getLang() {
  const stored = localStorage.getItem("cdb_lang");
  return LANGS.includes(stored) ? stored : "ca";
}

function tr(field) {
  if (field == null) return "";
  if (typeof field === "string") return field; // por si algún campo no está traducido aún
  const lang = getLang();
  return field[lang] || field.es || field.ca || "";
}

function applyI18n() {
  const lang = getLang();
  const dict = UI_STRINGS[lang] || UI_STRINGS.ca;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] != null) el.innerHTML = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] != null) el.placeholder = dict[key];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
  });
  document.title = dict[`title_${document.body.dataset.page}`] || document.title;
}

function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  localStorage.setItem("cdb_lang", lang);
  applyI18n();
  if (typeof renderHeader === "function") {
    const headerEl = document.getElementById("site-header");
    if (headerEl) headerEl.innerHTML = renderHeader(document.body.dataset.page || "");
    wireHeaderInteractions();
  }
  if (typeof renderFooter === "function") {
    const footerEl = document.getElementById("site-footer");
    if (footerEl) footerEl.innerHTML = renderFooter();
  }
  applyI18n();
  if (typeof applyImages === "function") applyImages();
  if (typeof window.rerenderGuestPickers === "function") window.rerenderGuestPickers();
  if (typeof window.rerenderDynamicContent === "function") window.rerenderDynamicContent();
}

/* -------------------------------------------------------------------------
   TEXTOS DE INTERFAZ (fijos) por idioma
   ------------------------------------------------------------------------- */
const UI_STRINGS = {
  ca: {
    nav_resort: "El Resort", nav_hoteles: "Hotels", nav_termal: "Aigües Termals",
    nav_experiencias: "Experiències", nav_entorno: "Entorn", nav_restauracion: "Restauració",
    nav_ofertas: "Ofertes", nav_reservar: "Reservar", nav_menu_open: "Obrir menú", nav_menu_close: "Tancar menú",
    brand_alt: "Caldes de Boí — Balneari Thermal Resort",
    skip_link: "Vés al contingut",
    breadcrumb_inicio: "Inici",

    hero_home_lede: "Aigües termals. Muntanya. Benestar.",
    hero_home_title: "El poder natural de Caldes de Boí",
    hero_home_desc: "37 mantials mineromedicinals, dos hotels i un entorn únic al cor del Pirineu.",
    btn_reservar_estancia: "Reservar estada",
    btn_descubrir_caldes: "Descobrir Caldes de Boí",

    bw_llegada: "Arribada", bw_salida: "Sortida", bw_huespedes: "Hostes", bw_hotel: "Hotel",
    bw_hotel_any: "Qualsevol", bw_submit: "Cercar disponibilitat", bw_submit_hotel: "Comprovar disponibilitat",
    bw_aria_home: "Cercador de disponibilitat", bw_aria_hotel: "Comprovar disponibilitat en aquest hotel",
    guests_1: "1 adult", guests_2: "2 adults", guests_2_1: "2 adults, 1 nen", guests_2_2: "2 adults, 2 nens", guests_4: "4 adults",

    feature_manantiales_title: "37 mantials", feature_manantiales_desc: "Aigües mineromedicinals d'origen natural",
    feature_balneario_title: "Balneari històric", feature_balneario_desc: "Més de 2.000 anys de tradició",
    feature_parque_title: "Parc Nacional", feature_parque_desc: "Aigüestortes i Estany de Sant Maurici",
    feature_experiencias_title: "Experiències tot l'any", feature_experiencias_desc: "Cada estació, una emoció",

    hoteles_title: "Dos hotels, dues maneres de viure Caldes de Boí",
    tagline_manantial: "Benestar, tranquil·litat i elegància",
    tagline_caldas: "Confort, natura i esperit familiar",
    btn_descubrir_hotel: "Descobrir hotel",

    spa_banner_eyebrow: "Aigües termals", spa_banner_title: "El poder natural de les nostres aigües",
    spa_banner_desc: "Benestar i salut a través de l'aigua termal mineromedicinal. Circuits, tractaments i massatges en un entorn únic.",
    btn_descubrir_balneario: "Descobrir balneari",

    experiencias_title: "Viu experiències úniques",
    exp_wellness: "Wellness & Spa", exp_naturaleza: "Natura", exp_aventura: "Aventura",
    exp_gastronomia: "Gastronomia", exp_familias: "Famílies", exp_cultura: "Cultura",
    exp_wellness_title: "Benestar & Spa", exp_wellness_desc: "Relaxa't i deixa't cuidar",
    exp_natura_title: "Rutes i natura", exp_natura_desc: "Descobreix paisatges increïbles",
    exp_gastro_title: "Gastronomia local", exp_gastro_desc: "Sabors del Pirineu",

    rooms_eyebrow: "Habitacions", rooms_title: "El teu refugi a la muntanya",
    rooms_desc: "Habitacions i suites dissenyades per al teu descans, amb totes les comoditats i vistes úniques de la Vall de Boí.",
    room_wifi: "WiFi gratuït", room_heating: "Calefacció", room_views: "Vistes a la muntanya", room_tv: "TV de pantalla plana",
    btn_ver_habitaciones: "Veure habitacions",

    entorno_title: "L'entorn que ens envolta", ver_todas: "Veure-les totes",

    footer_newsletter_title: "Subscriu-te al nostre butlletí",
    footer_newsletter_desc: "Rep ofertes exclusives i novetats de Caldes de Boí.",
    footer_email_label: "Correu electrònic", footer_email_placeholder: "El teu email", footer_suscribirme: "Subscriure'm",
    footer_seguinos: "Segueix-nos",
    footer_col_resort: "El Resort", footer_quienes: "Qui som", footer_sostenibilidad: "Sostenibilitat", footer_galeria: "Galeria", footer_contacto: "Contacte",
    footer_col_hoteles: "Hotels",
    footer_col_termal: "Aigües Termals", footer_balneario: "Balneari", footer_tratamientos: "Tractaments",
    footer_col_exp: "Experiències", footer_naturaleza: "Natura", footer_gastronomia: "Gastronomia",
    footer_copyright: "© 2026 Caldes de Boí Balneari Thermal Resort",
    footer_privacidad: "Política de privacitat", footer_cookies: "Política de cookies",
    modal_sim_label: "Simulació · connexió amb motor de reserves",
    modal_sim_desc: "Aquest pas, en producció, redirigeix (o obre en un iframe) el motor de reserves real configurat a js/config.js.",
    modal_motor: "Motor assignat", modal_entrada: "Entrada", modal_salida: "Sortida", modal_huespedes: "Hostes",
    modal_cerrar: "Tancar", modal_cualquiera: "Qualsevol dels dos hotels",

    title_home: "Caldes de Boí · Balneari Thermal Resort",
    title_balneario: "Balneari · Caldes de Boí",
    title_restauracion: "Restauració · Caldes de Boí",
    title_entorno: "Entorn · Caldes de Boí",
    title_ofertas: "Ofertes · Caldes de Boí",

    balneario_hero_lede: "Wellness & Spa",
    balneario_hero_title: "El balneari de Caldes de Boí",
    balneario_hero_desc: "37 mantials mineromedicinals i un circuit termal centenari a disposició dels hostes d'ambdós hotels.",
    balneario_servicios_eyebrow: "Serveis termals",
    balneario_servicios_title: "Carta completa de serveis termals",
    balneario_servicios_desc: "Consulta totes les categories de tractaments; desplega cada apartat per veure els serveis i preus.",
    balneario_programas_eyebrow: "Programes de salut i benestar",
    balneario_programas_title: "Descobreix tot el que podem fer per tu",
    balneario_programas_desc: "Tractaments amb aigües mineromedicinals, supervisió mèdica continuada i teràpies complementàries. Descarrega el programa en PDF o consulta'n els detalls.",
    btn_descargar_programa: "Descarregar programa (PDF)",
    approx_label: "orientatiu", cat_salud: "Salut", cat_bienestar: "Benestar", cat_belleza: "Bellesa",
    btn_reservar_tratamiento: "Vols reservar un tractament?",
    balneario_reserva_eyebrow: "Reserves de spa",
    balneario_reserva_title: "Vols reservar un tractament?",
    balneario_reserva_desc: "Consulta disponibilitat i reserva la teva estada; l'accés al balneari i els tractaments es gestionen juntament amb la reserva d'hotel.",

    restauracion_hero_lede: "Gastronomia",
    restauracion_hero_title: "Restaurants del complex",
    restauracion_hero_desc: "Cada espai gastronòmic de Caldes de Boí té el seu propi caràcter. Tria'n un per veure la carta completa.",
    restauracion_eyebrow: "On menjar", restauracion_title: "Els nostres restaurants",
    btn_ver_carta: "Veure carta", btn_volver_restaurantes: "Tornar a restaurants",

    entorno_hero_lede: "Vall de Boí",
    entorno_hero_title: "L'entorn que ens envolta",
    entorno_hero_desc: "Natura, patrimoni i muntanya a l'abast d'un passeig des del resort.",
    entorno_link_pendiente: "Enllaç a la web oficial pendent d'assignar",

    ofertas_hero_lede: "Promocions",
    ofertas_hero_title: "Ofertes i paquets especials",
    ofertas_hero_desc: "Properament: escapades termals, paquets de temporada i descomptes per estada.",
    ofertas_eyebrow: "En preparació", ofertas_title: "Molt aviat, noves ofertes",
    ofertas_desc: "Aquesta secció està pendent de definir amb l'equip comercial (paquets, temporades, descomptes). Mentrestant, consulta disponibilitat directament al cercador de la home.",
    btn_volver_hoteles: "Tornar a hotels",

    hotel_eyebrow: "L'hotel", btn_reservar_este_hotel: "Reservar en aquest hotel",
    hotel_rooms_eyebrow: "Allotjament", hotel_rooms_title: "Tria la teva habitació",
    hotel_rooms_desc: "Cada habitació del complex té el seu propi caràcter. Descobreix quina s'adapta millor a la teva estada.",
    btn_reservar_habitacion: "Reservar aquesta habitació",
    room_selected_prefix: "Habitació seleccionada",
    modal_habitacion: "Habitació",
    gp_adults: "Adults", gp_adults_note: "13 anys o més",
    gp_children: "Nens", gp_children_note: "0–17 anys",
    gp_rooms: "Habitacions",
    gp_pets: "Mascotes", gp_pets_note: "Consulta condicions",
    gp_apply: "Aplicar",
    gp_adult_singular: "adult", gp_adult_plural: "adults",
    gp_child_singular: "nen", gp_child_plural: "nens",
    gp_room_singular: "habitació", gp_room_plural: "habitacions",
    gp_pet_singular: "mascota", gp_pet_plural: "mascotes",
    hotel_termal_title: "A un pas del balneari",
    hotel_termal_desc: "Tots els hostes de Caldes de Boí gaudeixen d'accés al circuit termal mineromedicinal i a la llista completa de tractaments del balneari.",
    btn_ver_servicios_termales: "Veure serveis termals",
    hotel_gastro_eyebrow: "Gastronomia", hotel_gastro_title: "Restaurants del complex",
    hotel_gastro_desc: "Descobreix els diferents restaurants de Caldes de Boí i les seves cartes.",
    btn_ver_restaurantes: "Veure restaurants",
  },

  es: {
    nav_resort: "El Resort", nav_hoteles: "Hoteles", nav_termal: "Aguas Termales",
    nav_experiencias: "Experiencias", nav_entorno: "Entorno", nav_restauracion: "Restauración",
    nav_ofertas: "Ofertas", nav_reservar: "Reservar", nav_menu_open: "Abrir menú", nav_menu_close: "Cerrar menú",
    brand_alt: "Caldes de Boí — Balneari Thermal Resort",
    skip_link: "Saltar al contenido",
    breadcrumb_inicio: "Inicio",

    hero_home_lede: "Aguas termales. Montaña. Bienestar.",
    hero_home_title: "El poder natural de Caldes de Boí",
    hero_home_desc: "37 manantiales mineromedicinales, dos hoteles y un entorno único en el corazón de los Pirineos.",
    btn_reservar_estancia: "Reservar estancia",
    btn_descubrir_caldes: "Descubrir Caldes de Boí",

    bw_llegada: "Llegada", bw_salida: "Salida", bw_huespedes: "Huéspedes", bw_hotel: "Hotel",
    bw_hotel_any: "Cualquiera", bw_submit: "Buscar disponibilidad", bw_submit_hotel: "Comprobar disponibilidad",
    bw_aria_home: "Buscador de disponibilidad", bw_aria_hotel: "Comprobar disponibilidad en este hotel",
    guests_1: "1 adulto", guests_2: "2 adultos", guests_2_1: "2 adultos, 1 niño", guests_2_2: "2 adultos, 2 niños", guests_4: "4 adultos",

    feature_manantiales_title: "37 manantiales", feature_manantiales_desc: "Aguas mineromedicinales de origen natural",
    feature_balneario_title: "Balneario histórico", feature_balneario_desc: "Más de 2.000 años de tradición",
    feature_parque_title: "Parque Nacional", feature_parque_desc: "Aigüestortes i Estany de Sant Maurici",
    feature_experiencias_title: "Experiencias todo el año", feature_experiencias_desc: "Cada estación, una emoción",

    hoteles_title: "Dos hoteles, dos maneras de vivir Caldes de Boí",
    tagline_manantial: "Bienestar, tranquilidad y elegancia",
    tagline_caldas: "Confort, naturaleza y espíritu familiar",
    btn_descubrir_hotel: "Descubrir hotel",

    spa_banner_eyebrow: "Aguas termales", spa_banner_title: "El poder natural de nuestras aguas",
    spa_banner_desc: "Bienestar y salud a través del agua termal mineromedicinal. Circuitos, tratamientos y masajes en un entorno único.",
    btn_descubrir_balneario: "Descubrir balneario",

    experiencias_title: "Vive experiencias únicas",
    exp_wellness: "Wellness & Spa", exp_naturaleza: "Naturaleza", exp_aventura: "Aventura",
    exp_gastronomia: "Gastronomía", exp_familias: "Familias", exp_cultura: "Cultura",
    exp_wellness_title: "Bienestar & Spa", exp_wellness_desc: "Relájate y déjate cuidar",
    exp_natura_title: "Rutas y naturaleza", exp_natura_desc: "Descubre paisajes increíbles",
    exp_gastro_title: "Gastronomía local", exp_gastro_desc: "Sabores del Pirineo",

    rooms_eyebrow: "Habitaciones", rooms_title: "Tu refugio en la montaña",
    rooms_desc: "Habitaciones y suites diseñadas para tu descanso, con todas las comodidades y vistas únicas del Valle de Boí.",
    room_wifi: "WiFi gratuito", room_heating: "Calefacción", room_views: "Vistas a la montaña", room_tv: "TV pantalla plana",
    btn_ver_habitaciones: "Ver habitaciones",

    entorno_title: "El entorno que nos rodea", ver_todas: "Ver todas",

    footer_newsletter_title: "Suscríbete a nuestra newsletter",
    footer_newsletter_desc: "Recibe ofertas exclusivas y novedades de Caldes de Boí.",
    footer_email_label: "Correo electrónico", footer_email_placeholder: "Tu email", footer_suscribirme: "Suscribirme",
    footer_seguinos: "Síguenos",
    footer_col_resort: "El Resort", footer_quienes: "Quiénes somos", footer_sostenibilidad: "Sostenibilidad", footer_galeria: "Galería", footer_contacto: "Contacto",
    footer_col_hoteles: "Hoteles",
    footer_col_termal: "Aguas Termales", footer_balneario: "Balneario", footer_tratamientos: "Tratamientos",
    footer_col_exp: "Experiencias", footer_naturaleza: "Naturaleza", footer_gastronomia: "Gastronomía",
    footer_copyright: "© 2026 Caldes de Boí Balneari Thermal Resort",
    footer_privacidad: "Política de privacidad", footer_cookies: "Política de cookies",
    modal_sim_label: "Simulación · conexión con motor de reservas",
    modal_sim_desc: "Este paso, en producción, redirige (o abre en un iframe) el motor de reservas real configurado en js/config.js.",
    modal_motor: "Motor asignado", modal_entrada: "Entrada", modal_salida: "Salida", modal_huespedes: "Huéspedes",
    modal_cerrar: "Cerrar", modal_cualquiera: "Cualquiera de los dos hoteles",

    title_home: "Caldes de Boí · Balneari Thermal Resort",
    title_balneario: "Balneario · Caldes de Boí",
    title_restauracion: "Restauración · Caldes de Boí",
    title_entorno: "Entorno · Caldes de Boí",
    title_ofertas: "Ofertas · Caldes de Boí",

    balneario_hero_lede: "Wellness & Spa",
    balneario_hero_title: "El balneario de Caldes de Boí",
    balneario_hero_desc: "37 manantiales mineromedicinales y un circuito termal centenario a disposición de los huéspedes de ambos hoteles.",
    balneario_servicios_eyebrow: "Servicios termales",
    balneario_servicios_title: "Carta completa de servicios termales",
    balneario_servicios_desc: "Consulta todas las categorías de tratamientos; despliega cada apartado para ver los servicios y precios.",
    balneario_programas_eyebrow: "Programas de salud y bienestar",
    balneario_programas_title: "Descubre todo lo que podemos hacer por ti",
    balneario_programas_desc: "Tratamientos con aguas mineromedicinales, supervisión médica continuada y terapias complementarias. Descarga el programa en PDF o consulta sus detalles.",
    btn_descargar_programa: "Descargar programa (PDF)",
    approx_label: "orientativo", cat_salud: "Salud", cat_bienestar: "Bienestar", cat_belleza: "Belleza",
    btn_reservar_tratamiento: "¿Quieres reservar un tratamiento?",
    balneario_reserva_eyebrow: "Reservas de spa",
    balneario_reserva_title: "¿Quieres reservar un tratamiento?",
    balneario_reserva_desc: "Consulta disponibilidad y reserva tu estancia; el acceso al balneario y los tratamientos se gestionan junto con la reserva de hotel.",

    restauracion_hero_lede: "Gastronomía",
    restauracion_hero_title: "Restaurantes del complejo",
    restauracion_hero_desc: "Cada espacio gastronómico de Caldes de Boí tiene su propio carácter. Elige uno para ver su carta completa.",
    restauracion_eyebrow: "Dónde comer", restauracion_title: "Nuestros restaurantes",
    btn_ver_carta: "Ver carta", btn_volver_restaurantes: "Volver a restaurantes",

    entorno_hero_lede: "Valle de Boí",
    entorno_hero_title: "El entorno que nos rodea",
    entorno_hero_desc: "Naturaleza, patrimonio y montaña al alcance de un paseo desde el resort.",
    entorno_link_pendiente: "Enlace a web oficial pendiente de asignar",

    ofertas_hero_lede: "Promociones",
    ofertas_hero_title: "Ofertas y paquetes especiales",
    ofertas_hero_desc: "Próximamente: escapadas termales, paquetes de temporada y descuentos por estancia.",
    ofertas_eyebrow: "En preparación", ofertas_title: "Muy pronto, nuevas ofertas",
    ofertas_desc: "Esta sección está pendiente de definir con el equipo comercial (paquetes, temporadas, descuentos). Mientras tanto, consulta disponibilidad directamente en el buscador de la home.",
    btn_volver_hoteles: "Volver a hoteles",

    hotel_eyebrow: "El hotel", btn_reservar_este_hotel: "Reservar en este hotel",
    hotel_rooms_eyebrow: "Alojamiento", hotel_rooms_title: "Elige tu habitación",
    hotel_rooms_desc: "Cada habitación del complejo tiene su propio carácter. Descubre cuál encaja mejor con tu estancia.",
    btn_reservar_habitacion: "Reservar esta habitación",
    room_selected_prefix: "Habitación seleccionada",
    modal_habitacion: "Habitación",
    gp_adults: "Adultos", gp_adults_note: "13 años o más",
    gp_children: "Niños", gp_children_note: "0–17 años",
    gp_rooms: "Habitaciones",
    gp_pets: "Mascotas", gp_pets_note: "Consultar condiciones",
    gp_apply: "Aplicar",
    gp_adult_singular: "adulto", gp_adult_plural: "adultos",
    gp_child_singular: "niño", gp_child_plural: "niños",
    gp_room_singular: "habitación", gp_room_plural: "habitaciones",
    gp_pet_singular: "mascota", gp_pet_plural: "mascotas",
    hotel_termal_title: "A un paso del balneario",
    hotel_termal_desc: "Todos los huéspedes de Caldes de Boí disfrutan de acceso al circuito termal mineromedicinal y a la lista completa de tratamientos del balneario.",
    btn_ver_servicios_termales: "Ver servicios termales",
    hotel_gastro_eyebrow: "Gastronomía", hotel_gastro_title: "Restaurantes del complejo",
    hotel_gastro_desc: "Descubre los diferentes restaurantes de Caldes de Boí y sus cartas.",
    btn_ver_restaurantes: "Ver restaurantes",
  },

  en: {
    nav_resort: "The Resort", nav_hoteles: "Hotels", nav_termal: "Thermal Waters",
    nav_experiencias: "Experiences", nav_entorno: "Surroundings", nav_restauracion: "Dining",
    nav_ofertas: "Offers", nav_reservar: "Book now", nav_menu_open: "Open menu", nav_menu_close: "Close menu",
    brand_alt: "Caldes de Boí — Balneari Thermal Resort",
    skip_link: "Skip to content",
    breadcrumb_inicio: "Home",

    hero_home_lede: "Thermal waters. Mountains. Wellness.",
    hero_home_title: "The natural power of Caldes de Boí",
    hero_home_desc: "37 mineral-medicinal springs, two hotels and a unique setting in the heart of the Pyrenees.",
    btn_reservar_estancia: "Book your stay",
    btn_descubrir_caldes: "Discover Caldes de Boí",

    bw_llegada: "Check-in", bw_salida: "Check-out", bw_huespedes: "Guests", bw_hotel: "Hotel",
    bw_hotel_any: "Any", bw_submit: "Check availability", bw_submit_hotel: "Check availability",
    bw_aria_home: "Availability search", bw_aria_hotel: "Check availability at this hotel",
    guests_1: "1 adult", guests_2: "2 adults", guests_2_1: "2 adults, 1 child", guests_2_2: "2 adults, 2 children", guests_4: "4 adults",

    feature_manantiales_title: "37 springs", feature_manantiales_desc: "Naturally occurring mineral-medicinal waters",
    feature_balneario_title: "Historic spa", feature_balneario_desc: "Over 2,000 years of tradition",
    feature_parque_title: "National Park", feature_parque_desc: "Aigüestortes i Estany de Sant Maurici",
    feature_experiencias_title: "Year-round experiences", feature_experiencias_desc: "A new feeling every season",

    hoteles_title: "Two hotels, two ways to experience Caldes de Boí",
    tagline_manantial: "Wellness, tranquility and elegance",
    tagline_caldas: "Comfort, nature and a family spirit",
    btn_descubrir_hotel: "Discover the hotel",

    spa_banner_eyebrow: "Thermal waters", spa_banner_title: "The natural power of our waters",
    spa_banner_desc: "Wellness and health through mineral-medicinal thermal water. Circuits, treatments and massages in a unique setting.",
    btn_descubrir_balneario: "Discover the spa",

    experiencias_title: "Live unique experiences",
    exp_wellness: "Wellness & Spa", exp_naturaleza: "Nature", exp_aventura: "Adventure",
    exp_gastronomia: "Gastronomy", exp_familias: "Families", exp_cultura: "Culture",
    exp_wellness_title: "Wellness & Spa", exp_wellness_desc: "Relax and let yourself be pampered",
    exp_natura_title: "Trails & nature", exp_natura_desc: "Discover breathtaking landscapes",
    exp_gastro_title: "Local gastronomy", exp_gastro_desc: "Flavours of the Pyrenees",

    rooms_eyebrow: "Rooms", rooms_title: "Your mountain retreat",
    rooms_desc: "Rooms and suites designed for your rest, with every comfort and unique views of the Vall de Boí.",
    room_wifi: "Free WiFi", room_heating: "Heating", room_views: "Mountain views", room_tv: "Flat-screen TV",
    btn_ver_habitaciones: "View rooms",

    entorno_title: "The surroundings", ver_todas: "See all",

    footer_newsletter_title: "Subscribe to our newsletter",
    footer_newsletter_desc: "Get exclusive offers and news from Caldes de Boí.",
    footer_email_label: "Email address", footer_email_placeholder: "Your email", footer_suscribirme: "Subscribe",
    footer_seguinos: "Follow us",
    footer_col_resort: "The Resort", footer_quienes: "About us", footer_sostenibilidad: "Sustainability", footer_galeria: "Gallery", footer_contacto: "Contact",
    footer_col_hoteles: "Hotels",
    footer_col_termal: "Thermal Waters", footer_balneario: "Spa", footer_tratamientos: "Treatments",
    footer_col_exp: "Experiences", footer_naturaleza: "Nature", footer_gastronomia: "Gastronomy",
    footer_copyright: "© 2026 Caldes de Boí Balneari Thermal Resort",
    footer_privacidad: "Privacy policy", footer_cookies: "Cookie policy",
    modal_sim_label: "Simulation · booking engine connection",
    modal_sim_desc: "In production, this step redirects (or opens in an iframe) the real booking engine configured in js/config.js.",
    modal_motor: "Engine assigned", modal_entrada: "Check-in", modal_salida: "Check-out", modal_huespedes: "Guests",
    modal_cerrar: "Close", modal_cualquiera: "Either of the two hotels",

    title_home: "Caldes de Boí · Balneari Thermal Resort",
    title_balneario: "Spa · Caldes de Boí",
    title_restauracion: "Dining · Caldes de Boí",
    title_entorno: "Surroundings · Caldes de Boí",
    title_ofertas: "Offers · Caldes de Boí",

    balneario_hero_lede: "Wellness & Spa",
    balneario_hero_title: "The Caldes de Boí spa",
    balneario_hero_desc: "37 mineral-medicinal springs and a century-old thermal circuit available to guests of both hotels.",
    balneario_servicios_eyebrow: "Thermal services",
    balneario_servicios_title: "Full thermal services menu",
    balneario_servicios_desc: "Browse every treatment category; expand each section to see services and prices.",
    balneario_programas_eyebrow: "Health & wellness programmes",
    balneario_programas_title: "Discover everything we can do for you",
    balneario_programas_desc: "Treatments with mineral-medicinal waters, continuous medical supervision and complementary therapies. Download the programme as a PDF or view its details.",
    btn_descargar_programa: "Download programme (PDF)",
    approx_label: "estimated", cat_salud: "Health", cat_bienestar: "Wellness", cat_belleza: "Beauty",
    btn_reservar_tratamiento: "Want to book a treatment?",
    balneario_reserva_eyebrow: "Spa bookings",
    balneario_reserva_title: "Want to book a treatment?",
    balneario_reserva_desc: "Check availability and book your stay; spa access and treatments are managed together with your hotel booking.",

    restauracion_hero_lede: "Gastronomy",
    restauracion_hero_title: "Restaurants at the resort",
    restauracion_hero_desc: "Every dining spot at Caldes de Boí has its own character. Pick one to see its full menu.",
    restauracion_eyebrow: "Where to eat", restauracion_title: "Our restaurants",
    btn_ver_carta: "View menu", btn_volver_restaurantes: "Back to restaurants",

    entorno_hero_lede: "Vall de Boí",
    entorno_hero_title: "The surroundings",
    entorno_hero_desc: "Nature, heritage and mountains just a short walk from the resort.",
    entorno_link_pendiente: "Official website link pending",

    ofertas_hero_lede: "Promotions",
    ofertas_hero_title: "Offers & special packages",
    ofertas_hero_desc: "Coming soon: thermal getaways, seasonal packages and stay discounts.",
    ofertas_eyebrow: "Coming soon", ofertas_title: "New offers, very soon",
    ofertas_desc: "This section is still being defined with the commercial team (packages, seasons, discounts). Meanwhile, check availability directly in the homepage search.",
    btn_volver_hoteles: "Back to hotels",

    hotel_eyebrow: "The hotel", btn_reservar_este_hotel: "Book this hotel",
    hotel_rooms_eyebrow: "Accommodation", hotel_rooms_title: "Choose your room",
    hotel_rooms_desc: "Every room at the resort has its own character. Discover which one best fits your stay.",
    btn_reservar_habitacion: "Book this room",
    room_selected_prefix: "Selected room",
    modal_habitacion: "Room",
    gp_adults: "Adults", gp_adults_note: "Ages 13 or above",
    gp_children: "Children", gp_children_note: "Ages 0–17",
    gp_rooms: "Rooms",
    gp_pets: "Pets", gp_pets_note: "Check conditions",
    gp_apply: "Apply",
    gp_adult_singular: "adult", gp_adult_plural: "adults",
    gp_child_singular: "child", gp_child_plural: "children",
    gp_room_singular: "room", gp_room_plural: "rooms",
    gp_pet_singular: "pet", gp_pet_plural: "pets",
    hotel_termal_title: "Steps from the spa",
    hotel_termal_desc: "All Caldes de Boí guests enjoy access to the mineral-medicinal thermal circuit and the full list of spa treatments.",
    btn_ver_servicios_termales: "View thermal services",
    hotel_gastro_eyebrow: "Gastronomy", hotel_gastro_title: "Restaurants at the resort",
    hotel_gastro_desc: "Discover the different restaurants at Caldes de Boí and their menus.",
    btn_ver_restaurantes: "View restaurants",
  },

  fr: {
    nav_resort: "Le Resort", nav_hoteles: "Hôtels", nav_termal: "Eaux Thermales",
    nav_experiencias: "Expériences", nav_entorno: "Environs", nav_restauracion: "Restauration",
    nav_ofertas: "Offres", nav_reservar: "Réserver", nav_menu_open: "Ouvrir le menu", nav_menu_close: "Fermer le menu",
    brand_alt: "Caldes de Boí — Balneari Thermal Resort",
    skip_link: "Aller au contenu",
    breadcrumb_inicio: "Accueil",

    hero_home_lede: "Eaux thermales. Montagne. Bien-être.",
    hero_home_title: "Le pouvoir naturel de Caldes de Boí",
    hero_home_desc: "37 sources minéro-médicinales, deux hôtels et un cadre unique au cœur des Pyrénées.",
    btn_reservar_estancia: "Réserver un séjour",
    btn_descubrir_caldes: "Découvrir Caldes de Boí",

    bw_llegada: "Arrivée", bw_salida: "Départ", bw_huespedes: "Voyageurs", bw_hotel: "Hôtel",
    bw_hotel_any: "Peu importe", bw_submit: "Vérifier la disponibilité", bw_submit_hotel: "Vérifier la disponibilité",
    bw_aria_home: "Recherche de disponibilité", bw_aria_hotel: "Vérifier la disponibilité dans cet hôtel",
    guests_1: "1 adulte", guests_2: "2 adultes", guests_2_1: "2 adultes, 1 enfant", guests_2_2: "2 adultes, 2 enfants", guests_4: "4 adultes",

    feature_manantiales_title: "37 sources", feature_manantiales_desc: "Eaux minéro-médicinales d'origine naturelle",
    feature_balneario_title: "Thermes historiques", feature_balneario_desc: "Plus de 2 000 ans de tradition",
    feature_parque_title: "Parc National", feature_parque_desc: "Aigüestortes i Estany de Sant Maurici",
    feature_experiencias_title: "Des expériences toute l'année", feature_experiencias_desc: "Chaque saison, une émotion",

    hoteles_title: "Deux hôtels, deux façons de vivre Caldes de Boí",
    tagline_manantial: "Bien-être, tranquillité et élégance",
    tagline_caldas: "Confort, nature et esprit familial",
    btn_descubrir_hotel: "Découvrir l'hôtel",

    spa_banner_eyebrow: "Eaux thermales", spa_banner_title: "Le pouvoir naturel de nos eaux",
    spa_banner_desc: "Bien-être et santé grâce à l'eau thermale minéro-médicinale. Circuits, soins et massages dans un cadre unique.",
    btn_descubrir_balneario: "Découvrir les thermes",

    experiencias_title: "Vivez des expériences uniques",
    exp_wellness: "Wellness & Spa", exp_naturaleza: "Nature", exp_aventura: "Aventure",
    exp_gastronomia: "Gastronomie", exp_familias: "Familles", exp_cultura: "Culture",
    exp_wellness_title: "Bien-être & Spa", exp_wellness_desc: "Détendez-vous et laissez-vous choyer",
    exp_natura_title: "Randonnées et nature", exp_natura_desc: "Découvrez des paysages incroyables",
    exp_gastro_title: "Gastronomie locale", exp_gastro_desc: "Saveurs des Pyrénées",

    rooms_eyebrow: "Chambres", rooms_title: "Votre refuge à la montagne",
    rooms_desc: "Chambres et suites conçues pour votre repos, avec tout le confort et des vues uniques sur la Vall de Boí.",
    room_wifi: "WiFi gratuit", room_heating: "Chauffage", room_views: "Vue sur la montagne", room_tv: "TV écran plat",
    btn_ver_habitaciones: "Voir les chambres",

    entorno_title: "Les environs", ver_todas: "Voir tout",

    footer_newsletter_title: "Abonnez-vous à notre newsletter",
    footer_newsletter_desc: "Recevez des offres exclusives et les actualités de Caldes de Boí.",
    footer_email_label: "Adresse e-mail", footer_email_placeholder: "Votre email", footer_suscribirme: "M'abonner",
    footer_seguinos: "Suivez-nous",
    footer_col_resort: "Le Resort", footer_quienes: "Qui sommes-nous", footer_sostenibilidad: "Durabilité", footer_galeria: "Galerie", footer_contacto: "Contact",
    footer_col_hoteles: "Hôtels",
    footer_col_termal: "Eaux Thermales", footer_balneario: "Thermes", footer_tratamientos: "Soins",
    footer_col_exp: "Expériences", footer_naturaleza: "Nature", footer_gastronomia: "Gastronomie",
    footer_copyright: "© 2026 Caldes de Boí Balneari Thermal Resort",
    footer_privacidad: "Politique de confidentialité", footer_cookies: "Politique de cookies",
    modal_sim_label: "Simulation · connexion au moteur de réservation",
    modal_sim_desc: "En production, cette étape redirige (ou ouvre dans un iframe) le moteur de réservation réel configuré dans js/config.js.",
    modal_motor: "Moteur assigné", modal_entrada: "Arrivée", modal_salida: "Départ", modal_huespedes: "Voyageurs",
    modal_cerrar: "Fermer", modal_cualquiera: "L'un des deux hôtels",

    title_home: "Caldes de Boí · Balneari Thermal Resort",
    title_balneario: "Thermes · Caldes de Boí",
    title_restauracion: "Restauration · Caldes de Boí",
    title_entorno: "Environs · Caldes de Boí",
    title_ofertas: "Offres · Caldes de Boí",

    balneario_hero_lede: "Wellness & Spa",
    balneario_hero_title: "Les thermes de Caldes de Boí",
    balneario_hero_desc: "37 sources minéro-médicinales et un circuit thermal centenaire à disposition des clients des deux hôtels.",
    balneario_servicios_eyebrow: "Services thermaux",
    balneario_servicios_title: "Carte complète des services thermaux",
    balneario_servicios_desc: "Consultez toutes les catégories de soins ; déployez chaque section pour voir les services et les prix.",
    balneario_programas_eyebrow: "Programmes de santé et bien-être",
    balneario_programas_title: "Découvrez tout ce que nous pouvons faire pour vous",
    balneario_programas_desc: "Soins aux eaux minéro-médicinales, suivi médical continu et thérapies complémentaires. Téléchargez le programme en PDF ou consultez ses détails.",
    btn_descargar_programa: "Télécharger le programme (PDF)",
    approx_label: "indicatif", cat_salud: "Santé", cat_bienestar: "Bien-être", cat_belleza: "Beauté",
    btn_reservar_tratamiento: "Vous voulez réserver un soin ?",
    balneario_reserva_eyebrow: "Réservations spa",
    balneario_reserva_title: "Vous voulez réserver un soin ?",
    balneario_reserva_desc: "Consultez la disponibilité et réservez votre séjour ; l'accès aux thermes et les soins se gèrent avec la réservation d'hôtel.",

    restauracion_hero_lede: "Gastronomie",
    restauracion_hero_title: "Restaurants du complexe",
    restauracion_hero_desc: "Chaque espace gastronomique de Caldes de Boí a son propre caractère. Choisissez-en un pour voir sa carte complète.",
    restauracion_eyebrow: "Où manger", restauracion_title: "Nos restaurants",
    btn_ver_carta: "Voir la carte", btn_volver_restaurantes: "Retour aux restaurants",

    entorno_hero_lede: "Vall de Boí",
    entorno_hero_title: "Les environs",
    entorno_hero_desc: "Nature, patrimoine et montagne à portée de promenade depuis le resort.",
    entorno_link_pendiente: "Lien vers le site officiel à définir",

    ofertas_hero_lede: "Promotions",
    ofertas_hero_title: "Offres et forfaits spéciaux",
    ofertas_hero_desc: "Bientôt disponibles : escapades thermales, forfaits saisonniers et réductions sur le séjour.",
    ofertas_eyebrow: "En préparation", ofertas_title: "De nouvelles offres, très bientôt",
    ofertas_desc: "Cette section est encore en cours de définition avec l'équipe commerciale (forfaits, saisons, réductions). En attendant, consultez la disponibilité directement dans le moteur de recherche de l'accueil.",
    btn_volver_hoteles: "Retour aux hôtels",

    hotel_eyebrow: "L'hôtel", btn_reservar_este_hotel: "Réserver cet hôtel",
    hotel_rooms_eyebrow: "Hébergement", hotel_rooms_title: "Choisissez votre chambre",
    hotel_rooms_desc: "Chaque chambre du complexe a son propre caractère. Découvrez celle qui convient le mieux à votre séjour.",
    btn_reservar_habitacion: "Réserver cette chambre",
    room_selected_prefix: "Chambre sélectionnée",
    modal_habitacion: "Chambre",
    gp_adults: "Adultes", gp_adults_note: "13 ans ou plus",
    gp_children: "Enfants", gp_children_note: "0–17 ans",
    gp_rooms: "Chambres",
    gp_pets: "Animaux", gp_pets_note: "Voir conditions",
    gp_apply: "Appliquer",
    gp_adult_singular: "adulte", gp_adult_plural: "adultes",
    gp_child_singular: "enfant", gp_child_plural: "enfants",
    gp_room_singular: "chambre", gp_room_plural: "chambres",
    gp_pet_singular: "animal", gp_pet_plural: "animaux",
    hotel_termal_title: "À deux pas des thermes",
    hotel_termal_desc: "Tous les clients de Caldes de Boí bénéficient de l'accès au circuit thermal minéro-médicinal et à la liste complète des soins des thermes.",
    btn_ver_servicios_termales: "Voir les services thermaux",
    hotel_gastro_eyebrow: "Gastronomie", hotel_gastro_title: "Restaurants du complexe",
    hotel_gastro_desc: "Découvrez les différents restaurants de Caldes de Boí et leurs cartes.",
    btn_ver_restaurantes: "Voir les restaurants",
  },
};
