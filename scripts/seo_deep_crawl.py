#!/usr/bin/env python3
"""
Deep SEO crawler for drsayuj.info.

Fetches sitemap and robots directives, then crawls up to MAX_PAGES internal URLs,
collecting on-page metadata for reporting.
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import deque
from dataclasses import dataclass, asdict, field
from html.parser import HTMLParser
from typing import Any, Dict, List, Optional, Set, Tuple

BASE_URL = "https://www.drsayuj.info"
SITEMAP_URL = f"{BASE_URL}/sitemap-main.xml"
ROBOTS_URL = f"{BASE_URL}/robots.txt"
USER_AGENT = "Mozilla/5.0 (compatible; CodexSEO/1.0; +https://www.drsayuj.info)"
TIMEOUT = 20
MAX_PAGES = 120
CRAWL_DELAY = 0.2
FOLLOW_INTERNAL_LINKS = False


def fetch_url(url: str) -> Tuple[int, Dict[str, str], str]:
    """Fetch URL, returning status, headers, and decoded body (if text)."""
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            status = response.getcode() or 0
            headers = {k.lower(): v for k, v in response.headers.items()}
            charset = response.headers.get_content_charset() or "utf-8"
            if any(token in headers.get("content-type", "") for token in ("text", "json", "xml")):
                body_bytes = response.read()
                body = body_bytes.decode(charset, errors="replace")
            else:
                body = ""
            return status, headers, body
    except urllib.error.HTTPError as err:
        try:
            body = err.read().decode("utf-8", errors="replace")
        except Exception:
            body = ""
        return err.code, {k.lower(): v for k, v in err.headers.items()} if err.headers else {}, body
    except Exception as exc:  # noqa: BLE001
        return 0, {}, f"ERROR: {exc}"


def parse_robots() -> Dict[str, List[str]]:
    """Parse robots.txt to collect Disallow directives."""
    status, _, body = fetch_url(ROBOTS_URL)
    disallow: List[str] = []
    if status == 200 and body:
        for line in body.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if line.lower().startswith("user-agent"):
                continue
            if line.lower().startswith("disallow"):
                parts = line.split(":", 1)
                if len(parts) == 2:
                    path = parts[1].strip()
                    disallow.append(path or "/")
    return {"disallow": disallow}


def parse_sitemap_urls(sitemap_body: str) -> List[str]:
    """Extract URLs from sitemap XML."""
    matches = re.findall(r"<loc>(.*?)</loc>", sitemap_body)
    urls: List[str] = []
    for match in matches:
        url = match.strip()
        if url:
            urls.append(url)
    return urls


def should_crawl(url: str, disallow_paths: List[str]) -> bool:
    """Return True if URL path is allowed per robots rules."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.path or "/"
    for disallow in disallow_paths:
        if disallow == "/":
            return False
        if disallow and path.startswith(disallow):
            return False
    return True


@dataclass
class PageData:
    url: str
    status: int
    content_type: str
    title: Optional[str] = None
    meta_description: Optional[str] = None
    meta_robots: Optional[str] = None
    canonical: Optional[str] = None
    h1: List[str] = field(default_factory=list)
    h2: List[str] = field(default_factory=list)
    h3: List[str] = field(default_factory=list)
    internal_links: List[str] = field(default_factory=list)
    external_links: List[str] = field(default_factory=list)
    images_missing_alt: List[str] = field(default_factory=list)
    structured_data: List[Dict[str, Any]] = field(default_factory=list)
    word_count: int = 0
    issues: List[str] = field(default_factory=list)


