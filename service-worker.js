const CACHE = 'spartan-forge-v10.63';
const APP_SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './hero-top-v8.jpg', './splash-helmet-v108.png', './strava-config.js', './music-deezer-icon.svg', './gerador-spartan-banner.png',
  './audio/three.mp3','./audio/two.mp3','./audio/one.mp3','./audio/go.mp3','./audio/ready.mp3','./audio/rest.mp3','./audio/complete.mp3','./audio/halfway.mp3','./audio/last10.mp3','./audio/go-impact.mp3','./audio/rest-signal.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const isNavigation = event.request.mode === 'navigate';
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (isNavigation) return caches.match('./index.html');
        return Response.error();
      })
  );
});
