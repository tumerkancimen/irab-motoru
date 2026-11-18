# İ'râb Motoru

Arapça kelime veya cümleyi i'râb, morfoloji, semantik ve belâgat yönünden çözümleyen tek sayfalık araç.

## Yayımlama (GitHub Pages)

1. Yeni depo aç (ör. `irab-motoru`), `index.html`, `.nojekyll` ve `README.md` dosyalarını yükle.
2. Settings → Pages → Branch: `main` / `/ (root)` → Save.
3. Adres: `https://KULLANICI-ADI.github.io/irab-motoru/`

## Analiz motoru

Sayfa statik olduğu için analiz, ziyaretçinin kendi Anthropic API anahtarıyla çalışır.
Anahtar yalnızca tarayıcının localStorage'ında durur ve doğrudan Anthropic'e gönderilir.
Anahtarsız hâlde örnek sonuç görünür.
