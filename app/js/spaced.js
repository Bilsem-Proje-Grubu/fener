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
