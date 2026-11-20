// ARMEX: تثبيت الموقع + تخزين الصور محلياً (أول زيارة تحميل، وبعدها فوري). ما بيخزّن صفحات حتى ما تعلق نسخة قديمة.
const IMG = 'armex-img-v1';
const HOME = ['i002','i003','i004','i005','i006','i007','i008','i009','i010','i011','i012','i013','i014','i015','i016'].map(n => n + '.webp');
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(IMG).then(c => Promise.allSettled(HOME.map(u => c.add(u)))));
});
self.addEventListener('activate', e => e.waitUntil(Promise.all([
  self.clients.claim(),
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('armex-img-') && k !== IMG).map(k => caches.delete(k))))
])));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin || !/\.(webp|png|jpe?g)$/i.test(u.pathname)) return;
  e.respondWith(caches.open(IMG).then(async c => {
    const hit = await c.match(r);
    const net = fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
