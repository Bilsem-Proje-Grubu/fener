// Ödev hatırlatıcısı: saf yardımcılar. Sunucu yok; hatırlatma, uygulama
// açıldığında hesaplanır (ve izin varsa bildirim olarak da gösterilir).
import { diffDays } from './util.js';

/** Teslime kaç gün var ve bu durum hangi düzeyde gösterilir? */
export function dueInfo(due, today) {
  const days = diffDays(today, due);
  if (days < 0) return { days, level: 'late', label: days === -1 ? 'Dün teslimdi' : `${-days} gün gecikti` };
  if (days === 0) return { days, level: 'today', label: 'Bugün teslim' };
  if (days === 1) return { days, level: 'tomorrow', label: 'Yarın teslim' };
  return { days, level: 'later', label: `${days} gün kaldı` };
}

export function openHomework(list) {
  return (list || []).filter(h => !h.done);
}

/** Bitmemiş ödevler: önce teslimi en yakın olan. */
export function sortedOpen(list) {
  return openHomework(list).sort((a, b) => a.due < b.due ? -1 : a.due > b.due ? 1 : a.createdAt - b.createdAt);
}

/** Teslimden kaç gün kala hatırlatılır. Yapılmamış ödev teslim günü ve gecikince de uyarır. */
export const REMIND_DAYS = [7, 3, 1];

/** Uyarı gerektirenler: 7, 3 ve 1 gün kala, teslim günü ve geciken (yapılmamış) ödevler. */
export function reminders(list, today) {
  return sortedOpen(list).map(h => ({ ...h, info: dueInfo(h.due, today) }))
    .filter(h => h.info.days <= 0 || REMIND_DAYS.includes(h.info.days));
}

export function reminderText(items) {
  const group = (test, head) => {
    const g = items.filter(h => test(h.info));
    return g.length ? `${head}: ${g.map(h => h.title).join(', ')}` : null;
  };
  return [
    group(i => i.days === 1, 'Yarın teslim'),
    group(i => i.days === 0, 'Bugün teslim'),
    group(i => i.days === 3 || i.days === 7, '3-7 gün kala'),
    group(i => i.days < 0, 'Geciken'),
  ].filter(Boolean).join('. ');
}
