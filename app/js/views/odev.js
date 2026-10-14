import { $, on, esc, uid, dayKey, fmtDate } from '../util.js';
import * as store from '../store.js';
import { dueInfo, sortedOpen, reminders } from '../homework.js';
import { confirmHomeworkDone } from '../confirm.js';
import { notificationState, askNotificationPermission, notifyReminders } from '../notify.js';

export async function renderOdev(root) {
  const data = await store.getData();
  const today = dayKey();
  let showDone = false;
  let editingId = null;

  function itemHtml(h) {
    const info = dueInfo(h.due, today);
    if (editingId === h.id) {
      return `
        <li class="task-item hw-edit">
          <form data-form="edit-hw" data-id="${esc(h.id)}" class="stack" style="width:100%">
            <input type="text" name="title" value="${esc(h.title)}" maxlength="80" required aria-label="Ödev adı">
            <input type="date" name="due" value="${esc(h.due)}" required aria-label="Teslim tarihi">
            <div class="row">
              <button type="submit" class="btn-primary">Kaydet</button>
              <button type="button" class="btn-ghost" data-action="cancel-edit">Vazgeç</button>
            </div>
          </form>
        </li>`;
    }
    return `
      <li class="task-item hw-${h.done ? 'done' : info.level}${h.done ? ' done' : ''}">
        <button type="button" class="task-check" data-action="toggle-hw" data-id="${esc(h.id)}" aria-label="${h.done ? 'Tamamlanmadı olarak işaretle' : 'Teslim ettim olarak işaretle'}" aria-pressed="${h.done}"></button>
        <div style="flex:1;min-width:0">
          <div class="hw-title">${esc(h.title)}</div>
          <div class="task-sub">${esc(fmtDate(h.due))}${h.done ? '' : ` · <span class="hw-badge hw-badge-${info.level}">${esc(info.label)}</span>`}</div>
        </div>
        <div class="hw-actions">
          ${h.done ? '' : `<button type="button" class="btn-ghost" data-action="edit-hw" data-id="${esc(h.id)}">Düzenle</button>`}
          <button type="button" class="btn-ghost" data-action="delete-hw" data-id="${esc(h.id)}" aria-label="${esc(h.title)} ödevini sil">Sil</button>
        </div>
      </li>`;
  }

  function notifyCardHtml() {
    const st = notificationState();
    if (st === 'granted') {
      return `<p class="hint">Bildirimler açık. Uygulamayı açtığında yarın teslim olan ödevler için bildirim de gelir.</p>`;
    }
    if (st === 'denied') {
      return `<p class="hint">Bildirimler tarayıcıdan kapatılmış. Hatırlatma yine de bu ekranda ve Bugün sayfasında görünür.</p>`;
    }
    if (st === 'unsupported') {
      return `<p class="hint">Bu tarayıcı bildirimleri desteklemiyor. Hatırlatma Bugün sayfasında görünür.</p>`;
    }
    return `
      <div class="row" style="flex-wrap:wrap;gap:8px">
        <button type="button" class="btn-secondary" data-action="enable-notify">Bildirimleri aç</button>
      </div>`;
  }

  function paint() {
    const open = sortedOpen(data.homework);
    const done = (data.homework || []).filter(h => h.done).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
    const due = reminders(data.homework, today);
    root.innerHTML = `
      <div class="greet">
        <h1>Ödevler</h1>
        <p class="hint">Ödevini ve teslim tarihini yaz. Fener, teslimden 7, 3 ve 1 gün önce seni uyarır; yaptığında kutucuğu işaretle.</p>
      </div>
      ${due.length ? `
        <div class="card card--warn" role="alert">
          <strong>${due.some(h => h.info.days === 1) ? 'Yarın teslim edeceğin ödev var' : 'Dikkat: teslim yaklaştı'}</strong>
          <div class="hint">${due.map(h => esc(h.title) + ' (' + esc(h.info.label.toLowerCase()) + ')').join(' · ')}</div>
        </div>` : ''}
      <div class="card">
        <form data-form="add-hw" class="stack">
          <label for="hwTitle">Ödev</label>
          <input id="hwTitle" type="text" name="title" maxlength="80" placeholder="Örn. Fizik problem seti" required autocomplete="off">
          <label for="hwDue">Teslim tarihi</label>
          <input id="hwDue" type="date" name="due" required>
          <button type="submit" class="btn-primary">Ödevi ekle</button>
        </form>
      </div>
      <div class="card">
        <h2>Bekleyen ödevler</h2>
        ${open.length ? `<ul class="task-list">${open.map(itemHtml).join('')}</ul>` : `<p class="empty">Bekleyen ödev yok.</p>`}
      </div>
      <div class="card card--quiet">
        <h2>Hatırlatma nasıl çalışır?</h2>
        <p class="hint">Fener bir sunucuya bağlı değil; verilerin yalnızca bu cihazda. Bu yüzden uyarı, uygulamayı açtığında görünür. Bildirimi açarsan o sırada telefona bildirim de düşer.</p>
        <p class="hint"><strong>Uygulama kapalıyken bildirim gelmeyebilir.</strong> Bunu garanti edemiyoruz; güvenmek yerine her gün Fener'i bir kez aç.</p>
        ${notifyCardHtml()}
      </div>
      ${done.length ? `
        <div class="card">
          <button type="button" class="btn-ghost" data-action="toggle-done" aria-expanded="${showDone}">${showDone ? 'Teslim edilenleri gizle' : `Teslim edilenler (${done.length})`}</button>
          ${showDone ? `<ul class="task-list">${done.map(itemHtml).join('')}</ul>` : ''}
        </div>` : ''}
    `;
  }

  on(root, 'submit', '[data-form="add-hw"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const title = String(fd.get('title') || '').trim();
    const due = String(fd.get('due') || '');
    if (!title || !due) { window.fenerToast && window.fenerToast('Ödev adını ve tarihini yaz.'); return; }
    await store.update(d => { d.homework.push({ id: uid(), title, due, done: false, createdAt: Date.now(), notifiedOn: null }); });
    window.fenerToast && window.fenerToast('Ödev eklendi.');
    paint();
    notifyReminders(data, today);
  });

  on(root, 'submit', '[data-form="edit-hw"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const title = String(fd.get('title') || '').trim();
    const due = String(fd.get('due') || '');
    if (!title || !due) return;
    await store.update(d => {
      const h = d.homework.find(x => x.id === form.dataset.id);
      if (h) { h.title = title; if (h.due !== due) { h.due = due; h.notifiedOn = null; } }
    });
    editingId = null;
    paint();
  });

  on(root, 'click', '[data-action="edit-hw"]', (e, t) => { editingId = t.dataset.id; paint(); });
  on(root, 'click', '[data-action="cancel-edit"]', () => { editingId = null; paint(); });
  on(root, 'click', '[data-action="toggle-done"]', () => { showDone = !showDone; paint(); });

  on(root, 'click', '[data-action="toggle-hw"]', async (e, t) => {
    const cur = data.homework.find(x => x.id === t.dataset.id);
    if (cur && !cur.done && !(await confirmHomeworkDone(cur.title))) return;
    await store.update(d => {
      const h = d.homework.find(x => x.id === t.dataset.id);
      if (h) { h.done = !h.done; h.doneAt = h.done ? Date.now() : null; }
    });
    paint();
  });

  on(root, 'click', '[data-action="delete-hw"]', async (e, t) => {
    await store.update(d => { d.homework = d.homework.filter(x => x.id !== t.dataset.id); });
    paint();
  });

  on(root, 'click', '[data-action="enable-notify"]', async () => {
    const res = await askNotificationPermission();
    window.fenerToast && window.fenerToast(res === 'granted' ? 'Bildirimler açıldı.' : 'Bildirim izni verilmedi.');
    if (res === 'granted') notifyReminders(data, today);
    paint();
  });

  paint();
  return { destroy() {} };
}
