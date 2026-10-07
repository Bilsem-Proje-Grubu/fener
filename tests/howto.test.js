import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INTRO_CARDS, HOWTO_SECTIONS, KNOWN_ROUTES } from '../app/js/howto-content.js';

test('tanıtım turu tam 2 kart: her birinde başlık ve gövde ya da zaman akışı var', () => {
  assert.equal(INTRO_CARDS.length, 2);
  for (const c of INTRO_CARDS) {
    assert.ok(c.title && c.title.length > 3);
    assert.ok(c.body || (c.timeline && c.timeline.length));
  }
});

test('günün zaman akışı en az 5 adım; her adımda ne zaman, başlık, gövde, yer ve neden dolu', () => {
  const card = INTRO_CARDS.find(c => c.id === 'nasil-calisir');
  assert.ok(card.timeline.length >= 5);
  for (const t of card.timeline) {
    for (const k of ['when', 'title', 'body', 'where', 'why']) assert.ok(t[k] && t[k].length > 3, k);
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
