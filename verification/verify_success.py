import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        print("Navigating to contact page...")
        page.goto("http://localhost:3000/contact")

        # Check if page loaded
        expect(page.get_by_role("heading", name="Contact Dr Sayuj Krishnan")).to_be_visible(timeout=60000)

        print("Filling the form...")
        page.fill('input[name="fullName"]', "Test User")
        page.fill('input[name="phone"]', "9876543210")
        page.fill('input[name="email"]', "test@example.com")
        page.fill('input[name="city"]', "Hyderabad")
        page.fill('textarea[name="concern"]', "This is a test submission to verify success message.")

        # Mock API to return success immediately
        page.route("**/api/lead", lambda route: route.fulfill(status=200, body='{"success": true}'))

        print("Clicking submit...")
        submit_button = page.get_by_role("button", name="Request Call Back")
        submit_button.click()

        # Verify success message
        print("Waiting for success message...")
        success_heading = page.get_by_role("heading", name="Request Received")
        expect(success_heading).to_be_visible()

        success_text = page.locator("text=Appointment request received. Please bring any MRI/CT scans with you. We will confirm via phone shortly.")
        expect(success_text).to_be_visible()

        print("Taking screenshot of success state...")
        page.screenshot(path="verification/success_state.png")

        # Verify reset
        print("Clicking 'Send another enquiry'...")
        reset_button = page.get_by_role("button", name="Send another enquiry")
        reset_button.click()

        # Check if form is visible again
        expect(submit_button).to_be_visible()

        # Check if fields are empty
        print("Verifying fields are empty...")
        expect(page.locator('input[name="fullName"]')).to_have_value("")
        expect(page.locator('input[name="phone"]')).to_have_value("")
        expect(page.locator('input[name="email"]')).to_have_value("")
        expect(page.locator('textarea[name="concern"]')).to_have_value("")

        print("Taking screenshot of reset state...")
        page.screenshot(path="verification/reset_state.png")

        print("Verification successful!")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error_success.png")
        raise e
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
