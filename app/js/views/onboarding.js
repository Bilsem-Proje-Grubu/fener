import { $, on, esc, isIosStandaloneEligible } from '../util.js';
import * as store from '../store.js';
import { INTRO_CARDS } from '../howto-content.js';
import { introCardHtml } from '../howto-render.js';

const NAMES = ['Fener', 'Kaşif', 'Öncü'];
const DURATIONS = [
  { focus: 25, brk: 5 },
  { focus: 40, brk: 8 },
  { focus: 50, brk: 10 },
];

export async function renderOnboarding(root, onDone, opts = {}) {
  let name = '';
  let customName = '';
  let durationIdx = 0;
  let mainDevice = true;

  function canStart() { return !!(name || customName.trim()); }

  function paintInstallCard() {
    root.innerHTML = `
      <div class="onboard">
        <div class="step">
          <h1 class="display">Neredeyse bitti.</h1>
          <p class="hint">iPhone'da Safari, 7 gün açılmayan sitelerin verisini silebiliyor. Bunu önlemek için Fener'i ana ekranına ekle.</p>
          <ol class="hint" style="padding-left:1.2em">
            <li>Alttaki paylaş simgesine dokun.</li>
            <li>"Ana Ekrana Ekle" seçeneğini bul.</li>
            <li>Sağ üstten "Ekle"ye dokun.</li>
          </ol>
        </div>
        <button type="button" class="btn-primary btn-big" id="continueAfterInstall">Devam et</button>
      </div>`;
    on(root, 'click', '#continueAfterInstall', () => onDone());
  }

  let introIdx = 0;

  function paintIntro() {
    const last = introIdx === INTRO_CARDS.length - 1;
    const dots = INTRO_CARDS.map((c, i) => `<span class="intro-dot${i === introIdx ? ' current' : ''}"></span>`).join('');
    root.innerHTML = `
      <div class="onboard intro">
        <div class="intro-card" aria-live="polite">${introCardHtml(INTRO_CARDS[introIdx])}</div>
        <div class="intro-dots" aria-label="${introIdx + 1} / ${INTRO_CARDS.length}">${dots}</div>
        <div class="intro-actions">
          ${introIdx > 0 ? '<button type="button" class="btn-ghost" data-intro="back">Geri</button>' : '<span></span>'}
          <button type="button" class="btn-primary" data-intro="next">${last ? (opts.replay ? 'Bitti' : 'Başlayalım') : 'İleri'}</button>
        </div>
        ${last ? '' : '<button type="button" class="btn-ghost intro-skip" data-intro="skip">Geç</button>'}
      </div>`;
    const next = root.querySelector('[data-intro="next"]');
    next && next.focus({ preventScroll: true });
  }

  function endIntro() {
    if (opts.replay) { onDone(); return; }
    paint();
  }

  function paint() {
    root.innerHTML = `
      <div class="onboard">
        <div class="step">
          <h1 class="display">Merhaba.</h1>
          <p class="hint">Sana nasıl seslenelim? Bir isim seç ya da kendi adını yaz.</p>
          <div class="name-options">
            ${NAMES.map(n => `<button type="button" class="chip${name === n ? ' selected' : ''}" data-name="${esc(n)}">${esc(n)}</button>`).join('')}
          </div>
          <input type="text" id="customName" placeholder="Ya da adını yaz" value="${esc(customName)}" autocomplete="given-name">
        </div>
        <div class="step">
          <h2>Odak süresi</h2>
          <p class="hint">Çalış / mola dakikası. İstersen ayarlardan sonra değiştirirsin.</p>
          <div class="duration-cards">
            ${DURATIONS.map((d, i) => `
              <button type="button" class="duration-card${i === durationIdx ? ' selected' : ''}" data-dur="${i}">
                <span>${d.focus} / ${d.brk} dakika</span><strong>${i === durationIdx ? '✓' : ''}</strong>
              </button>`).join('')}
          </div>
        </div>
        <div class="step">
          <label class="row" style="cursor:pointer">
            <input type="checkbox" id="mainDevice" ${mainDevice ? 'checked' : ''}>
            <span>Bu, çalışacağın ana cihazın mı?</span>
          </label>
          <p class="hint">Veriler şimdilik yalnızca bu cihazda tutulur.</p>
        </div>
        <button type="button" class="btn-primary btn-big" id="start" ${canStart() ? '' : 'disabled'}>Başla</button>
      </div>`;
  }

  on(root, 'click', '[data-intro="next"]', () => {
    if (introIdx < INTRO_CARDS.length - 1) { introIdx++; paintIntro(); } else endIntro();
  });
  on(root, 'click', '[data-intro="back"]', () => { if (introIdx > 0) { introIdx--; paintIntro(); } });
  on(root, 'click', '[data-intro="skip"]', () => endIntro());
  document.addEventListener('keydown', onKey);
  function onKey(e) {
    if (!root.querySelector('.intro')) return;
    if (e.key === 'ArrowRight' && introIdx < INTRO_CARDS.length - 1) { introIdx++; paintIntro(); }
    if (e.key === 'ArrowLeft' && introIdx > 0) { introIdx--; paintIntro(); }
  }

  on(root, 'click', '[data-name]', (e, t) => { name = t.dataset.name; customName = ''; paint(); });
  on(root, 'input', '#customName', (e, t) => {
    customName = t.value;
    if (customName.trim()) name = '';
    const btn = $('#start', root);
    if (btn) btn.disabled = !canStart();
  });
  on(root, 'click', '[data-dur]', (e, t) => { durationIdx = Number(t.dataset.dur); paint(); });
  on(root, 'change', '#mainDevice', (e, t) => { mainDevice = t.checked; });
  on(root, 'click', '#start', async () => {
    if (!canStart()) return;
    const finalName = customName.trim() || name;
    const d = DURATIONS[durationIdx];
    await store.update(data => {
      data.profile.name = finalName;
      data.profile.mainDevice = mainDevice;
      data.settings.focusMinutes = d.focus;
      data.settings.breakMinutes = d.brk;
    });
    if (isIosStandaloneEligible()) { paintInstallCard(); return; }
    onDone();
  });

  paintIntro();
  return { destroy() { document.removeEventListener('keydown', onKey); } };
}
