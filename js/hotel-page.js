/* Renderiza una página de hotel a partir de HOTELS[hotelId] (config.js).
   Un mismo código sirve para hotel-manantial.html y hotel-caldas.html:
   cada HTML solo indica cuál es su hotelId en <body data-hotel-id="...">. */
document.addEventListener("DOMContentLoaded", () => {
  const hotelId = document.body.dataset.hotelId;
  const hotel = HOTELS[hotelId];
  if (!hotel) return;

  document.title = `${hotel.name} · Caldes de Boí`;

  document.querySelector("[data-hotel-hero]").setAttribute("data-img-key", hotel.heroImage);
  document.querySelector("[data-hotel-name]").textContent = hotel.name;
  document.querySelector("[data-hotel-tagline]").textContent = hotel.tagline;
  document.querySelector("[data-hotel-description]").textContent = hotel.description;

  const list = document.querySelector("[data-hotel-highlights]");
  list.innerHTML = hotel.highlights.map((h) => `<li>✓ ${h}</li>`).join("");

  const form = document.querySelector(".booking-widget");
  if (form) form.dataset.fixedHotel = hotelId;

  applyImages(); // vuelve a aplicar tras rellenar data-img-key dinámicamente
});
