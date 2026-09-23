# İlk plan taslağının beş gözle değerlendirilmesi — ham raporlar

Tarih: 17 Eylül 2026. İlk plan taslağı üç bağımsız değerlendiriciye verildi. Aşağıdaki raporlar olduğu gibi saklanır; kararlara dönüşmüş özet `FENER-PLAN.md` bölüm 6'dadır.

---

## Rapor 1 — Kişisel eğitim koçu ve öğrenci gözüyle

### Kişisel eğitim koçu gözüyle

1. **İlk açılış yükü.** İlk akşam öğrenci hiçbir şey başarmadan üç form dolduruyor; "küçük başla" ilkesi üründe değil, sadece rehberde. → İlk açılışı tek adıma indir (ad + süre), okul/yatma saati varsayılanla geçsin; ilk oturum 10 dk "deneme"; ilk iki hafta haftalık hedef 5 değil 3 gün. İlk sürüm.
2. **Plana uyulmayınca senaryo yok.** İki gün açılmazsa tamamlanmamış "3 iş" ne olur belirsiz; sessiz birikim borç hissi yaratır, terk sebebidir. → "Hoş geldin, kaldığın yerden" ekranı; eski işler tek dokunuşla taşınır, otomatik değil. İlk sürüm.
3. **Okul sınavları yok sayılıyor.** Fen lisesi 9. sınıfın haftası yazılılarla şekillenir; plan döngüsü bunu bilmeden soyut kalır. → Basit sınav takvimi (ders, tarih); Bugün ekranında "Çarşamba fizik yazılısı: 4 gün" kartı; haftalık hedef önerisi sınava bağlansın. İlk sürüm.
4. **Geri bildirim dili tanımsız.** "Ne kadar odaklandın 1–5" ve "kontrol hissi 1–5" toplanıyor ama düşük puana cevap yok; veri toplamak koçluk değil. → Düşük puanda tek soru: "Ne böldü?" (telefon / yorgunluk / konu zor / başka). Cevaplar planın "engel" kutusuna öneri olarak düşsün. İlk sürüm.
5. **Sert kurallar özerkliği zedeliyor (gece kuralı, dördüncü iş engeli).** Sınav öncesi 22:40'ta oturum açılmayınca öğrenci uygulamayı kapatır ve güvenini yitirir. → Gece kuralı öneri olsun, "yine de 20 dk" seçeneği ve yargısız not; dördüncü iş "yarına at" teklifiyle kabul edilsin. İlk sürüm.
6. **Telefon çelişkisi çözülmemiş.** "Telefon başka odada mı?" sorusu telefondan cevaplanıyorsa saçma. → Telefonda oturum başlayınca tam ekran sadece sayaç, ekran açık; soru yalnızca bilgisayarda sorulsun. İlk sürüm.
7. **Her oturumda öz-puanlama kaygılı ergende kendini düşük notlama döngüsü kurar.** → Üçlü sözel ölçek (akıştaydım / idare eder / dağıldım), günde bir özet yeter. İlk sürüm.
8. **Doğru anlı motivasyon cümlesi ve "neden" cümlesinin görünmesi kayıp.** → Arka arkaya iki "dağıldım" ya da üç "hatırlamadım" sonrası tek cümle; 6–8 cümlelik havuz yeter. Veli baskısı için öğrencinin isteyerek gösterebileceği haftalık özet kartı ikinci sürümde.

### 14–15 yaşında fen lisesi öğrencisi gözüyle

