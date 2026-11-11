import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startFocus, remaining, progress, extend, isDone, elapsedMinutes } from '../app/js/timer.js';

test('remaining: başlangıçta tam süreyi verir', () => {
  const t = startFocus(0, 25);
  assert.equal(remaining(t, 0), 25 * 60000);
});

test('remaining: sayfa yenilense de (JSON round-trip) kalan süre saatten doğru hesaplanır', () => {
  const t = startFocus(1_000_000, 25);
  const reloaded = JSON.parse(JSON.stringify(t));
  assert.equal(remaining(reloaded, 1_000_000 + 5000), 25 * 60000 - 5000);
});

test('progress: 0 ile 1 arasında ilerler, süre bitince 1 olur', () => {
  const t = startFocus(0, 10);
  assert.equal(progress(t, 0), 0);
  assert.ok(Math.abs(progress(t, 5 * 60000) - 0.5) < 1e-9);
  assert.equal(progress(t, 10 * 60000), 1);
  assert.equal(progress(t, 999 * 60000), 1);
});

test('extend: bitiş zamanını ileri alır', () => {
  const t = startFocus(0, 25);
  const extended = extend(t, 5);
  assert.equal(remaining(extended, 0), 30 * 60000);
});

test('isDone: kalan süre 0 veya altına indiğinde true', () => {
  const t = startFocus(0, 1);
  assert.equal(isDone(t, 0), false);
  assert.equal(isDone(t, 60000), true);
  assert.equal(isDone(t, 70000), true);
});

test('elapsedMinutes: en az 1 dakika sayar, erken bitirmede geçen süreyi verir', () => {
  const t = startFocus(0, 25);
  assert.equal(elapsedMinutes(t, 10000), 1);
  assert.equal(elapsedMinutes(t, 12 * 60000), 12);
});

import { shouldRing, alarmText } from '../app/js/alarm.js';

test('alarm: süre bitince bir kez çalar, ikinci kez çalmaz', () => {
  const t = startFocus(0, 25);
  assert.equal(shouldRing(t, 24 * 60000, null), false);
  assert.equal(shouldRing(t, 25 * 60000 + 500, null), true);
  assert.equal(shouldRing(t, 25 * 60000 + 1500, t.endsAt), false);
});

test('alarm: +5 dakika sonrası yeni bitişte tekrar çalar', () => {
  const t = startFocus(0, 25);
  const t2 = extend(t, 5);
  assert.equal(shouldRing(t2, 30 * 60000 + 100, t.endsAt), true);
});

test('alarm: kapalıyken, duraklatılmışken ve çok eskiyken çalmaz', () => {
  const t = startFocus(0, 25);
  assert.equal(shouldRing(t, 25 * 60000 + 100, null, false), false);
  assert.equal(shouldRing({ ...t, pausedAt: 1000 }, 25 * 60000 + 100, null), false);
  assert.equal(shouldRing(t, 25 * 60000 + 10 * 60000, null), false);
  assert.equal(shouldRing(null, 1, null), false);
});

test('alarm: metin odak ve mola için farklı', () => {
  assert.notEqual(alarmText({ phase: 'focus' }).title, alarmText({ phase: 'break' }).title);
});
