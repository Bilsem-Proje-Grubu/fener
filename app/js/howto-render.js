import { esc } from './util.js';

const ART = {
  beher: `<svg viewBox="0 0 120 120" role="img" aria-label="Dolan beher">
      <path class="art-glass" d="M34 14h52M40 14v70a18 18 0 0 0 18 18h4a18 18 0 0 0 18-18V14"/>
      <path class="art-fill" d="M41 58h38v26a17 17 0 0 1-17 17h-4a17 17 0 0 1-17-17z"/>
      <path class="art-tick" d="M40 40h8M40 58h8M40 76h8"/>
    </svg>`,
  dongu: `<svg viewBox="0 0 120 120" role="img" aria-label="Günlük döngü">
      <circle class="art-glass" cx="60" cy="60" r="38"/>
      <path class="art-fill-line" d="M60 22a38 38 0 0 1 36 26"/>
      <circle class="art-dot" cx="60" cy="22" r="6"/><circle class="art-dot" cx="96" cy="60" r="6"/>
      <circle class="art-dot" cx="60" cy="98" r="6"/><circle class="art-dot" cx="24" cy="60" r="6"/>
    </svg>`,
  defter: `<svg viewBox="0 0 120 120" role="img" aria-label="Defter">
      <rect class="art-glass" x="26" y="16" width="68" height="88" rx="6"/>
      <path class="art-tick" d="M42 16v88M52 40h30M52 56h30M52 72h20"/>
      <rect class="art-fill-bar" x="52" y="36" width="30" height="8" rx="2"/>
    </svg>`,
};

export function introCardHtml(card) {
  return `
    <div class="intro-art">${ART[card.art] || ''}</div>
    <h1 class="display">${esc(card.title)}</h1>
    ${card.body ? `<p class="intro-body">${esc(card.body)}</p>` : ''}
    ${card.steps ? `<ol class="intro-steps">${card.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}`;
}

export function sectionHtml(s) {
  return `
    <section class="card howto-card" id="nasil-${esc(s.id)}">
      <h2>${esc(s.title)}</h2>
      ${(s.paragraphs || []).map(p => `<p>${esc(p)}</p>`).join('')}
      ${s.steps ? `<ol class="howto-steps">${s.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
      ${s.faq ? s.faq.map(f => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('') : ''}
      ${s.link ? `<a class="btn-ghost howto-link" href="${esc(s.link.route)}">${esc(s.link.label)} →</a>` : ''}
    </section>`;
}
