// Sayaç mantığı saf fonksiyonlardır: saat (now) dışarıdan verilir.
// Kalan süre her zaman bitiş zamanından hesaplanır; arka planda yavaşlayan
// zamanlayıcılar sonucu bozmaz.

export function startFocus(now, minutes, meta = {}) {
  return { phase: 'focus', startedAt: now, endsAt: now + minutes * 60000, minutes, pausedAt: null, extraMin: 0, ...meta };
}

export function startBreak(now, minutes, count) {
  return { phase: 'break', startedAt: now, endsAt: now + minutes * 60000, minutes, pausedAt: null, count };
}

export function remaining(t, now) {
  if (!t || t.phase === 'idle') return 0;
  const ref = t.pausedAt ?? now;
  return Math.max(0, t.endsAt - ref);
}

export function progress(t, now) {
  if (!t || t.phase === 'idle') return 0;
  const total = t.endsAt - t.startedAt;
  return total > 0 ? Math.min(1, 1 - remaining(t, now) / total) : 0;
}

export function extend(t, minutes) {
  return { ...t, endsAt: t.endsAt + minutes * 60000, extraMin: (t.extraMin || 0) + minutes };
}

export function pause(t, now) { return t.pausedAt ? t : { ...t, pausedAt: now }; }

export function resume(t, now) {
  if (!t.pausedAt) return t;
  const shift = now - t.pausedAt;
  return { ...t, startedAt: t.startedAt + shift, endsAt: t.endsAt + shift, pausedAt: null };
}

export function isDone(t, now) { return t && t.phase !== 'idle' && remaining(t, now) <= 0; }

/** Bitirilen odak oturumundan dakika hesabı (yarım kalan da sayılır, en az 1). */
export function elapsedMinutes(t, now) {
  const end = Math.min(t.pausedAt ?? now, t.endsAt);
  return Math.max(1, Math.round((end - t.startedAt) / 60000));
}

// --- Ses ve ekran: yalnızca tarayıcıda çalışır ---
let ctx;
export function primeAudio() {
  try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch { /* ses yok */ }
}
export function chime(kind = 'focus') {
  try {
    primeAudio();
    const notes = kind === 'focus' ? [523.25, 659.25, 783.99] : [659.25, 523.25];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      const t0 = ctx.currentTime + i * 0.18;
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.25, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
      o.connect(g).connect(ctx.destination); o.start(t0); o.stop(t0 + 0.55);
    });
  } catch { /* ses yok */ }
  try { navigator.vibrate && navigator.vibrate(kind === 'focus' ? [200, 100, 200] : [120]); } catch { /* yok */ }
}

let lock = null;
export async function keepAwake(onOff) {
  try {
    if (onOff && 'wakeLock' in navigator && !lock) lock = await navigator.wakeLock.request('screen');
    if (!onOff && lock) { await lock.release(); lock = null; }
  } catch { lock = null; }
}
