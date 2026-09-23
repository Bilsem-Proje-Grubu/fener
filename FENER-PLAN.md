# Fener — Fen Lisesi 9. Sınıf Öğrencisi için Çalışma Arkadaşı

**Araştırma bulguları, beş gözle değerlendirme ve ilk sürüm planı**
Tarih: 17 Eylül 2026, 23 Eylül 2026'da Cloudflare'a göre güncellendi · Durum: Onaylandı, yapım başlıyor

## İçindekiler

1. Kimin için, ne için
2. Dünyada ne işe yarıyor: kanıt sıralamasıyla
3. Bu bulgulardan çıkan tasarım ilkeleri
4. Örnek bir hafta
5. Alınan kararlar
6. Beş gözle değerlendirme: zayıf noktalar ve alınan kararlar
7. Teknik yaklaşım ve Cloudflare
8. Ekranlar (ilk sürüm)
9. Tasarım dili
10. Dosya yapısı ve yapım sırası
11. Doğrulama
12. Deneme protokolü ve başarı ölçütleri
13. İkinci sürüme bırakılanlar ve büyüme notları
14. Açık noktalar
15. Kaynaklar

---

# BÖLÜM A — ARAŞTIRMA

## 1. Kimin için, ne için

- Kullanıcı: Fen lisesi 1. sınıf (9. sınıf) öğrencisi, 14–15 yaşında.
- Okul yükü: Haftada 40 ders saati (hafta içi her gün 8 saat). Matematik 6, Türk Dili ve Edebiyatı 5, İngilizce 4, Fizik-Kimya-Biyoloji 2'şer saat; kalan saatler tarih, coğrafya, din, bilişim, beden, sanat, sağlık, rehberlik ve okulun seçtiği seçmeliler.
- Bu yılın özelliği: 9. sınıf, liseye geçişin en kırılgan yılı. Araştırmalar bu yaşta "arkadaşlarımdan geride kalıyor muyum" kaygısının zirve yaptığını gösteriyor. Alışkanlıklar bu yıl oturuyor; program bu yüzden "not artırma aracı" değil, "çalışma düzeni kurma aracı" olarak tasarlanmalı.
- Amaç: Öğrencinin kendi başına haftasını planlaması, dikkatini koruması, öğrendiğini kalıcı hale getirmesi ve motivasyonunu yönetmesi. Program bir koç gibi eşlik eder; kontrol etmez.

---

## 2. Dünyada ne işe yarıyor: kanıt sıralamasıyla

Aşağıdaki liste, en güçlü kanıttan en zayıfa doğru sıralıdır. Programın çekirdeğini ilk grup oluşturmalı.

### 2a. Güçlü kanıt (birden çok kontrollü deney, büyük örneklem)

**1. Aralıklı tekrar + kendini sınama.**
Örnek: Pazartesi öğrenilen fizik konusu Salı 10 dakika, bir hafta sonra 10 dakika, bir ay sonra 10 dakika kitaba bakmadan hatırlanmaya çalışılır. Kitabı yeniden okumak veya altını çizmek yerine, "bu konuyu ne kadar hatırlıyorum" diye kendini test etmek. Dunlosky ve ekibinin 2013'te on çalışma tekniğini karşılaştıran incelemesinde, onlarca yıllık araştırmada açık ara en etkili iki yöntem bunlar çıktı. Yeniden okuma ve altını çizme en düşük fayda grubunda.

**2. Konu karıştırarak soru çözme.**
Örnek: 20 soruluk bir setin tamamı aynı tipten olacağına, denklem, geometri, oran ve fonksiyon soruları karışık gelir; öğrenci her soruda "hangi yöntem gerekli" diye düşünmek zorunda kalır. Rohrer'in 2020'de 787 öğrenciyle yaptığı rastgele atamalı deneyde, karışık çalışan grup bir ay sonraki sınavda %61 aldı, aynı tipi arka arkaya çözen grup %37. Bu, eğitim araştırmalarında nadir görülen büyüklükte bir etki. Matematik ve fizik ağırlıklı fen lisesi için doğrudan uygulanabilir.

