/* Renderiza una página de hotel a partir de HOTELS[hotelId] (config.js).
   Un mismo código sirve para hotel-manantial.html y hotel-caldas.html:
   cada HTML solo indica cuál es su hotelId en <body data-hotel-id="...">. */
function renderHotelPage() {
  const hotelId = document.body.dataset.hotelId;
  const hotel = HOTELS[hotelId];
  if (!hotel) return;

  document.title = `${tr(hotel.name)} · Caldes de Boí`;

  document.querySelector("[data-hotel-hero]").setAttribute("data-img-key", hotel.heroImage);
  document.querySelectorAll("[data-hotel-name]").forEach((el) => (el.textContent = tr(hotel.name)));
  document.querySelector("[data-hotel-tagline]").textContent = tr(hotel.tagline);
  document.querySelector("[data-hotel-description]").textContent = tr(hotel.description);

  const list = document.querySelector("[data-hotel-highlights]");
  list.innerHTML = tr(hotel.highlights).map((h) => `<li>✓ ${h}</li>`).join("");

  const form = document.querySelector(".booking-widget");
  if (form) form.dataset.fixedHotel = hotelId;

  applyImages(); // vuelve a aplicar tras rellenar data-img-key dinámicamente
}
window.rerenderDynamicContent = renderHotelPage;
document.addEventListener("DOMContentLoaded", renderHotelPage);
