self.addEventListener('install', (e) => {
  e.waitUntil(
      caches.open('st-alias-pwa').then((cache) => {
          return cache.addAll([
              'index.html',
              'styles.css',
              'scripts.js',
              'manifest.json',
              'favicon.png'
          ])
      })
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
      caches.match(e.request).then((response) => {
          return response || fetch(e.request)
      })
  )
})
