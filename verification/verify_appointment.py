from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        # Navigate to appointments page
        print("Navigating to http://localhost:3000/appointments")
        page.goto("http://localhost:3000/appointments")

        # Expect the scheduler to be visible
        # "Reason for Visit" is the first section
        print("Waiting for 'Reason for Visit'...")
        scheduler = page.get_by_text("Reason for Visit")
        expect(scheduler).to_be_visible(timeout=10000)

        # Wait a bit for everything to settle
        time.sleep(2)

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/appointment_scheduler.png")
        print("Screenshot taken successfully")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
