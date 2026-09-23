# Fener — fen lisesi 9. sınıf öğrencisi için çalışma arkadaşı (ilk sürüm planı, gözden geçirilmiş)

## Bağlam

Araştırma bitti, bulgular `PLAN.md` içinde. Kararlar: telefon ve bilgisayarda çalışacak; tek öğrenci; veli erişimi şimdilik yok; tekrar sorularını öğrenci kendisi yazacak; araştırma bulguları öğrencinin okuyacağı bir rehber olarak uygulamanın içinde olacak. Uygulama Cloudflare Pages'te yayınlanacak.

İlk plan taslağı beş gözle değerlendirildi: kişisel eğitim koçu, öğrenci, kıdemli geliştirici, arayüz uzmanı, ürün sahibi. Bu belge o eleştirilerle düzeltilmiş hâlidir. Amaç değişmedi: gerçek bir öğrencinin bir hafta boyunca her akşam açıp kullanabileceği bir uygulama.

Not: Plan modundan önce üç iskelet dosya yazılmıştı (`app/index.html`, `app/manifest.webmanifest`, `app/sw.js`). Üçü de aşağıdaki kararlara göre yeniden yazılacak; özellikle çevrimdışı dosyasının "her şeyi önbellekten ver" mantığı yanlıştı.

## Değerlendirmede ortaya çıkan zayıf noktalar ve alınan kararlar

