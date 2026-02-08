from playwright.sync_api import sync_playwright, expect
import os

def verify_doctor_card():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000", timeout=60000)

            print("Waiting for DoctorCard...")
            # The card has this text
            card_heading = page.get_by_role("heading", name="Dr. Sayuj Krishnan").first
            expect(card_heading).to_be_visible(timeout=30000)

            # Take screenshot of the whole page first to be safe
            home_page_screenshot = os.path.join(script_dir, "home_page.png")
            page.screenshot(path=home_page_screenshot)

            # Locate the card container to verify class
            # The card has specific classes we added: bg-white/90 backdrop-blur-sm
            # We can select by text and go up, or select by class if unique enough?
            # It has "backdrop-blur-sm".

            card_locator = page.locator(".backdrop-blur-sm").first
            # Expect it to be visible
            expect(card_locator).to_be_visible()

            print("Found element with .backdrop-blur-sm class")

            # Screenshot the card specifically
            doctor_card_screenshot = os.path.join(script_dir, "doctor_card.png")
            card_locator.screenshot(path=doctor_card_screenshot)

            print("Verification complete.")

        except Exception as e:
            print(f"Error: {e}")
            error_screenshot = os.path.join(script_dir, "error.png")
            page.screenshot(path=error_screenshot)
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_doctor_card()
