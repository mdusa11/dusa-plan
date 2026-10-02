// Plan Dusa: el panel abre aunque no haya señal. Página siempre fresca si hay red; imágenes desde caché.
const CACHE = 'plan-dusa-v1';
const SHELL = ['./', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // HTML: red primero (para ver el plan actualizado), caché si no hay señal
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req)
      .then((res) => { caches.open(CACHE).then((c) => c.put('./', res.clone())); return res; })
      .catch(() => caches.match('./')));
    return;
  }

  // Imágenes e íconos: llevan ?v=hash, así que caché primero es seguro
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
