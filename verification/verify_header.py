
from playwright.sync_api import sync_playwright

def verify_header_dropdown_chevron():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a desktop viewport size to ensure the desktop header is visible
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000")

            print("Waiting for navigation items...")
            page.wait_for_selector("nav[aria-label='Main navigation']")

            # Hover over "What I Treat" to trigger the dropdown and rotate the chevron
            print("Hovering over 'What I Treat'...")
            page.get_by_role("link", name="What I Treat").hover()

            # Wait a moment for transition
            page.wait_for_timeout(500)

            # Take a screenshot of the header
            print("Taking screenshot...")
            # Capture the header area specifically
            header_element = page.locator("header").first
            header_element.screenshot(path="verification/header_dropdown.png")

            print("Screenshot saved to verification/header_dropdown.png")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_header_dropdown_chevron()
