import { VERSION, BUILD } from './version.js';
import { $, $$ } from './util.js';
import * as store from './store.js';
import { renderOnboarding } from './views/onboarding.js';
import { renderToday } from './views/today.js';
import { renderTekrar } from './views/tekrar.js';
import { renderHafta } from './views/hafta.js';

const ROUTES = [
  { path: 'bugun', label: 'Bugün', render: renderToday },
  { path: 'tekrar', label: 'Tekrar', render: renderTekrar },
  { path: 'hafta', label: 'Hafta', render: renderHafta },
  { path: 'rehber', label: 'Rehber', render: stub('Bilimsel çalışmak', 'Rehber bölümleri burada olacak.') },
  { path: 'ayarlar', label: 'Ayarlar', render: stub('Ayarlar', 'Ad, süreler, yedek ve sıfırlama burada olacak.') },
];

function stub(title, hint) {
  return async (root) => {
    root.innerHTML = `<div class="card"><h2>${title}</h2><p class="hint">${hint}</p></div>`;
    return { destroy() {} };
  };
}

const main = $('#main');
let destroyCurrent = null;

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
    const result = await renderOnboarding(main, () => {
      document.body.classList.remove('onboarding');
      location.hash = '#/bugun';
      route();
    });
    destroyCurrent = result && result.destroy;
    return;
  }

  document.body.classList.remove('onboarding');
  const path = location.hash.replace(/^#\//, '') || 'bugun';
  const r = ROUTES.find(x => x.path === path) || ROUTES[0];
  setActive(r.path);
  main.innerHTML = '';
  main.focus();
  const result = await r.render(main);
  destroyCurrent = result && result.destroy;
}

let toastTimer;
function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
window.fenerToast = showToast;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker && worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          showToast('Yeni sürüm hazır. Yenilemek için dokun.');
        }
      });
    });
  }).catch(() => { /* çevrimdışı desteği olmadan devam */ });
}

buildNav();
window.addEventListener('hashchange', route);
route();

console.log(`Fener ${VERSION} (${BUILD})`);
