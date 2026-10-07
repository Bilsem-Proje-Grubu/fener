// Tanıtım turu ve "Fener nasıl çalışır" ekranının tek metin kaynağı.
// Dil: kısa, düz, ikinci tekil, ünlemsiz.

export const KNOWN_ROUTES = ['bugun', 'tekrar', 'hafta', 'rehber', 'ayarlar', 'nasil'];

export const INTRO_CARDS = [
  {
    id: 'ne-isine-yarar',
    art: 'beher',
    title: 'Fener, çalışmanı ölçerek iyileştirmen için.',
    body: 'Her gün üç iş seçersin. Odak sayacıyla çalışırsın. Öğrendiğini yazarsın, Fener de sana doğru zamanda geri sorar. Hepsi, araştırmalarda işe yaradığı görülmüş yöntemlere dayanır.',
  },
  {
    id: 'nasil-calisir',
    art: 'dongu',
    title: 'Bir gün böyle geçer.',
    timeline: [
      {
        when: 'Sabah, 2 dakika', title: 'Üç iş seç',
        body: 'Bugün ekranında "+ İş ekle" ile günün işlerini yaz. Üç iş yeter; dördüncüyü eklemek istersen Fener yarına atmayı önerir.',
        where: 'Bugün ekranı', why: 'Uzun liste insanı hiç başlatmaz, üç iş başlatır.',
      },
      {
        when: 'Çalışırken', title: 'Başla\'ya bas',
        body: 'Sayaç dolarken tek bir işe odaklan, telefon başka odada olsun. Bitince nasıl geçtiğini işaretle: akıştaydım, idare eder ya da dağıldım. Dağıldıysan ne böldüğünü seç. Mola kendiliğinden başlar.',
        where: 'Bugün ekranı', why: 'Seni neyin böldüğünü görünce çözümü de bulursun.',
      },
      {
        when: 'Gün içinde', title: 'Bugün ne öğrendin',
        body: 'Öğrendiğin şeyi tek cümleyle yaz. İstersen ona bir soru ekle; Fener o soruyu sana sonra geri sorar.',
        where: 'Bugün ekranı', why: 'Kendi cümlenle yazmak hatırlamanın ilk adımı.',
      },
      {
        when: 'Ertesi gün ve sonrası', title: 'Tekrar',
        body: 'Yazdığın sorular 1, 7, 30 ve 90 gün sonra gelir. Kitaba bakmadan cevapla, sonra "hatırladım", "kısmen" ya da "hatırlamadım" de. Hatırladıkça aralık uzar.',
        where: 'Tekrar ekranı', why: 'Kendini sınamak, yeniden okumaktan çok daha etkili.',
      },
      {
        when: 'Gece', title: 'Bugünlük yeter mi',
        body: 'Yatma saatinden yarım saat önce Fener sayaç yerine bunu sorar. İstersen "yine de 20 dakika" ile devam edersin; yoksa yarın sabah 20 dakika ekler.',
        where: 'Bugün ekranı', why: 'Uyku, öğrenmenin tamamlandığı yerdir.',
      },
      {
        when: 'Hafta sonu', title: 'Haftayı değerlendir, yenisini planla',
        body: 'Üç soruyla haftana bak: ne iyi gitti, ne engelledi, neyi değiştirirsin. Sonra yeni haftanın planını dilek, sonuç, engel ve plan adımlarıyla yaz.',
        where: 'Hafta ekranı', why: 'Küçük ayarlar, hafta hafta büyük fark yapar.',
      },
    ],
  },
];

export const HOWTO_SECTIONS = [
  {
    id: 'ne-isine-yarar',
    title: 'Fener ne işe yarar',
    paragraphs: [
      'Fener, fen lisesi öğrencisi için bir çalışma arkadaşı. Ne kadar çalıştığını değil, çalışmanın işe yarayıp yaramadığını görmene yardım eder.',
      'Üç şeyi bir arada tutar: günün üç işi, odak sayacı ve aralıklı tekrar.',
    ],
  },
  {
    id: 'gunun-akisi',
    title: 'Bir günün akışı',
    steps: [
      'Bugün ekranında günün işlerini ekle. Üç iş yeter; dördüncüyü Fener yarına atmayı önerir.',
      'Başla düğmesine bas. Sayaç dolarken tek bir işe odaklan. İstersen +5 dakika ekle.',
      'Bitince nasıl geçtiğini işaretle: akıştaydım, idare eder, dağıldım. Dağıldıysan ne böldüğünü seç.',
      'Gün içinde "bugün ne öğrendin" cümlesini yaz. İstersen ona bir soru ekle.',
    ],
    link: { route: '#/bugun', label: 'Bugün ekranına git' },
  },
  {
    id: 'tekrar',
    title: 'Tekrar neden var',
    paragraphs: [
      'Beyin öğrendiğini hızla unutur. Kendini sınamak ve bunu aralıklarla yapmak unutmayı yavaşlatır.',
      'Yazdığın sorular 1 gün, 7 gün, 30 gün, 90 gün sonra sana geri gelir. Hatırladıysan aralık uzar, kısmen hatırladıysan aynı kalır, hatırlamadıysan başa döner.',
    ],
    link: { route: '#/tekrar', label: 'Tekrar ekranına git' },
  },
  {
    id: 'hafta',
    title: 'Haftanın ritmi',
    paragraphs: [
      'Hafta ekranında sınavlarını ve teslimlerini girersin. Hafta planı dört adımdır: dilek, sonuç, engel, plan.',
      'Hafta sonu "haftayı değerlendir" ile ne iyi gitti, ne engelledi diye bakarsın. İstersen özeti paylaşabilirsin.',
    ],
    link: { route: '#/hafta', label: 'Hafta ekranına git' },
  },
  {
    id: 'veri',
    title: 'Verin ve ayarlar',
    paragraphs: [
      'Verilerin yalnızca bu cihazda durur. Tarayıcı verisi silinirse ya da telefon değişirse kaybolur. Ayarlar ekranından yedeği indirebilir ve geri yükleyebilirsin.',
      'iPhone\'da Safari, 7 gün açılmayan sitelerin verisini silebilir. Fener\'i ana ekrana ekle: Paylaş simgesi, Ana Ekrana Ekle, Ekle.',
    ],
    link: { route: '#/ayarlar', label: 'Ayarlara git' },
  },
  {
    id: 'sik-sorulanlar',
    title: 'Sık sorulanlar',
    faq: [
      { q: 'Bir gün atladım, ne olur?', a: 'Hiçbir şey. Ceza ya da sıfırlanan bir sayaç yok. İki günden uzun ara verirsen Fener kalan işleri bugüne taşımayı önerir.' },
      { q: 'Neden puan ve rozet yok?', a: 'Dışarıdan gelen ödüller, işin kendisine duyduğun ilgiyi azaltabiliyor. Fener ilerlemeni sana gösterir ama seni puanla yönlendirmez.' },
      { q: 'Neden gece sayaç yerine uyarı çıkıyor?', a: 'Yatma saatinden yarım saat önce başlayıp sabah 04:00\'e kadar Fener "bugünlük yeter mi" diye sorar. Uyku öğrenmenin parçası. İstersen "yine de 20 dakika" ile devam edebilirsin.' },
      { q: 'Hangi ders ve konuyu nasıl seçmeliyim?', a: 'Fener seçmez, sen seçersin. Sınavlarını Hafta ekranına girersen sana hedef önerir.' },
    ],
  },
];
