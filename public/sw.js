console.log("My custom service worker");
const self = this;
const staticCacheName = "site-static";

self.addEventListener("install", (event) => {
  console.log("service worker has been installed");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return (
        console.log("caching shell assets"),
        cache.addAll([])
      );
    })
  );
});


self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request).then((response) => {
          return caches.open(staticCacheName).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch((error) => {
        console.log(error)
      })
  );
});


self.addEventListener("activate", (event) => {
  // console.log("service worker has been activated");
  console.log("Activating new service worker...");

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


