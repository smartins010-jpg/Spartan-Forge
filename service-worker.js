const CACHE = 'spartan-forge-v8-40-icones-consistentes';
const APP_SHELL = [
  './','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png',
  './hero-top-v8.jpg','./premium-icons/agua.png','./premium-icons/cafe.png','./premium-icons/musculacao.png','./premium-icons/hiit.png','./premium-icons/cardio.png','./premium-icons/evolucao.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate' || event.request.url.endsWith('/index.html')) {
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('./index.html',c));return r;}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(event.request,c));return r;}).catch(()=>caches.match(event.request)));
});
