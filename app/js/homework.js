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

/** Uyarı gerektirenler: yarın teslim (asıl hatırlatma), bugün teslim ve geciken. */
export function reminders(list, today) {
  return sortedOpen(list).map(h => ({ ...h, info: dueInfo(h.due, today) })).filter(h => h.info.days <= 1);
}

export function reminderText(items) {
  const tomorrow = items.filter(h => h.info.level === 'tomorrow');
  const today = items.filter(h => h.info.level === 'today');
  const late = items.filter(h => h.info.level === 'late');
  const parts = [];
  if (tomorrow.length) parts.push(`Yarın teslim: ${tomorrow.map(h => h.title).join(', ')}`);
  if (today.length) parts.push(`Bugün teslim: ${today.map(h => h.title).join(', ')}`);
  if (late.length) parts.push(`Geciken: ${late.map(h => h.title).join(', ')}`);
  return parts.join('. ');
}