1. **Açılışta iş yapmadan iki soru** ("Ne çalışıyorsun?", "Telefon nerede?") ders gibi. → Tek büyük "Başla"; son seçilen iş hatırlansın, soru sayaç dolarken üstte tek satır.
2. **Ödev ve yazılı takibi yok.** Asıl derdim yarınki ödev ve gelecek haftaki sınav; bunlar yoksa uygulama ikinci yer olur. → İş maddesine isteğe bağlı ders + son tarih; sınav takvimi. İlk sürüm.
3. **Kendi soru yazmak gece 21:00'de yük.** Boş kutu, örnek yok. → Soru şablonları ("… nedir?", "… ile … farkı?", "şu formülü çıkar"), tek soru yeterli, fotoğraf ekleme ileride.
4. **Dilek–Sonuç–Engel–Plan dört kutu** rehberlik dersi çalışma kâğıdı gibi. → Sohbet akışıyla tek seferde tek kutu, 2 dakikada bitsin; adı "Bu haftanın planı"; örnek cümleler bir arkadaşın ağzından.
5. **Rehber 13 bölüm — okumam.** → Bağlamsal kartlar: karışık set açılınca %61/%37, gece kuralında uyku, ilk tekrar kartında unutma eğrisi; üç cümle + "devamı". 13 bölüm arşiv olsun. İlk sürüm.
6. **Paylaşacak bir şeyim yok.** → Haftalık paylaşılabilir kart (toplam dakika, dolu beher, en çok çalışılan ders) görüntü olarak; birlikte çalışma sonra.
7. **Ton yer yer anne gibi.** → Kısa, düz, ikinci tekil, hafif espri; her sistem mesajını yazmadan önce gerçek bir 15 yaşındaya okutun. İlk sürüm.
8. **Yedek dosyası taşımak — yapmam.** Telefon yatakta, bilgisayar masada; iki cihazda ayrı veri olursa bırakırım. → İlk sürümde "ana cihaz" seçtir; ya da tek yönlü aktarma. Otomatik eşleme ikinci sürüm.

---

## Rapor 2 — Kıdemli geliştirici ve arayüz uzmanı gözüyle

### Kıdemli frontend geliştirici gözüyle

