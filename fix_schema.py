import os
import glob

def fix_schema(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    target = """        {
          "@type": "CreativeWork",
          "name": "Eshan Sayhan Portfolio",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1450"
          }
        },
        {
          "@type": "LocalBusiness",
          "name": "Eshan Sayhan Studio",
          "image": "https://eshansayhan.github.io/EshanSayhan.jpeg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Istanbul",
            "addressCountry": "TR"
          }
        }"""
    
    replacement = """        {
          "@type": "LocalBusiness",
          "name": "Eshan Sayhan Studio",
          "image": "https://eshansayhan.github.io/EshanSayhan.jpeg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1450"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Istanbul",
            "addressCountry": "TR"
          }
        }"""

    if target in content:
        new_content = content.replace(target, replacement)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file_path}")

for file_path in glob.glob("c:/Users/Eshan/Desktop/eshanc/**/*.html", recursive=True):
    fix_schema(file_path)
