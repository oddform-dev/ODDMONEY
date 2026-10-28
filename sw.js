const CACHE_NAME = 'kuda-babki-v3';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(res => { if (res.ok && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone())); return res; }).catch(() => event.request.mode === 'navigate' ? caches.match('./index.html') : Response.error()))); });
