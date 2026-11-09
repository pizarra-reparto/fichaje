// Archivo mínimo para que la app se pueda instalar. Siempre usa la versión más reciente de internet;
// si no hay conexión, abre la última copia guardada de la página (los fichajes se sincronizan al volver la red).
const CACHE='fichaje-v1';
self.addEventListener('install', e=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png']))); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET' || u.origin!==location.origin) return;   // Firebase y demás van directos
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
