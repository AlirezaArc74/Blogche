// let cacheData = "appV1";
// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         "/http://localhost:3001/",
//         "/http://static/js/bundle.js",
//         "/index.html",
//         "allblog",
//       ]);
//     })
//   );
// });

// this.addEventListener("fetch", (event) => {
//   if (!navigator.onLine) {
//     event.respondWith(
//       caches.match(event.request).then((res) => {
//         if (res) {
//           return res;
//         }
//       })
//     );
//   }
// });

// addEventListener('fetch', event => {
//   // Prevent the default, and handle the request ourselves.
//   event.respondWith(async function() {
//     // Try to get the response from a cache.
//     const cachedResponse = await caches.match(event.request);
//     // Return it if we found one.
//     if (cachedResponse) return cachedResponse;
//     // If we didn't find a match in the cache, use the network.
//     return fetch(event.request);
//   }());
// });

// console.log("ok")
///////////////////////////////

// import felan from "../src/pages/AllBlog.js"

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


