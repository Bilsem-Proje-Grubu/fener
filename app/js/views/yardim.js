import { on, esc } from '../util.js';
import { search } from '../yardim.js';
import { EXAMPLES, SHORTCUTS } from '../yardim-content.js';

// Çevrimdışı yardımcı: sorunu yaz, Fener ilgili cevabı ve gideceğin ekranı göstersin.
export async function renderYardim(root) {
  const thread = []; // { q, results }

  function answerHtml(e) {
    return `
      <article class="card yardim-answer">
        <h3>${esc(e.title)}</h3>
        <p>${esc(e.answer)}</p>
        <a class="btn-primary" href="${esc(e.route)}">${esc(e.label)}</a>
      </article>`;
  }

  function turnHtml(t) {
    const body = t.results.length
      ? t.results.map(answerHtml).join('')
      : `<div class="card yardim-answer">
          <p>Bunu bilgi tabanımda bulamadım. Başka sözcüklerle yazmayı dene ya da aşağıdan bir konu seç.</p>
          <div class="chip-row">${SHORTCUTS.map(s => `<button type="button" class="chip" data-ask="${esc(s.q)}">${esc(s.label)}</button>`).join('')}</div>
          <p class="hint">Aradığın bu değilse <a href="#/nasil">Fener nasıl çalışır</a> sayfasına ya da <a href="#/rehber">Rehber</a>'e bak.</p>
        </div>`;
    return `
      <div class="yardim-turn">
        <p class="yardim-q">${esc(t.q)}</p>
        ${body}
      </div>`;
  }

  function paint(keepFocus) {
    root.innerHTML = `
      <div class="greet">
        <h1>Yardım</h1>
        <p class="hint">Fener hakkında bir şey sor ya da bulamadığın yeri yaz. Cevap ve gideceğin ekran gelir. İnternet gerekmez, sorun cihazından çıkmaz.</p>
      </div>
      <form class="card yardim-form" data-form="ask" role="search">
        <label for="yardimQ">Ne arıyorsun?</label>
        <div class="row">
          <input type="text" id="yardimQ" name="q" autocomplete="off" maxlength="200" placeholder="Örn. ödevi nereden eklerim?" style="flex:1;min-width:0">
          <button type="submit" class="btn-primary">Sor</button>
        </div>
        ${thread.length ? '' : `<div class="chip-row" style="margin-top:10px">${EXAMPLES.map(x => `<button type="button" class="chip" data-ask="${esc(x)}">${esc(x)}</button>`).join('')}</div>`}
      </form>
      <div class="yardim-thread" aria-live="polite">${thread.slice().reverse().map(turnHtml).join('')}</div>
      <p class="hint" style="margin-top:14px"><a href="#/nasil">Fener nasıl çalışır</a> · <a href="#/rehber">Rehber</a></p>`;
    if (keepFocus) { const i = root.querySelector('#yardimQ'); i && i.focus(); }
  }

  function ask(q) {
    q = String(q || '').trim();
    if (!q) return;
    thread.push({ q, results: search(q) });
    paint(true);
  }

  on(root, 'submit', '[data-form="ask"]', (e, form) => {
    e.preventDefault();
    ask(new FormData(form).get('q'));
  });
  on(root, 'click', '[data-ask]', (e, t) => ask(t.dataset.ask));

  paint(false);
}
