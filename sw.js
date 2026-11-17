// خدمة بسيطة: تخلّي الموقع قابل للتثبيت، وما بتخزّن صفحات (حتى ما تعلق نسخة قديمة)
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {});
