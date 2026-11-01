// Yardımcının arama mantığı. Sunucu ve yapay zeka modeli yok: soru, bilgi tabanındaki
// anahtar sözcüklerle eşleştirilir. Türkçe karakterler, ekler ve yazım farkları tolere edilir.
import { ENTRIES } from './yardim-content.js';

const DURUM_EKI_MIN_KOK = 4;
const STOP = new Set([
  'ne', 'nasil', 'nerede', 'nereden', 'nereye', 'neresi', 'nedir', 'var', 'yok', 'mi', 'mu', 'mı', 'mü',
  'bir', 'bu', 'su', 'ben', 'bana', 'beni', 'icin', 'ile', 'ama', 'de', 'da', 'ki', 'ya', 'veya', 've',
  'bulamiyorum', 'bulamadim', 'bulamiyor', 'bulurum', 'bulabilirim', 'yapabilirim', 'yapilir', 'yapiyorum', 'yapayim',
  'istiyorum', 'olur', 'olmuyor', 'gibi', 'hangi', 'kac', 'neden', 'niye', 'lutfen', 'merhaba', 'selam',
  'eklerim', 'ekleyebilirim', 'ekleme', 'gormek', 'gorebilirim', 'gorurum', 'acarim', 'gidebilirim', 'bakabilirim',
]);

/** Küçük harfe çevirir (Türkçe İ/I), aksan ve noktalama atar: "İşi Sıfırla?" -> "isi sifirla". */
export function normalize(s) {
  return String(s ?? '')
    .replace(/İ/g, 'i').replace(/I/g, 'ı')
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(s) {
  return normalize(s).split(' ').filter(Boolean);
}

/** İki sözcük aynı kökten mi: biri diğerinin başı (en az 4 harf) ya da eşit. */
function sameStem(a, b) {
  if (a === b) return true;
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  return s.length >= DURUM_EKI_MIN_KOK && l.startsWith(s) && l.length - s.length <= 5;
}

/** Bir kayıt için 0..n arası puan. Kelime öbeği tam geçerse yüksek, tek sözcük eşleşmesi düşük. */
export function scoreEntry(entry, query) {
  const nq = normalize(query);
  if (!nq) return 0;
  const qTokens = tokens(query).filter(t => !STOP.has(t));
  const all = tokens(query);
  const qSet = qTokens.length ? qTokens : all;
  let score = 0;

  for (const kw of entry.keywords) {
    const nk = normalize(kw);
    if (!nk) continue;
    const kTokens = nk.split(' ');
    if (kTokens.length > 1) {
      // Öbek: tüm sözcükleri soruda geçiyorsa (sırasız) güçlü eşleşme.
      if (nq.includes(nk)) { score += 6 + kTokens.length; continue; }
      if (kTokens.every(kt => qSet.some(qt => sameStem(qt, kt)))) { score += 4 + kTokens.length; continue; }
      // Öbeğin yalnızca bir parçası: zayıf.
      const hit = kTokens.filter(kt => kt.length >= DURUM_EKI_MIN_KOK && qSet.some(qt => sameStem(qt, kt))).length;
      if (hit) score += hit * 0.8;
    } else if (qSet.some(qt => sameStem(qt, nk))) {
      score += nk.length >= DURUM_EKI_MIN_KOK ? 3 : 2;
    }
  }

  // Başlıkta geçen sözcükler küçük bir ek puan verir.
  const titleTokens = tokens(entry.title).filter(t => t.length >= DURUM_EKI_MIN_KOK);
  for (const qt of qSet) if (titleTokens.some(tt => sameStem(qt, tt))) score += 1;
  return score;
}

/** Soruya en uygun en çok `limit` kaydı döndürür; hiçbiri yeterli değilse boş liste. */
export function search(query, { limit = 3, entries = ENTRIES } = {}) {
  const scored = entries
    .map(e => ({ entry: e, score: scoreEntry(e, query) }))
    .filter(x => x.score >= 2.5)
    .sort((a, b) => b.score - a.score);
  if (!scored.length) return [];
  const top = scored[0].score;
  // Birinci sonuçtan çok geride kalanları gösterme: kullanıcıyı yanıltır.
  return scored.filter(x => x.score >= top * 0.45).slice(0, limit).map(x => x.entry);
}
