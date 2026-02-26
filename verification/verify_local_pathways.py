from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to page...")
            page.goto("http://localhost:3000/neurosurgeon-hitech-city")

            # Wait for the component to be visible
            # It has text "Available Services"
            print("Waiting for component...")
            page.wait_for_selector("text=Available Services", timeout=60000)

            # Scroll to the component
            element = page.get_by_text("Available Services")
            element.scroll_into_view_if_needed()

            # Take screenshot of the viewport
            print("Taking screenshot...")
            page.screenshot(path="verification/local_pathways.png", full_page=True)
            print("Screenshot saved to verification/local_pathways.png")

        except Exception as e:
            print(f"Error: {e}")
            # Take screenshot anyway to debug
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
