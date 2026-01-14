from playwright.sync_api import sync_playwright

def verify_thank_you_and_contact():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Thank You Page Message
        print("Verifying Thank You page...")
        try:
            page.goto("http://localhost:3001/appointments/thank-you")
            page.wait_for_selector("text=Appointment request received", timeout=5000)

            # Screenshot thank you page
            page.screenshot(path="verification/thank_you_page.png")
            print("Thank You page verified.")
        except Exception as e:
            print(f"Thank You page verification failed: {e}")

        # 2. Verify Lead Form on Contact Page
        print("Verifying Contact page (LeadForm)...")
        try:
            page.goto("http://localhost:3001/contact")

            # Fill form
            page.fill("input[name='fullName']", "Test User")
            page.fill("input[name='phone']", "9999999999")
            page.fill("input[name='email']", "test@example.com")
            page.fill("input[name='city']", "Hyderabad")
            page.fill("textarea[name='concern']", "Test enquiry for verification. Please ignore.")

            # Click submit
            page.click("button:has-text('Request Call Back')")

            # Wait for success message
            page.wait_for_selector("text=Appointment request received", timeout=5000)

            # Screenshot success message
            page.screenshot(path="verification/lead_form_success.png")
            print("LeadForm success verified.")

        except Exception as e:
            print(f"LeadForm verification failed: {e}")
            # Take screenshot of failure
            page.screenshot(path="verification/lead_form_failure.png")

        browser.close()

if __name__ == "__main__":
    verify_thank_you_and_contact()
