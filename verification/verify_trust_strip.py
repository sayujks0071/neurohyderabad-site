
from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_trust_strip(page: Page):
    """
    Verifies that the TrustStrip component is rendered with the correct content and styling.
    """
    print("Navigating to homepage...")
    page.goto("http://localhost:3001")

    # Wait for the TrustStrip to be visible.
    # We look for text present in the component.
    print("Waiting for TrustStrip content...")
    page.wait_for_selector("text=Yashoda Hospital Affiliation", timeout=10000)

    # Scroll to the element to ensure it's in view for screenshot
    hospital_text = page.get_by_text("Yashoda Hospital Affiliation")
    hospital_text.scroll_into_view_if_needed()

    # Take a screenshot of the TrustStrip area
    # We can try to locate the parent container.
    # The new TrustStrip has a border-y and gradient background.
    # We can locate it by looking for the container that has these classes roughly or just the area around the text.

    # Let's target the strip container.
    # Since I don't have a specific ID, I'll find the text and traverse up.
    # Or just screenshot the viewport if it's prominent.
    # But better to find the container.

    # The container has "bg-gradient-to-r from-slate-50 to-slate-100"
    # But easier to find the flex container inside.

    # Let's screenshot the whole page, or a region.
    print("Taking screenshot...")
    page.screenshot(path="/home/jules/verification/trust-strip.png", full_page=False)

if __name__ == "__main__":
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_trust_strip(page)
            print("Verification complete.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
