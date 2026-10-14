// Bildirim yardımcıları. Sunucu olmadığından bildirim yalnızca uygulama
// (ya da sekme) açıkken gösterilebilir; her ödev için günde en fazla bir kez.
import * as store from './store.js';
import { reminders, reminderText } from './homework.js';

export function notificationState() {
  if (typeof Notification === 'undefined') return 'unsupported';
  return Notification.permission; // 'default' | 'granted' | 'denied'
}

export async function askNotificationPermission() {
  if (notificationState() === 'unsupported') return 'unsupported';
  try { return await Notification.requestPermission(); } catch { return Notification.permission; }
}

/** İzin varsa, bugün henüz bildirilmemiş hatırlatmalar için tek bildirim gösterir. */
export async function notifyReminders(data, today) {
  if (notificationState() !== 'granted') return false;
  const items = reminders(data.homework, today).filter(h => h.notifiedOn !== today);
  if (!items.length) return false;
  const title = 'Fener · Ödev hatırlatması';
  const body = reminderText(items);
  try {
    const reg = navigator.serviceWorker && (await navigator.serviceWorker.getRegistration());
    if (reg && reg.showNotification) await reg.showNotification(title, { body, icon: 'icon-192.png', tag: 'fener-odev' });
    else new Notification(title, { body, icon: 'icon-192.png', tag: 'fener-odev' });
  } catch { return false; }
  await store.update(d => {
    for (const h of d.homework) if (items.some(i => i.id === h.id)) h.notifiedOn = today;
  });
  return true;
}
