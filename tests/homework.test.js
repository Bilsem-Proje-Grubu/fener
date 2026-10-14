import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dueInfo, sortedOpen, reminders, reminderText } from '../app/js/homework.js';

const hw = (title, due, done = false) => ({ id: title, title, due, done, createdAt: 1 });

test('dueInfo: yarın, bugün, geciken ve uzak teslimler ayrılır', () => {
  assert.equal(dueInfo('2026-10-23', '2026-10-22').level, 'tomorrow');
  assert.equal(dueInfo('2026-10-22', '2026-10-22').level, 'today');
  assert.equal(dueInfo('2026-10-20', '2026-10-22').level, 'late');
  assert.equal(dueInfo('2026-10-30', '2026-10-22').label, '8 gün kaldı');
});

test('reminders: 23 Ekim ödevi 7, 3 ve 1 gün kala uyarır, aradaki günlerde uyarmaz', () => {
  const list = [hw('Fizik', '2026-10-23')];
  for (const d of ['2026-10-16', '2026-10-20', '2026-10-22']) assert.equal(reminders(list, d).length, 1, d);
  for (const d of ['2026-10-15', '2026-10-17', '2026-10-19', '2026-10-21']) assert.equal(reminders(list, d).length, 0, d);
});

test('reminders: teslim günü ve gecikince yapılmamış ödev uyarmaya devam eder', () => {
  const list = [hw('Fizik', '2026-10-23')];
  assert.equal(reminders(list, '2026-10-23').length, 1);
  assert.equal(reminders(list, '2026-10-25').length, 1);
});

test('reminders: teslim edilen ödev uyarmaz, sıralama tarihe göre', () => {
  const list = [hw('B', '2026-10-24'), hw('A', '2026-10-23'), hw('C', '2026-10-23', true)];
  assert.deepEqual(sortedOpen(list).map(h => h.title), ['A', 'B']);
  assert.deepEqual(reminders(list, '2026-10-22').map(h => h.title), ['A']);
});

test('reminderText: yarın teslim olanları adıyla yazar', () => {
  const items = reminders([hw('Fizik', '2026-10-23'), hw('Kimya', '2026-10-23')], '2026-10-22');
  assert.equal(reminderText(items), 'Yarın teslim: Fizik, Kimya');
});