**Mimari:** Çatısız (framework'süz) düz HTML/CSS/JavaScript bu kapsam (6 ekran, tek kullanıcı, veri cihazda) için doğru; büyük çatılar ek değer katmaz, bakım yükü ekler. Tek gerçek alternatif Vite+Preact olurdu. Karar: düz JavaScript'te kal, sürümleme açığını elle kapat.

1. **Çevrimdışı dosyası "her şeyi önbellekten ver" + anında devralma:** ana sayfa da önbellekten geldiği için kullanıcı yeni sürümü hiç görmez; oturum ortasında eski sayfa + yeni kod karışabilir. → Sayfa açılışında önce internet (yoksa önbellek), diğer dosyalar önce önbellek; "Yeni sürüm hazır, yenile" bildirimi; tek sürüm sabiti, dosya adreslerine sürüm eklenir.
2. **Temiz adres çakışması:** `./index.html` önbelleği ve manifest başlangıç adresi temiz adres ayarıyla yönlendirmeye düşer. → Yalnızca `./` önbelleklensin; başlangıç adresi `/#/bugun`; simge dosyaları gerçekten var olsun.
3. **Barındırma yapılandırması:** önbellek başlıkları (çevrimdışı dosyası ve ana sayfa asla önbelleklenmez; css/js/fonts bir yıl, adreste sürüm olduğu için güvenli), manifest içerik türü, temel güvenlik başlıkları. Önizleme yayınları telefonda test için. Analitik yok. *(Not: Sonradan Cloudflare Pages'e geçildi; aynı başlıklar `_headers` dosyasıyla verilir.)*
4. **iPhone Safari 7 gün kuralı gerçek risk:** 7 kullanım günü etkileşim olmazsa site verisi silinir; IndexedDB çözmez; ana ekrana kurulu uygulama ayrı sayaç tutar, kurulum fiilen çözer. → iPhone'da kurulum kartı; kalıcı depolama isteği; haftalık değerlendirme sonunda yedek hatırlatması; 14 gündür yedek yoksa uyarı.
5. **localStorage eşzamanlı ve ~5 MB:** yeter ama veri katmanı baştan asenkron arayüzle yazılsın; yazma geciktirilsin; iki sekme çakışması yakalansın.
6. **Sayaç doğruluğu:** arka planda zamanlayıcı yavaşlar, iPhone'da durur. → Bitiş zamanı kaydedilir, kalan süre saatten hesaplanır, ekrana dönüşte yeniden çizilir; sayaç saf fonksiyon olarak yazılır (test edilebilir).
7. **iPhone kısıtları:** titreşim yok; bildirim yalnızca kurulu uygulamada ve sunucu üzerinden; ses "Başla" dokunuşunda açılmalı; ekran açık tutma var. → Dürüst arayüz: "Ekranı kilitlersen zil çalmaz." Sunucu bildirimi sonra.
8. **Tarih/hafta:** UTC tabanlı tarih Türkiye'de 00:00–03:00 arası önceki günü verir. → Yerel tarih; hafta Pazartesi; "çalışma günü" sınırı 04:00.
9. **Veri sürümleme:** kök nesnede şema numarası, her kayıtta kimlik ve güncellenme zamanı, silinenlerde iz. Yedek zarfı `{app, schema, exportedAt, data}`; yükleme önce doğrular. Eşleme için gereken tek altyapı budur.
10. **Test ve bütçe:** bağımlılıksız `node --test` ile tarih, sayaç, aralık, dönüştürme, yedek testleri; tek tarayıcı akışı. JS < 60 KB. Yazı tipleri uygulama içinde (latin-ext alt kümesi).

**Eşleme hazırlığı (sonra):** `syncCode`, `deviceId` alanları; ikinci sürümde küçük bir sunucu işlevi + anahtar-değer deposu; 6 kelimelik kod → anahtar; kayıt bazında son yazan kazanır, silme izleri birleştirilir.

### Arayüz uzmanı gözüyle

1. **Sekme sırası:** Bugün–Tekrar–Hafta–Rehber–Ayarlar. "Ben" belirsiz.
2. **İlk açılış uzun:** yalnızca ad + odak süresi; okul saatleri varsayılan, Hafta ekranından düzenlenir.
3. **Bugün ekranı kalabalık:** sayaç tek başına öne; oturum başlayınca sekmeler gizlenir, tam ekran; Bitir/+5 alt bölgede (tek el).
4. **Boş durumlar tanımsız:** her biri tek cümle + tek eylem, rehbere bağlantı.
5. **Hafta ekranı çok yoğun:** "Planla" sihirbazı (her adım ayrı ekran, örnek cümle altta) ve "Değerlendir" ayrı.
6. **Bildirim dili:** ikinci tekil, ünlemsiz, kısa; yıkıcı işlemlerde "Geri al" (5 sn). Dördüncü iş reddi ceza gibi okunmasın.
7. **Fosforlu sarı ve kontrast:** sarı üstünde yalnızca koyu yazı; karanlık temada sarı %15 kısılır, kobalt açık tona; beher dolgusu dekoratif, süre daima metin.
8. **Erişilebilirlik:** sayaç ekran okuyucuya yalnızca dönüm noktalarında; ölçekler radyo grubu; sekme değişince odak başlığa; dokunma hedefi 44 px; "hareketi azalt"ta dolgu anlık.
9. **Rehber telefonda:** bölüm listesi + okuma süresi + okundu işareti; 17–18 px, satır 1.55, 65 karakter; her bölüm 2 dakika; çizimler metin alternatifiyle.
10. **Tipografi:** Fraunces ve Figtree Türkçe karakter içerir; risk kodda: büyük harf dönüşümü Türkçe kuralla; sayaç rakamları eşit genişlikte.

---

## Rapor 3 — Ürün sahibi gözüyle

1. **İlk sürüm iki planı birleştirip üçe katlamış.** Bir haftalık denemede tekrar motoru neredeyse boş kalır. → İlk sürüm daraltılsın. *(Karar: tekrar kaldı, karışık set ikinci sürüme.)*
2. **Kullanım verisi ürün sahibine ulaşmıyor.** → "Haftalık özeti paylaş": kimliksiz kısa metin; öğrenci mesajla gönderir. İlk sürüm.
3. **Başarı ölçütleri çelişiyor.** → Tek birincil ölçüt: 4 haftanın en az 3'ünde 5+ günde en az bir oturum. İkincil: değerlendirme 4'te 3, kontrol hissi düşmüyor.
4. **En tehlikeli varsayım: "öğrenci her akşam kendiliğinden açar."** → Kod yazılmadan önce 5 günlük kâğıt kart testi; tek günlük hatırlatma bildirimi (izinle).
5. **İkinci tehlikeli varsayım: soru yazmaya üşenmeyeceği.** → İlk hafta yalnızca "bugün ne öğrendin, tek cümle"; yazma oranı %50'yi geçerse soru alanı açılsın.
6. **Deneme protokolü tek öğrenci ve süresi belirsiz.** → 1 öğrenci 2 hafta öncü, sonra 3 öğrenci 4 hafta; karar kapısı her Pazar.
7. **Telefon–bilgisayar eşleşmesi yok ama iki cihaz stratejinin özü.** → İlk sürümde "bir ana cihaz seç"; ikinci sürümde kodla aktarma; üçüncü sürümde hesap.
8. **Sınav takvimi ve ödev eksik; olmazsa olmaz.** → Hafta ekranına en fazla 8 satırlık "yaklaşan sınav/teslim" listesi; 3 iş seçerken önerilir. İlk sürüm.
9. **Rehber 13 bölüm; ilk haftada okunma olasılığı düşük.** → Bölümler ilgili ekrandaki "?" kartına bağlansın; okunup okunmadığı haftalık özete girsin.
10. **BİLSEM'e ölçekleme:** her kayıtta öğrenci kimliği (şimdilik sabit), zaman damgaları, şema numarası; okul programı "programa" bağlı. Hesap gerektiğinde: 18 yaş altı için veli açık rızası, veri asgariliği, barındırma bölgesi, öğretmen görünümü yalnızca onaylı özetler.
11. **Sürümleme ve teslim biçimi tanımsız.** → Sürüm etiketi ayarlarda görünsün; her yayın öncesi eski yedekle yükleme testi; git deposu.
12. **"Fener" adı öğrenciye sorulmamış.** → İlk görüşmede 3 isim; öğrenci seçsin.

### Önerilen ilk sürüm kapsamı
1. İlk açılış: ad, odak süresi (okul programı varsayılan)
2. Bugün: 3 iş, dolan beher sayacı, üçlü ölçek, +5 dakika
3. Gece önerisi
4. Haftalık hedef çizgisi (ilk iki hafta 3 gün, sonra 5)
5. Hafta: plan sihirbazı + yaklaşan sınav/teslim listesi
6. Haftalık değerlendirme: 3 soru + kontrol hissi
7. Rehber: ekranlara bağlı bölümler
8. Ayarlar: sürüm, "haftalık özeti paylaş", yedek indir/yükle
9. Çevrimdışı + ana ekrana ekle, yayın
10. Tek günlük hatırlatma (ikinci sürüme kaydı)

### 4 haftalık deneme protokolü
- **Hafta 0:** 5 günlük kâğıt kart testi; isim seçimi; 20 dakikalık başlangıç görüşmesi.
- **Hafta 1–2, 1 öğrenci:** Her Pazar özet metni + 10 dakikalık sohbet. Kapı: 14 günden 7'sinde açılmadıysa dur ve nedeni anla.
- **Hafta 3–4, 3 öğrenci:** Aynı ritim. Kapı: 3'ten 2'si 5+ gün kullanıyorsa devam; 1'i ise kapsamı daralt; hiçbiri ise dur.
