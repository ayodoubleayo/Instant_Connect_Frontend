self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 🚫 DO NOT INTERCEPT AUTH / RECOVERY LINKS
  if (
    url.hash.includes("access_token") ||
    url.searchParams.get("type") === "recovery"
  ) {
    return; // browser handles it directly
  }

  // ✅ Normal network-first strategy
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
