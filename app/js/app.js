import { VERSION, BUILD } from './version.js';
import { $, $$ } from './util.js';
import * as store from './store.js';
import { renderOnboarding } from './views/onboarding.js';
import { renderToday } from './views/today.js';
import { renderTekrar } from './views/tekrar.js';
import { renderHafta } from './views/hafta.js';
import { renderRehber } from './views/rehber.js';
import { renderAyarlar } from './views/ayarlar.js';
import { renderNasil } from './views/nasil.js';

const ROUTES = [
  { path: 'bugun', label: 'Bugün', render: renderToday },
  { path: 'tekrar', label: 'Tekrar', render: renderTekrar },
  { path: 'hafta', label: 'Hafta', render: renderHafta },
  { path: 'rehber', label: 'Rehber', render: renderRehber },
  { path: 'ayarlar', label: 'Ayarlar', render: renderAyarlar },
];

const main = $('#main');
let destroyCurrent = null;

// Menüde görünmeyen, ama adresle ve ? düğmesiyle açılan ekranlar.
const HIDDEN_ROUTES = [
  { path: 'nasil', label: 'Fener nasıl çalışır', render: renderNasil },
];

function buildNav() {
  const items = ROUTES.map(r => `<li><a href="#/${r.path}" data-path="${r.path}">${r.label}</a></li>`).join('');
  $('#nav').innerHTML = items;
  $('#tabs').innerHTML = items;
}

function setActive(path) {
  $$('.nav a').forEach(a => a.classList.toggle('active', a.dataset.path === path));
}

async function route() {
  const onboarded = await store.isOnboarded();

  if (destroyCurrent) { destroyCurrent(); destroyCurrent = null; }

  if (!onboarded) {
    document.body.classList.add('onboarding');
    const view = document.createElement('div');
    main.replaceChildren(view);
    const result = await renderOnboarding(view, () => {
      document.body.classList.remove('onboarding');
      location.hash = '#/bugun';
      route();
    });
    destroyCurrent = result && result.destroy;
    return;
  }

  document.body.classList.remove('onboarding');
  const [path, query] = (location.hash.replace(/^#\//, '') || 'bugun').split('?');
  const r = ROUTES.find(x => x.path === path) || HIDDEN_ROUTES.find(x => x.path === path) || ROUTES[0];
  setActive(r.path);
  const view = document.createElement('div');
  main.replaceChildren(view);
  main.focus();
  window.scrollTo(0, 0);
  const result = await r.render(view, new URLSearchParams(query || ''));
  destroyCurrent = result && result.destroy;
}

let toastTimer;
function showToast(msg, onTap) {
  const t = $('#toast');
  t.textContent = msg;
  t.onclick = onTap || null;
  t.classList.toggle('tappable', !!onTap);
  t.classList.add('show');
  clearTimeout(toastTimer);
  // Dokunulacak bildirim kaybolmaz; öğrenci dokunana kadar kalır.
  if (!onTap) toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
window.fenerToast = showToast;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker && worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          showToast('Yeni sürüm hazır. Yenilemek için dokun.', () => location.reload());
        }
      });
    });
  }).catch(() => { /* çevrimdışı desteği olmadan devam */ });
}

buildNav();
window.addEventListener('hashchange', route);
route();

console.log(`Fener ${VERSION} (${BUILD})`);
