import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, search } from '../app/js/yardim.js';
import { ENTRIES } from '../app/js/yardim-content.js';

const top = q => (search(q)[0] || {}).id;

test('normalize: Türkçe harfler, büyük İ/I ve noktalama', () => {
  assert.equal(normalize('İşi SIFIRLA, şimdi?'), 'isi sifirla simdi');
  assert.equal(normalize('  Çok   ĞÜŞ '), 'cok gus');
});

test('kayıtlar: benzersiz kimlik, cevap, geçerli bağlantı ve anahtar sözcük', () => {
  const ids = new Set();
  for (const e of ENTRIES) {
    assert.ok(!ids.has(e.id), e.id); ids.add(e.id);
    assert.ok(e.title && e.answer.length > 20 && e.keywords.length >= 3, e.id);
    assert.match(e.route, /^#\/(bugun|tekrar|hafta|rehber|ayarlar|nasil)(\?s=\d+)?$/, e.id);
  }
});

test('gerçek sorular doğru kaydı bulur', () => {
  const cases = {
    'Ödevi nereden eklerim?': 'odev',
    'ödev hatırlatıcısı nerede': 'odev',
    'süreyi nasıl değiştiririm': 'sure-degistir',
    'sayaç nasıl başlar': 'sayac-baslat',
    'sınavı nereden girerim': 'sinav-ekle',
    'Verilerim kaybolur mu?': 'veri-nerede',
    'yedek nasıl alınır': 'yedek',
    'yedeği nasıl yüklerim': 'yedek-yukle',
    'tekrar nerede': 'tekrar-nasil',
    'haftalık plan nerede': 'hafta-plani',
    'neden puan yok': 'puan',
    'telefonuma nasıl kurarım iphone': 'ana-ekran',
    'her şeyi sıfırlamak istiyorum': 'sifirla',
    'gece neden sayaç çıkmıyor': 'gece',
    'bir kaç gün atladım': 'atladim',
  };
  for (const [q, id] of Object.entries(cases)) assert.equal(top(q), id, q);
});

test('anlamsız ya da boş soruda sonuç yok', () => {
  assert.deepEqual(search(''), []);
  assert.deepEqual(search('asdfgh qwerty'), []);
  assert.deepEqual(search('merhaba'), []);
});

test('en çok 3 sonuç döner', () => {
  assert.ok(search('ders sayaç tekrar hafta ödev').length <= 3);
});
