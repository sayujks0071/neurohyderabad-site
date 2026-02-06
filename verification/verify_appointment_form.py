from playwright.sync_api import sync_playwright, expect
import time

def verify_appointment_form():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to appointments page
        try:
            print("Navigating to /appointments...")
            page.goto("http://localhost:3000/appointments", timeout=60000)

            # Wait for form to load
            print("Waiting for form...")
            page.wait_for_selector("form", timeout=30000)

            # Verify Pain Score Slider
            print("Verifying Pain Score Slider...")
            # Look for the new labels I added: "No Pain" and "Severe"
            expect(page.get_by_text("No Pain")).to_be_visible()
            expect(page.get_by_text("Severe")).to_be_visible()

            # Verify Slider exists
            slider = page.locator("#painScore-slider")
            expect(slider).to_be_visible()

            # Verify MRI Checkbox
            print("Verifying MRI Checkbox...")
            mri_checkbox = page.locator("#mriScanAvailable")
            expect(mri_checkbox).to_be_visible()

            # Take screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification/verification.png", full_page=True)
            print("Screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_appointment_form()
