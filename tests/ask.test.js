import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleAsk, parseAnswer, systemPrompt } from '../functions/api/ask.js';

const req = (body, headers = {}, method = 'POST') =>
  new Request('https://fener.example/api/ask', { method, headers: { 'content-type': 'application/json', ...headers }, body: method === 'POST' ? JSON.stringify(body) : undefined });
const okFetch = text => async () => new Response(JSON.stringify({ content: [{ type: 'text', text }] }), { status: 200 });

test('parseAnswer: bilinen ekranı ayırır, bilinmeyeni atar', () => {
  assert.deepEqual(parseAnswer('Hafta ekranında. [[git:#/hafta]]'), { answer: 'Hafta ekranında.', route: '#/hafta' });
  assert.deepEqual(parseAnswer('Şurada. [[git:#/x]]'), { answer: 'Şurada.', route: null });
  assert.deepEqual(parseAnswer('[[git:javascript:alert(1)]] Merhaba'), { answer: 'Merhaba', route: null });
});

test('anahtar yoksa 503, GET 405, yabancı site 403, boş soru 400', async () => {
  assert.equal((await handleAsk(req({ q: 'x' }), {})).status, 503);
  assert.equal((await handleAsk(req(null, {}, 'GET'), { ANTHROPIC_API_KEY: 'k' })).status, 405);
  assert.equal((await handleAsk(req({ q: 'x' }, { Origin: 'https://kotu.example' }), { ANTHROPIC_API_KEY: 'k' })).status, 403);
  assert.equal((await handleAsk(req({ q: '  ' }), { ANTHROPIC_API_KEY: 'k' })).status, 400);
});

test('başarılı çağrı: yanıt ve rota döner; soru 300 karakterle sınırlanır, anahtar gövdeye girmez', async () => {
  let sent;
  const f = async (url, init) => { sent = { url, init }; return okFetch('Ödevler Hafta ekranında. [[git:#/hafta]]')(); };
  const res = await handleAsk(req({ q: 'ö'.repeat(1000) }, { Origin: 'https://fener.example' }), { ANTHROPIC_API_KEY: 'sk-test-12345' }, f);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { answer: 'Ödevler Hafta ekranında.', route: '#/hafta' });
  const body = JSON.parse(sent.init.body);
  assert.equal(body.messages[0].content.length, 300);
  assert.equal(sent.init.headers['x-api-key'], 'sk-test-12345');
  assert.ok(!sent.init.body.includes('sk-test-12345'));
});

test('üst servis hatası 502; sistem istemi bilgi tabanını içerir', async () => {
  const bad = async () => new Response('{}', { status: 500 });
  assert.equal((await handleAsk(req({ q: 'x' }), { ANTHROPIC_API_KEY: 'k' }, bad)).status, 502);
  assert.match(systemPrompt(), /Ödev ekleme ve hatırlatma/);
});
