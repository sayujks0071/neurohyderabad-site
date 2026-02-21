
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to home page...")
        page.goto("http://localhost:3000")

        print("Checking for FAQ content...")
        # Check if the FAQ title is present
        faq_title = page.get_by_text("Frequently Asked Questions")
        if faq_title.count() > 0:
            print("FAQ title found.")
        else:
            print("FAQ title NOT found.")

        # Check if specific FAQ content is present (e.g., "candidate for endoscopic spine surgery")
        faq_content = page.get_by_text("candidate for endoscopic spine surgery")
        if faq_content.count() > 0:
            print("FAQ content found immediately (Server Rendered).")
        else:
            print("FAQ content NOT found immediately.")

        # Scroll to FAQ section to verify layout
        faq_section = page.locator("section[aria-labelledby='faq-section-title']")
        if faq_section.count() > 0:
            faq_section.scroll_into_view_if_needed()
            print("Scrolled to FAQ section.")

            # Take screenshot
            page.screenshot(path="verification-faq.png")
            print("Screenshot saved to verification-faq.png")
        else:
             print("FAQ section not found by aria-labelledby")
             # Try finding by text just in case
             faq_title.scroll_into_view_if_needed()
             page.screenshot(path="verification-faq-fallback.png")

        browser.close()

if __name__ == "__main__":
    run()
