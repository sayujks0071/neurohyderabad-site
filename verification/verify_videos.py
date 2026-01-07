from playwright.sync_api import sync_playwright
import time

def verify_thumbnails():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the homepage
        try:
            page.goto("http://localhost:3000", timeout=60000)
            print("Navigated to home page")
        except Exception as e:
            print(f"Error navigating: {e}")
            browser.close()
            return

        # Scroll down incrementally to trigger lazy loading
        try:
            for i in range(10):
                page.mouse.wheel(0, 500)
                time.sleep(0.5)

            # Locate the section by text now that we've scrolled
            header = page.get_by_role("heading", name="Watch How We Plan & Deliver Neurosurgical Care")

            # Ensure it's visible
            header.scroll_into_view_if_needed()
            expect(header).to_be_visible()

            # Wait for images to be visible
            # The images are inside article tags
            page.wait_for_selector("article img", state="visible", timeout=10000)

            # Take a screenshot of the specific section if possible, or viewport
            # We can find the section container
            section = page.locator("section").filter(has_text="Watch How We Plan & Deliver Neurosurgical Care").first
            section.screenshot(path="verification/videos_section.png")
            print("Screenshot taken at verification/videos_section.png")

        except Exception as e:
            print(f"Error finding elements: {e}")
            # Take a screenshot anyway to see where we are
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

from playwright.sync_api import expect

if __name__ == "__main__":
    verify_thumbnails()
