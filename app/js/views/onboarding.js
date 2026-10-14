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
  let customFocus = '';
  let customBrk = '';
  let mainDevice = true;

  function customDur() {
    const f = Math.round(Number(customFocus)), b = Math.round(Number(customBrk));
    return f >= 1 && f <= 180 && b >= 1 && b <= 60 ? { focus: f, brk: b } : null;
  }
  function missing() {
    const m = [];
    if (!(name || customName.trim())) m.push('İsim girmediniz, lütfen bir isim seçin ya da adınızı yazın.');
    if (durationIdx === -1 && !customDur()) m.push('Kendi süreniz eksik ya da geçersiz, lütfen çalışma (1-180) ve mola (1-60) dakikasını girin.');
    return m;
  }
  function canStart() { return missing().length === 0; }
  function showWarn() {
    const box = $('#startWarn', root);
    if (box) box.innerHTML = missing().map(t => `<p>${esc(t)}</p>`).join('');
  }

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
            <div class="duration-card${durationIdx === -1 ? ' selected' : ''}" data-dur="-1" role="button" tabindex="0">
              <span>Kendi süren:
                <input type="text" inputmode="numeric" id="customFocus" class="dur-input" value="${esc(customFocus)}" placeholder="38" aria-label="Çalışma dakikası"> /
                <input type="text" inputmode="numeric" id="customBrk" class="dur-input" value="${esc(customBrk)}" placeholder="7" aria-label="Mola dakikası"> dakika</span><strong>${durationIdx === -1 ? '✓' : ''}</strong>
            </div>
          </div>
        </div>
        <div class="step">
          <label class="row" style="cursor:pointer">
            <input type="checkbox" id="mainDevice" ${mainDevice ? 'checked' : ''}>
            <span>Bu, çalışacağın ana cihazın mı?</span>
          </label>
          <p class="hint">Veriler şimdilik yalnızca bu cihazda tutulur.</p>
        </div>
        <button type="button" class="btn-primary btn-big" id="start">Başla</button>
        <div id="startWarn" class="form-warn" role="alert"></div>
      </div>`;
  }

  on(root, 'click', '[data-intro="next"]', () => {
    if (introIdx < INTRO_CARDS.length - 1) { introIdx++; paintIntro(); } else endIntro();
  });
  on(root, 'click', '[data-intro="skip"]', () => endIntro());
  document.addEventListener('keydown', onKey);
  function onKey(e) {
    if (!root.querySelector('.intro')) return;
    if (e.key === 'ArrowRight' && introIdx < INTRO_CARDS.length - 1) { introIdx++; paintIntro(); }
  }

  on(root, 'click', '[data-name]', (e, t) => { name = t.dataset.name; customName = ''; paint(); });
  on(root, 'input', '#customName', (e, t) => {
    customName = t.value;
    if (customName.trim()) name = '';
    if ($('#startWarn', root)?.firstChild) showWarn();
  });
  on(root, 'click', '[data-dur]', (e, t) => {
    const idx = Number(t.dataset.dur);
    if (idx === -1 && e.target.closest('input')) { if (durationIdx !== -1) { const id = e.target.id; durationIdx = -1; paint(); root.querySelector('#' + id)?.focus(); } return; }
    durationIdx = idx; paint();
  });
  on(root, 'input', '.dur-input', (e, t) => {
    const v = t.value.replace(/\D/g, '').slice(0, 3);
    t.value = v;
    if (t.id === 'customFocus') customFocus = v; else customBrk = v;
    if (durationIdx !== -1) { const id = t.id; durationIdx = -1; paint(); root.querySelector('#' + id)?.focus(); return; }
    if ($('#startWarn', root)?.firstChild) showWarn();
  });
  on(root, 'change', '#mainDevice', (e, t) => { mainDevice = t.checked; });
  on(root, 'click', '#start', async () => {
    if (!canStart()) { showWarn(); return; }
    const finalName = customName.trim() || name;
    const d = durationIdx === -1 ? customDur() : DURATIONS[durationIdx];
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
