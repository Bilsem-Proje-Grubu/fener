# Fener tasarım sistemi

Kareli laboratuvar defteri: koyu mürekkep, kobalt vurgu, tek fosforlu sarı. Sakin, düz, ünlemsiz. Kaynak: `app/css/tokens.css` (değerler) ve `app/css/app.css` (bileşenler). Canlı katalog: `app/design-preview.html` (yerel sunucuyla aç; önbelleğe girmez).

## İlkeler

1. Tek gösterişli öğe dolan beher; geri kalan her şey sakin.
2. Ham renk, piksel ya da süre yazma; token kullan.
3. Vurgu için üç araç: kobalt (etkileşim), fosforlu sarı (işaret), anlam renkleri (uyarı, başarı, tehlike).
4. Puan, rozet, seri, konfeti, ceza hissi yok. Metin kısa, ikinci tekil, ünlemsiz.
5. Süre ve durum hep metin olarak da yazılır; renk tek başına anlam taşımaz.
6. Dış bağımlılık yok: yazı tipleri `app/fonts`, ikonlar satır içi SVG (CSS `mask` ile).

## Tokenlar (`tokens.css`)

| Grup | Tokenlar | Not |
|---|---|---|
| Zemin/yüzey | `--bg` `--paper` `--paper-2` `--grid` `--grid-major` `--line` `--line-strong` `--margin` | `--line-strong` alan kenarı (3:1) |
| Yazı | `--ink` `--ink-soft` `--ink-faint` | hepsi AA |
| Kobalt | `--cobalt` `-strong` `-deep` `-soft` `-ink` | düğme, bağlantı, odak |
| Sarı | `--yellow` `--yellow-ink` `--hl` `--hl-soft` | sarı üstünde yalnız koyu yazı |
| Anlam | `--good` `--warn` `--danger` (+ `-soft`, `-ink`, `-strong`) | |
| Beher | `--fill` `--fill-edge` `--tick` | karanlıkta sıvı kısık |
| Yazı tipi | `--font-display` (Fraunces) `--font-body` (Figtree) | |
| Ölçek | `--fs-xs` .75 · `sm` .875 · `base` 1 · `md` 1.125 · `lg` 1.25 · `xl` 1.5 · `2xl` 1.875 · `3xl` 2.5 · `--fs-clock` | rem |
| Boşluk | `--sp-1`…`--sp-16` (4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px) | `--tap` 44 px |
| Yarıçap | `--radius-xs` 6 · `sm` 10 · `--radius` 16 · `lg` 22 · `pill` | |
| Yükselti | `--elev-1` `--elev-2` `--elev-3` | kart, birincil, bildirim |
| Hareket | `--dur-fast` 120 · `--dur` 200 · `--dur-slow` 320 · `--dur-fill` 600 ms; `--ease-out` `--ease-in-out` | azaltılınca 0 |
| Katman | `--z-raised` 1 · `--z-sticky` 10 · `--z-overlay` 50 · `--z-toast` 60 · `--z-skip` 100 | |

## Bileşen kataloğu

