self.addEventListener('install', (e) => {
  console.log('BLI App Yüklendi!');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
