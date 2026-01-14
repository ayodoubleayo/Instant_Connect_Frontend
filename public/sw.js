self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first strategy (safe for auth apps)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
