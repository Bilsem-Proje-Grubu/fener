import { test } from 'node:test';
import assert from 'node:assert/strict';

function makeLocalStorageMock() {
  const map = new Map();
  return {
    getItem: k => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
    removeItem: k => { map.delete(k); },
    clear: () => map.clear(),
  };
}
globalThis.localStorage = makeLocalStorageMock();

const store = await import('../app/js/store.js');

test('exportBackup: geçerli bir yedek üretir', async () => {
  await store.resetAll();
  const backup = await store.exportBackup();
  assert.equal(backup.app, 'fener');
  assert.equal(backup.schema, 1);
  assert.equal(backup.data.profile.name, '');
});

test('importBackup: app alanı yanlış olan bozuk yedeği reddeder', async () => {
  await store.resetAll();
  await assert.rejects(
    () => store.importBackup({ app: 'baska-uygulama', schema: 1, data: { schema: 1 } }),
    /Geçersiz yedek/
  );
});

test('importBackup: schema alanı olmayan bozuk yedeği reddeder', async () => {
  await store.resetAll();
  await assert.rejects(() => store.importBackup({ app: 'fener', data: {} }), /Geçersiz yedek/);
  await assert.rejects(() => store.importBackup(null), /Geçersiz yedek/);
});

test('importBackup: geçerli bir yedeği geri yükler', async () => {
  await store.resetAll();
  await store.update(d => { d.profile.name = 'Test Öğrenci'; });
  const backup = await store.exportBackup();

  await store.resetAll();
  assert.equal((await store.getData()).profile.name, '');

  const restored = await store.importBackup(backup);
  assert.equal(restored.profile.name, 'Test Öğrenci');
});

test('importBackup: eski/eksik bir yedek yeni şemaya tamamlanır', async () => {
  await store.resetAll();
  // guideRead ve notes gibi sonradan eklenmiş alanları taşımayan eski bir yedek.
  const eski = {
    app: 'fener',
    schema: 1,
    data: { schema: 1, profile: { name: 'Eski Kayıt' } },
  };
  const restored = await store.importBackup(eski);
  assert.equal(restored.profile.name, 'Eski Kayıt');
  assert.deepEqual(restored.guideRead, {});
  assert.deepEqual(restored.notes, []);
  assert.deepEqual(restored.settings.focusMinutes, 25);
});

test('todayBucket: olmayan bir gün için boş kova oluşturur ve veriye ekler', async () => {
  await store.resetAll();
  const data = await store.getData();
  const bucket = store.todayBucket(data, '2026-09-23');
  assert.deepEqual(bucket.tasks, []);
  assert.equal(data.days['2026-09-23'], bucket);
});
