const VERSION = '0.1.3';
const CACHE = `fener-${VERSION}`;
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './css/app.css?v=0.1.3', './css/tokens.css', './css/tour.css?v=0.1.3', './js/app.js?v=0.1.3',
  './js/version.js', './js/util.js', './js/store.js', './js/timer.js', './js/spaced.js', './js/guide-content.js', './js/howto-content.js', './js/howto-render.js', './js/views/nasil.js',
  './js/views/onboarding.js', './js/views/today.js', './js/views/tekrar.js', './js/views/hafta.js',
  './js/views/rehber.js', './js/views/ayarlar.js',
  './fonts/fonts.css',
  './fonts/figtree-normal-latin.woff2', './fonts/figtree-normal-latin-ext.woff2',
  './fonts/figtree-italic-latin.woff2', './fonts/figtree-italic-latin-ext.woff2',
  './fonts/fraunces-normal-latin.woff2', './fonts/fraunces-normal-latin-ext.woff2',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Sayfa açılışı önce internetten dener; çevrimdışıysa önbellekten döner.
// Diğer dosyalar önce önbellekten, arka planda güncellenir.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => { caches.open(CACHE).then(c => c.put('./index.html', res.clone())); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
      }
      return res;
    }))
  );
});
