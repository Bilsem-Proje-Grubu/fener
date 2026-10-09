// Tarih, hafta ve küçük yardımcılar. Gün sınırı sabah 04:00'tür:
// gece 00:00–03:59 arasındaki iş bir önceki güne yazılır.
export const DAY_START_HOUR = 4;

export function uid() {
  return (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
}

export function pad(n) { return String(n).padStart(2, '0'); }

export function toKey(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

/** Bugünün anahtarı; 04:00 öncesi önceki gün sayılır. */
export function dayKey(now = new Date()) {
  const d = new Date(now);
  if (d.getHours() < DAY_START_HOUR) d.setDate(d.getDate() - 1);
  return toKey(d);
}

export function addDays(key, n) {
  const d = fromKey(key);
  d.setDate(d.getDate() + n);
  return toKey(d);
}

export function diffDays(a, b) {
  return Math.round((fromKey(b) - fromKey(a)) / 86400000);
}

/** Haftanın Pazartesi anahtarı. */
export function weekStart(key) {
  const d = fromKey(key);
  const dow = (d.getDay() + 6) % 7; // Pzt=0
  d.setDate(d.getDate() - dow);
  return toKey(d);
}

export function weekDays(mondayKey) {
  return Array.from({ length: 7 }, (_, i) => addDays(mondayKey, i));
}

/** ISO hafta numarası (bilgi amaçlı). */
export function isoWeek(key) {
  const d = fromKey(key);
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
}

const DAY_NAMES = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const DAY_SHORT = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

export function dayName(key, short = false) {
  const i = (fromKey(key).getDay() + 6) % 7;
  return short ? DAY_SHORT[i] : DAY_NAMES[i];
}

export function fmtDate(key, { weekday = true, year = false } = {}) {
  const d = fromKey(key);
  let s = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  if (year) s += ` ${d.getFullYear()}`;
  if (weekday) s = `${dayName(key)}, ${s}`;
  return s;
}

export function fmtRange(mondayKey) {
  const a = fromKey(mondayKey), b = fromKey(addDays(mondayKey, 6));
  if (a.getMonth() === b.getMonth()) return `${a.getDate()}–${b.getDate()} ${MONTHS[a.getMonth()]}`;
  return `${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
}

export function fmtClock(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
}

export function fmtMinutes(min) {
  if (min < 60) return `${min} dk`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} sa ${m} dk` : `${h} sa`;
}

export function trUpper(s) { return String(s).toLocaleUpperCase('tr'); }
export function trLower(s) { return String(s).toLocaleLowerCase('tr'); }

export function parseHM(hm) {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
}

export function minutesNow(now = new Date()) { return now.getHours() * 60 + now.getMinutes(); }

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Şablon yardımcısı: değerler otomatik kaçışlanır; {raw} ile ham HTML geçilir. */
export function html(strings, ...vals) {
  return strings.reduce((out, s, i) => {
    const v = vals[i - 1];
    const r = v == null ? '' : (v && v.__raw !== undefined) ? v.__raw : Array.isArray(v) ? v.map(x => x && x.__raw !== undefined ? x.__raw : esc(x)).join('') : esc(v);
    return out + r + s;
  });
}
export function raw(s) { return { __raw: String(s ?? '') }; }

export function $(sel, root = document) { return root.querySelector(sel); }
export function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

export function on(root, event, sel, fn) {
  root.addEventListener(event, e => {
    const t = e.target.closest(sel);
    if (t && root.contains(t)) fn(e, t);
  });
}

export function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

/** iPhone Safari'de siteler 7 gün kullanılmayınca verisini silebilir;
 * ana ekrana kurulu uygulamada bu olmaz. Kurulmamış iOS Safari'de true. */
export function isIosStandaloneEligible() {
  const ua = navigator.userAgent || '';
  const isIos = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
  const isStandalone = navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  return isIos && !isStandalone;
}

export const SUBJECTS = [
  'Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türk Dili ve Edebiyatı', 'İngilizce',
  'Tarih', 'Coğrafya', 'Din Kültürü', 'Bilişim', 'Beden Eğitimi', 'Görsel Sanatlar / Müzik', 'Sağlık ve Trafik', 'Diğer'
];

/** Temayı <html data-skin> olarak uygular; 'fener' varsayılan, öznitelik yok. */
export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'valorant') root.setAttribute('data-skin', 'valorant');
  else root.removeAttribute('data-skin');
}
