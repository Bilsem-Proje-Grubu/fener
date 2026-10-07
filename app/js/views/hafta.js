import { $, on, esc, uid, dayKey, diffDays, weekStart, weekDays, fmtRange, fmtDate, fmtMinutes, SUBJECTS } from '../util.js';
import * as store from '../store.js';

const EXAM_TYPES = ['Yazılı', 'Ödev', 'Proje'];
const STEPS = ['wish', 'outcome', 'obstacle', 'plan', 'goals'];

export async function renderHafta(root) {
  const data = await store.getData();
  const today = dayKey();
  const monday = weekStart(today);
  const days = weekDays(monday);

  let showExamForm = false;
  let planStep = null;
  let planDraft = null;
  let reviewDraft = null;
  let showReviewForm = false;

  function weekBucket(key = monday) {
    return data.weeks[key] || { plan: null, review: null };
  }

  function upcomingExams() {
    return data.exams.filter(e => e.date >= today).sort((a, b) => a.date < b.date ? -1 : 1).slice(0, 8);
  }

  function scheduleCardHtml() {
    const s = data.settings;
    return `
      <div class="card">
        <div class="row between">
          <h1 class="display week-title">${esc(fmtRange(monday))}</h1>
        </div>
        <p class="hint">Hafta içi okul: ${esc(s.schoolStart)}–${esc(s.schoolEnd)}. Sonrası boş, sen doldurursun.</p>
        <form data-form="school-hours" class="row" style="margin-top:8px;flex-wrap:wrap">
          <div style="flex:1;min-width:120px">
            <label>Okul başlar</label>
            <input type="time" name="schoolStart" value="${esc(s.schoolStart)}">
          </div>
          <div style="flex:1;min-width:120px">
            <label>Okul biter</label>
            <input type="time" name="schoolEnd" value="${esc(s.schoolEnd)}">
          </div>
          <button type="submit" class="btn-ghost" style="align-self:flex-end">Kaydet</button>
        </form>
      </div>`;
  }

  function examListHtml() {
    const exams = upcomingExams();
    const rows = exams.map(e => `
      <li class="task-item">
        <div style="flex:1">
          <div>${esc(e.subject)} · ${esc(e.type)}</div>
          <div class="task-sub">${esc(fmtDate(e.date))} · ${diffDays(today, e.date)} gün</div>
        </div>
        <button type="button" class="btn-ghost" data-action="delete-exam" data-id="${esc(e.id)}" aria-label="Sil">Sil</button>
      </li>`).join('');
    return `
      <div class="card">
        <h2>Yaklaşan sınav ve teslimler</h2>
        ${exams.length ? `<ul class="task-list">${rows}</ul>` : `<p class="empty">Henüz eklenmedi.</p>`}
        ${!showExamForm
          ? `<button type="button" class="btn-ghost" data-action="show-exam-form" style="margin-top:10px">+ Sınav / teslim ekle</button>`
          : `
            <form data-form="add-exam" class="stack" style="margin-top:10px">
              <select name="subject">${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join('')}</select>
              <select name="type">${EXAM_TYPES.map(t => `<option>${esc(t)}</option>`).join('')}</select>
              <input type="date" name="date" required>
              <div class="row">
                <button type="submit" class="btn-primary">Ekle</button>
                <button type="button" class="btn-ghost" data-action="cancel-exam-form">Vazgeç</button>
              </div>
            </form>`}
      </div>`;
  }

  function distractionSuggestions() {
    const reasons = data.sessions
      .filter(s => days.includes(s.dayKey) && s.distraction)
      .map(s => s.distraction);
    return [...new Set(reasons)];
  }

  const PLAN_META = {
    wish: { title: 'Dilek', hint: 'Bu hafta ne yapmak istiyorsun?', example: 'Örnek: Bu hafta her akşam 40 dakika matematik çözmek istiyorum.' },
    outcome: { title: 'Sonuç', hint: 'Olursa ne değişir?', example: 'Örnek: Olursa sınavda kendimi daha güvende hissederim.' },
    obstacle: { title: 'Engel', hint: 'Seni ne durduracak?', example: 'Örnek: Beni durduracak şey: eve gelince telefona uzanmam.' },
    plan: { title: 'Plan', hint: '"Eğer … olursa, o zaman …" kalıbıyla tamamla.', example: 'Örnek: Eğer eve gelip telefona uzanırsam, o zaman telefonu mutfağa bırakıp masaya oturacağım.' },
  };

  function planWizardHtml() {
    const bucket = weekBucket();
    if (planStep === null) {
      if (!bucket.plan) {
        return `
          <div class="card">
            <h2>Bu haftanın planı</h2>
            <p class="empty">Henüz plan yok.</p>
            <button type="button" class="btn-primary" data-action="start-plan">Plana başla</button>
            <a class="btn-ghost" href="#/rehber?s=8" style="margin-top:6px;display:inline-block">Bu neden işe yarıyor?</a>
          </div>`;
      }
      const p = bucket.plan;
      return `
        <div class="card card--ruled">
          <h2>Bu haftanın planı</h2>
          <p><strong>Dilek:</strong> ${esc(p.wish)}</p>
          <p><strong>Sonuç:</strong> ${esc(p.outcome)}</p>
          <p><strong>Engel:</strong> ${esc(p.obstacle)}</p>
          <p><strong>Plan:</strong> ${esc(p.planText)}</p>
          ${p.goals.filter(Boolean).length ? `<p><strong>Hedefler:</strong></p><ul>${p.goals.filter(Boolean).map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
          <button type="button" class="btn-ghost" data-action="start-plan">Yeniden düzenle</button>
        </div>`;
    }

    const stepName = STEPS[planStep];
    if (stepName === 'goals') {
      const exams = upcomingExams();
      return `
        <div class="card">
          <h2>Haftanın 3 hedefi</h2>
          ${exams.length ? `
            <p class="hint">Yaklaşan sınavlardan öneri:</p>
            <div class="chip-row" style="margin-bottom:10px">
              ${exams.map(e => `<button type="button" class="chip" data-action="goal-suggest" data-text="${esc(e.subject + ' için çalış')}">${esc(e.subject)}</button>`).join('')}
            </div>` : ''}
          <div class="stack">
            <input type="text" id="goal0" placeholder="Hedef 1" value="${esc(planDraft.goals[0] || '')}">
            <input type="text" id="goal1" placeholder="Hedef 2" value="${esc(planDraft.goals[1] || '')}">
            <input type="text" id="goal2" placeholder="Hedef 3" value="${esc(planDraft.goals[2] || '')}">
          </div>
          <div class="row" style="margin-top:14px">
            <button type="button" class="btn-ghost" data-action="plan-back">Geri</button>
            <button type="button" class="btn-primary" data-action="plan-save">Planı kaydet</button>
          </div>
        </div>`;
    }

    const meta = PLAN_META[stepName];
    const suggestions = stepName === 'obstacle' ? distractionSuggestions() : [];
    return `
      <div class="card">
        <h2>${esc(meta.title)}</h2>
        <p class="hint">${esc(meta.hint)}</p>
        ${suggestions.length ? `
          <div class="chip-row" style="margin-bottom:8px">
            ${suggestions.map(s => `<button type="button" class="chip" data-action="obstacle-suggest" data-text="${esc(s)}">${esc(s)}</button>`).join('')}
          </div>` : ''}
        <textarea id="planField" data-field="${stepName}">${esc(stepName === 'plan' ? (planDraft.planText || 'Eğer ') : planDraft[stepName])}</textarea>
        <p class="hint">${esc(meta.example)}</p>
        <div class="row" style="margin-top:10px">
          ${planStep > 0 ? `<button type="button" class="btn-ghost" data-action="plan-back">Geri</button>` : `<button type="button" class="btn-ghost" data-action="plan-cancel">Vazgeç</button>`}
          <button type="button" class="btn-primary" data-action="plan-next">Devam</button>
        </div>
      </div>`;
  }

  function weekStats() {
    const sessions = data.sessions.filter(s => days.includes(s.dayKey));
    const bySubject = {};
    sessions.forEach(s => { const subj = s.subject || 'Diğer'; bySubject[subj] = (bySubject[subj] || 0) + s.minutes; });
    const answeredThisWeek = data.notes.filter(n => n.q && (n.history || []).some(h => days.includes(h.date))).length;
    const stillDue = data.notes.filter(n => n.q && n.due && n.due <= today).length;
    const total = answeredThisWeek + stillDue;
    const pct = total > 0 ? Math.round((answeredThisWeek / total) * 100) : null;
    return { count: sessions.length, bySubject, pct };
  }

  function shareText(bucket) {
    const stats = weekStats();
    const lines = [
      `Fener — haftalık özet (${fmtRange(monday)})`,
      `Oturum: ${stats.count}`,
      ...Object.entries(stats.bySubject).map(([s, m]) => `${s}: ${fmtMinutes(m)}`),
      stats.pct != null ? `Sırası gelen tekrarların ${stats.pct}%'i yapıldı` : null,
      bucket.review ? `Değerlendirme dolduruldu. Kontrol hissi: ${bucket.review.control}/5` : 'Değerlendirme henüz dolmadı.',
    ].filter(Boolean);
    return lines.join('\n');
  }

  function reviewCardHtml() {
    const bucket = weekBucket();
    if (bucket.review && !showReviewForm) {
      const r = bucket.review;
      return `
        <div class="card">
          <h2>Haftayı değerlendir</h2>
          <p><strong>En iyi giden:</strong> ${esc(r.best)}</p>
          <p><strong>Engel:</strong> ${esc(r.blocker)}</p>
          <p><strong>Değişecek şey:</strong> ${esc(r.change)}</p>
          <p><strong>Kontrol hissi:</strong> ${esc(r.control)}/5</p>
          <div class="row">
            <button type="button" class="btn-ghost" data-action="edit-review">Yeniden düzenle</button>
            <button type="button" class="btn-ghost" data-action="share-week">Haftalık özeti paylaş</button>
          </div>
        </div>`;
    }

    const stats = weekStats();
    const d = reviewDraft || { best: '', blocker: '', change: '', control: '' };
    return `
      <div class="card card--ruled">
        <h2>Haftayı değerlendir</h2>
        <p class="hint">Bu hafta ${stats.count} oturum.
          ${Object.entries(stats.bySubject).map(([s, m]) => `${esc(s)}: ${esc(fmtMinutes(m))}`).join(', ') || ''}
          ${stats.pct != null ? ` · Sırası gelen tekrarların ${stats.pct}%'i yapıldı.` : ''}
        </p>
        <form data-form="review" class="stack">
          <div>
            <label>En iyi giden neydi?</label>
            <textarea name="best">${esc(d.best)}</textarea>
          </div>
          <div>
            <label>Beni ne engelledi?</label>
            <textarea name="blocker">${esc(d.blocker)}</textarea>
          </div>
          <div>
            <label>Gelecek hafta bir şeyi değiştirsem ne olurdu?</label>
            <textarea name="change">${esc(d.change)}</textarea>
          </div>
          <div>
            <label>Kendimi ne kadar kontrolde hissettim?</label>
            <div class="scale-row">
              ${[1, 2, 3, 4, 5].map(n => `<button type="button" class="chip${String(d.control) === String(n) ? ' selected' : ''}" data-action="control" data-n="${n}">${n}</button>`).join('')}
            </div>
          </div>
          <button type="submit" class="btn-primary">Değerlendirmeyi kaydet</button>
        </form>
      </div>`;
  }

  function pastWeeksHtml() {
    const keys = Object.keys(data.weeks).filter(k => k < monday).sort().reverse();
    if (!keys.length) return '';
    const rows = keys.map(k => {
      const w = data.weeks[k];
      const status = [w.plan ? 'Plan var' : 'Plan yok', w.review ? 'Değerlendirme var' : 'Değerlendirme yok'].join(' · ');
      return `<li class="task-item"><div><div>${esc(fmtRange(k))}</div><div class="task-sub">${esc(status)}</div></div></li>`;
    }).join('');
    return `<div class="card"><h2>Geçmiş haftalar</h2><ul class="task-list">${rows}</ul></div>`;
  }

  function paint() {
    const isWeekend = [5, 6].includes((new Date().getDay() + 6) % 7);
    const blocks = [scheduleCardHtml(), examListHtml(), planWizardHtml(), reviewCardHtml()];
    if (isWeekend) { const r = blocks.splice(3, 1)[0]; blocks.splice(2, 0, r); }
    root.innerHTML = blocks.join('') + pastWeeksHtml();
  }

  on(root, 'submit', '[data-form="school-hours"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    await store.update(d => {
      d.settings.schoolStart = fd.get('schoolStart') || d.settings.schoolStart;
      d.settings.schoolEnd = fd.get('schoolEnd') || d.settings.schoolEnd;
    });
    window.fenerToast && window.fenerToast('Kaydedildi.');
    paint();
  });

  on(root, 'click', '[data-action="show-exam-form"]', () => { showExamForm = true; paint(); });
  on(root, 'click', '[data-action="cancel-exam-form"]', () => { showExamForm = false; paint(); });

  on(root, 'submit', '[data-form="add-exam"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const date = fd.get('date');
    if (!date) return;
    await store.update(d => {
      d.exams.push({ id: uid(), subject: fd.get('subject'), type: fd.get('type'), date, createdAt: Date.now(), updatedAt: Date.now() });
    });
    showExamForm = false;
    paint();
  });

  on(root, 'click', '[data-action="delete-exam"]', async (e, t) => {
    const id = t.dataset.id;
    await store.update(d => { d.exams = d.exams.filter(x => x.id !== id); });
    paint();
  });

  on(root, 'click', '[data-action="start-plan"]', () => {
    const existing = weekBucket().plan;
    planDraft = existing ? { ...existing, goals: [...existing.goals] } : { wish: '', outcome: '', obstacle: '', planText: '', goals: ['', '', ''] };
    planStep = 0;
    paint();
  });

  on(root, 'click', '[data-action="plan-cancel"]', () => { planStep = null; planDraft = null; paint(); });

  function captureField() {
    const field = $('#planField', root);
    if (!field) return;
    const key = field.dataset.field === 'plan' ? 'planText' : field.dataset.field;
    planDraft[key] = field.value;
  }

  on(root, 'click', '[data-action="plan-next"]', () => {
    captureField();
    planStep = Math.min(planStep + 1, STEPS.length - 1);
    paint();
  });

  on(root, 'click', '[data-action="plan-back"]', () => {
    if (STEPS[planStep] !== 'goals') captureField();
    planStep = Math.max(planStep - 1, 0);
    paint();
  });

  on(root, 'click', '[data-action="obstacle-suggest"]', (e, t) => {
    const field = $('#planField', root);
    if (field) field.value = t.dataset.text;
  });

  on(root, 'click', '[data-action="goal-suggest"]', (e, t) => {
    const inputs = ['#goal0', '#goal1', '#goal2'].map(sel => $(sel, root));
    const empty = inputs.find(i => i && !i.value.trim());
    if (empty) empty.value = t.dataset.text;
  });

  on(root, 'click', '[data-action="plan-save"]', async () => {
    planDraft.goals = ['#goal0', '#goal1', '#goal2'].map(sel => $(sel, root)?.value.trim() || '');
    await store.update(d => {
      if (!d.weeks[monday]) d.weeks[monday] = { plan: null, review: null };
      d.weeks[monday].plan = { ...planDraft, completedAt: Date.now() };
    });
    planStep = null;
    planDraft = null;
    window.fenerToast && window.fenerToast('Plan kaydedildi.');
    paint();
  });

  on(root, 'click', '[data-action="edit-review"]', () => {
    reviewDraft = { ...weekBucket().review };
    showReviewForm = true;
    paint();
  });

  on(root, 'click', '[data-action="control"]', (e, t) => {
    reviewDraft = reviewDraft || { best: '', blocker: '', change: '', control: '' };
    const form = t.closest('form');
    reviewDraft.best = $('textarea[name="best"]', form)?.value || '';
    reviewDraft.blocker = $('textarea[name="blocker"]', form)?.value || '';
    reviewDraft.change = $('textarea[name="change"]', form)?.value || '';
    reviewDraft.control = Number(t.dataset.n);
    paint();
  });

  on(root, 'submit', '[data-form="review"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const control = reviewDraft && reviewDraft.control ? reviewDraft.control : null;
    if (!control) { window.fenerToast && window.fenerToast('Kontrol hissini seç.'); return; }
    const review = { best: fd.get('best') || '', blocker: fd.get('blocker') || '', change: fd.get('change') || '', control, completedAt: Date.now() };
    await store.update(d => {
      if (!d.weeks[monday]) d.weeks[monday] = { plan: null, review: null };
      d.weeks[monday].review = review;
    });
    showReviewForm = false;
    reviewDraft = null;
    window.fenerToast && window.fenerToast('Değerlendirme kaydedildi. Yedeğini indirmeyi unutma.');
    paint();
  });

  on(root, 'click', '[data-action="share-week"]', async () => {
    const text = shareText(weekBucket());
    try {
      await navigator.clipboard.writeText(text);
      window.fenerToast && window.fenerToast('Özet kopyalandı.');
    } catch {
      window.fenerToast && window.fenerToast('Kopyalanamadı. Elle seçip kopyala.');
    }
  });

  paint();
  return { destroy() {} };
}
