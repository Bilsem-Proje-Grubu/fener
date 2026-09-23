import { $, on, esc, uid, dayKey, fmtDate, SUBJECTS } from '../util.js';
import * as store from '../store.js';
import { answer, isDue, newQuestion } from '../spaced.js';

const QUESTION_TEMPLATES = ['… nedir?', '… ile … farkı ne?', 'Şu formülü çıkar: …'];

export async function renderTekrar(root) {
  const data = await store.getData();
  const today = dayKey();

  let revealed = false;
  let showNewNote = false;
  let showQuestion = false;

  function dueNotes() {
    return data.notes.filter(n => n.q && isDue(n, today)).sort((a, b) => a.due < b.due ? -1 : 1);
  }

  function curveCardHtml() {
    return `
      <div class="card">
        <h2>Unutma eğrisi</h2>
        <p class="hint">Öğrendiğin bir şeyi ertesi gün büyük ölçüde unutursun; ama kısa bir hatırlama çabası bu eğriyi düzleştirir. Bu yüzden aynı soru 1, 7, 30 ve 90 gün sonra karşına çıkıyor.</p>
        <a class="btn-ghost" href="#/rehber?s=2">Devamı</a>
      </div>`;
  }

  function reviewCardHtml() {
    const due = dueNotes();
    if (!due.length) {
      return `
        <div class="card">
          <h2>Bugün sırası gelenler</h2>
          <p class="empty">Bugün sırası gelen soru yok.</p>
        </div>`;
    }
    const note = due[0];
    const isFirstEver = (note.history || []).length === 0;
    return `
      ${isFirstEver ? curveCardHtml() : ''}
      <div class="card">
        <div class="row between">
          <h2>Bugün sırası gelenler</h2>
          <span class="hint">${due.length} soru</span>
        </div>
        <p class="task-sub">${esc(note.subject)}</p>
        <p style="font-size:1.1rem;margin:.6em 0 0">${esc(note.q)}</p>
        ${revealed ? `<p class="hint" style="margin:.4em 0 14px">${esc(note.a)}</p>` : '<div style="margin-bottom:14px"></div>'}
        ${!revealed
          ? `<button type="button" class="btn-primary btn-big" data-action="reveal">Cevabı göster</button>`
          : `<div class="scale-row">
              <button type="button" class="btn-primary" data-action="answer" data-r="no">Hatırlamadım</button>
              <button type="button" class="btn-primary" data-action="answer" data-r="partial">Kısmen</button>
              <button type="button" class="btn-primary" data-action="answer" data-r="yes">Hatırladım</button>
            </div>`}
      </div>`;
  }

  function questionFieldsHtml() {
    return `
      <select name="template">
        <option value="">Şablon seç (isteğe bağlı)</option>
        ${QUESTION_TEMPLATES.map(q => `<option value="${esc(q)}">${esc(q)}</option>`).join('')}
      </select>
      <input type="text" name="q" placeholder="Soru">
      <input type="text" name="a" placeholder="Kısa cevap">`;
  }

  function newNoteHtml() {
    if (!showNewNote) {
      return `<div class="card"><button type="button" class="btn-ghost" data-action="show-new-note">+ Yeni not</button></div>`;
    }
    return `
      <div class="card">
        <h2>Yeni not</h2>
        <form data-form="new-note" class="stack">
          <select name="subject">${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join('')}</select>
          <textarea name="learned" placeholder="Bugün ne öğrendin?" required></textarea>
          <div id="questionArea">
            ${showQuestion ? questionFieldsHtml() : `<button type="button" class="btn-ghost" data-action="add-question-field">+ Soru ekle (isteğe bağlı)</button>`}
          </div>
          <div class="row">
            <button type="submit" class="btn-primary">Kaydet</button>
            <button type="button" class="btn-ghost" data-action="cancel-new-note">Vazgeç</button>
          </div>
        </form>
      </div>`;
  }

  function notesListHtml() {
    if (!data.notes.length) return '';
    const bySubject = {};
    data.notes.slice().sort((a, b) => b.createdAt - a.createdAt).forEach(n => {
      (bySubject[n.subject] ||= []).push(n);
    });
    const sections = Object.keys(bySubject).sort().map(subj => `
      <div class="stack" style="margin-bottom:14px">
        <h3 style="font-size:.95rem">${esc(subj)}</h3>
        <ul class="task-list">
          ${bySubject[subj].map(n => `
            <li class="task-item">
              <div>
                <div>${esc(n.q || n.learned)}</div>
                <div class="task-sub">${n.due ? 'Sıradaki tekrar: ' + esc(fmtDate(n.due, { weekday: false })) : 'Tekrar yok'}</div>
              </div>
            </li>`).join('')}
        </ul>
      </div>`).join('');
    return `<div class="card"><h2>Notların</h2>${sections}</div>`;
  }

  function paint() {
    root.innerHTML = `${reviewCardHtml()}${newNoteHtml()}${notesListHtml()}`;
  }

  on(root, 'click', '[data-action="reveal"]', () => { revealed = true; paint(); });

  on(root, 'click', '[data-action="answer"]', async (e, t) => {
    const note = dueNotes()[0];
    if (!note) return;
    const result = t.dataset.r;
    await store.update(d => {
      const idx = d.notes.findIndex(n => n.id === note.id);
      if (idx >= 0) d.notes[idx] = answer(d.notes[idx], result, today);
    });
    revealed = false;
    paint();
  });

  on(root, 'click', '[data-action="show-new-note"]', () => { showNewNote = true; paint(); });
  on(root, 'click', '[data-action="cancel-new-note"]', () => { showNewNote = false; showQuestion = false; paint(); });
  on(root, 'click', '[data-action="add-question-field"]', (e, t) => {
    showQuestion = true;
    $('#questionArea', root).innerHTML = questionFieldsHtml();
  });

  on(root, 'change', 'select[name="template"]', (e, t) => {
    const input = $('input[name="q"]', t.closest('form'));
    if (input && t.value) input.value = t.value;
  });

  on(root, 'submit', '[data-form="new-note"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const subject = fd.get('subject');
    const learned = String(fd.get('learned') || '').trim();
    const q = String(fd.get('q') || '').trim();
    const a = String(fd.get('a') || '').trim();
    if (!learned) return;
    let hasQuestion = false;
    await store.update(d => {
      const id = uid();
      const base = { id, subject, learned, createdAt: Date.now(), updatedAt: Date.now() };
      if (q && a) {
        hasQuestion = true;
        d.notes.push({ ...base, ...newQuestion(q, a, today, id) });
      } else {
        d.notes.push({ ...base, q: null, a: null, step: null, due: null, history: [] });
      }
    });
    showNewNote = false;
    showQuestion = false;
    window.fenerToast && window.fenerToast(hasQuestion ? 'İlk tekrar yarın.' : 'Not kaydedildi.');
    paint();
  });

  paint();
  return { destroy() {} };
}