**3. Dilek–Sonuç–Engel–Plan yöntemi (WOOP).**
Örnek: "Bu hafta her akşam 40 dakika matematik çözmek istiyorum (dilek). Olursa sınıfta kendimi güvende hissederim (sonuç). Beni durduracak şey: eve gelince telefona uzanmam (engel). Eğer eve gelip telefona uzanırsam, o zaman telefonu mutfağa bırakıp masaya oturacağım (plan)." Oettingen ve Duckworth'ün okul çocuklarıyla yaptığı rastgele atamalı deneylerde bu dört adım, yalnızca olumlu düşünmeye kıyasla karne notlarını, devamı ve davranışı iyileştirdi. "Eğer X olursa, o zaman Y yapacağım" cümlesi, tek başına en çok işe yarayan motivasyon aracı olarak öne çıkıyor.

**4. Uyku: günde 8–10 saat.**
Amerikan Uyku Tıbbı Akademisi'nin 13–18 yaş için resmi önerisi. Bu yaşta uykusuzluk dikkat, öğrenme ve ruh sağlığını doğrudan bozuyor. Ergenlerde gece son bir saat ekran kullanımı, uykuya dalmayı geciktiriyor ve toplam uykuyu kısaltıyor (Norveç'te 9.846 ergenle çalışma). Program geç saatte çalışmayı teşvik etmemeli; tersine gece 22:30'dan sonra "yarın devam" demeli.

**5. Telefon başka odada.**
Telefonun yalnızca masada durması bile dikkati düşürüyor; beyin ölçümlü deneylerde ders sırasında telefona geçiş yapmak performansı belirgin azaltıyor. Okul telefon yasakları derse katılımı artırdı. Programın kendisi telefonda çalışıyorsa bu bir çelişki yaratır; çözüm bölüm 3'te.

### 2b. Orta kanıt (işe yarıyor, ama etki büyüklüğü orta ya da uzun vadesi bilinmiyor)

**6. Pomodoro: 25 dakika çalış, 5 dakika ara.**
Öğrencilerle yapılan yarı deneysel çalışmalarda öz bildirimli odak %15–25 arttı, yorgunluk yaklaşık %20 azaldı, aynı işi daha kısa sürede bitirdiler. Ancak 2025'te yayımlanan karşılaştırmalı bir çalışma, katı 25/5 kuralının serbest ara verenlere göre motivasyonu daha hızlı düşürdüğünü buldu; toplamda fark çıkmadı. Sonuç: Pomodoro başlangıç için iyi bir iskelet, ama süre öğrenciye göre ayarlanabilmeli (25/5, 40/8, 50/10) ve akış halindeyse zil öğrenciyi kesmemeli.

**7. Zaman yönetimi eğitimi.**
2021'de 158 çalışmayı birleştiren bir inceleme, zaman yönetiminin akademik başarıyla orta düzeyde ilişkili olduğunu, ancak en güçlü etkisinin iyi oluş ve düşük stres üzerinde olduğunu gösterdi. Yani programın en garantili getirisi "daha az kaygı", ikincil getirisi "daha iyi not".

**8. Planla – Yap – Değerlendir döngüsü.**
Zimmerman'ın öz-düzenlemeli öğrenme modeli: haftanın başında hedef koy, hafta içinde ilerlemeyi izle, hafta sonunda "ne işe yaradı, ne yaramadı" diye 10 dakika düşün. Bu döngüyü öğreten müdahaleler fen ve matematikte strateji kullanımını ve başarıyı artırıyor. Programın haftalık ritmi bu üç adım üzerine kurulmalı.

**9. Büyüme zihniyeti: "zekâ kas gibi gelişir" mesajı.**
Yeager'ın 2019'da Nature'da yayımlanan, 12.500 dokuzuncu sınıf öğrencisiyle yaptığı ulusal deneyde iki adet 25 dakikalık çevrimiçi oturum, düşük başarılı öğrencilerin not ortalamasını 0,10 puan artırdı ve ileri matematik dersi seçimini yükseltti. Etki küçük ve en çok sınıf ortamı destekliyorsa görülüyor. Fen lisesi öğrencisi zaten yüksek başarılı olduğu için bu bileşen ana eksen değil, tamamlayıcı olmalı: "bugün zorlandın demek beynin büyüyor demek" tarzı kısa, doğru zamanlı mesajlar.