| Zayıf nokta | Kim gördü | Karar |
|---|---|---|
| İlk açılış üç formdu; öğrenci hiçbir şey başarmadan ayar giriyordu | Koç, arayüz | Tek adım: ad ve odak süresi. Okul saatleri ve yatma saati varsayılanla gelir, sonradan düzenlenir. İlk oturum 10 dakikalık deneme. |
| Öğrenci iki gün açmayınca ne olacağı tanımsızdı; biriken işler borç hissi yaratır | Koç | "Hoş geldin, kaldığın yerden" ekranı. Eski işler tek dokunuşla bugüne taşınır, otomatik yığılmaz. |
| Okul sınavları ve ödev teslimleri yoktu; fen lisesinin gerçek ritmi budur | Koç, öğrenci, ürün sahibi | "Yaklaşan sınav ve teslimler" listesi eklendi. Bugün ekranında "Fizik yazılısı: 4 gün" kartı. Günün 3 işi seçilirken bunlar önerilir. |
| Gece kuralı ve "dördüncü iş yasağı" katıydı; özerkliği zedeler, güveni kaybettirir | Koç | İkisi de öneri oldu. Gece: "Bugünlük yeter mi? Yine de 20 dakika" seçeneği, yargısız. Dördüncü iş: "Üç yeter; bunu yarına atayım mı?" |
| Her oturumda 1–5 puan kaygılı ergende kendini düşük notlama döngüsü kurar | Koç | Üçlü sözel ölçek: akıştaydım / idare eder / dağıldım. "Dağıldım" seçilince tek soru: ne böldü? (telefon, yorgunluk, konu zor, başka). Cevaplar haftalık planın "engel" adımına öneri olarak düşer. |
| "Telefon başka odada mı?" sorusu telefondan cevaplanıyorsa saçma | Koç | Soru yalnızca bilgisayarda sorulur. Telefonda oturum başlayınca tam ekran sadece sayaç, ekran açık kalır. |
| Başlamadan önce iki soru: ders gibi | Öğrenci | Tek büyük "Başla". Son çalışılan iş hatırlanır; "ne çalışıyorsun" sayaç dolarken üstte tek satır. |
| Kendi soru yazmak gece 21:00'de yük; boş kutu | Öğrenci, ürün sahibi | Önce tek cümle "bugün ne öğrendin". Soru isteğe bağlı, şablonlu ("… nedir?", "… ile … farkı?", "şu formülü çıkar"). Tek soru yeterli. |
| Dilek–Sonuç–Engel–Plan dört kutu: rehberlik dersi kâğıdı gibi | Öğrenci, arayüz | Adı "Bu haftanın planı". Sohbet gibi, her adım ayrı ekran, 2 dakikada biter. Örnek cümleler kutunun altında (kutunun içinde değil, yazınca kaybolmasın). |
| 13 bölümlük rehberi okumaz | Öğrenci, ürün sahibi | Rehber tam kalır (istek 5) ama ekranlara bağlanır: karışık set açılınca "%61'e karşı %37" kartı, gece önerisinde uyku kartı, ilk tekrar kartında unutma eğrisi. Üç cümle + "devamı". Her bölüm 2 dakika, "okundu" işareti. |
| Ürün sahibi kullanımı hiç göremiyor (veri cihazda) | Ürün sahibi | "Haftalık özeti paylaş": kimliksiz kısa metin (oturum sayısı, dakika/ders, değerlendirme dolduruldu mu, kontrol hissi). Öğrenci mesajla gönderir. |
| Başarı ölçütleri kendi ilkeleriyle çelişiyordu | Ürün sahibi | Tek birincil ölçüt: 4 haftanın en az 3'ünde, haftada 5 ve üzeri günde en az bir oturum. |
| En tehlikeli varsayım test edilmemiş: "her akşam kendiliğinden açar" | Ürün sahibi | Kod yazılmadan önce 5 günlük kâğıt kart testi. Uygulamada telefona kurulum yönlendirmesi. Günlük hatırlatma bildirimi ikinci sürüme (teknik neden aşağıda). |
| İki cihazda veri kopar; yedek dosyası taşımayı 14 yaşındaki yapmaz | Öğrenci, ürün sahibi, geliştirici | İlk sürümde açıkça "ana cihazını seç". İkinci sürümde 6 kelimelik eşleme koduyla aktarım (Vercel'in veri deposu üzerinden). Veri modeli buna bugünden hazır. |
| Çevrimdışı dosyası eski sürümde takılı bırakır; Vercel'in temiz adres ayarıyla çakışır | Geliştirici | Sayfa açılışı önce internetten, yoksa önbellekten. "Yeni sürüm hazır, yenile" bildirimi. Adres yapısı Vercel'e göre düzeltildi. |
| iPhone'da Safari 7 gün kullanılmayan sitenin verisini siler | Geliştirici | Ana ekrana kurulu uygulamada bu olmaz: iPhone'da kurulum kartı gösterilir. Haftalık değerlendirme sonunda yedek hatırlatması; 14 gündür yedek yoksa uyarı. |
| Sayaç arka planda yavaşlar, iPhone'da durur | Geliştirici | Bitiş saati kaydedilir, kalan süre her seferinde saatten hesaplanır. Ekrana dönünce yeniden çizilir. Dürüst uyarı: "Ekranı kilitlersen zil çalmaz." |
| Gece 00:00–03:00 arası tarih kayar; hafta hesabı | Geliştirici | Günün sınırı sabah 04:00. Gece yarısından sonraki oturum önceki güne yazılır. Tarih anahtarları yerel saatle. |
| Bugün ekranı kalabalık | Arayüz | Oturum başlayınca sekmeler gizlenir, tam ekran odak görünümü. Bitir ve +5 dakika alt bölgede, tek elle. |
| Sekme adı "Ben" belirsiz, sıra yanlış | Arayüz | Sıra: Bugün, Tekrar, Hafta, Rehber, Ayarlar. |
| Karışık soru seti ilk hafta boş kalır | Ürün sahibi | İkinci sürüme. Sorular birikince açılır. |
| İsim öğrenciye sorulmamış | Ürün sahibi | İlk görüşmede üç isim gösterilir, öğrenci seçer. Ad tek yerden değişir. Varsayılan "Fener". |

## Teknik yaklaşım, düz dille

- **Web sitesi olarak yapılır, Vercel'de yayınlanır.** Bilgisayarda tarayıcıda açılır; telefonda "ana ekrana ekle" denince uygulama gibi çalışır. Vercel ücretsiz, güvenli bağlantı (https) hazır gelir; bu, çevrimdışı çalışma ve ekranı açık tutma gibi özellikler için zorunlu.
- **İnternet gerekmez.** İlk açılıştan sonra sayfa cihaza kaydedilir. Yeni sürüm çıkınca "yenile" bildirimi gelir; eski sürümde takılı kalmaz.
- **Hesap, şifre, sunucu yok.** Veri öğrencinin cihazında. İlk sürümde öğrenci bir ana cihaz seçer. Cihazlar arası aktarım ikinci sürümde eşleme koduyla gelir; bunun için gereken kayıt yapısı (her kaydın kimliği, güncellenme zamanı, silinme izi) ilk sürümde kurulur.
- **Ek kütüphane, kurulum, derleme yok.** Düz HTML, CSS ve JavaScript. Bu kapsam için doğru; büyük çatılar bakım yükü ekler, değer katmaz. Dosya adreslerine sürüm numarası eklenerek önbellek sorunları önlenir.
- **Yazı tipleri uygulamanın içinde barındırılır** (Türkçe karakterli alt küme). Google servisine bağımlılık yok; çevrimdışı da aynı görünür.
- **Analitik yok.** Tek öğrenci, çocuk verisi; hiçbir şey toplanmaz. Ürün sahibi kullanımı "haftalık özeti paylaş" metniyle görür.

### Cloudflare Pages yapılandırması
- Proje kökü `app`, çatı "Other", derleme komutu boş.
- `app/vercel.json`: temiz adresler açık; çevrimdışı dosyası ve ana sayfa asla önbelleklenmez; `css/`, `js/`, `fonts/` bir yıl önbelleklenir (adreslerde sürüm numarası olduğu için güvenli); manifest için doğru içerik türü; temel güvenlik başlıkları (içerik türü zorlaması, kamera/mikrofon/konum kapalı).
- Her yayın öncesi önizleme adresi telefonda denenir.
- Yayın için kullanıcının Vercel hesabına bağlı bir git deposu gerekir. Proje klasöründe git deposu açılır; kullanıcı Vercel'e bağlar ya da bilgisayarda Vercel komut satırı oturumu varsa doğrudan yayınlanır.

### Veri modeli (teknik not)
Tek kök nesne: `schema: 1`, `studentId: "local"`, `deviceId`, `syncCode: null`. Her kayıtta `id`, `createdAt`, `updatedAt`, silinenlerde `deletedAt`. Bölümler: profil, ayarlar, okul programı, sınav/teslim listesi, günler (3 iş), oturumlar, haftalar (plan, hedefler, değerlendirme), notlar ve sorular, sayaç durumu, son yedek zamanı, rehber okundu işaretleri. Yedek dosyası: `{app, schema, exportedAt, data}`; yükleme önce doğrular, sonra gerekirse dönüştürür. Veri katmanı baştan asenkron arayüzle yazılır ki ileride depo değişince ekran kodu bozulmasın.

## Ekranlar (ilk sürüm)

Telefonda altta beş sekme, bilgisayarda solda menü: **Bugün, Tekrar, Hafta, Rehber, Ayarlar.**

### İlk açılış (60 saniye)
Ad, odak süresi (25/5, 40/8, 50/10), "ana cihazın bu mu?" Bitince Bugün ekranı ve tek satır: "İlk oturum 10 dakika olsun mu?" iPhone Safari'de "ana ekrana ekle" kartı.

### Bugün
- Tarih, selam, 7 günlük hedef çizgisi (yapılan dolu, yapılmayan boş; ilk iki hafta hedef 7'de 3, sonra 7'de 5).
- **Yaklaşan sınav kartı** (varsa): "Fizik yazılısı, 4 gün."
- **Sayaç (ekranın kahramanı).** Tek büyük "Başla". Süre ilerledikçe kart zemini bir beher gibi fosforlu sarıyla dolar. Oturum başlayınca tam ekran; sekmeler gizlenir. Üstte tek satır "ne çalışıyorsun" (son seçilen hatırlanır, günün işlerinden seçilir). Bilgisayarda ek olarak "telefon başka odada" tek dokunuş. Altta Bitir ve +5 dakika. Bitince üçlü ölçek: akıştaydım / idare eder / dağıldım; "dağıldım" ise ne böldü. Sonra ara sayacı; dört oturumdan sonra uzun ara ve hareket önerisi.
- Sayaç sayfa yenilense, uygulama kapansa da kaldığı yerden devam eder. Bitişte ses; telefonda titreşim (Android). "Ekranı kilitlersen zil çalmaz" notu.
- **Bugünün 3 işi.** İş eklerken ders ve isteğe bağlı son tarih. Dördüncü iş: "Üç yeter; bunu yarına atayım mı?"
- **"Bugün ne öğrendin?"** tek cümle, oradan isteğe bağlı bir soru.
- **"Bugün hatırlanacak N soru"** kartı (varsa).
- **Gece önerisi.** Yatma saatinden 30 dakika önce sayacın yerine: "Bugünlük yeter mi? Yarın sabah 20 dakika ekleyeyim." Altında küçük "yine de 20 dakika". Uyku kartına bağlantı.
- **Uzun aradan dönüş.** İki günden fazla açılmadıysa: "Hoş geldin. Şu işler kalmıştı, bugüne taşıyayım mı?"
- Boş durumlar: her biri tek cümle ve tek eylem.

### Tekrar
- **Bugün sırası gelenler.** Tek kart: soru, "Cevabı göster", üç düğme: Hatırladım / Kısmen / Hatırlamadım. Aralıklar 1 gün → 7 gün → 30 gün → 90 gün; kısmen aynı aralık; hatırlamadım 1 güne döner. İlk tekrar kartıyla birlikte unutma eğrisi kartı (üç cümle + devamı).
- **Yeni not.** Ders (fen lisesi 9. sınıf listesi hazır), "bugün ne öğrendin" tek cümle, isteğe bağlı 1–3 soru şablonla, kısa cevap. İlk tekrar ertesi güne düşer.
- Notlar derse göre listelenir, sonraki tekrar tarihi görünür.
- Karışık soru seti ikinci sürümde.

### Hafta
- Tarih aralığı; okul programından türetilen boş bloklar (okul saatleri buradan düzenlenir).
- **Yaklaşan sınav ve teslimler.** En fazla 8 satır: ders, tür (yazılı, ödev, proje), tarih.
- **"Bu haftanın planı"** sihirbazı: Dilek, sonuç, engel, plan adımları ayrı ekranlarda; örnek cümleler altta; "engel" adımına geçen haftanın "ne böldü" cevapları öneri olarak gelir; plan adımı "Eğer … olursa, o zaman …" kalıbıyla açılır. Ardından haftanın 3 hedefi; yaklaşan sınavlar öneri olarak sunulur.
- **"Haftayı değerlendir"** ayrı ekran, Cumartesi ve Pazar öne çıkar: bu hafta kaç oturum, hangi derse kaç dakika, sırası gelen tekrarların yüzdesi; üç soru ("En iyi giden neydi?", "Beni ne engelledi?", "Gelecek hafta bir şeyi değiştirsem ne olurdu?"); "kendimi ne kadar kontrolde hissettim" 1–5. Bitince "yedeğini indir" hatırlatması ve "haftalık özeti paylaş" düğmesi.
- Geçmiş haftalar.

### Rehber: "Bilimsel çalışmak"
Öğrenci için, ikinci tekil, kısa ve hafif esprili. Her bölüm 2 dakika: merak uyandıran giriş, çalışmanın 2–3 cümlelik özeti ve rakamı, "senin için ne demek" tek cümle, "bu uygulamada nerede" bağlantısı, kanıt gücü (üç noktadan kaçı dolu), okundu işareti. İki çizim: unutma eğrisi ve tekrarın etkisi; karışık ve bloklu çalışmanın sınav sonucu. Bölümler:

1. Bu rehber neden var: hisse değil ölçüme güveniyoruz
2. Beyin unutmak için tasarlandı: unutma eğrisi ve hatırlama çabası
3. Aralıklı tekrar: 1 gün, 1 hafta, 1 ay
4. Karışık soru çözmek: %61'e karşı %37
5. Fosforlu kalem neden işe yaramaz (ve neden bu uygulamanın rengi fosforlu sarı)
6. Odak: 25 dakika bir başlangıç, kural değil
7. Telefon masadayken bile dikkat çalıyor
8. Dilek, sonuç, engel, plan: olumlu düşünmek yetmez
9. Zorlanmak beynin büyüdüğünün işareti, ama abartmadan
10. Uyku: 8–10 saat, çünkü öğrenme uykuda tamamlanır
11. Bu uygulamada neden puan, rozet ve seri sayacı yok
12. Küçük başla: bir soru bile sayılır
13. Kaynaklar

Bölümler ekranlardaki "?" kartlarından da açılır.

### Ayarlar
Ad; "neden çalışıyorum" cümlesi (isteğe bağlı, uygun anlarda görünür); okul saatleri; yatma saati; varsayılan odak süresi; ana cihaz; **ilerleme duvarı** (her oturum bir hücre, haftalar satır; hiçbir şey silinmez); "haftalık özeti paylaş"; "yedeği indir / yedeği yükle" ve son yedek tarihi; sürüm numarası; "her şeyi sıfırla" (iki adımlı onay, geri al süresi).

## Tasarım dili

- Fen öğrencisinin kareli laboratuvar defteri: açık gri-yeşil kareli zemin, koyu mürekkep yazı, etkileşimde kobalt mavisi, tek vurgu fosforlu sarı. Karanlık temada sarı %15 kısılır, kobalt açık tona çekilir; sarı üstünde yalnızca koyu yazı.
- Başlıklar ve sayaç için Fraunces (serif), gövde için Figtree; ikisi de Türkçe karakterli alt kümeyle uygulama içinde. Sayaç rakamları eşit genişlikte (titremesin). Büyük harf dönüşümleri Türkçe kuralla (İ/ı).
- Tek gösterişli öğe dolan beher; süre daima metin olarak da yazılır. Geri kalan sakin.
- Hareket yalnızca kullanıcının eylemine cevap; "hareketi azalt" ayarında dolgu anlık geçer.
- Ton: kısa, düz, ikinci tekil, ünlemsiz, "anne gibi" değil. Yıkıcı işlemlerde 5 saniye "geri al". Her sistem mesajı denemeden önce gerçek bir öğrenciye okutulur.
- Dokunma hedefleri en az 44 piksel; klavyeyle gezilir; sekme değişince odak başlığa taşınır; sayaç ekran okuyucuya yalnızca dönüm noktalarında konuşur.
- Telefon genişliğinde tam çalışır; JavaScript toplamı 60 KB altı.

## Dosya yapısı (teknik not)

```
app/
  index.html, manifest.webmanifest, sw.js, vercel.json
  icon-192.png, icon-512.png, apple-touch-icon.png
  fonts/            Fraunces ve Figtree, latin-ext woff2
  css/app.css
  js/version.js     tek sürüm sabiti (adreslere ve önbelleğe eklenir)
  js/app.js         yönlendirme, menü, başlangıç, "yeni sürüm" bildirimi
  js/store.js       asenkron veri katmanı, sürüm dönüştürme, yedek al/yükle, özet metni
  js/util.js        yerel tarih anahtarı (04:00 sınırı), hafta hesabı, Türkçe büyük harf
  js/timer.js       saf sayaç mantığı (saat dışarıdan verilir), ses, ekran açık tutma
  js/spaced.js      tekrar aralığı hesabı
  js/guide-content.js
  js/views/onboarding.js, today.js, focus.js, review.js, week.js, plan-wizard.js, guide.js, settings.js
tests/              node --test ile: tarih, hafta, sayaç, tekrar aralığı, dönüştürme, yedek doğrulama
```

## Yapım sırası

1. Git deposu, sürüm sabiti, Cloudflare Pages yapılandırması, yazı tipleri, tasarım sistemi, veri katmanı ve testleri.
2. İlk açılış ve Bugün ekranı, tam ekran sayaç. Burada durup bilgisayar ve telefonda denenir.
3. Tekrar: not, soru şablonları, aralık hesabı, sırası gelenler.
4. Hafta: sınav listesi, plan sihirbazı, değerlendirme, özet metni.
5. Rehber: metinler, iki çizim, ekranlardaki "?" kartları.
6. Ayarlar: ilerleme duvarı, yedek, sıfırla, kurulum kartı.
7. Çevrimdışı ve yeni sürüm bildirimi; simgeler; iPhone denemesi.
8. Uçtan uca deneme, düzeltmeler, `v0.1` etiketi, yayın.

## Doğrulama

- Otomatik testler: gece 00:30'da oturumun önceki güne yazılması, hafta hesabının Pazartesi başlaması, sayacın yenileme sonrası doğru kalan süre vermesi, tekrar aralıklarının üç cevaba göre doğru ilerlemesi, eski yedeğin yeni şemaya dönüşmesi, bozuk yedeğin reddedilmesi.
- Chrome'da uçtan uca: ilk açılış → 3 iş → dördüncü iş teklifi → oturum başlat → sayfayı yenile, sayaç devam ediyor → bitir → ölçek → not yaz → cihaz saatini ertesi güne al → tekrar kartı → plan sihirbazı → değerlendirme → özet metni → yedek indir → sıfırla → yedek yükle, veri tam.
- Telefon genişliğinde ekran görüntüleri; tam ekran sayaç tek elle; karanlık tema; "hareketi azalt".
- Gece 22:30 sonrası öneri ekranı ve "yine de 20 dakika" yolu.
- Vercel önizleme adresi iPhone Safari'de: kurulum kartı, ekran açık kalma, ses.
- Çevrimdışı: uçak modunda açılıyor; yeni yayın sonrası "yenile" bildirimi geliyor.

## Deneme protokolü

- **Hafta 0:** 5 günlük kâğıt kart testi (3 iş + oturum işareti). Üç isimden seçim. 20 dakikalık başlangıç sohbeti: mevcut düzen, telefon alışkanlığı, yatış saati.
- **Hafta 1–2, bir öğrenci:** Her Pazar özet metni ve 10 dakikalık sohbet: "Hangi gün açmadın, neden?", "Neyi atladın?", "Ne olsaydı daha çok kullanırdın?" Karar: 14 günün 7'sinde açılmadıysa dur ve nedeni anla.
- **Hafta 3–4, üç öğrenci:** Aynı ritim. Karar: üçten ikisi haftada 5 ve üzeri gün kullanıyorsa sınıf denemesi planla; biri ise kapsamı daralt (sayaç ve 3 iş); hiçbiri ise dur.
- **Birincil ölçüt:** 4 haftanın en az 3'ünde, haftada 5 ve üzeri günde en az bir oturum. **İkincil:** değerlendirme 4 haftadan 3'ünde dolu; kontrol hissi puanı düşmüyor.

## İkinci sürüme bırakılanlar

Karışık soru seti; cihazlar arası eşleme kodu (Vercel veri deposu ve küçük bir sunucu işlevi); günlük hatırlatma bildirimi (iPhone'da yalnızca kurulu uygulamaya ve sunucu üzerinden gönderilebiliyor, aynı altyapı); paylaşılabilir haftalık görsel kart; arkadaşla birlikte çalışma; motivasyon cümleleri havuzu (üst üste iki "dağıldım" sonrası tek cümle); büyüme zihniyeti için iki uzun oturum.

## Sınıfa veya BİLSEM'e büyürken (bugün yalnızca not)

Öğrenci kimliği alanı bugünden var. Hesap gerektiğinde: 18 yaş altı için veli açık rızası, en az veri, veri barındırma bölgesi seçimi (Vercel'de Avrupa), öğretmen görünümünün yalnızca öğrencinin onayladığı özetleri göstermesi. Okul programı öğrenciye değil "programa" bağlı tutulur ki sınıf ortak programı paylaşılabilsin.

## Açık noktalar

1. Uygulama adı: varsayılan "Fener"; öğrenciye üç seçenek sunulacak.
2. Vercel'e bağlanma: git deposu hazırlanacak; yayını kullanıcının Vercel hesabı yapar ya da bilgisayarda Vercel komut satırı oturumu varsa ben yayınlarım.
