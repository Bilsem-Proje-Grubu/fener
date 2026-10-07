import { $, $$, on, esc, uid, dayKey, addDays, diffDays, fmtDate, fmtClock, fmtMinutes, minutesNow, parseHM, DAY_START_HOUR, SUBJECTS } from '../util.js';
import * as store from '../store.js';
import { startFocus, startBreak, remaining, progress, extend, isDone, elapsedMinutes, chime, keepAwake, primeAudio } from '../timer.js';
import { newQuestion } from '../spaced.js';

const QUESTION_TEMPLATES = ['… nedir?', '… ile … farkı ne?', 'Şu formülü çıkar: …'];
const DISTRACTIONS = ['Telefon', 'Yorgunluk', 'Konu zor', 'Başka'];

export async function renderToday(root) {
  const data = await store.getData();
  const today = dayKey();

  let finishing = false;
  let showAddForm = false;
  let confirmFourth = null;
  let showQuestionForm = false;
  let selectedTaskText = '';
  let bannerDismissed = false;

  function dayBucket(key = today) {
    return data.days[key] || { tasks: [], learned: '', carriedFrom: null };
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 11) return 'Günaydın';
    if (h < 18) return 'İyi günler';
    return 'İyi akşamlar';
  }

  function weeklyTarget() {
    const weeks = Math.floor((Date.now() - (data.createdAt || Date.now())) / (7 * 86400000));
    return weeks < 2 ? 3 : 5;
  }

  function last7() {
    return Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  }

  function hasSession(key) {
    return data.sessions.some(s => s.dayKey === key);
  }

  function nextExam() {
    return data.exams
      .filter(e => e.date >= today)
      .sort((a, b) => a.date < b.date ? -1 : 1)[0];
  }

  function dueQuestionCount() {
    return data.notes.filter(n => n.q && n.due <= today).length;
  }

  function lastActiveKeyBeforeToday() {
    const keys = Object.keys(data.days).filter(k => k !== today).sort();
    return keys.length ? keys[keys.length - 1] : null;
  }

  function isNightWindow() {
    const bedtime = parseHM(data.settings.bedtime || '22:30');
    const now = minutesNow();
    // Yatma saatinden yarım saat önce başlar, gün sınırına (04:00) kadar sürer.
    return now >= bedtime - 30 || now < DAY_START_HOUR * 60;
  }

  function bannerHtml() {
    const lastKey = lastActiveKeyBeforeToday();
    if (!lastKey || bannerDismissed) return '';
    if (diffDays(lastKey, today) <= 2) return '';
    const bucket = dayBucket(lastKey);
    const unfinished = bucket.tasks.filter(t => !t.done);
    if (!unfinished.length) return '';
    return `
      <div class="card card--accent">
        <h2>Hoş geldin.</h2>
        <p class="hint">${unfinished.length} iş kalmıştı. Bugüne taşıyayım mı?</p>
        <div class="row">
          <button type="button" class="btn-primary" data-action="carry-over" data-from="${esc(lastKey)}">Bugüne taşı</button>
          <button type="button" class="btn-ghost" data-action="dismiss-banner">Kalsın</button>
        </div>
      </div>`;
  }

  function goalLineHtml() {
    const target = weeklyTarget();
    const dots = last7().map((k, i) => {
      const done = hasSession(k);
      const isTarget = i >= (7 - target);
      return `<span class="goal-dot${done ? ' done' : ''}${isTarget && !done ? ' target' : ''}" title="${esc(fmtDate(k))}"></span>`;
    }).join('');
    return `<div class="goal-line" aria-label="Son 7 gün, hedef haftada ${target} gün">${dots}</div>`;
  }

  function examCardHtml() {
    const exam = nextExam();
    if (!exam) return '';
    const days = diffDays(today, exam.date);
    return `
      <div class="card exam-card">
        <div class="row between">
          <div>
            <strong>${esc(exam.subject)} ${esc(exam.type || 'yazılı')}</strong>
            <div class="hint">${esc(fmtDate(exam.date))}</div>
          </div>
          <div class="days">${days === 0 ? 'Bugün' : days + ' gün'}</div>
        </div>
      </div>`;
  }

  function dueQuestionsHtml() {
    const n = dueQuestionCount();
    if (!n) return '';
    return `
      <div class="card card--accent">
        <div class="row between">
          <div>
            <strong>Bugün hatırlanacak ${n} soru</strong>
            <div class="hint">Tekrar sekmesinde seni bekliyor.</div>
          </div>
          <a class="btn-ghost" href="#/tekrar">Git</a>
        </div>
      </div>`;
  }

  function timerHtml() {
    const t = data.timer;
    const now = Date.now();

    if (t && t.phase === 'break') {
      const rem = remaining(t, now);
      if (rem <= 0) {
        return `
          <div class="card">
            <h2>Mola bitti</h2>
            <button type="button" class="btn-primary btn-big" data-action="end-break">Devam et</button>
          </div>`;
      }
      return `
        <div class="card">
          <h2>Mola</h2>
          <p class="display" style="font-size:2rem">${esc(fmtClock(rem))}</p>
          <button type="button" class="btn-ghost" data-action="end-break">Molayı bitir</button>
        </div>`;
    }

    if (t && t.phase === 'focus') {
      const done = isDone(t, now) || finishing;
      if (done) {
        return `
          <div class="card">
            <h2>Nasıl geçti?</h2>
            <div class="scale-row">
              <button type="button" class="btn-primary" data-action="quality" data-q="flow">Akıştaydım</button>
              <button type="button" class="btn-primary" data-action="quality" data-q="ok">İdare eder</button>
              <button type="button" class="btn-primary" data-action="quality" data-q="scattered">Dağıldım</button>
            </div>
            ${finishing === 'ask-distraction' ? `
              <p class="hint" style="margin-top:12px">Seni ne böldü?</p>
              <div class="chip-row">
                ${DISTRACTIONS.map(d => `<button type="button" class="chip" data-action="distraction" data-d="${esc(d)}">${esc(d)}</button>`).join('')}
              </div>` : ''}
          </div>`;
      }
      const rem = remaining(t, now);
      const pct = Math.round(progress(t, now) * 100);
      return `
        <div class="focus-mode">
          <div class="fill" style="height:${pct}%"></div>
          <p class="task-line">${t.taskText ? esc(t.taskText) : 'Odak zamanı'}</p>
          <div class="clock">${esc(fmtClock(rem))}</div>
          <div class="focus-actions">
            <button type="button" class="btn-ghost" data-action="extend">+5 dakika</button>
            <button type="button" class="btn-primary" data-action="finish">Bitir</button>
          </div>
        </div>`;
    }

    if (isNightWindow()) {
      return `
        <div class="card">
          <h2>Bugünlük yeter mi?</h2>
          <p class="hint">Yarın sabah ${fmtMinutes(20)} ekleyeyim.</p>
          <div class="row">
            <button type="button" class="btn-primary" data-action="end-day">Bugünlük yeter</button>
            <button type="button" class="btn-ghost" data-action="night-anyway">Yine de 20 dakika</button>
          </div>
          <a class="btn-ghost" href="#/rehber?s=10" style="margin-top:6px;display:inline-block">Neden uyku önemli?</a>
        </div>`;
    }

    const tasks = dayBucket().tasks;
    return `
      <div class="card beher">
        <div class="fill" style="height:0%"></div>
        ${tasks.length ? `
          <select id="focusTask" aria-label="Ne çalışıyorsun">
            <option value="">Ne çalışıyorsun (isteğe bağlı)</option>
            ${tasks.filter(t => !t.done).map(t => `<option value="${esc(t.text)}" ${selectedTaskText === t.text ? 'selected' : ''}>${esc(t.text)}</option>`).join('')}
          </select>` : ''}
        <button type="button" class="btn-primary btn-big" data-action="start" style="margin-top:12px">Başla — ${data.settings.focusMinutes} dk</button>
      </div>`;
  }

  function tasksHtml() {
    const tasks = dayBucket().tasks;
    const items = tasks.map(t => `
      <li class="task-item${t.done ? ' done' : ''}">
        <button type="button" class="task-check" data-action="toggle-task" data-id="${esc(t.id)}" aria-label="${t.done ? 'Tamamlanmadı işaretle' : 'Tamamlandı işaretle'}"></button>
        <div>
          <div>${esc(t.text)}</div>
          <div class="task-sub">${esc(t.subject)}${t.due ? ' · ' + esc(fmtDate(t.due, { weekday: false })) : ''}</div>
        </div>
      </li>`).join('');

    const addForm = showAddForm ? `
      <form data-form="add-task" class="stack" style="margin-top:10px">
        <input type="text" name="text" placeholder="Ne yapılacak?" required>
        <select name="subject">${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join('')}</select>
        <input type="date" name="due">
        <div class="row">
          <button type="submit" class="btn-primary">Ekle</button>
          <button type="button" class="btn-ghost" data-action="cancel-add">Vazgeç</button>
        </div>
      </form>` : '';

    const confirm = confirmFourth ? `
      <div class="card" style="margin-top:10px">
        <p>Üç yeter; bunu yarına atayım mı?</p>
        <div class="row">
          <button type="button" class="btn-primary" data-action="add-tomorrow">Yarına ekle</button>
          <button type="button" class="btn-ghost" data-action="add-anyway">Yine de bugüne ekle</button>
        </div>
      </div>` : '';

    return `
      <div class="card">
        <h2>Bugünün 3 işi</h2>
        ${tasks.length ? `<ul class="task-list">${items}</ul>` : `<p class="empty">Henüz iş eklenmedi. Bugün ne yapacaksın?</p>`}
        ${!showAddForm && !confirmFourth ? `<button type="button" class="btn-ghost" data-action="show-add" style="margin-top:10px">+ İş ekle</button>` : ''}
        ${addForm}${confirm}
      </div>`;
  }

  function questionFormHtml() {
    return `
      <form data-form="question" class="stack" style="margin-top:10px">
        <select name="template">
          <option value="">Şablon seç (isteğe bağlı)</option>
          ${QUESTION_TEMPLATES.map(q => `<option value="${esc(q)}">${esc(q)}</option>`).join('')}
        </select>
        <input type="text" name="q" placeholder="Soru" required>
        <input type="text" name="a" placeholder="Kısa cevap" required>
        <select name="subject">${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join('')}</select>
        <div class="row">
          <button type="submit" class="btn-primary">Soruyu kaydet</button>
          <button type="button" class="btn-ghost" data-action="cancel-question">Vazgeç</button>
        </div>
      </form>`;
  }

  function learnedHtml() {
    const bucket = dayBucket();
    return `
      <div class="card">
        <h2>Bugün ne öğrendin?</h2>
        <form data-form="learned" class="stack">
          <textarea name="learned" placeholder="Tek cümle yeter.">${esc(bucket.learned || '')}</textarea>
          <div class="row">
            <button type="submit" class="btn-primary">Kaydet</button>
            <button type="button" class="btn-ghost" id="addQuestionBtn" data-action="add-question" ${showQuestionForm ? 'style="display:none"' : ''}>+ Soru ekle</button>
          </div>
        </form>
        <div id="questionFormArea">${showQuestionForm ? questionFormHtml() : ''}</div>
      </div>`;
  }

  function paint() {
    root.innerHTML = `
      <div class="greet">
        <div class="date">${esc(fmtDate(today))}</div>
        <h1>${esc(greeting())}${data.profile.name ? ', ' + esc(data.profile.name) : ''}.</h1>
        ${goalLineHtml()}
      </div>
      ${bannerHtml()}
      ${examCardHtml()}
      ${dueQuestionsHtml()}
      ${timerHtml()}
      ${tasksHtml()}
      ${learnedHtml()}
    `;
  }

  async function refresh() { paint(); }

  on(root, 'click', '[data-action="dismiss-banner"]', () => { bannerDismissed = true; paint(); });

  on(root, 'click', '[data-action="carry-over"]', async (e, t) => {
    const fromKey = t.dataset.from;
    await store.update(d => {
      const from = d.days[fromKey];
      const day = store.todayBucket(d, today);
      (from ? from.tasks.filter(x => !x.done) : []).forEach(x => {
        day.tasks.push({ ...x, id: uid(), carriedFrom: fromKey });
      });
    });
    bannerDismissed = true;
    paint();
  });

  on(root, 'change', '#focusTask', (e, t) => { selectedTaskText = t.value; });

  function selectedSubject() {
    const task = dayBucket().tasks.find(t => t.text === selectedTaskText);
    return task ? task.subject : null;
  }

  on(root, 'click', '[data-action="start"]', async () => {
    primeAudio();
    const subject = selectedSubject();
    await store.update(d => {
      d.timer = startFocus(Date.now(), d.settings.focusMinutes, { taskText: selectedTaskText || '', subject });
    });
    await keepAwake(true);
    paint();
  });

  on(root, 'click', '[data-action="night-anyway"]', async () => {
    primeAudio();
    const subject = selectedSubject();
    await store.update(d => { d.timer = startFocus(Date.now(), 20, { taskText: selectedTaskText || '', subject }); });
    await keepAwake(true);
    paint();
  });

  on(root, 'click', '[data-action="end-day"]', () => {
    window.fenerToast && window.fenerToast('Bugünlük yeter. Yarın görüşürüz.');
  });

  on(root, 'click', '[data-action="extend"]', async () => {
    await store.update(d => { d.timer = extend(d.timer, 5); });
    paint();
  });

  on(root, 'click', '[data-action="finish"]', () => { finishing = true; paint(); });

  on(root, 'click', '[data-action="quality"]', async (e, t) => {
    const q = t.dataset.q;
    if (q === 'scattered' && finishing !== 'ask-distraction') { finishing = 'ask-distraction'; paint(); return; }
    await saveSession(q, null);
  });

  on(root, 'click', '[data-action="distraction"]', async (e, t) => {
    await saveSession('scattered', t.dataset.d);
  });

  async function saveSession(quality, distraction) {
    const t = data.timer;
    const endedAt = Date.now();
    const minutes = elapsedMinutes(t, endedAt);
    chime('focus');
    await keepAwake(false);
    let count = 0;
    await store.update(d => {
      d.sessions.push({ id: uid(), dayKey: today, minutes, quality, distraction, taskText: t.taskText || null, subject: t.subject || null, endedAt });
      count = d.sessions.filter(s => s.dayKey === today).length;
      d.timer = count % 4 === 0
        ? startBreak(endedAt, 15, count)
        : startBreak(endedAt, d.settings.breakMinutes, count);
    });
    finishing = false;
    if (count % 4 === 0) window.fenerToast && window.fenerToast('Dört oturum bitti. Uzun mola ve biraz hareket iyi gelir.');
    paint();
  }

  on(root, 'click', '[data-action="end-break"]', async () => {
    await store.update(d => { d.timer = null; });
    paint();
  });

  on(root, 'click', '[data-action="toggle-task"]', async (e, t) => {
    const id = t.dataset.id;
    await store.update(d => {
      const day = store.todayBucket(d, today);
      const task = day.tasks.find(x => x.id === id);
      if (task) task.done = !task.done;
    });
    paint();
  });

  on(root, 'click', '[data-action="show-add"]', () => { showAddForm = true; paint(); });
  on(root, 'click', '[data-action="cancel-add"]', () => { showAddForm = false; paint(); });

  on(root, 'submit', '[data-form="add-task"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const text = String(fd.get('text') || '').trim();
    if (!text) return;
    if (dayBucket().tasks.length >= 3) {
      confirmFourth = { text, subject: fd.get('subject'), due: fd.get('due') || null };
      showAddForm = false;
      paint();
      return;
    }
    await addTask(today, text, fd.get('subject'), fd.get('due') || null);
    showAddForm = false;
    paint();
  });

  on(root, 'click', '[data-action="add-tomorrow"]', async () => {
    const { text, subject, due } = confirmFourth;
    await addTask(addDays(today, 1), text, subject, due);
    confirmFourth = null;
    paint();
  });

  on(root, 'click', '[data-action="add-anyway"]', async () => {
    const { text, subject, due } = confirmFourth;
    await addTask(today, text, subject, due);
    confirmFourth = null;
    paint();
  });

  async function addTask(key, text, subject, due) {
    await store.update(d => {
      const day = store.todayBucket(d, key);
      day.tasks.push({ id: uid(), text, subject, due, done: false, createdAt: Date.now() });
    });
  }

  on(root, 'submit', '[data-form="learned"]', async (e, form) => {
    e.preventDefault();
    const learned = String(new FormData(form).get('learned') || '').trim();
    await store.update(d => { store.todayBucket(d, today).learned = learned; });
    window.fenerToast && window.fenerToast('Kaydedildi.');
    paint();
  });

  on(root, 'click', '[data-action="add-question"]', (e, t) => {
    showQuestionForm = true;
    $('#questionFormArea', root).innerHTML = questionFormHtml();
    t.style.display = 'none';
  });
  on(root, 'click', '[data-action="cancel-question"]', () => {
    showQuestionForm = false;
    $('#questionFormArea', root).innerHTML = '';
    const btn = $('#addQuestionBtn', root);
    if (btn) btn.style.display = '';
  });

  on(root, 'change', 'select[name="template"]', (e, t) => {
    const input = $('input[name="q"]', t.closest('form'));
    if (input && t.value) input.value = t.value;
  });

  on(root, 'submit', '[data-form="question"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const q = String(fd.get('q') || '').trim();
    const a = String(fd.get('a') || '').trim();
    if (!q || !a) return;
    await store.update(d => {
      const note = { ...newQuestion(q, a, today, uid()), subject: fd.get('subject'), learned: store.todayBucket(d, today).learned || '', createdAt: Date.now() };
      d.notes.push(note);
    });
    showQuestionForm = false;
    window.fenerToast && window.fenerToast('İlk tekrar yarın.');
    paint();
  });

  paint();

  const interval = setInterval(() => { if (data.timer) paint(); }, 1000);
  return { destroy() { clearInterval(interval); keepAwake(false); } };
}
