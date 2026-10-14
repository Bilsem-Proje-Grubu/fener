// Uygulama içi onay penceresi (tarayıcı confirm'ü yerine; telefonda tutarlı görünür).
import { esc } from './util.js';

export function askConfirm({ title, text, yes = 'Evet', no = 'Vazgeç' }) {
  return new Promise(resolve => {
    const wrap = document.createElement('div');
    wrap.className = 'confirm-backdrop';
    wrap.innerHTML = `
      <div class="confirm-box" role="alertdialog" aria-modal="true" aria-labelledby="cfT">
        <h2 id="cfT">${esc(title)}</h2>
        ${text ? `<p class="hint">${esc(text)}</p>` : ''}
        <div class="row" style="gap:8px;margin-top:12px">
          <button type="button" class="btn-primary" data-r="yes">${esc(yes)}</button>
          <button type="button" class="btn-ghost" data-r="no">${esc(no)}</button>
        </div>
      </div>`;
    const done = r => { wrap.remove(); document.removeEventListener('keydown', onKey); resolve(r); };
    const onKey = e => { if (e.key === 'Escape') done(false); };
    wrap.addEventListener('click', e => {
      const b = e.target.closest('[data-r]');
      if (b) done(b.dataset.r === 'yes'); else if (e.target === wrap) done(false);
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(wrap);
    wrap.querySelector('[data-r="no"]').focus();
  });
}

/** Ödevi yapıldı olarak işaretlemeden önce sorar. */
export function confirmHomeworkDone(title) {
  return askConfirm({
    title: 'Ödevi yaptığını işaretlemek istediğine emin misin?',
    text: `"${title}" ödevi tamamlandı sayılacak ve Bugün ekranında bir daha görünmeyecek.`,
    yes: 'Evet, yaptım',
    no: 'Vazgeç',
  });
}
