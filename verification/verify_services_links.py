from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/services")

        # Verify title
        print(f"Title: {page.title()}")

        # Look for "Specialized Procedures" section
        # It's an h3 with that text.
        header = page.get_by_role("heading", name="Specialized Procedures")
        header.scroll_into_view_if_needed()

        # Take screenshot of the viewport
        page.screenshot(path="verification/services_procedures.png")
        print("Screenshot saved to verification/services_procedures.png")

        browser.close()

if __name__ == "__main__":
    run()
