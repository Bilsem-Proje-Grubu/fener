import { $, on, esc } from '../util.js';
import * as store from '../store.js';
import { SECTIONS } from '../guide-content.js';

function forgettingCurveSvg() {
  return `
    <svg class="diagram" viewBox="0 0 280 120" role="img" aria-label="Unutma eğrisi: tekrarsız hızla düşer, tekrarla her seferinde daha az düşüp yükseğe yerleşir">
      <line class="diagram-axis" x1="20" y1="10" x2="20" y2="105"></line>
      <line class="diagram-axis" x1="20" y1="105" x2="270" y2="105"></line>
      <path class="diagram-curve" d="M20,20 C60,80 100,98 140,103 C180,106 220,107 260,108"></path>
      <path class="diagram-curve-strong" d="M20,20 C45,55 60,75 70,80 L70,35 C90,55 100,68 108,72 L108,42 C130,58 145,68 155,72 L155,48 C185,58 220,60 260,58"></path>
      <text class="diagram-label" x="72" y="30">tekrar</text>
      <text class="diagram-label" x="110" y="38">tekrar</text>
      <text class="diagram-label" x="158" y="44">tekrar</text>
      <text class="diagram-label" x="225" y="90">tekrarsız unutma</text>
      <text class="diagram-label" x="22" y="115">1 gün</text>
      <text class="diagram-label" x="245" y="115">90 gün</text>
    </svg>`;
}

function interleavingSvg() {
  return `
    <svg class="diagram" viewBox="0 0 220 130" role="img" aria-label="Karışık çalışan öğrenciler %61, bloklu çalışanlar %37 aldı">
      <line class="diagram-axis" x1="20" y1="10" x2="20" y2="105"></line>
      <line class="diagram-axis" x1="20" y1="105" x2="200" y2="105"></line>
      <rect class="diagram-bar-a" x="55" y="27" width="45" height="78"></rect>
      <rect class="diagram-bar-b" x="130" y="57" width="45" height="48"></rect>
      <text class="diagram-bar-label" x="77" y="20" text-anchor="middle">%61</text>
      <text class="diagram-bar-label" x="152" y="50" text-anchor="middle">%37</text>
      <text class="diagram-label" x="77" y="118" text-anchor="middle">Karışık</text>
      <text class="diagram-label" x="152" y="118" text-anchor="middle">Bloklu</text>
    </svg>`;
}

const DIAGRAMS = { 'forgetting-curve': forgettingCurveSvg, interleaving: interleavingSvg };

export async function renderRehber(root, params) {
  const data = await store.getData();
  let openId = params && params.get('s') ? Number(params.get('s')) : null;

  function evidenceDots(n) {
    if (n == null) return '';
    return `<div class="guide-dots" aria-label="Kanıt gücü ${n}/3">${[1, 2, 3].map(i => `<span class="guide-dot${i <= n ? ' filled' : ''}"></span>`).join('')}</div>`;
  }

  function sectionHtml(s) {
    const isRead = !!data.guideRead[s.id];
    const isOpen = openId === s.id;
    const body = isOpen ? `
      <div class="guide-body">
        <p>${esc(s.hook)}</p>
        <p>${esc(s.summary)}</p>
        ${s.forYou ? `<p class="guide-foryou">${esc(s.forYou)}</p>` : ''}
        ${s.diagram ? DIAGRAMS[s.diagram]() : ''}
        ${s.sources ? `<ul>${s.sources.map(src => `<li class="hint">${esc(src)}</li>`).join('')}</ul>` : ''}
        <div class="row" style="margin-top:10px;flex-wrap:wrap">
          ${s.appLink ? `<a class="btn-ghost" href="${esc(s.appLink.route)}">${esc(s.appLink.label)}</a>` : ''}
          <button type="button" class="btn-ghost" data-action="toggle-read" data-id="${s.id}">${isRead ? 'Okundu ✓' : 'Okudum işaretle'}</button>
        </div>
      </div>` : '';
    return `
      <div class="card guide-card" data-action="toggle-open" data-id="${s.id}">
        <div class="guide-head" role="button" tabindex="0" aria-expanded="${isOpen}">
          <span class="guide-num">${s.id}</span>
          <span class="guide-title">${esc(s.title)}</span>
          ${isRead ? '<span class="guide-read" aria-label="Okundu">✓</span>' : ''}
        </div>
        ${evidenceDots(s.evidence)}
        ${body}
      </div>`;
  }

  function paint() {
    const readCount = SECTIONS.filter(s => data.guideRead[s.id]).length;
    root.innerHTML = `
      <div class="greet">
        <h1>Bilimsel çalışmak</h1>
        <p class="hint">${readCount}/${SECTIONS.length} bölüm okundu. Her biri yaklaşık 2 dakika.</p>
      </div>
      <a class="card howto-teaser" href="#/nasil">
        <strong>Fener nasıl çalışır?</strong>
        <span class="hint">Uygulamanın ne işe yaradığı ve günün akışı.</span>
      </a>
      ${SECTIONS.map(sectionHtml).join('')}`;
    if (openId) {
      const el = root.querySelector(`[data-id="${openId}"].guide-card`);
      el && el.scrollIntoView({ block: 'start' });
    }
  }

  on(root, 'click', '[data-action="toggle-open"]', (e, t) => {
    if (e.target.closest('[data-action="toggle-read"]') || e.target.closest('a')) return;
    const id = Number(t.dataset.id);
    openId = openId === id ? null : id;
    paint();
  });

  on(root, 'keydown', '.guide-head', (e, t) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    const card = t.closest('.guide-card');
    const id = Number(card.dataset.id);
    openId = openId === id ? null : id;
    paint();
    const again = root.querySelector(`[data-id="${id}"].guide-card .guide-head`);
    again && again.focus();
  });

  on(root, 'click', '[data-action="toggle-read"]', async (e, t) => {
    e.stopPropagation();
    const id = t.dataset.id;
    await store.update(d => { d.guideRead[id] = !d.guideRead[id]; });
    paint();
  });

  paint();
  return { destroy() {} };
}
