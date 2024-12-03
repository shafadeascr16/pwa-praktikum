const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/style.css',
    '/offline.html', // Halaman fallback
];


// (rest of sw.js tetap sama seperti sebelumnya, hanya update cache version & daftar URL)


// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Jika ada di cache, gunakan file dari cache
            return response || fetch(event.request).catch(() => caches.match('/offline.html'));
        })
    );
});
