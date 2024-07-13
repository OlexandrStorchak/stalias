const CACHE_NAME = 'st-alias-pwa-v8'
const urlsToCache = ['index.html', 'game.html', 'styles.css', 'scripts.js', 'manifest.json', 'favicon.png', 'logo.png']

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then((cache) => { return cache.addAll(urlsToCache); })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(caches.keys()
        .then((cacheNames) => {
            return Promise.all(cacheNames.map((cacheName) => {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            })
            )
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => { return response || fetch(event.request) }))
})
