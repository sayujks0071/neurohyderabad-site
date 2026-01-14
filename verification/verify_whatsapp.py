
from playwright.sync_api import sync_playwright

def verify_whatsapp_button():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the admin appointments page
            page.goto("http://localhost:3001/admin/appointments")

            # Wait for the table to load
            page.wait_for_selector("table")

            # Check for the Quick Actions column header
            assert page.get_by_text("Quick Actions").is_visible()

            # Check for the Confirm via WhatsApp button
            whatsapp_button = page.locator("button:has-text('Confirm via WhatsApp')").first
            assert whatsapp_button.is_visible()

            # Take a screenshot
            page.screenshot(path="verification/whatsapp_button.png", full_page=True)
            print("Verification successful. Screenshot saved to verification/whatsapp_button.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_whatsapp_button()
