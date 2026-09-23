import { $, on, esc } from '../util.js';
import * as store from '../store.js';

const NAMES = ['Fener', 'Kaşif', 'Öncü'];
const DURATIONS = [
  { focus: 25, brk: 5 },
  { focus: 40, brk: 8 },
  { focus: 50, brk: 10 },
];

export async function renderOnboarding(root, onDone) {
  let name = '';
  let customName = '';
  let durationIdx = 0;
  let mainDevice = true;

  function canStart() { return !!(name || customName.trim()); }

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
    onDone();
  });

  paint();
  return { destroy() {} };
}
