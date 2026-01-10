from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to patient stories page where StandardCTA is used
        try:
            page.goto("http://localhost:3000/patient-stories", timeout=60000)
        except Exception as e:
            print(f"Error navigating: {e}")
            page.screenshot(path="verification/error.png")
            return

        # Wait for content to load
        page.wait_for_load_state("networkidle")

        # Scroll to find the CTA
        # StandardCTA usually has buttons "Book Appointment", "Call", "WhatsApp"
        # I'll look for "Book Appointment"

        try:
            cta = page.get_by_role("link", name="Book Appointment").first
            cta.scroll_into_view_if_needed()
            expect(cta).to_be_visible()

            # Take a screenshot of the CTA area
            # I'll take a screenshot of the parent container if possible, or just the viewport around it

            # Locate the container. StandardCTA renders a div with flex classes.
            # I'll try to locate the container by finding the button's parent.
            container = cta.locator("xpath=..")

            container.screenshot(path="verification/verification.png")
            print("Screenshot taken.")
        except Exception as e:
            print(f"Error finding element: {e}")
            page.screenshot(path="verification/full_page_error.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
