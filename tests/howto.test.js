import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INTRO_CARDS, HOWTO_SECTIONS, KNOWN_ROUTES } from '../app/js/howto-content.js';

test('tanıtım turu tam 3 kart: her birinde başlık ve gövde ya da adımlar var', () => {
  assert.equal(INTRO_CARDS.length, 3);
  for (const c of INTRO_CARDS) {
    assert.ok(c.title && c.title.length > 3);
    assert.ok(c.body || (c.steps && c.steps.length));
  }
});

test('nasıl çalışır bölümleri dolu ve bağlantıları bilinen ekranlara gidiyor', () => {
  assert.ok(HOWTO_SECTIONS.length >= 5);
  const ids = new Set();
  for (const s of HOWTO_SECTIONS) {
    assert.ok(s.title);
    assert.ok(!ids.has(s.id), 'tekrarlanan kimlik: ' + s.id);
    ids.add(s.id);
    assert.ok((s.paragraphs && s.paragraphs.length) || (s.steps && s.steps.length) || (s.faq && s.faq.length));
    if (s.link) assert.ok(KNOWN_ROUTES.includes(s.link.route.replace('#/', '')), s.link.route);
  }
});

test('metinler arayüz ilkelerine uyuyor: ünlem yok, puan ve rozet vaadi yok', () => {
  const all = JSON.stringify([INTRO_CARDS, HOWTO_SECTIONS]);
  assert.ok(!all.includes('!'), 'ünlem kullanılmamalı');
  assert.ok(!/puan kazan|rozet kazan|seviye atla/i.test(all));
});