| Bileşen | Sınıflar | Kullanım |
|---|---|---|
| Kart | `.card`, `.card--primary`, `.card--quiet`, `.card--accent` `--warn` `--good`, `.danger-card`, `.exam-card`, `.card--ruled` | Ekranda en çok bir `--primary`. `--ruled` yalnız haftalık plan/değerlendirme. |
| Düğme | `.btn-primary`, `.btn-secondary` (düz `button` de), `.btn-ghost`, `.btn-danger`, `.btn-big`, `.btn-block` | Kartta tek birincil. Tehlike yalnız geri alınamaz onayda. `<a>` üzerinde de çalışır. |
| Form | `input`, `select`, `textarea`, `label`, `.field`, `.field-error`, `aria-invalid="true"` | Alan ve etiket her zaman ikili. |
| Chip | `.chip`, `.chip.selected`, `.chip-row`, `.scale-row` | Seçili durum onay işaretiyle de belli. |
| Etiket | `.tag`, `--hl` `--good` `--warn` | Ders adı gibi küçük durum; düğme değil. |
| Menü | `.tabs` (alt), `.rail` (sol, ≥880 px), `.nav a[data-path]` | İkon CSS'ten gelir; etkin: `.active`. |
| Başlık | `h1`–`h3`, `.greet` (fosforlu çizgili h1), `.eyebrow`, `.lede`, `.hint`, `mark`/`.hl` | Fosforlu işaret sayfada az. |
| Beher/sayaç | `.beher` + `.fill` + `.clock` + `.task-line`, `.focus-mode` | `.fill` yüksekliği yüzdeyle verilir. |
| İlerleme | `.progress > span`, `.progress--hl` | `role="progressbar"` ve `aria-valuenow` ekle. |
| İş listesi | `.task-list`, `.task-item(.done)`, `.task-check`, `.task-sub`, `.goal-line` `.goal-dot` | Tamamlanan iş ceza değil, yalnız üstü çizili. |
| Boş durum | `.empty`, `.empty-title` | Kısa cümle + ne yapılacağı. |
| Bildirim | `.notice` `--good` `--warn` `--danger` (kalıcı); `.toast` (geçici) | Toast metni ünlemsiz. |
| Tekrar | `.qa-q`, `.qa-a`, `.review-count` | |
| Hafta | `.week-title`, `.wall`, `.wall-cell(.filled)`, `.exam-card` | |
| Rehber | `.guide-card`, `.guide-head`, `.guide-num`, `.guide-dots`, `.guide-body`, `.guide-foryou` | |
| Yardımcı | `.row`, `.row.between`, `.row.wrap`, `.stack`, `.grow`, `.sr-only`, `.prose`, `.num` | |

`.onboard`, `.name-options`, `.duration-card` karşılama çalışmasına aittir; `.help-link` ve `.intro-*` adları ayrılmıştır.

## Açık / karanlık

- Tema sistem tercihinden gelir; katalogda `<html data-theme="light|dark">` ile zorlanır.
- Tokenı iki temada da tanımla (`tokens.css`'te üç blok: `:root`, medya sorgusu, `[data-theme="dark"]`).
- Karanlıkta sarı kısılır (`--yellow` #D9C455, `--hl` yarı saydam), kobalt açılır, beher sıvısı koyu zeytin olur ki açık renk yazı okunsun.
- Sarı zemin üstünde yalnız `--yellow-ink`; karanlık beherde yazı `--ink`.
- Yeni renk eklerken iki temada da yazı kontrastını ölç (≥4.5:1; kenar, ikon ≥3:1).

## Hareket

- Yalnız kullanıcı eylemine yanıt: basma, üzerine gelme, sekme göstergesi, beher dolumu, toast.
- Ekran her saniye yeniden çizildiği için (sayaç) giriş animasyonu yok.
- Süreler token'dan; `prefers-reduced-motion` ile hepsi 0 ms olur, dolgu anlık geçer.
- `hover` yalnız `@media (hover: hover)` içinde.

## Erişilebilirlik kontrol listesi

- [ ] Yazı kontrastı ≥4.5:1 iki temada
- [ ] Dokunma hedefi ≥44 px (`.task-check` gizli alanla genişler)
- [ ] `:focus-visible` halkası görünür; `outline: none` yazma (yalnız `.main`)
- [ ] `prefers-reduced-motion` ile hareket yok
- [ ] iPhone güvenli alanları: `env(safe-area-inset-*)` (kenarlar, alt sekme, toast, odak kipi)
- [ ] 390 px'te yatay kaydırma yok; ≥880 px'te sol menü
- [ ] Renk tek başına anlam taşımıyor (chip onayı, çizgili tamamlanmış iş)
- [ ] Sayaç rakamları eşit genişlikte (`tabular-nums`)

## Yapma listesi

- Puan, rozet, seri sayacı, konfeti, "kaçırdın" dili.
- Ünlem, büyük harfle bağırma, "anne gibi" ton.
- CDN, harici font, ikon kütüphanesi, framework.
- Bileşende ham `#hex`, `px` süre ya da `z-index` sayısı.
- Sayfada birden çok birincil kart ya da düğme.
- Her saniye yeniden çizilen alanda animasyon.
- Fosforlu sarıyı dolgu rengi olarak yaymak; yalnız işaret ve beher.
