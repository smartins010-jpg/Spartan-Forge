const CACHE = 'spartan-forge-v15.03-evolucao-optimized';
const APP_SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './hero-top-v8.jpg', './memorial-historico-v14.jpg', './perfil-spartan-v11.jpg', './splash-helmet-v108.png', './strava-config.js', './music-deezer-icon.svg', './gerador-spartan-banner.png',
  './audio/three.mp3','./audio/two.mp3','./audio/one.mp3','./audio/go.mp3','./audio/ready.mp3','./audio/rest.mp3','./audio/complete.mp3','./audio/halfway.mp3','./audio/last10.mp3','./audio/go-impact.mp3','./audio/rest-signal.mp3',
  './assets/embedded/000418466103895c.png','./assets/embedded/0831b0230f857a51.jpg','./assets/embedded/0b208a75a548a728.png','./assets/embedded/11ec62f5099207bd.png','./assets/embedded/1c3a2b107f803feb.png','./assets/embedded/213cdaea7c7035ea.png','./assets/embedded/301f9ef23cd52262.jpg','./assets/embedded/3895ae22d6d85575.png','./assets/embedded/39dfb9366f3ac921.png','./assets/embedded/3a4b022739fa12d5.png','./assets/embedded/453d88487442eb9f.png','./assets/embedded/480a762f1782eae2.png','./assets/embedded/637c949b60806a26.png','./assets/embedded/8357b058813b98c1.jpg','./assets/embedded/8cda6256118a86dd.jpg','./assets/embedded/8d7d54bbfea9b56f.jpg','./assets/embedded/95dc289dd4a4c052.jpg','./assets/embedded/9954ab419ecdb983.jpg','./assets/embedded/9afcf1ea90c61487.png','./assets/embedded/b43fdca19bab69e3.jpg','./assets/embedded/bbd1761eb58c2481.png','./assets/embedded/c73bf90fc00a5f34.jpg','./assets/embedded/e14315efec69e019.jpg','./assets/embedded/e238db6964d27209.jpg','./assets/embedded/ec51aace39ffc7f1.jpg','./assets/embedded/f27a9579e0e87a0e.png','./assets/embedded/f29dd4eccf45b414.jpg','./assets/embedded/f3a9467f856eb2c7.png'
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
