
from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate
            print("Navigating...")
            page.goto("http://localhost:3000/test-form")

            # Accept cookies if present
            try:
                page.get_by_role("button", name="Accept All").click(timeout=2000)
                print("Accepted cookies.")
            except:
                print("No cookie banner or click failed.")

            # Wait for form
            page.wait_for_selector("form[aria-label='Teleconsultation appointment request form']")
            print("Form loaded.")

            # Fill form
            page.fill("input[name='name']", "John Doe")
            page.fill("input[name='phone']", "9876543210")
            page.fill("input[name='email']", "john@example.com")
            page.fill("input[name='condition']", "Back pain")
            page.fill("textarea[name='message']", "Need appointment")
            print("Form filled.")

            # Click submit
            submit_btn = page.get_by_role("button", name="Send appointment request")

            # Scroll into view
            submit_btn.scroll_into_view_if_needed()

            submit_btn.click()
            print("Clicked submit.")

            # Wait for success message (target visible one)
            expect(page.locator("p", has_text="Appointment request prepared")).to_be_visible(timeout=5000)
            print("Success message visible.")

            page.screenshot(path="verification/teleconsultation_success_v2.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_retry_v2.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
