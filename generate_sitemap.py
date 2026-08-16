from pathlib import Path
from datetime import datetime, timezone

BASE_URL = "https://eshansayhan.github.io"

EXCLUDED = {
    "404.html",
}

urls = []

for path in Path(".").rglob("*.html"):
    if ".git" in path.parts:
        continue

    if path.name in EXCLUDED:
        continue

    url_path = "/" + str(path).replace("\\", "/")

    if path.name == "index.html" and path.parent == Path("."):
        url_path = "/"

    urls.append((url_path, path))

urls.sort()

today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]

for url_path, path in urls:

    xml.append("  <url>")
    xml.append(f"    <loc>{BASE_URL}{url_path}</loc>")
    xml.append(f"    <lastmod>{today}</lastmod>")
    xml.append("  </url>")

xml.append("</urlset>")

Path("sitemap.xml").write_text(
    "\n".join(xml) + "\n",
    encoding="utf-8"
)

print(f"Sitemap oluşturuldu: {len(urls)} URL")
