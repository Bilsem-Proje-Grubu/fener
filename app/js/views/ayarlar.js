import { $, on, esc, dayKey, addDays, diffDays, weekStart, weekDays, fmtRange, fmtDate, isIosStandaloneEligible } from '../util.js';
import * as store from '../store.js';
import { VERSION, BUILD } from '../version.js';

export async function renderAyarlar(root) {
  const data = await store.getData();

  let resetState = null;
  let resetTimer = null;

  function hasSession(day) { return data.sessions.some(s => s.dayKey === day); }

  function progressWallRows() {
    const start = weekStart(dayKey(new Date(data.createdAt || Date.now())));
    const current = weekStart(dayKey());
    const rows = [];
    let k = start;
    while (k <= current) { rows.push(k); k = addDays(k, 7); }
    return rows.slice(-20);
  }

  function wallHtml() {
    const rows = progressWallRows();
    return `
      <div class="card">
        <h2>İlerleme duvarı</h2>
        <p class="hint">Her hücre bir oturum yapılan gün. Hiçbir şey silinmez.</p>
        <div class="wall">
          ${rows.map(monday => `
            <div class="wall-row">
              <span class="wall-week">${esc(fmtRange(monday))}</span>
              ${weekDays(monday).map(d => `<span class="wall-cell${hasSession(d) ? ' filled' : ''}" title="${esc(fmtDate(d))}"></span>`).join('')}
            </div>`).join('')}
        </div>
      </div>`;
  }

  function profileHtml() {
    const p = data.profile;
    return `
      <div class="card">
        <h2>Sen</h2>
        <form data-form="profile" class="stack">
          <div>
            <label>Ad</label>
            <input type="text" name="name" value="${esc(p.name)}">
          </div>
          <div>
            <label>Neden çalışıyorum (isteğe bağlı)</label>
            <textarea name="why" placeholder="Uygun anlarda karşına çıkar.">${esc(p.why || '')}</textarea>
          </div>
          <label class="row" style="cursor:pointer">
            <input type="checkbox" name="mainDevice" ${p.mainDevice ? 'checked' : ''}>
            <span>Bu, ana cihazın</span>
          </label>
          <button type="submit" class="btn-primary">Kaydet</button>
        </form>
      </div>`;
  }

  function timesHtml() {
    const s = data.settings;
    return `
      <div class="card">
        <h2>Süreler ve saatler</h2>
        <form data-form="times" class="stack">
          <div class="row" style="flex-wrap:wrap">
            <div style="flex:1;min-width:120px"><label>Odak (dk)</label><input type="text" inputmode="numeric" name="focusMinutes" value="${esc(s.focusMinutes)}"></div>
            <div style="flex:1;min-width:120px"><label>Mola (dk)</label><input type="text" inputmode="numeric" name="breakMinutes" value="${esc(s.breakMinutes)}"></div>
          </div>
          <div class="row" style="flex-wrap:wrap">
            <div style="flex:1;min-width:120px"><label>Okul başlar</label><input type="time" name="schoolStart" value="${esc(s.schoolStart)}"></div>
            <div style="flex:1;min-width:120px"><label>Okul biter</label><input type="time" name="schoolEnd" value="${esc(s.schoolEnd)}"></div>
          </div>
          <div><label>Yatma saati</label><input type="time" name="bedtime" value="${esc(s.bedtime)}"></div>
          <button type="submit" class="btn-primary">Kaydet</button>
        </form>
      </div>`;
  }

  function shareText() {
    const monday = weekStart(dayKey());
    const days = weekDays(monday);
    const count = data.sessions.filter(s => days.includes(s.dayKey)).length;
    const week = data.weeks[monday];
    const control = week && week.review ? week.review.control : null;
    return [
      `Fener — haftalık özet (${fmtRange(monday)})`,
      `Oturum: ${count}`,
      control != null ? `Kontrol hissi: ${control}/5` : 'Değerlendirme henüz dolmadı.',
    ].join('\n');
  }

  function shareHtml() {
    return `
      <div class="card">
        <h2>Haftalık özeti paylaş</h2>
        <p class="hint">Kimliksiz kısa bir metin; oturum sayısı ve kontrol hissini panoya kopyalar.</p>
        <button type="button" class="btn-ghost" data-action="share-week">Kopyala</button>
      </div>`;
  }

  function backupHtml() {
    const last = data.lastBackupAt;
    const daysSince = last ? diffDays(dayKey(new Date(last)), dayKey()) : null;
    const warn = daysSince == null || daysSince >= 14;
    return `
      <div class="card${warn ? ' danger-card' : ''}">
        <h2>Yedek</h2>
        <p class="hint">${last ? 'Son yedek: ' + esc(fmtDate(dayKey(new Date(last)))) : 'Henüz yedek alınmadı.'}</p>
        ${warn ? `<p class="hint" style="color:var(--warn)">${last ? '14 günden uzun süredir yedek yok.' : 'Hiç yedek almadın.'}</p>` : ''}
        <div class="row">
          <button type="button" class="btn-primary" data-action="download-backup">Yedeği indir</button>
          <button type="button" class="btn-ghost" data-action="upload-backup">Yedeği yükle</button>
        </div>
        <input type="file" id="backupFile" accept="application/json" style="display:none">
      </div>`;
  }

  function installCardHtml() {
    if (!isIosStandaloneEligible()) return '';
    return `
      <div class="card danger-card">
        <h2>Ana ekrana ekle</h2>
        <p class="hint">iPhone'da Safari, 7 gün açılmayan sitelerin verisini silebiliyor. Paylaş simgesinden "Ana Ekrana Ekle"yi seç.</p>
      </div>`;
  }

  function versionHtml() {
    return `<div class="card"><h2>Sürüm</h2><p class="hint">Fener ${esc(VERSION)} (${esc(BUILD)})</p></div>`;
  }

  function resetHtml() {
    if (resetState === 'confirm') {
      return `
        <div class="card danger-card">
          <h2>Her şeyi sıfırla</h2>
          <p>Emin misin? Tüm veriler bu cihazdan kalıcı olarak silinecek.</p>
          <div class="row">
            <button type="button" class="btn-danger" data-action="reset-confirm">Evet, sıfırla</button>
            <button type="button" class="btn-ghost" data-action="reset-cancel">Vazgeç</button>
          </div>
        </div>`;
    }
    if (resetState && resetState.n != null) {
      return `
        <div class="card danger-card">
          <h2>Sıfırlanıyor…</h2>
          <p>${resetState.n} saniye içinde tüm veriler silinecek.</p>
          <button type="button" class="btn-primary" data-action="reset-undo">Geri al</button>
        </div>`;
    }
    return `
      <div class="card">
        <h2>Her şeyi sıfırla</h2>
        <p class="hint">Ad, iş, not ve oturumların hepsini bu cihazdan siler.</p>
        <button type="button" class="btn-ghost" data-action="reset-start">Her şeyi sıfırla</button>
      </div>`;
  }

  function paint() {
    root.innerHTML = `
      <div class="greet"><h1>Ayarlar</h1></div>
      ${installCardHtml()}${profileHtml()}${timesHtml()}${wallHtml()}${shareHtml()}${backupHtml()}${versionHtml()}${resetHtml()}
    `;
  }

  on(root, 'submit', '[data-form="profile"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    await store.update(d => {
      d.profile.name = String(fd.get('name') || '').trim() || d.profile.name;
      d.profile.why = String(fd.get('why') || '').trim();
      d.profile.mainDevice = fd.get('mainDevice') === 'on';
    });
    window.fenerToast && window.fenerToast('Kaydedildi.');
    paint();
  });

  on(root, 'submit', '[data-form="times"]', async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const focusMinutes = Number(fd.get('focusMinutes')) || data.settings.focusMinutes;
    const breakMinutes = Number(fd.get('breakMinutes')) || data.settings.breakMinutes;
    await store.update(d => {
      d.settings.focusMinutes = focusMinutes;
      d.settings.breakMinutes = breakMinutes;
      d.settings.schoolStart = fd.get('schoolStart') || d.settings.schoolStart;
      d.settings.schoolEnd = fd.get('schoolEnd') || d.settings.schoolEnd;
      d.settings.bedtime = fd.get('bedtime') || d.settings.bedtime;
    });
    window.fenerToast && window.fenerToast('Kaydedildi.');
    paint();
  });

  on(root, 'click', '[data-action="share-week"]', async () => {
    try {
      await navigator.clipboard.writeText(shareText());
      window.fenerToast && window.fenerToast('Kopyalandı.');
    } catch {
      window.fenerToast && window.fenerToast('Kopyalanamadı. Elle seçip kopyala.');
    }
  });

  on(root, 'click', '[data-action="download-backup"]', async () => {
    const backup = await store.exportBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fener-yedek-${dayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    await store.markBackedUp();
    window.fenerToast && window.fenerToast('Yedek indirildi.');
    paint();
  });

  on(root, 'click', '[data-action="upload-backup"]', () => { $('#backupFile', root).click(); });

  on(root, 'change', '#backupFile', async (e, input) => {
    const file = input.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      await store.importBackup(parsed);
      window.fenerToast && window.fenerToast('Yedek yüklendi. Yenileniyor…');
      setTimeout(() => location.reload(), 600);
    } catch {
      window.fenerToast && window.fenerToast('Yedek okunamadı. Dosya bozuk olabilir.');
    }
  });

  on(root, 'click', '[data-action="reset-start"]', () => { resetState = 'confirm'; paint(); });
  on(root, 'click', '[data-action="reset-cancel"]', () => { resetState = null; paint(); });

  on(root, 'click', '[data-action="reset-confirm"]', () => {
    resetState = { n: 5 };
    paint();
    resetTimer = setInterval(() => {
      resetState.n -= 1;
      if (resetState.n <= 0) {
        clearInterval(resetTimer);
        store.resetAll().then(() => location.reload());
        return;
      }
      paint();
    }, 1000);
  });

  on(root, 'click', '[data-action="reset-undo"]', () => {
    clearInterval(resetTimer);
    resetState = null;
    paint();
  });

  paint();
  return { destroy() { clearInterval(resetTimer); } };
}
