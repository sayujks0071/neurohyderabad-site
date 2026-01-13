
from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_blog_post(page: Page):
    """
    Verifies that the new blog post renders correctly.
    """
    # 1. Arrange: Go to the new blog post URL.
    page.goto("http://localhost:3001/blog/awake-craniotomy-brain-tumor-guide")

    # Handle Cookie Banner if present
    try:
        page.get_by_role("button", name="Accept All").click(timeout=3000)
        time.sleep(1)
    except:
        print("Cookie banner not found or already accepted.")

    # 2. Assert: Check for key elements.
    expect(page.get_by_role("heading", name="Awake Craniotomy: Why and How Brain Surgery Is Performed While You Are Awake", exact=True)).to_be_visible()
    expect(page.get_by_text("A patient's guide to understanding how awake brain surgery protects speech and movement during tumor removal.")).to_be_visible()
    expect(page.get_by_role("heading", name="Why Do We Keep You Awake?")).to_be_visible()

    # Scroll down to ensure FAQ is loaded/visible
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1)
    page.evaluate("window.scrollBy(0, -1000)") # Scroll up a bit
    time.sleep(1)

    # Verify FAQ section renders
    # Use loose matching because markdown might render it slightly differently
    expect(page.get_by_text("Is awake brain surgery painful?")).to_be_visible()

    # Verify internal link
    expect(page.get_by_role("link", name="Headache vs. Brain Tumor Warning Signs")).to_be_visible()

    # 3. Screenshot: Capture the FAQ section specifically
    element = page.get_by_text("Frequently Asked Questions")
    if element.is_visible():
        element.scroll_into_view_if_needed()

    page.screenshot(path="/home/jules/verification/awake-craniotomy-post.png")
    print("Screenshot saved to /home/jules/verification/awake-craniotomy-post.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_blog_post(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            try:
                page.screenshot(path="/home/jules/verification/verification-failure.png")
            except:
                pass
            raise e
        finally:
            browser.close()
