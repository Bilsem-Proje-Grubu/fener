// Veri katmanı. Tek yer: localStorage. Arayüz asenkron; depo değişirse
// (örn. ikinci sürümde eşleme kodu) çağıran kodun değişmesi gerekmez.
import { uid, dayKey } from './util.js';

const KEY = 'fener:data';
const SCHEMA = 1;

function defaultData() {
  return {
    schema: SCHEMA,
    studentId: 'local',
    deviceId: uid(),
    syncCode: null,
    createdAt: Date.now(),
    profile: { name: '', mainDevice: true, why: '' },
    settings: {
      focusMinutes: 25, breakMinutes: 5,
      bedtime: '22:30',
      schoolStart: '08:30', schoolEnd: '16:00',
      weeklyGoal: 3,
      reduceMotion: false,
    },
    schedule: [],
    exams: [],
    days: {},
    sessions: [],
    weeks: {},
    notes: [],
    timer: null,
    lastBackupAt: null,
    guideRead: {},
  };
}

function migrate(data) {
  if (!data || typeof data !== 'object' || !data.schema) return defaultData();
  return data;
}

let cache = null;

function load() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? migrate(JSON.parse(raw)) : defaultData();
  } catch {
    cache = defaultData();
  }
  return cache;
}

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* depolama dolu ya da kapalı olabilir */ }
}

export async function getData() { return load(); }

/** fn(data) veriyi doğrudan değiştirir; sonuçta kaydedilir. */
export async function update(fn) {
  load();
  fn(cache);
  persist();
  return cache;
}

export async function isOnboarded() { return !!load().profile.name; }

export function todayBucket(data, key = dayKey()) {
  if (!data.days[key]) data.days[key] = { tasks: [], learned: '', carriedFrom: null };
  return data.days[key];
}

export async function exportBackup() {
  const data = load();
  return { app: 'fener', schema: data.schema, exportedAt: Date.now(), data };
}

export async function importBackup(backup) {
  if (!backup || backup.app !== 'fener' || !backup.data || !backup.data.schema) {
    throw new Error('Geçersiz yedek dosyası.');
  }
  cache = migrate(backup.data);
  persist();
  return cache;
}

export async function markBackedUp() {
  return update(d => { d.lastBackupAt = Date.now(); });
}

export async function resetAll() {
  cache = defaultData();
  persist();
  return cache;
}
