// Süre bitince alarm: ses, titreşim, başlık ve (izin varsa) bildirim.
// Sunucu yok; alarm yalnızca uygulama açıkken (arka planda canlı olsa da) çalar.
import { isDone } from './timer.js';
import { chime, primeAudio } from './timer.js';
import { notificationState } from './notify.js';

const RING_MAX_MS = 40000;   // alarm en çok bu kadar çalar
const STALE_MS = 120000;     // süre bitiş saatinden bu kadar sonra açılırsa çalma

/** Saf karar: şimdi alarm çalmalı mı? lastRung: en son çalınan bitiş zamanı. */
export function shouldRing(timer, now, lastRung, enabled = true) {
  if (!enabled || !timer || timer.phase === 'idle' || timer.pausedAt) return false;
  if (!isDone(timer, now)) return false;
  if (lastRung === timer.endsAt) return false;
  return now - timer.endsAt <= STALE_MS;
}

export function alarmText(timer) {
  return timer.phase === 'break'
    ? { title: 'Mola bitti', body: 'Hazır olduğunda yeni bir odak başlatabilirsin.' }
    : { title: 'Odak süresi bitti', body: 'Fener\'e dön ve nasıl geçtiğini işaretle.' };
}

let ringing = null;
let baseTitle = null;

export function isRinging() { return !!ringing; }

export function stopAlarm() {
  if (!ringing) return;
  clearInterval(ringing.beat); clearTimeout(ringing.stop); clearInterval(ringing.flash);
  try { navigator.vibrate && navigator.vibrate(0); } catch { /* yok */ }
  if (baseTitle != null) document.title = baseTitle;
  ringing = null; baseTitle = null;
}

export function startAlarm(timer) {
  stopAlarm();
  const kind = timer.phase === 'break' ? 'break' : 'focus';
  const { title } = alarmText(timer);
  baseTitle = document.title;
  let on = false;
  const beat = setInterval(() => chime(kind), 2200);
  const flash = setInterval(() => { on = !on; document.title = on ? `⏰ ${title}` : baseTitle; }, 800);
  const stop = setTimeout(stopAlarm, RING_MAX_MS);
  ringing = { beat, flash, stop };
  chime(kind);
}

async function showNotification(timer) {
  if (notificationState() !== 'granted') return;
  const { title, body } = alarmText(timer);
  const opts = { body, icon: 'icon-192.png', tag: 'fener-sure', renotify: true, requireInteraction: false };
  try {
    const reg = navigator.serviceWorker && (await navigator.serviceWorker.getRegistration());
    if (reg && reg.showNotification) await reg.showNotification(`Fener · ${title}`, opts);
    else new Notification(`Fener · ${title}`, opts);
  } catch { /* bildirim gösterilemedi */ }
}

/** Saniyede bir bakar; süre bittiyse alarmı başlatır. getData: () => Promise<data>. */
export function watchTimer(getData, toast) {
  let lastRung = null;
  const stopOnTouch = () => stopAlarm();
  ['pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, stopOnTouch, true));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) stopAlarm(); });

  async function tick() {
    let data;
    try { data = await getData(); } catch { return; }
    const t = data.timer;
    const now = Date.now();
    if (!shouldRing(t, now, lastRung, data.settings.alarm !== false)) return;
    lastRung = t.endsAt;
    primeAudio();
    startAlarm(t);
    if (document.hidden) showNotification(t);
    toast && toast(alarmText(t).title + '.');
  }
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}
