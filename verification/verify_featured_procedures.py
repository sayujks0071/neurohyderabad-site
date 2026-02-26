from playwright.sync_api import sync_playwright

def verify_featured_procedures():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000", timeout=60000)

            print("Waiting for Featured Procedures section...")
            # Look for the heading "Featured Procedures"
            section_locator = page.get_by_role("heading", name="Featured Procedures")
            section_locator.wait_for(timeout=30000)
            section_locator.scroll_into_view_if_needed()

            print("Taking screenshot...")
            # Take a screenshot of the viewport, centered on the section if possible, or just full page
            # Ideally we want to capture the section styling.
            # I'll try to screenshot the parent section if I can select it, otherwise the viewport.
            # The section has `aria-label` or specific text?
            # I can find the container.

            # Since I modified FeaturedProcedures.tsx, I know the structure.
            # It has a heading "Featured Procedures".

            page.screenshot(path="verification/featured_procedures.png")
            print("Screenshot saved to verification/featured_procedures.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_featured_procedures()
