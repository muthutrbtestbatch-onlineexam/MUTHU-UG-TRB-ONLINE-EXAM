const CACHE_NAME = 'cbt-pwa-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil( caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)) );
});

self.addEventListener('fetch', event => {
  // Never cache POST requests (which are our live Google database queries)
  if (event.request.method === 'POST') return;
  
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
