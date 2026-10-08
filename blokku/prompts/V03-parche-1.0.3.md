# V03-parche-1.0.3 — Llegó la 1.0.3

**Duración:** 18 s · **Publicación:** el día que la 1.0.3 salga en Google Play (tentativo mié 14 oct) · **Sale en:** TikTok + Instagram Reels (el mismo archivo)
**Grabaciones que necesita:** G10, G11, G13, G14 (ver 00-GRABACIONES.md)

## Objetivo
Contar en 18 s qué cambió en la 1.0.3 y que actualicen. Va junto con el carrusel P03.

## Música y ritmo
Novedad, optimista. Música media (110 BPM), transiciones tipo barrido diagonal (`Transition`).
Efectos del juego en `blokku-ads/public/audio`: `clear.mp3`, `combo.mp3`, `place_jewel.mp3`, `wildcard.mp3`,
`levelup.mp3`, `perfect.mp3`, `gameover.mp3`, `button.mp3`. Música: libre de derechos (o una de la biblioteca
comercial de TikTok al subirlo).

## Guion cuadro por cuadro

| Tiempo | Imagen | Texto en pantalla (exacto) |
|---|---|---|
| 0.0–1.8 | `GemRain` de fondo. "1.0.3" gigante (220 px, rosa con contorno) cae y rebota como si fuera una pieza. Sticker arriba. | Sticker: NUEVA VERSIÓN · Texto: 1.0.3 |
| 1.8–5.0 | Pantalla partida vertical: a la izquierda el menú ANTES (captura `menu_102`, ya recortada en `agencia/marca/blokku/_fuente/assets/screens/menu_102.jpg`), a la derecha G10 (menú nuevo). Barrido de izquierda a derecha que "limpia" el antes. Etiquetas ANTES (gris) / AHORA (menta). | Menú / nuevo |
| 5.0–8.5 | G10 con zoom a la tarjeta de MISIONES DIARIAS: se ve la tarea, el +XP y "Nuevas en X h"; el dedo toca RECLAMAR (late) y el anillo de nivel arriba avanza. `levelup.mp3` al cobrar. | Misiones que te / dicen qué hacer (menta) |
| 8.5–11.0 | G13: el dedo toca el HUECO de una pieza en L (no un bloque) y aun así la agarra. Círculo blanco que marca el toque. | Piezas más fáciles / de agarrar |
| 11.0–13.5 | G14: tablet girando de vertical a horizontal con Blokku abierto (si no hay toma de tablet, sustituye por un sticker grande "TABLET EN HORIZONTAL" sobre el juego). | Tablet en / horizontal (cian) |
| 13.5–15.0 | Dos stickers que entran seguidos sobre G01 desenfocado. | MEJOR CON TALKBACK · LOGO EN LAS NOTIFICACIONES |
| 15.0–18.0 | EndCard con botón cambiado a "ACTUALIZA GRATIS" y línea gris "Versión 1.0.3". | Frase: Blokku se renueva |

## Notas
- **No publicar antes** de que la ficha de Play muestre la 1.0.3.
- G11 (la hoja de Novedades) es opcional: si la grabas, úsala de 1.8 a 3.0 s antes del antes/ahora.
- Entrega: `V03-parche-1.0.3.mp4` (1080×1920) + un frame limpio para portada. La portada diseñada ya existe en la carpeta del día.

## Contexto de marca (no cambiar)

- **Blokku**: puzzle de bloques 8×8 para Android, de Dusa Solutions (Guadalajara, MX). Gratis, se juega sin internet.
- **Formato:** 1080×1920, 30 fps (60 si la grabación lo permite), H.264 MP4, CRF 16–18, audio AAC 320 kbps, −14 LUFS.
- **Zonas seguras (TikTok + Reels):** nada que se lea arriba de y=150, debajo de y=1500 ni a la derecha de x=960.
  El juego puede extenderse a esas zonas; el texto no. Instagram recorta el centro 3:4 (y 240–1680) en el perfil.
- **Paleta:** fondo degradado `#1B3072 → #10214F → #07112E`; azul `#4EA1FF`, rosa `#FF5D8F`, oro `#FFC93C`,
  menta `#43D9A3`, cian `#3ED1E0`, texto `#F5F7FF`.
- **Tipografía:** Fredoka Bold/SemiBold (títulos), Nunito SemiBold (textos). Ya están en `blokku-ads/public/fonts`.
- **Títulos:** Fredoka 700, blancos con UNA línea resaltada en color, contorno `#0A1433` de ~9 % del tamaño
  (`-webkit-text-stroke` + `paint-order: stroke fill`), sombra sólida `0 8px 0 #050C24`. Entran con "pop" (spring).
- **Wordmark:** `BLO` azul + `KKU` rosa, Fredoka Bold. Icono (nuevo, oct-2026): 4 gemas 2×2 inclinadas con canto 3D (azul, rosa, oro, menta) → `public/brand/icon.png`.
- **Recursos que hacen que se vea Blokku:** gemas brillantes flotando en los bordes (componente `Gem`/`Atmosphere`),
  partículas de colores al reventar líneas (`Particles`/`Bursts`), etiquetas tipo píldora (`Sticker`), el juego dentro
  de un marco con bisel azul (`GameView`).
- **Proyecto base:** `~/StudioProjects/blokku-ads` (Remotion 4). Reutiliza `Shell`, `GameView`, `Headline`, `Sticker`,
  `Bursts`, `Sfx`, `EndCard`, `PlayBadge`, `GemRain` de `src/kit.tsx` y `src/components.tsx`. Los clips que hay en
  `public/clips` son del emulador (entrecortados): **sustitúyelos por las grabaciones nuevas del teléfono** (ver
  00-GRABACIONES.md) y vuelve a medir los tiempos de cada línea que revienta en `clipTimes.json`.
- **Cierre estándar (EndCard):** icono que entra con giro → wordmark → frase en oro → botón menta "DESCÁRGALO GRATIS"
  latiendo → insignia "DISPONIBLE EN Google Play" → línea gris "Gratis · Sin internet". 3 s mínimo.

## Reglas de verdad (obligatorias)

- Solo gameplay **real** grabado de la app publicada. Nada de tableros falsos simulando partida.
- No decir "sin anuncios", "iPhone/App Store", cifras de descargas/estrellas, ni "el más adictivo".
- Nombres exactos de poderes: **BOMBA** (área 3×3), **RAYO** (una fila), **RETROCESO**, **MEZCLA**, **DESTRUCTOR DE COLOR**.
  Modos: **CLÁSICO**, **CONTRA RELOJ** (90 s), **ZEN** (sin game over), **DESAFÍO DIARIO** (sin poderes).
- Ningún número en pantalla que el video no muestre (puntajes, récords): si se dice, se ve.
