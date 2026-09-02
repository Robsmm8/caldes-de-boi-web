# Créditos de imágenes

Las imágenes de este prototipo (`js/config.js`) vienen de tres orígenes distintos:

## 1. Fotos propias del hotel (`assets/img/`)

Facilitadas directamente para este proyecto. Son las que deben ir
sustituyendo/ampliando al resto según se disponga de más material:

| Imagen (clave en config.js) | Archivo |
|---|---|
| `heroHome`, `hotelManantialHero`, `hotelManantialThumb` | `assets/img/hero-manantial-aerea.jpg` (foto aérea real del Hotel Manantial) |
| `hotelCaldasHero`, `hotelCaldasThumb` | `assets/img/hotel-caldas-patio.jpg` (patio interior real del Hotel Caldas) |
| Logo del header | `assets/img/logo-resort.png` |

## 2. Fotos reales ya publicadas en caldesdeboi.com

Son propiedad del hotel (hotlink directo a vuestro propio servidor
mientras tanto), no requieren atribución. Cuando migréis de verdad,
convendría copiarlas también a `assets/img/` para no depender de que
caldesdeboi.com siga sirviéndolas:

| Imagen (clave en config.js) | Contenido real |
|---|---|
| `roomSuite` | Habitación real del Hotel Manantial |
| `spaBanner` | Tratamiento con chorros de agua termal |
| `spaInterior` | Tratamiento facial en cabina de spa |
| `experienceWellness` | Tratamiento con barro/lodo termal |
| `entornoRutas` | Senderistas junto a un puente del valle |
| `restauranteManantial` | Interior/lobby del Hotel Manantial |

## 3. Fotos del entorno (Wikimedia Commons, licencia libre)

El Parque Nacional, la iglesia de Taüll, la estación de esquí y los
platos típicos del Pirineo no son propiedad del hotel (son lugares/platos
genéricos de la comarca), así que estas sí llevan crédito obligatorio si
se publican tal cual:

| Imagen (clave en config.js) | Archivo en Commons | Autor | Licencia |
|---|---|---|---|
| `entornoParque`, `experienceNature` | [Llac de Sant Maurici (Catalonia).jpg](https://commons.wikimedia.org/wiki/File:Llac_de_Sant_Maurici_(Catalonia).jpg) | Merdaseca | CC BY-SA 3.0 |
| `entornoIglesia` | [Sant Climent de Taüll, campanar i absis.jpg](https://commons.wikimedia.org/wiki/File:Sant_Climent_de_Ta%C3%BCll,_campanar_i_absis.jpg) | Jordi Domènech | CC BY-SA 3.0 |
| `entornoEsqui` | [Ski resort Boí-Taüll.jpg](https://commons.wikimedia.org/wiki/File:Ski_resort_Bo%C3%AD-Ta%C3%BCll.jpg) | Antoni_mo | Dominio público |
| `entornoPueblos` | [Vall de Boí. Taüll. Sant Martí 1.JPG](https://commons.wikimedia.org/wiki/File:Vall_de_Bo%C3%AD._Ta%C3%BCll._Sant_Mart%C3%AD_1.JPG) | Gustau Erill i Pinyot | CC BY-SA 3.0+ |
| `experienceGastronomy` | [Escudella Catalana - Barcelona (2011).JPG](https://commons.wikimedia.org/wiki/File:Escudella_Catalana_-_Barcelona_(2011).JPG) | Tamorlan | CC BY 3.0 |
| `restauranteCaldas` | [Trinxat de La Cerdanya.jpg](https://commons.wikimedia.org/wiki/File:Trinxat_de_La_Cerdanya.jpg) | Kronologiko | CC BY-SA 4.0 |
| `restauranteBarTermal` | [Croquetas jamón y cecina.jpg](https://commons.wikimedia.org/wiki/File:Croquetas_jam%C3%B3n_y_cecina.jpg) | Amasuela | CC BY-SA 4.0 |

## Vídeo de portada (opcional, desactivado)

`js/config.js` incluye `HERO_VIDEO`, hoy vacío. caldesdeboi.com tiene un
vídeo real de aguas/naturaleza
(`https://www.caldesdeboi.com/wp-content/uploads/2021/09/Naturaleza-02.mp4`)
que se puede usar como fondo del hero en lugar de la foto fija — basta con
pegar esa URL (o la de vuestro propio vídeo) en `HERO_VIDEO`.

## Motor de reservas: pista encontrada

Al revisar caldesdeboi.com se detectó que el Hotel Manantial ya usa un
motor de reservas en `hotelmanantial.backhotelite.com` (widgets "ROI") —
por el patrón de dominio (`back<nombrehotel>.com`) todo apunta a
**Roiback** como proveedor real. Merece la pena confirmarlo con el hotel
para rellenar `BOOKING_ENGINES` en `js/config.js` con los datos reales en
lugar de los de ejemplo.
