const CACHE='spartan-forge-v8-14';
const APP_SHELL=[
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './hero-top-v8.jpg',
  './mission-weight-clean-v814.jpg',
  './mission-weight-clean-v813.jpg',
  './mission-weight-clean-v812.jpg',
  './resumo-spartan-clean-v810.jpg',
  './premium-icons/painel.png',
  './premium-icons/diario.png',
  './premium-icons/musculacao.png',
  './premium-icons/hiit.png',
  './premium-icons/cardio.png',
  './premium-icons/evolucao.png',
  './premium-icons/historico.png',
  './premium-icons/perfil.png',
  './scene-musculacao.jpg',
  './scene-hiit.jpg',
  './scene-cardio.jpg',
  './scene-diario.jpg',
  './scene-evolucao.jpg',
  './scene-historico.jpg',
  './scene-perfil.jpg',
  './lightning-natural.jpg',
  './skin-musculacao.jpg',
  './skin-hiit.jpg',
  './skin-cardio.jpg',
  './skin-diario.jpg',
  './skin-medicoes.jpg',
  './skin-evolucao.jpg',
  './skin-historico.jpg',
  './skin-perfil.jpg',
  './bg-musculacao.jpg',
  './bg-hiit.jpg',
  './bg-cardio.jpg',
  './bg-diario.jpg',
  './bg-evolucao.jpg',
  './bg-historico.jpg',
  './bg-perfil.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, {cache:'no-store'})
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
    )
  );
});
