# V08-sin-internet — Sin señal, no pasa nada

**Duración:** 20 s · **Publicación:** sáb 24 oct · **Sale en:** TikTok + Instagram Reels (el mismo archivo)
**Grabaciones que necesita:** G15, G01, G08 (ver 00-GRABACIONES.md)

## Objetivo
Vender el diferencial: se juega sin internet (metro, fila, avión).

## Música y ritmo
Cotidiano y divertido. Música urbana ligera.
Efectos del juego en `blokku-ads/public/audio`: `clear.mp3`, `combo.mp3`, `place_jewel.mp3`, `wildcard.mp3`,
`levelup.mp3`, `perfect.mp3`, `gameover.mp3`, `button.mp3`. Música: libre de derechos (o una de la biblioteca
comercial de TikTok al subirlo).

## Guion cuadro por cuadro

| Tiempo | Imagen | Texto en pantalla (exacto) |
|---|---|---|
| 0.0–3.0 | G15: la mano baja la cortina y activa MODO AVIÓN (se ve el ícono). Pop del ícono de wifi tachado. | ¿Sin señal? / No pasa nada. (menta) |
| 3.0–9.0 | G15 continúa: abre Blokku y juega normal; `Bursts` en los clears. | Blokku funciona / SIN INTERNET (cian) |
| 9.0–13.0 | G01, encuadre `game`. | En el metro, la fila / o el avión |
| 13.0–17.0 | G08, zen. | Sin cuentas. / Sin registros. (rosa) |
| 17.0–20.0 | EndCard, línea gris "Gratis · Funciona sin internet". | — |

## Notas
- Esqueleto de `AdSinRed`. La prueba (modo avión real) es lo que lo hace creíble: no la quites.
- Entrega: `V08-sin-internet.mp4` (1080×1920) + un frame limpio para portada. La portada diseñada ya existe en la carpeta del día.

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
