const APP_PREFIX = "Budget_Tracker";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const CACHED_FILES = [
  "/",
  "./css/styles.css",
  "./js/idb.js",
  "./js/index.js",
  "./index.html",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(CACHED_FILES);
    })
  );
});
