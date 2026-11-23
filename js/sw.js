// Service Worker for Mellowbites PWA
const CACHE_NAME = 'mellowbites-pwa-v1';

// Aset inti yang dicache saat service worker dipasang
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/supabase-config.js',
  './manifest.json',
  './img/logo.webp',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/icon-maskable-512.png',
  './img/Double Choco.webp',
  './img/Durian Choco.webp',
  './img/Mango.webp',
  './img/Matcha regal.webp',
  './img/Strawberry Matcha.webp',
  './img/Strawberry.webp',
  './img/Taro.webp',
  './img/vanilla oreo.webp'
];

// 1. Install Event: Simpan aset inti ke Cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Sebagian file gagal di-precache:', err);
      });
    })
  );
});

// 2. Activate Event: Bersihkan cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Menghapus cache lama:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Strategi Network-First dengan Cache Fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Jangan cache atau cegat request non-GET (POST, PUT, DELETE, dll)
  if (request.method !== 'GET') {
    return;
  }

  // Lewatkan request API Supabase & Realtime WebSocket langsung ke jaringan
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  // Untuk navigasi halaman (HTML): Coba jaringan dulu, jika offline ambil dari cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('./index.html').then((cachedResponse) => {
            return cachedResponse || caches.match('./');
          });
        })
    );
    return;
  }

  // Untuk file statis (CSS, JS, Gambar, Font): Network-First dengan Cache Fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Jika gambar tidak ditemukan saat offline, berikan logo sebagai fallback
          if (request.destination === 'image') {
            return caches.match('./img/logo.webp');
          }
          return new Response('Offline - Konten belum tersedia dalam cache.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        });
      })
  );
});
