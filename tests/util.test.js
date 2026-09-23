import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dayKey, weekStart, weekDays, addDays, diffDays, dayName, trUpper, trLower } from '../app/js/util.js';

test('dayKey: 00:30 gibi 04:00 öncesi saatler önceki güne yazılır', () => {
  assert.equal(dayKey(new Date(2026, 8, 24, 0, 30)), '2026-09-23');
  assert.equal(dayKey(new Date(2026, 8, 24, 3, 59)), '2026-09-23');
});

test('dayKey: 04:00 ve sonrası aynı güne yazılır', () => {
  assert.equal(dayKey(new Date(2026, 8, 24, 4, 0)), '2026-09-24');
  assert.equal(dayKey(new Date(2026, 8, 24, 23, 59)), '2026-09-24');
});

test('weekStart: her zaman bir Pazartesiye döner', () => {
  for (const key of ['2026-09-21', '2026-09-23', '2026-09-27', '2026-01-01']) {
    const monday = weekStart(key);
    assert.equal(dayName(monday), 'Pazartesi');
    assert.ok(diffDays(monday, key) >= 0 && diffDays(monday, key) <= 6);
  }
});

test('weekDays: Pazartesiden başlayan 7 ardışık gün döner', () => {
  const days = weekDays('2026-09-21');
  assert.equal(days.length, 7);
  assert.equal(days[0], '2026-09-21');
  assert.equal(days[6], '2026-09-27');
});

test('addDays / diffDays birbirinin tersi', () => {
  assert.equal(addDays('2026-09-23', 7), '2026-09-30');
  assert.equal(diffDays('2026-09-23', '2026-09-30'), 7);
  assert.equal(diffDays('2026-09-23', '2026-09-16'), -7);
});

test('trUpper Türkçe İ/ı kuralını uygular', () => {
  assert.equal(trUpper('istanbul'), 'İSTANBUL');
  assert.equal(trLower('İZMİR'), 'izmir');
});
