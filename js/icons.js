/* =========================================================================
   ICONS.JS — set único de iconos SVG (sprite inline)
   Sustituye a los emojis: mismo trazo (1.75px, no escala con el tamaño),
   misma caja de 24x24 y color heredado del texto (currentColor).

   Uso en HTML estático:
     <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-drop"></use></svg>
   Uso en plantillas JS:   ${icon("drop")}   ·   ${icon("drop", "icon-lg")}
   Los iconos son decorativos (aria-hidden): el significado siempre lo
   aporta el texto de al lado o un aria-label en el botón/enlace.
   Para añadir uno: nueva entrada en ICON_PATHS (trazos sobre viewBox 24x24).
   ========================================================================= */
const ICON_PATHS = {
  calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17.5 14.5c2.4.2 4 2 4 5.5"/>',
  building: '<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 10h4a1 1 0 0 1 1 1v10M2 21h20M8 8h3M8 12h3M8 16h3"/>',
  bed: '<path d="M3 20v-9M3 16h18M21 20v-6a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="12.5" r="1.8"/>',
  drop: '<path d="M12 3c3.5 4.5 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.5-6.5 6-11z"/>',
  landmark: '<path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2.5 10 12 4l9.5 6z"/>',
  tree: '<path d="M12 3 6.5 11h3L5 17h14l-4.5-6h3z"/><path d="M12 17v4"/>',
  leaf: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-7 9-9"/>',
  mountain: '<path d="M2.5 20 9 8.5l4 6.5 2.5-4 6 9z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
  utensils: '<path d="M6 3v7a3 3 0 0 0 6 0V3M9 3v18M17 21V3c-2.5 1.5-4 4.5-4 8v3h4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wifi: '<path d="M2.5 9a15 15 0 0 1 19 0M5.5 12.5a10.5 10.5 0 0 1 13 0M8.8 16a5.5 5.5 0 0 1 6.4 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/>',
  flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2.3 1.4 1 2.2 1.8 2.5C10.5 8.5 11 5.5 12 3z"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.2v.1"/>',
  shield: '<path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6z"/><path d="m9 12 2.2 2.2L15 10"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="8" cy="8" r="1.3"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
  facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.5c0-1 .4-1.7 1.8-1.7H17.5V2.7A22 22 0 0 0 15 2.5c-2.6 0-4.3 1.6-4.3 4.4v2.6H8V13h2.7v8z"/>',
  youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
};

function icon(name, extraClass) {
  return `<svg class="icon${extraClass ? " " + extraClass : ""}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
}

(function injectIconSprite() {
  if (document.getElementById("icon-sprite")) return;
  // vector-effect en cada forma => el grosor del trazo es el mismo (px) a cualquier tamaño.
  const symbols = Object.entries(ICON_PATHS)
    .map(([name, body]) => {
      const fixed = body.replace(/<(path|circle|rect)\b/g, '<$1 vector-effect="non-scaling-stroke"');
      return `<symbol id="i-${name}" viewBox="0 0 24 24">${fixed}</symbol>`;
    })
    .join("");
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<svg id="icon-sprite" class="icon-sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`
  );
})();
