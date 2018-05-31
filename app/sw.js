workbox.precaching.precacheAndRoute(self.__precacheManifest || []);


workbox.routing.registerNavigationRoute('/index.html');

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 30,
        // Cache for a maximum of a month
        maxAgeSeconds: 30 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ],
    }),
);

workbox.routing.registerRoute(
  // Cache json
  /.*(config.json)/,
  // Use the cache if no network
  workbox.strategies.networkFirst({
    // Use a custom cache name
    cacheName: 'json-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 5
      }),
      new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
      }),
    ],
  })
);

/*workbox.routing.setDefaultHandler(workbox.strategies.networkFirst(
    {networkTimeoutSeconds: 6}
));*/
