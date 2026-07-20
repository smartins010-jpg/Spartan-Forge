const CACHE='spartan-forge-v10.28';
const APP_SHELL=[
  './','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png',
  './hero-top-v8.jpg','./splash-helmet-v108.png','./strava-config.js',
  './exercise-press-machine-premium.webp','./exercise-floor-press-bar-premium.webp',
  './exercise-floor-press-dumbbells-premium.webp','./exercise-pushup-classic-premium.webp',
  './exercise-pushup-incline-premium.webp','./exercise-pushup-decline-premium.webp',
  './exercise-lat-pulldown-machine-premium.webp','./exercise-lat-pulldown-close-premium.webp',
  './exercise-lat-pulldown-wide-premium.webp','./exercise-dumbbell-pullover-premium.webp'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
