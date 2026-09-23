# Fener

Fen lisesi 9. sınıf öğrencisi için kanıta dayalı çalışma arkadaşı: günün 3 işi, dolan beher sayacı (esnek pomodoro), aralıklı tekrar, haftalık plan (dilek–sonuç–engel–plan), haftalık değerlendirme ve öğrencinin okuyacağı "Bilimsel çalışmak" rehberi.

## Bu depoda ne var

| Yer | Ne işe yarar | Durum |
|---|---|---|
| `FENER-PLAN.md` | **Ana belge.** Araştırma bulguları, kararlar, beş gözle değerlendirme, ekran ekran ilk sürüm planı, tasarım dili, deneme protokolü, kaynaklar. Önce bunu okuyun. | Onaylı |
| `docs/01-arastirma.md` | Ham araştırma notları (dünyada kanıtlanmış yöntemler, kanıt sıralaması). | Tamam |
| `docs/02-degerlendirme-raporlari.md` | Koç, öğrenci, geliştirici, arayüz uzmanı ve ürün sahibi gözüyle yazılmış üç ham eleştiri raporu. Kararlara nasıl varıldığını gösterir. | Tamam |
| `docs/03-ilk-surum-plani.md` | Plan modunda hazırlanan gözden geçirilmiş plan; FENER-PLAN.md'nin Bölüm B–C kaynağı. | Tamam |
| `app/` | Uygulamanın kendisi. Düz HTML/CSS/JavaScript, kurulum ve derleme yok. | **Yapım başlangıcında** (aşağıya bakın) |

## Uygulamanın durumu (23 Eylül 2026)

Bitmiş olanlar:
- `app/fonts/` — Fraunces ve Figtree yazı tipleri, Türkçe karakterli alt kümeyle, uygulama içinde (Google'a bağımlılık yok).
- `app/icon-*.png`, `app/apple-touch-icon.png` — uygulama simgeleri.
- `app/js/version.js` — tek sürüm sabiti.
- `app/js/util.js` — tarih anahtarı (günün sınırı sabah 04:00), hafta hesabı (Pazartesi başlar), Türkçe büyük/küçük harf, güvenli HTML şablonu, ders listesi.
- `app/js/spaced.js` — tekrar aralığı hesabı (1 → 7 → 30 → 90 gün; "kısmen" aynı aralık, "hatırlamadım" başa döner).
- `app/js/timer.js` — sayaç mantığı (bitiş saati kaydedilir, kalan süre saatten hesaplanır; yenilemede bozulmaz), zil sesi, ekranı açık tutma.

Henüz yazılmamış, sıradaki işler (FENER-PLAN.md bölüm 10'daki yapım sırası):
1. `app/js/store.js` — veri katmanı (localStorage, şema numarası, yedek al/yükle, haftalık özet metni).
2. `app/css/app.css` — tasarım sistemi (kareli defter zemini, açık/karanlık tema).
3. `app/js/guide-content.js` — rehberin 13 bölümü ve 2 çizim.
4. `app/js/views/` — ilk açılış, Bugün, tam ekran sayaç, Tekrar, Hafta, plan sihirbazı, Rehber, Ayarlar.
5. `app/js/app.js` — yönlendirme, menü, "yeni sürüm hazır" bildirimi.
6. `app/index.html`, `app/sw.js`, `app/manifest.webmanifest` — mevcut iskeletler **yeniden yazılacak** (sw.js şu an her şeyi önbellekten veriyor; sayfa açılışı önce internetten olmalı).
7. `app/_headers` — Cloudflare Pages önbellek ve güvenlik başlıkları.
8. `tests/` — `node --test` ile tarih, sayaç, tekrar aralığı, yedek doğrulama testleri.

## Yerelde çalıştırma

Kurulum gerekmez. `app` klasörünü herhangi bir statik sunucuyla açın:

```
cd app
python3 -m http.server 8080
```

Sonra tarayıcıda `http://localhost:8080`. (Dosyayı çift tıklayarak açmak yetmez; çevrimdışı dosyası ve modüller `http` ister.)

## Yayın: Cloudflare Pages

1. Cloudflare hesabında **Workers & Pages → Create → Pages → Connect to Git** ile bu depoyu bağlayın.
2. Build command: boş. Build output directory: `app`.
3. `main` dalına her gönderim otomatik yayınlanır; diğer dallar kendi önizleme adresini alır (telefonda denemek için).

## Değişmeyecek ilkeler

- Puan, rozet, seri sayacı yok. Ceza yok. Öğrenci karar verir; uygulama önerir.
- Hesap, sunucu, analitik yok; veri öğrencinin cihazında. Ürün sahibi kullanımı "haftalık özeti paylaş" metniyle görür.
- Her yeni özellik FENER-PLAN.md bölüm 2'deki kanıt sıralamasına dayanmalı.
- Arayüz dili: kısa, düz, ikinci tekil, ünlemsiz.
