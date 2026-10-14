// Aralıklı tekrar: 1 gün → 7 gün → 30 gün → 90 gün.
// "Kısmen" aynı aralığı yineler, "hatırlamadım" 1 güne döner.
import { addDays } from './util.js';

export const INTERVALS = [1, 7, 30, 90];

export function newQuestion(q, a, todayKey, id) {
  return { id, q, a, step: 0, due: addDays(todayKey, 1), history: [], updatedAt: Date.now() };
}

export function answer(question, result, todayKey) {
  let step = question.step ?? 0;
  if (result === 'yes') step = Math.min(step + 1, INTERVALS.length - 1);
  else if (result === 'no') step = 0;
  const due = addDays(todayKey, INTERVALS[step]);
  return { ...question, step, due, history: [...(question.history || []), { date: todayKey, result }], updatedAt: Date.now() };
}

export function isDue(question, todayKey) { return question.due <= todayKey; }

// Yazılı cevap kontrolü ve ipucu kartları.
export const MAX_HINTS = 3;

function norm(s) {
  return String(s || '').toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function distance(a, b) {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

// Büyük/küçük harf ve noktalamayı yok sayar; uzun cevaplarda tek harflik yazım hatasını kabul eder.
export function isCorrect(given, expected) {
  const g = norm(given), e = norm(expected);
  if (!g || !e) return false;
  if (g === e) return true;
  return e.length >= 5 && distance(g, e) <= 1;
}

// Her seviye bir öncekinden daha belirleyici: 1 = biçim, 2 = bağlam / baş harfler, 3 = yarısı açık cevap.
export function hintFor(note, level) {
  const answerText = String(note.a || '').trim();
  const words = answerText.split(/\s+/).filter(Boolean);
  if (level <= 1) {
    const letters = answerText.replace(/\s+/g, '').length;
    return `Cevap ${words.length} kelime, ${letters} harf. İlk harfi: ${[...answerText][0] || ''}`.trim();
  }
  if (level === 2) {
    const learned = String(note.learned || '').trim();
    if (learned && norm(learned) !== norm(answerText)) return `Not ettiğin bilgi: “${learned}”`;
    return 'Kelimelerin ilk iki harfi: ' + words.map(w => [...w].slice(0, 2).join('') + '…').join(' ');
  }
  return words.map(w => [...w].map((c, i) => (i % 2 === 0 ? c : '_')).join('')).join(' ');
}