class SEOHTMLParser(HTMLParser):
    """Lightweight HTML parser to extract on-page SEO signals."""

    def __init__(self) -> None:
        super().__init__()
        self.reset_state()

    def reset_state(self) -> None:
        self.title_chunks: List[str] = []
        self.in_title = False
        self.current_heading: Optional[str] = None
        self.heading_buffer: List[str] = []
        self.meta: Dict[str, str] = {}
        self.canonical: Optional[str] = None
        self.h1: List[str] = []
        self.h2: List[str] = []
        self.h3: List[str] = []
        self.internal_links: Set[str] = set()
        self.external_links: Set[str] = set()
        self.images_missing_alt: List[str] = []
        self.ld_json_blobs: List[str] = []
        self.in_ld_json = False

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]) -> None:
        attrs_dict = {k.lower(): (v or "").strip() for k, v in attrs}
        if tag == "title":
            self.in_title = True
            self.title_chunks.clear()
        elif tag == "meta":
            name = attrs_dict.get("name") or attrs_dict.get("property")
            content = attrs_dict.get("content")
            if name and content:
                self.meta[name.lower()] = content
        elif tag == "link":
            rel = attrs_dict.get("rel", "").lower()
            href = attrs_dict.get("href")
            if "canonical" in rel and href:
                self.canonical = href.strip()
        elif tag in {"h1", "h2", "h3"}:
            self.current_heading = tag
            self.heading_buffer = []
        elif tag == "a":
            href = attrs_dict.get("href", "")
            if not href:
                return
            href = href.split("#", 1)[0].strip()
            if not href or href.startswith("mailto:") or href.startswith("tel:") or href.startswith("javascript:"):
                return
            resolved = urllib.parse.urljoin(BASE_URL, href)
            parsed = urllib.parse.urlparse(resolved)
            if parsed.netloc and parsed.netloc != urllib.parse.urlparse(BASE_URL).netloc:
                self.external_links.add(resolved)
            else:
                self.internal_links.add(resolved)
        elif tag == "img":
            src = attrs_dict.get("src", "").strip()
            alt = attrs_dict.get("alt")
            if src and (alt is None or not alt.strip()):
                self.images_missing_alt.append(src)
        elif tag == "script":
            if attrs_dict.get("type") == "application/ld+json":
                self.in_ld_json = True
                self.ld_json_blobs.append("")

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False
        elif tag in {"h1", "h2", "h3"} and self.current_heading == tag:
            text = " ".join(self.heading_buffer).strip()
            if text:
                if tag == "h1":
                    self.h1.append(text)
                elif tag == "h2":
                    self.h2.append(text)
                elif tag == "h3":
                    self.h3.append(text)
            self.current_heading = None
            self.heading_buffer = []
        elif tag == "script" and self.in_ld_json:
            self.in_ld_json = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_chunks.append(data.strip())
        if self.current_heading:
            self.heading_buffer.append(data.strip())
        if self.in_ld_json and self.ld_json_blobs:
            self.ld_json_blobs[-1] += data

    def result(self) -> Dict[str, Any]:
        structured_data: List[Dict[str, Any]] = []
        for blob in self.ld_json_blobs:
            try:
                parsed = json.loads(blob)
                if isinstance(parsed, list):
                    structured_data.extend(parsed)
                else:
                    structured_data.append(parsed)
            except json.JSONDecodeError:
                continue
        return {
            "title": " ".join(chunk for chunk in self.title_chunks if chunk).strip() or None,
            "meta": self.meta,
            "canonical": self.canonical,
            "h1": self.h1,
            "h2": self.h2,
            "h3": self.h3,
            "internal_links": sorted(self.internal_links),
            "external_links": sorted(self.external_links),
            "images_missing_alt": self.images_missing_alt,
            "structured_data": structured_data,
        }


def collect_word_count(html: str) -> int:
    """Approximate body word count by stripping tags."""
    text = re.sub(r"(?is)<(script|style).*?>.*?</\\1>", " ", html)
    text = re.sub(r"(?s)<.*?>", " ", text)
    words = [w for w in re.split(r"\\s+", text) if w]
    return len(words)


def crawl() -> Dict[str, Any]:
    robots = parse_robots()
    disallow_paths = robots.get("disallow", [])

    sitemap_status, _, sitemap_body = fetch_url(SITEMAP_URL)
    sitemap_urls: List[str] = []
    if sitemap_status == 200 and sitemap_body:
        sitemap_urls = parse_sitemap_urls(sitemap_body)

    queue: deque[str] = deque()
    visited: Set[str] = set()
    for url in sitemap_urls:
        if should_crawl(url, disallow_paths):
            queue.append(url)

    if not queue:
        queue.append(BASE_URL)

    pages: List[PageData] = []

    while queue and len(visited) < MAX_PAGES:
        url = queue.popleft()
        if url in visited:
            continue
        visited.add(url)
        status, headers, body = fetch_url(url)
        content_type = headers.get("content-type", "")

        page = PageData(
            url=url,
            status=status,
            content_type=content_type,
        )

        if status == 200 and body and "html" in content_type:
            parser = SEOHTMLParser()
            try:
                parser.feed(body)
            except Exception as exc:  # noqa: BLE001
                page.issues.append(f"HTML parse error: {exc}")
            result = parser.result()
            page.title = result["title"]
            page.meta_description = parser.meta.get("description") if hasattr(parser, "meta") else None
            if not page.meta_description and result["meta"].get("og:description"):
                page.meta_description = result["meta"]["og:description"]
            page.meta_robots = result["meta"].get("robots")
            page.canonical = result["canonical"]
            page.h1 = result["h1"]
            page.h2 = result["h2"]
            page.h3 = result["h3"]
            page.internal_links = result["internal_links"]
            page.external_links = result["external_links"]
            page.images_missing_alt = result["images_missing_alt"]
            page.structured_data = result["structured_data"]
            page.word_count = collect_word_count(body)

            # basic issue detection
            if len(page.h1) != 1:
                page.issues.append(f"Expected 1 H1, found {len(page.h1)}")
            if not page.meta_description:
                page.issues.append("Missing meta description")
            if not page.canonical:
                page.issues.append("Missing canonical tag")
            if page.word_count < 300:
                page.issues.append(f"Low word count ({page.word_count})")
            if page.images_missing_alt:
                page.issues.append(f"{len(page.images_missing_alt)} images missing alt text")

            # queue new internal links
            if FOLLOW_INTERNAL_LINKS:
                for link in page.internal_links:
                    if link not in visited and should_crawl(link, disallow_paths):
                        queue.append(link)
        else:
            if status == 0:
                page.issues.append("Request failed")
            elif status >= 400:
                page.issues.append(f"HTTP error {status}")

        pages.append(page)
        time.sleep(CRAWL_DELAY)

    return {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "robots": robots,
        "sitemap": {
            "status": sitemap_status,
            "urlCount": len(sitemap_urls),
        },
        "pagesCrawled": len(pages),
        "pages": [asdict(page) for page in pages],
    }


def main() -> None:
    result = crawl()
    json.dump(result, sys.stdout, indent=2)


if __name__ == "__main__":
    main()
