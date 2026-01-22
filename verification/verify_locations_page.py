from playwright.sync_api import sync_playwright, expect

def verify_locations_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to locations page...")
            page.goto("http://localhost:3000/locations", timeout=60000)

            # Wait for content to load
            expect(page.get_by_role("heading", name="Neurosurgeon Locations in Hyderabad")).to_be_visible(timeout=30000)

            # Check for specific location cards (Headers)
            expect(page.get_by_role("heading", name="Secunderabad", exact=True)).to_be_visible()
            expect(page.get_by_role("heading", name="Banjara Hills", exact=True)).to_be_visible()

            # Check for NAP card heading
            expect(page.get_by_role("heading", name="Dr Sayuj Krishnan - Neurosurgeon in Malakpet")).to_be_visible()

            # Scroll to bottom to ensure full page capture
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(1000) # Wait for scroll

            print("Taking screenshot...")
            page.screenshot(path="verification/locations_page.png", full_page=True)
            print("Screenshot saved to verification/locations_page.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_locations_page()
