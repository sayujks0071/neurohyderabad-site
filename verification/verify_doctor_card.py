try:
    from playwright.sync_api import sync_playwright, expect
except ImportError as exc:
    raise ImportError(
        "The 'playwright' package is required to run verification scripts.\n"
        "Install it with:\n"
        "    pip install playwright\n"
        "and then run:\n"
        "    playwright install\n"
        "before executing verification/verify_doctor_card.py."
    ) from exc
import os

def verify_doctor_card():
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
            page.screenshot(path="verification/home_page.png")

            # Locate the card container to verify class
            # The card has specific classes we added: bg-white/90 backdrop-blur-sm
            # We can select by text and go up, or select by class if unique enough?
            # It has "backdrop-blur-sm".

            card_locator = page.locator(".backdrop-blur-sm").first
            # Expect it to be visible
            expect(card_locator).to_be_visible()

            print("Found element with .backdrop-blur-sm class")

            # Screenshot the card specifically
            card_locator.screenshot(path="verification/doctor_card.png")

            print("Verification complete.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_doctor_card()
