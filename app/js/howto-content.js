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
    steps: [
      'Bugün: üç iş seç.',
      'Başla: odak sayacı dolarken çalış.',
      'Akşam: bugün ne öğrendiğini tek cümleyle yaz.',
      'Tekrar: sırası gelen soruyu kitaba bakmadan cevapla.',
      'Hafta sonu: haftayı değerlendir, yenisini planla.',
    ],
  },
  {
    id: 'ne-yapmaz',
    art: 'defter',
    title: 'Fener neleri yapmaz.',
    body: 'Puan, rozet ve seri sayacı yok. Atladığın gün için ceza yok. Hesap açmazsın; verilerin yalnızca bu cihazda durur, bu yüzden ara sıra yedek almak iyi olur. Karar hep sende, Fener yalnızca önerir.',
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
