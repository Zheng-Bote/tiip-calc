/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// precaching
import { precacheAndRoute } from 'workbox-precaching'
precacheAndRoute(self.__WB_MANIFEST)

console.log('custom service worker is active');
self.__WB_DISABLE_DEV_LOGS = true;


/* --funktioniert--
// background sync
let backgroundSyncSupported = 'sync' in self.registration ? true : false;
console.log("backgroudsync", backgroundSyncSupported);


import { Queue } from "workbox-background-sync";

// events - fetch

let ratesQueue = null;
if(backgroundSyncSupported) {
  ratesQueue = new Queue("ratesQueue");
}

if(backgroundSyncSupported) {
  self.addEventListener("fetch", (event) => {
    if(event.request.url.endsWith('/currency2.json')) {
      const promiseChain = fetch(event.request.clone()).catch((err) => {
        return ratesQueue.pushRequest({request: event.request});
      });
    }
    event.waitUntil(promiseChain);
  });
}
*/
