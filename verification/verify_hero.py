from playwright.sync_api import sync_playwright
import time

def verify_hero():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for content to appear (LCP)
            # The h1 text "Dr. Sayuj Krishnan"
            print("Waiting for H1...")
            # Note: If the blocking overlay was still there, H1 might be in DOM but not visible (covered)
            # Or if it was z-index covered. Playwright is_visible checks if it's occluded.

            h1 = page.locator("h1", has_text="Dr. Sayuj Krishnan").first
            h1.wait_for(state="visible", timeout=10000)
            print("H1 found and visible!")

            # Check for Loading Indicator text
            # It text is "Loading 3D Experience..."
            indicator = page.get_by_text("Loading 3D Experience")
            if indicator.is_visible():
                print("Loading indicator is visible (good, users see feedback)")
            else:
                print("Loading indicator not visible (maybe loaded too fast?)")

            # Take screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification/hero_lcp.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_hero()
