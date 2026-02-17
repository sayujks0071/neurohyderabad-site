from playwright.sync_api import sync_playwright

def verify_memberships():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to homepage...")
            page.goto("http://localhost:3000", wait_until="networkidle")

            print("Locating Memberships section...")
            # Look for the heading "Memberships & Certifications"
            heading = page.get_by_role("heading", name="Memberships & Certifications")
            heading.scroll_into_view_if_needed()

            # Locate the parent section container
            # The heading is inside the container, so we can locate the container by locating the heading and going up?
            # Or just take a screenshot of the viewport once scrolled.

            # Let's target the specific section container using a locator that finds the text and gets the parent.
            # But simpler: just take a screenshot of the area around the heading.

            # Actually, let's try to locate the container explicitly if possible, or just screenshot the viewport.
            # The container has class "bg-white/70".

            # Let's just screenshot the whole page to be safe, or a specific region.
            # We can use the locator for the heading and then take a screenshot of the surrounding element.
            # Since I don't have a unique ID for the section, I'll rely on the heading.

            # Take a screenshot of the viewport
            page.screenshot(path="verification/memberships.png")
            print("Screenshot saved to verification/memberships.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_memberships()
