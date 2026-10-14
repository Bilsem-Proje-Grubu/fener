import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newQuestion, answer, isDue, INTERVALS } from '../app/js/spaced.js';
import { addDays } from '../app/js/util.js';

const TODAY = '2026-09-23';

test('newQuestion: ilk tekrar ertesi güne düşer', () => {
  const q = newQuestion('Soru?', 'Cevap', TODAY, 'q1');
  assert.equal(q.step, 0);
  assert.equal(q.due, addDays(TODAY, 1));
});

test('answer "yes": aralık sırayla 1 -> 7 -> 30 -> 90 gün ilerler', () => {
  let q = newQuestion('Soru?', 'Cevap', TODAY, 'q1');
  q = answer(q, 'yes', TODAY);
  assert.equal(q.step, 1);
  assert.equal(q.due, addDays(TODAY, INTERVALS[1]));

  q = answer(q, 'yes', TODAY);
  assert.equal(q.step, 2);
  assert.equal(q.due, addDays(TODAY, INTERVALS[2]));

  q = answer(q, 'yes', TODAY);
  assert.equal(q.step, 3);
  assert.equal(q.due, addDays(TODAY, INTERVALS[3]));

  // en yüksek adımda kalır, artmaya devam etmez
  q = answer(q, 'yes', TODAY);
  assert.equal(q.step, 3);
});

test('answer "kısmen": aynı aralığı yineler', () => {
  let q = newQuestion('Soru?', 'Cevap', TODAY, 'q1');
  q = answer(q, 'yes', TODAY); // step 1
  const before = q.due;
  q = answer(q, 'partial', TODAY);
  assert.equal(q.step, 1);
  assert.equal(q.due, before);
});

test('answer "no": hatırlamadım başa döner', () => {
  let q = newQuestion('Soru?', 'Cevap', TODAY, 'q1');
  q = answer(q, 'yes', TODAY);
  q = answer(q, 'yes', TODAY); // step 2
  q = answer(q, 'no', TODAY);
  assert.equal(q.step, 0);
  assert.equal(q.due, addDays(TODAY, INTERVALS[0]));
});

test('answer: geçmişe her cevabı ekler', () => {
  let q = newQuestion('Soru?', 'Cevap', TODAY, 'q1');
  q = answer(q, 'yes', TODAY);
  q = answer(q, 'no', addDays(TODAY, 7));
  assert.equal(q.history.length, 2);
  assert.deepEqual(q.history.map(h => h.result), ['yes', 'no']);
});

test('isDue: sırası gelmiş ve gelmemiş sorular doğru ayrılır', () => {
  const q = newQuestion('Soru?', 'Cevap', TODAY, 'q1'); // due = TODAY+1
  assert.equal(isDue(q, TODAY), false);
  assert.equal(isDue(q, addDays(TODAY, 1)), true);
  assert.equal(isDue(q, addDays(TODAY, 5)), true);
});

import { isCorrect, hintFor, MAX_HINTS } from '../app/js/spaced.js';

test('isCorrect: büyük/küçük harf, noktalama ve tek harflik hatayı kabul eder', () => {
  assert.equal(isCorrect('  ıŞık hızı ', 'Işık Hızı!'), true);
  assert.equal(isCorrect('mitokondri', 'mitokondrl'), true);
  assert.equal(isCorrect('kloroplast', 'mitokondri'), false);
  assert.equal(isCorrect('', 'a'), false);
  assert.equal(isCorrect('ab', 'ac'), false);
});

test('hintFor: üç ipucu giderek cevaba yaklaşır', () => {
  const note = { a: 'Mitokondri', learned: 'Hücrenin enerji santrali' };
  assert.equal(MAX_HINTS, 3);
  assert.match(hintFor(note, 1), /1 kelime, 10 harf.*M/);
  assert.match(hintFor(note, 2), /enerji santrali/);
  assert.equal(hintFor(note, 3), 'M_t_k_n_r_');
});
