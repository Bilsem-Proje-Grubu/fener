import { $, on } from '../util.js';
import { HOWTO_SECTIONS } from '../howto-content.js';
import { sectionHtml } from '../howto-render.js';
import { renderOnboarding } from './onboarding.js';

export async function renderNasil(root) {
  function paint() {
    root.innerHTML = `
      <div class="greet">
        <h1>Fener nasıl çalışır</h1>
        <p class="hint">Ne işe yarar, günün nasıl geçer, verin nerede. Her zaman buradan açabilirsin.</p>
      </div>
      ${HOWTO_SECTIONS.map(sectionHtml).join('')}
      <div class="card howto-card">
        <h2>Tanıtımı yeniden izle</h2>
        <p>Açılıştaki üç kısa kartı tekrar görmek istersen.</p>
        <button type="button" class="btn-primary" data-action="replay">Tanıtımı aç</button>
      </div>
      <p class="hint" style="margin-top:14px">Bilimsel arka planı merak ediyorsan <a href="#/rehber">Rehber</a>'e bak.</p>`;
  }

  on(root, 'click', '[data-action="replay"]', () => {
    document.body.classList.add('onboarding');
    renderOnboarding(root, () => {
      document.body.classList.remove('onboarding');
      paint();
      window.scrollTo(0, 0);
    }, { replay: true });
  });

  paint();
  return { destroy() { document.body.classList.remove('onboarding'); } };
}
