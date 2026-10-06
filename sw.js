// Plan Dusa: el panel abre aunque no haya señal. Página siempre fresca si hay red; imágenes desde caché.
const CACHE = 'plan-dusa-v2';
const SHELL = ['./', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    // Solo las cachés propias: /blokku/ tiene su propia app y su propia caché
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('plan-dusa') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // HTML: red primero (para ver el plan actualizado), caché si no hay señal
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req)
      .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('./'))));
    return;
  }

  // Imágenes e íconos: llevan ?v=hash, así que caché primero es seguro
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
