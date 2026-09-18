const CACHE_NAME = 'upsc-hindu-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch - Network first for HTML, Cache first for assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET and chrome extensions
  if (req.method !== 'GET' || url.protocol.startsWith('chrome')) return;

  // For navigation requests - network first, fallback to cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match('/index.html') || caches.match(req))
    );
    return;
  }

  // For other assets - cache first, then network
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Cache successful responses
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return res;
      }).catch(() => {
        // Offline fallback for images
        if (req.destination === 'image') {
          return caches.match('/icon-192.png');
        }
      });
    })
  );
});

// Background sync for daily update (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'daily-sync') {
    event.waitUntil(
      // In real app, fetch new briefing
      console.log('Background sync: daily briefing update')
    );
  }
});

// Push notification handler (for future daily reminders)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'UPSC Hindu', body: 'Your daily briefing is ready - 12 stories' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [100, 50, 100],
      data: { url: '/' }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const action = event.action;
  let url = event.notification.data?.url || '/';
  
  if (action === 'quiz') {
    url = '/?tab=quiz';
  } else if (action === 'open' || !action) {
    url = '/?tab=today';
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // If app already open, focus it
      for (let client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed', event.notification.tag);
});
