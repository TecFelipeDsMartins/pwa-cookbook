<span class="requirements">Prerequisites: read the page <a href="service-workers.md">Service Workers</a>, advanced knowledge in JavaScript</span>

Common strategies for network cache management
===============================================

First of all, let's define some utility functions which will be used for defining our strategies. They need to be included in the service worker:

```javascript
 function fromNetwork(request) {
   return new Promise(function (resolve, reject) {
     let timeoutId = setTimeout(reject, TIMEOUT); // Reject in case of timeout.
     fetch(request).then(response => {
       clearTimeout(timeoutId);
       resolve(response); // Fulfill in case of success.
     }, reject);  // Reject also if network fetch rejects.
   });
 }

 function fromCache(request) {
   return caches.open(CACHE) // Open the cache where the assets were stored
    .then(cache => cache.match(request)) // search for the requested resource
    .then(match => match || Promise.reject('no-match')) // reject if not found
 }

 function updateCache(request) {
   return caches.open(CACHE) // Open the cache where the assets were stored
   .then(cache => fetch(request)) // fetch the network
   .then(response => cache.put(request, response)) // store response in cache
 }
 ```

In the following sections, we define some cache management strategies.

## Fallback cache

The service worker tries the first time to retrieve the content from the network. However, if the request takes too much time, it serves the cached version if it is available.

 ```javascript
 self.addEventListener('fetch', event => event.respondWith(
   fromNetwork(event.request).catch(() => fromCache(event.request))
 ));
 ```
## Cache and update

The service worker returns directly the cached version of the resource if available, and it requests if from the network in parallel and updates the cache when the request succeeds.

  ```javascript
self.addEventListener('fetch', function(event) {
    // answer immediately, without waiting for the network response
    event.respondWith(fromCache(event.request));
    // prevent the worker from being killed until the cache is updated
    event.waitUntil(updateCache(event.request));
})
  ```

## Cache, update and refresh

This strategy is a variant of the previous one with the addition of updating the UI when the request succeeds. A rendering of the page is thus performed twice (one for the cached resource and another one after loading it from the network). This strategy is really interesting for frameworks that use a virtual DOM that limits the impact of the second rendering.

 ```javascript
 self.addEventListener('fetch', function(event) {
     event.respondWith(fromCache(event.request));
     event.waitUntil(updateCache(event.request).then(refresh));
 });

function refresh(response) {
    return self.clients.matchAll()
    .then(clients => clients.forEach(client => {
        // send a message to be handled by the client
        client.postMessage(JSON.stringify({
            type: 'refresh',
            url: response.url
        }))
    }))
}
```

## Precaching

The service worker pre-caches all the resources to be cached. These resources are listed in a JSON file.

This strategy is useful for immediately providing the full app in offline mode. However, this requires a lot of requests and bandwidth as soon as the page is loaded. In this case, it can be compared to a silent app install.

```javascript
  self.addEventListener('install', function(event) {
    event.waitUntil(Promise.all([
      caches.open(CACHE),
      fetch('files-to-cache.json').then(res => res.json())
    ]).then(([cache, files]) => cache.addAll(files)))
  })
```

## Going further

Other strategies are provided by Mozilla along with their commented code in [serviceworke.rs](http://serviceworke.rs)

---

[Service Workers](service-workers.md)

[Optimistic UI](optimistic-ui.md)

[Browser data caches](data-cache.md)
