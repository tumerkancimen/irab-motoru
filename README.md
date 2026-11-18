# İ'râb Motoru

Arapça kelime veya cümleyi i'râb, morfoloji, semantik ve belâgat yönünden çözümleyen tek sayfalık araç.

Adres: https://tumerkancimen.github.io/irab-motoru/

## Ne yapar

Yazılan Arapça metni dört katmanda çözümler:

- **İ'râb** — kelimeyi parçalarına ayırır (önek, kök, bitişik zamirler), her parça için Arapça i'râb cümlesini verir.
- **Morfoloji** — kök, vezin, bâb ve tasrîf.
- **Semantik** — kök anlamı, bağlamdaki anlam, anlam alanı, eş ve zıt anlamlılar.
- **Belâgat** — meânî, beyân ve bedî' tespitleri, her biri metinden delille.

Her tespitin yanında bir güven etiketi bulunur: kesin, tartışmalı veya emin değilim.

## Analiz motoru

Sayfa statiktir; analiz, ziyaretçinin kendi Anthropic API anahtarıyla çalışır. Anahtar yalnızca tarayıcının localStorage'ında durur ve doğrudan Anthropic'e gönderilir. Anahtar girilmediğinde sayfa örnek bir sonuç gösterir.

## Uyarı

Çıktı bir ön çözümlemedir. Motor kaynak, sûre-âyet numarası veya şiir nisbeti vermez; ödevde kullanmadan önce güvenilir bir kaynakla karşılaştırın.

## Lisans

MIT
