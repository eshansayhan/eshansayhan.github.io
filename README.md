# Eshan Sayhan Digital Identity & Entity Architecture

Bu proje, `eshansayhan.github.io` web sitesinin teknik ve anlamsal (semantic) gereksinimlerini içermektedir. Temel odak noktası, TikTok benzeri bir kullanıcı arayüzü (saf HTML ve CSS ile) oluşturmak ve bunu Knowledge Graph (Bilgi Grafiği) platformlarında maksimum görünürlük sağlayacak devasa bir SEO ve Semantic Web / Entity (Varlık) Mimarisi ile desteklemektir.

## 1. UI & Frontend Mimarisi
* **Tasarım Dili**: TikTok tarzı arayüz (dikey kaydırma, tam ekran medya deneyimi).
* **Teknoloji**: Sadece saf `.html` ve `.css`.
* **Medya**: Görsel ve videolar için optimize edilmiş içerik yönetimi.

## 2. SEO & İndeksleme Altyapısı
* **Temel SEO**: Meta etiketler, otomatik site haritaları (`sitemap.xml`) ve RSS Feed sistemleri.
* **Google İndeksleme**: Hızlı tarama, Core Web Vitals uyumluluğu ve Google'ın dizinlemesi için gereken tüm temel gereksinimler.
* **Off-page SEO**: Backlink uyumluluğu ve dağıtıma hazır yapı.
* **Haber & Yayın**: Google News, Bing News, Apple News, News sitemap, yayıncı profilleri ve basın bülteni dağıtım sistemlerine uyumluluk.

## 3. Semantic Web & Entity (Varlık) Yığını
"Eshan Sayhan" varlığını oluşturmak için anlamsal şemaların (semantic schemas) derinlemesine entegrasyonu.
* **Temel Tipler**: `Person` (Kişi), `Artist` (Sanatçı), `Creator` (İçerik Üretici).
* **Kilit Özellikler**: `@id`, `sameAs`, `mainEntity`, `mentions`, `knowsAbout`, `identifier`, `creator`.
* **Sayfa Yapıları**: `AboutPage` (Biyografi için), `ProfilePage`.
* **Standartlar**: Schema.org, RDF, RDFS, OWL, JSON-LD, RDFa, Microdata, SPARQL.

### Örnek Entity Yapısı (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://eshansayhan.github.io/#eshan-sayhan",
  "name": "Eshan Sayhan",
  "sameAs": [
    "https://wikidata.org/wiki/...",
    "https://musicbrainz.org/artist/...",
    "https://spotify.com/...",
    "https://apple.com/...",
    "https://youtube.com/...",
    "https://tiktok.com/...",
    "https://instagram.com/...",
    "https://github.com/..."
  ]
}
```

## 4. Knowledge Graph (Bilgi Grafiği) Hedefleri
Site, büyük Bilgi Grafikleri ve Panellerini tetiklemek ve beslemek için inşa edilmiştir:
* Google Knowledge Graph & Google Knowledge Panel
* Bing Knowledge Graph & Microsoft Knowledge Panel
* Schema.org tabanlı Bilgi Grafikleri
* DBpedia, YAGO ve Freebase (tarihsel veriler)
* Wikidata Query Service (Wikibase tabanlı sistemler)

## 5. Otorite & Kimlik (Identifier) Entegrasyonları
Varlığın (Entity) küresel otorite dosyalarına ve standart kimliklere bağlanması.
* **Akademik / Mesleki**: ORCID (akademik kişi), ISNI (yaratıcı/mesleki), GeoNames, OpenAlex, OpenCorporates.
* **Kütüphane / Otorite Kayıtları**: VIAF (Sanal Uluslararası Otorite Dosyası), Library of Congress Name Authority File, GND (Alman Milli Kütüphanesi), BnF (Fransız Milli Kütüphanesi), WorldCat Identities.
* **Medya / Yayıncılık (Tanımlayıcılar)**: DOI, Handle, ARK, ISBN (kitap), IPI (müzik yayıncılığı), ISRC (müzik kaydı), ISWC (müzik eseri).

## 6. Dijital Ayak İzi & Platform Hiyerarşisi
Eshan Sayhan'ın farklı platform katmanlarındaki varlık yönetimi:

### Tier A (Birincil Merkezler)
Google, Bing, Wikidata, MusicBrainz, YouTube, Spotify, Apple Music, TikTok, Schema.org, ISNI.

### Tier B (İkincil Düğümler)
Discogs, AllMusic, Deezer, Tidal, SoundCloud, Bandcamp, Instagram, Facebook, LinkedIn, GitHub, VIAF.

### Diğer Destekleyici Platformlar (Tier C)
DBpedia, YAGO, WorldCat, GND, Library of Congress, BnF, Muck Rack, IMDb, TMDB, Internet Archive, Last.fm, Amazon Music, Crunchbase, OpenAlex.

## 7. Varlık Haritalama Hiyerarşisi (Entity Mapping)

```text
               ESHAN SAYHAN
                     │
    ┌────────────────┼────────────────┐
    ↓                ↓                ↓
  PERSON           ARTIST           CREATOR
    │                │                │
    ↓                ↓                ↓
 Wikidata        MusicBrainz       YouTube
 DBpedia         Discogs           TikTok
 ISNI            Spotify           Instagram
 VIAF            Apple Music       GitHub
    │                │                │
    └────────────────┼────────────────┘
                     ↓
              RESMİ WEB SİTESİ
                     ↓
             Schema.org / JSON-LD
                     ↓
           Google / Bing / Yandex
                     ↓
             Knowledge Systems
```