**10. Birlikte çalışma ve hesap verme.**
Focusmate gibi uygulamalarda öğrenci belirli bir saatte bir başkasıyla sessizce çalışmak üzere randevulaşır. Kanıt çoğunlukla kullanıcı anketlerine dayanıyor (dikkat eksikliği olan 220 kişide %85 iyileşme bildirimi), ama arkasındaki mekanizmalar (birinin seni beklemesi, "bir ara" yerine "şimdi" demek) iyi belgelenmiş. Fen lisesinde sınıf arkadaşlarıyla eşleşme doğal bir uygulama alanı.

### 2c. Dikkat: iyi niyetle yapılıp geri tepenler

**Puan, rozet, liderlik tablosu.**
Öz-belirleme kuramı araştırmaları net: ödül ve puan öğrenciyi "kontrol etmek" için kullanılırsa, çalışmaya duyduğu içsel ilgiyi zayıflatıyor. Oyunlaştırmanın 35 deneyi birleştiren incelemesinde toplam etki küçük. İşe yarayan biçim: puan yerine "ne kadar ilerledin" geri bildirimi, seçme özgürlüğü ve arkadaşlarla bağ.

**Seri (streak) sayacı.**
Duolingo tarzı "üst üste 47 gün" sayacı kaybetme korkusuyla çalışıyor. Araştırmalar bu mekaniğin kaygı ve "sayı için yapma" davranışı ürettiğini, bir gün kaçırınca ise tamamen bırakmaya yol açtığını gösteriyor. Alternatif: haftalık esnek hedef (7 günden 5'i yeter), kaçırılan gün ceza değil "hoş geldin, kaldığın yerden" mesajı.

**Çok büyük hedefle başlamak.**
Stanford'dan BJ Fogg'un Küçük Alışkanlıklar yöntemi: motivasyon dalgalıdır, ona güvenme; alışkanlığı o kadar küçük yap ki motivasyon düşükken bile yapılsın (örnek: "her akşam 2 saat çalış" yerine "yemekten sonra masaya otur ve bir soru çöz"). Sonra büyüt. Bir çalışmada küçük başlayanların alışkanlığı sürdürme olasılığı 2,7 kat fazlaydı.

---

## 3. Bu bulgulardan çıkan tasarım ilkeleri

1. **Çekirdek üç şey:** haftalık plan, odak oturumu, aralıklı tekrar. Geri kalan her şey bunların üzerine eklenir.
2. **Öğrenci karar verir.** Süreyi, hedefleri, günleri öğrenci seçer. Program önerir, dayatmaz. Veli ve öğretmen görünümü varsa "izleme" değil "destek" için.
3. **Ceza yok, seri yok.** Haftalık esnek hedef, kaçırınca yumuşak dönüş.
4. **Telefonla barışık ama telefonu uzaklaştıran.** Odak oturumu başlayınca program "telefonu başka odaya bırak, ben bilgisayarda/tablette çalışıyorum" der; ya da telefonda çalışıyorsa ekranı kilitleyip yalnızca sayaç gösterir.
5. **Gece çalışmayı özendirmez.** 22:30 sonrası yeni oturum açılmaz; "yarın sabah 20 dakika" önerir.
6. **Motivasyon konuşması kısa ve doğru anda.** Zorlandığı oturum sonrasında bir cümle, haftalık değerlendirmede bir soru. Vaaz yok.
7. **Ders programına göre akıllı.** Okul saatleri sabit girildikten sonra boş bloklar kendiliğinden görünür; tekrar zamanları dersin işlendiği güne göre otomatik düşer.

---


## 4. Örnek bir hafta (fen lisesi 9. sınıf)

| Zaman | Hafta içi | Cumartesi | Pazar |
|---|---|---|---|
| 08:30–16:00 | Okul (8 ders) | Serbest / kurs | Serbest |
| 16:00–17:30 | Yol, yemek, dinlenme, hareket | 2 odak oturumu (karışık soru) | 2 odak oturumu (haftalık tekrar) |
| 17:30–18:30 | 1 odak oturumu: günün ödevi veya ana hedef | Uzun ara | Uzun ara |
| 18:30–19:15 | Akşam yemeği | Serbest | Haftalık değerlendirme (10 dk) |
| 19:15–20:30 | 2 odak oturumu: soru çözme + o günkü dersin 10 dk tekrarı | 1 odak oturumu | Gelecek hafta planı (15 dk) |
| 20:30–22:00 | Serbest (telefon, aile, kitap) | Serbest | Serbest |
| 22:00–22:30 | Ekran kapalı, uykuya hazırlık | | |

Hafta içi toplam: günde 3 oturum (yaklaşık 75–120 dakika), haftada 15 oturum. Bu, fen lisesi yükü için gerçekçi bir başlangıç; öğrenci isterse artırır. İlk iki hafta günde 1 oturum bile yeterli sayılmalı (küçük başla ilkesi).

---


---

# BÖLÜM B — KARARLAR VE DEĞERLENDİRME

## 5. Alınan kararlar

| Soru | Karar |
|---|---|
| Nerede çalışacak? | Hem telefonda hem bilgisayarda. Tek kod, iki cihaz. |
| Kaç öğrenci? | Tek öğrenci. Sınıfa büyüme ihtimali için veri yapısı bugünden hazır tutulur. |
| Veli erişimi? | Şimdilik yok. |
| Tekrar soruları kimden? | Öğrenci kendisi yazar; şablonlarla kolaylaştırılır. Hazır soru havuzu sonra. |
| Araştırma bulguları? | Öğrencinin zevkle okuyacağı bir "Bilimsel çalışmak" rehberi olarak uygulamanın içinde. |
| Nerede yayınlanacak? | Cloudflare Pages. (İlk tercih Vercel'di; Vercel özel depoları yalnızca ücretli planda kabul ettiği için 23 Eylül 2026'da Cloudflare'a geçildi.) |

## 6. Beş gözle değerlendirme: zayıf noktalar ve alınan kararlar

Değerlendiriciler: kişisel eğitim koçu, 14–15 yaşında fen lisesi öğrencisi, kıdemli geliştirici, arayüz uzmanı, ürün sahibi.

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
| İki cihazda veri kopar; yedek dosyası taşımayı 14 yaşındaki yapmaz | Öğrenci, ürün sahibi, geliştirici | İlk sürümde açıkça "ana cihazını seç". İkinci sürümde 6 kelimelik eşleme koduyla aktarım (Cloudflare'ın anahtar-değer deposu üzerinden). Veri modeli buna bugünden hazır. |
| Çevrimdışı dosyası eski sürümde takılı bırakır; barındırma servisinin temiz adres ayarıyla çakışır | Geliştirici | Sayfa açılışı önce internetten, yoksa önbellekten. "Yeni sürüm hazır, yenile" bildirimi. Adres yapısı buna göre düzeltildi. |
| iPhone'da Safari 7 gün kullanılmayan sitenin verisini siler | Geliştirici | Ana ekrana kurulu uygulamada bu olmaz: iPhone'da kurulum kartı gösterilir. Haftalık değerlendirme sonunda yedek hatırlatması; 14 gündür yedek yoksa uyarı. |
| Sayaç arka planda yavaşlar, iPhone'da durur | Geliştirici | Bitiş saati kaydedilir, kalan süre her seferinde saatten hesaplanır. Ekrana dönünce yeniden çizilir. Dürüst uyarı: "Ekranı kilitlersen zil çalmaz." |
| Gece 00:00–03:00 arası tarih kayar; hafta hesabı | Geliştirici | Günün sınırı sabah 04:00. Gece yarısından sonraki oturum önceki güne yazılır. Tarih anahtarları yerel saatle. |
| Bugün ekranı kalabalık | Arayüz | Oturum başlayınca sekmeler gizlenir, tam ekran odak görünümü. Bitir ve +5 dakika alt bölgede, tek elle. |
| Sekme adı "Ben" belirsiz, sıra yanlış | Arayüz | Sıra: Bugün, Tekrar, Hafta, Rehber, Ayarlar. |
| Karışık soru seti ilk hafta boş kalır | Ürün sahibi | İkinci sürüme. Sorular birikince açılır. |
| İsim öğrenciye sorulmamış | Ürün sahibi | İlk görüşmede üç isim gösterilir, öğrenci seçer. Ad tek yerden değişir. Varsayılan "Fener". |

---

# BÖLÜM C — İLK SÜRÜM PLANI

## 7. Teknik yaklaşım ve Cloudflare, düz dille

- **Web sitesi olarak yapılır, Cloudflare Pages'te yayınlanır.** Bilgisayarda tarayıcıda açılır; telefonda "ana ekrana ekle" denince uygulama gibi çalışır. Cloudflare Pages ücretsiz, özel GitHub depolarını da kabul eder, güvenli bağlantı (https) hazır gelir; bu, çevrimdışı çalışma ve ekranı açık tutma gibi özellikler için zorunlu.
- **İnternet gerekmez.** İlk açılıştan sonra sayfa cihaza kaydedilir. Yeni sürüm çıkınca "yenile" bildirimi gelir; eski sürümde takılı kalmaz.
- **Hesap, şifre, sunucu yok.** Veri öğrencinin cihazında. İlk sürümde öğrenci bir ana cihaz seçer. Cihazlar arası aktarım ikinci sürümde eşleme koduyla gelir; bunun için gereken kayıt yapısı (her kaydın kimliği, güncellenme zamanı, silinme izi) ilk sürümde kurulur.
- **Ek kütüphane, kurulum, derleme yok.** Düz HTML, CSS ve JavaScript. Bu kapsam için doğru; büyük çatılar bakım yükü ekler, değer katmaz. Dosya adreslerine sürüm numarası eklenerek önbellek sorunları önlenir.
- **Yazı tipleri uygulamanın içinde barındırılır** (Türkçe karakterli alt küme). Google servisine bağımlılık yok; çevrimdışı da aynı görünür.
- **Analitik yok.** Tek öğrenci, çocuk verisi; hiçbir şey toplanmaz. Ürün sahibi kullanımı "haftalık özeti paylaş" metniyle görür.

### Cloudflare Pages yapılandırması
- Proje kökü `app`, çatı "Other", derleme komutu boş.
- `app/_headers`: çevrimdışı dosyası ve ana sayfa asla önbelleklenmez; `css/`, `js/`, `fonts/` bir yıl önbelleklenir (adreslerde sürüm numarası olduğu için güvenli); manifest için doğru içerik türü; temel güvenlik başlıkları (içerik türü zorlaması, kamera/mikrofon/konum kapalı).
- Her yayın öncesi önizleme adresi telefonda denenir.
- Yayın: Cloudflare hesabında "Workers & Pages → Create → Pages → Connect to Git" ile `Bilsem-Proje-Grubu/fener` deposu bağlanır. Build command boş, build output directory `app`. Her `main` dalına gönderim otomatik yayınlanır; diğer dallar önizleme adresi alır.

### Veri modeli (teknik not)
Tek kök nesne: `schema: 1`, `studentId: "local"`, `deviceId`, `syncCode: null`. Her kayıtta `id`, `createdAt`, `updatedAt`, silinenlerde `deletedAt`. Bölümler: profil, ayarlar, okul programı, sınav/teslim listesi, günler (3 iş), oturumlar, haftalar (plan, hedefler, değerlendirme), notlar ve sorular, sayaç durumu, son yedek zamanı, rehber okundu işaretleri. Yedek dosyası: `{app, schema, exportedAt, data}`; yükleme önce doğrular, sonra gerekirse dönüştürür. Veri katmanı baştan asenkron arayüzle yazılır ki ileride depo değişince ekran kodu bozulmasın.

## 8. Ekranlar (ilk sürüm)

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

## 9. Tasarım dili

- Fen öğrencisinin kareli laboratuvar defteri: açık gri-yeşil kareli zemin, koyu mürekkep yazı, etkileşimde kobalt mavisi, tek vurgu fosforlu sarı. Karanlık temada sarı %15 kısılır, kobalt açık tona çekilir; sarı üstünde yalnızca koyu yazı.
- Başlıklar ve sayaç için Fraunces (serif), gövde için Figtree; ikisi de Türkçe karakterli alt kümeyle uygulama içinde. Sayaç rakamları eşit genişlikte (titremesin). Büyük harf dönüşümleri Türkçe kuralla (İ/ı).
- Tek gösterişli öğe dolan beher; süre daima metin olarak da yazılır. Geri kalan sakin.
- Hareket yalnızca kullanıcının eylemine cevap; "hareketi azalt" ayarında dolgu anlık geçer.
- Ton: kısa, düz, ikinci tekil, ünlemsiz, "anne gibi" değil. Yıkıcı işlemlerde 5 saniye "geri al". Her sistem mesajı denemeden önce gerçek bir öğrenciye okutulur.
- Dokunma hedefleri en az 44 piksel; klavyeyle gezilir; sekme değişince odak başlığa taşınır; sayaç ekran okuyucuya yalnızca dönüm noktalarında konuşur.
- Telefon genişliğinde tam çalışır; JavaScript toplamı 60 KB altı.

## 10. Dosya yapısı (teknik not)

```
app/
  index.html, manifest.webmanifest, sw.js, _headers
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

## 10b. Yapım sırası

1. Git deposu, sürüm sabiti, Cloudflare yapılandırması, yazı tipleri, tasarım sistemi, veri katmanı ve testleri.
2. İlk açılış ve Bugün ekranı, tam ekran sayaç. Burada durup bilgisayar ve telefonda denenir.
3. Tekrar: not, soru şablonları, aralık hesabı, sırası gelenler.
4. Hafta: sınav listesi, plan sihirbazı, değerlendirme, özet metni.
5. Rehber: metinler, iki çizim, ekranlardaki "?" kartları.
6. Ayarlar: ilerleme duvarı, yedek, sıfırla, kurulum kartı.
7. Çevrimdışı ve yeni sürüm bildirimi; simgeler; iPhone denemesi.
8. Uçtan uca deneme, düzeltmeler, `v0.1` etiketi, yayın.

## 11. Doğrulama

- Otomatik testler: gece 00:30'da oturumun önceki güne yazılması, hafta hesabının Pazartesi başlaması, sayacın yenileme sonrası doğru kalan süre vermesi, tekrar aralıklarının üç cevaba göre doğru ilerlemesi, eski yedeğin yeni şemaya dönüşmesi, bozuk yedeğin reddedilmesi.
- Chrome'da uçtan uca: ilk açılış → 3 iş → dördüncü iş teklifi → oturum başlat → sayfayı yenile, sayaç devam ediyor → bitir → ölçek → not yaz → cihaz saatini ertesi güne al → tekrar kartı → plan sihirbazı → değerlendirme → özet metni → yedek indir → sıfırla → yedek yükle, veri tam.
- Telefon genişliğinde ekran görüntüleri; tam ekran sayaç tek elle; karanlık tema; "hareketi azalt".
- Gece 22:30 sonrası öneri ekranı ve "yine de 20 dakika" yolu.
- Cloudflare önizleme adresi iPhone Safari'de: kurulum kartı, ekran açık kalma, ses.
- Çevrimdışı: uçak modunda açılıyor; yeni yayın sonrası "yenile" bildirimi geliyor.

## 12. Deneme protokolü ve başarı ölçütleri

- **Hafta 0:** 5 günlük kâğıt kart testi (3 iş + oturum işareti). Üç isimden seçim. 20 dakikalık başlangıç sohbeti: mevcut düzen, telefon alışkanlığı, yatış saati.
- **Hafta 1–2, bir öğrenci:** Her Pazar özet metni ve 10 dakikalık sohbet: "Hangi gün açmadın, neden?", "Neyi atladın?", "Ne olsaydı daha çok kullanırdın?" Karar: 14 günün 7'sinde açılmadıysa dur ve nedeni anla.
- **Hafta 3–4, üç öğrenci:** Aynı ritim. Karar: üçten ikisi haftada 5 ve üzeri gün kullanıyorsa sınıf denemesi planla; biri ise kapsamı daralt (sayaç ve 3 iş); hiçbiri ise dur.
- **Birincil ölçüt:** 4 haftanın en az 3'ünde, haftada 5 ve üzeri günde en az bir oturum. **İkincil:** değerlendirme 4 haftadan 3'ünde dolu; kontrol hissi puanı düşmüyor.

## 13. İkinci sürüme bırakılanlar

Karışık soru seti; cihazlar arası eşleme kodu (Cloudflare KV deposu ve küçük bir Worker); günlük hatırlatma bildirimi (iPhone'da yalnızca kurulu uygulamaya ve sunucu üzerinden gönderilebiliyor, aynı altyapı); paylaşılabilir haftalık görsel kart; arkadaşla birlikte çalışma; motivasyon cümleleri havuzu (üst üste iki "dağıldım" sonrası tek cümle); büyüme zihniyeti için iki uzun oturum.

## 13b. Sınıfa veya BİLSEM'e büyürken (bugün yalnızca not)

Öğrenci kimliği alanı bugünden var. Hesap gerektiğinde: 18 yaş altı için veli açık rızası, en az veri, veri barındırma bölgesi seçimi (Cloudflare'da Avrupa bölgesi), öğretmen görünümünün yalnızca öğrencinin onayladığı özetleri göstermesi. Okul programı öğrenciye değil "programa" bağlı tutulur ki sınıf ortak programı paylaşılabilsin.

## 14. Açık noktalar

1. Uygulama adı: varsayılan "Fener"; öğrenciye üç seçenek sunulacak.
2. Cloudflare'a bağlanma: depo `github.com/Bilsem-Proje-Grubu/fener` adresinde. Yayını Cloudflare hesabı olan kişi yukarıdaki adımlarla bir kez bağlar; sonrası otomatik.

---

## 15. Kaynaklar

- Dunlosky ve ark. 2013, Improving Students' Learning With Effective Learning Techniques — https://journals.sagepub.com/doi/abs/10.1177/1529100612453266
- Rohrer ve ark. 2020, A Randomized Controlled Trial of Interleaved Mathematics Practice — https://gwern.net/doc/psychology/spaced-repetition/2019-rohrer.pdf
- Duckworth, Kirby, Gollwitzer, Oettingen 2013, Mental Contrasting with Implementation Intentions (MCII) — https://uploads-ssl.webflow.com/59faaf5b01b9500001e95457/5bc55b08a8a9d854aace2c9f_Duckworth,%20A.%20L.,%20Kirby,%20T.%20A.,%20Gollwitzer,%20A.,%20&%20Oettingen,%20G.%202013.pdf
- Yeager ve ark. 2019, A national experiment reveals where a growth mindset improves achievement, Nature — https://www.nature.com/articles/s41586-019-1466-y
- Aeon, Faber, Panaccio 2021, Does time management work? A meta-analysis, PLOS One — https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0245066
- Pomodoro derlemesi 2025, BMC Medical Education — https://link.springer.com/content/pdf/10.1186/s12909-025-08001-0.pdf
- Pomodoro / Flowtime / serbest ara karşılaştırması 2025 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12292963/
- AASM ergen uyku önerisi — https://aasm.org/advocacy/position-statements/teen-sleep-duration-health-advisory/
- Ergenlerde dijital dikkat dağınıklığı derlemesi 2026, Frontiers — https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1832219/full
- Telefon varlığı ve dikkat, EEG çalışması — https://pmc.ncbi.nlm.nih.gov/articles/PMC12248173/
- Guay 2022, Öz-belirleme kuramı ve eğitim — https://journals.sagepub.com/doi/10.1177/08295735211055355
- Oyunlaştırmanın olumsuz etkileri, sistematik inceleme — https://arxiv.org/pdf/2305.08346
- Zimmerman öz-düzenlemeli öğrenme döngüsü incelemesi — https://www.academia.edu/6378237/How_do_students_self_regulate_Review_of_Zimmerman_s_cyclical_model_of_self_regulated_learning
- BJ Fogg Küçük Alışkanlıklar, NPR 2026 — https://www.npr.org/2026/01/13/nx-s1-5675362/a-proven-method-to-make-a-habit-stick
- Focusmate ve birlikte çalışma — https://www.simplypsychology.com/articles/body-doubling-adhd
- Fen lisesi 9. sınıf ders saatleri — https://www.bilgenc.com/9-sinif-fen-lisesi-dersleri/
