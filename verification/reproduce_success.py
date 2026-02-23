from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Intercept the API call
        # PatientPortal uses /api/workflows/booking
        response_body = """
        {
            "confirmationMessage": "Appointment request received. Please bring any MRI/CT scans with you. We will confirm via phone shortly."
        }
        """

        page.route("**/api/workflows/booking", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=response_body
        ))

        print("Navigating to /appointments...")
        page.goto("http://localhost:3000/appointments", timeout=60000)

        print("Waiting for scheduler...")
        page.wait_for_selector("text=Reason for Visit", timeout=60000)

        # Dismiss cookie consent
        print("Dismissing cookie consent...")
        try:
            page.click('button[aria-label="Decline cookies"]', timeout=5000)
            # Wait for it to disappear (animation)
            page.wait_for_timeout(1000)
        except:
            print("Cookie consent not found or already dismissed")

        # Step 1: Schedule
        print("Selecting appointment type...")
        # "New Consultation" text might be split, so use partial match or exact if possible
        page.click("text=New Consultation")

        print("Selecting date...")
        # Click next week to ensure future date
        try:
            page.click('button[aria-label="Next week"]', timeout=5000)
        except:
            print("Next week button not found or clickable")

        # Select a date (e.g. the 3rd button in the grid which is likely a weekday)
        # The grid has 7 buttons.
        # We need to click a button that is enabled (not disabled)
        # Select the first enabled button in the grid
        print("Clicking a date...")
        page.locator('button[aria-label^="Select "]:not([disabled])').first.click()

        print("Selecting time...")
        # Select 10:00 or any available time
        try:
            page.click("text=10:00", timeout=2000)
        except:
            # Fallback to first available slot
            print("10:00 not found, clicking first available slot")
            # Look for labels wrapping inputs
            page.locator('label:has(input[type="radio"]:not([disabled]))').first.click()

        print("Clicking Next Step...")
        page.click("button:has-text('Next Step')")

        # Step 2: Details
        print("Filling details...")
        page.wait_for_selector("text=Patient Profile", timeout=10000)

        page.fill('input[id="patient-name"]', "Test Patient")
        page.fill('input[id="patient-age"]', "30")
        page.select_option('select[id="patient-gender"]', "male")
        page.fill('input[id="patient-phone"]', "9876543210")
        page.fill('input[id="patient-email"]', "test@example.com")

        page.fill('textarea[id="patient-symptoms"]', "Test Symptoms")

        print("Submitting form...")
        page.click("button:has-text('Confirm Booking')")

        # Wait for success message
        print("Waiting for success message...")
        page.wait_for_selector("text=Appointment Request Received", timeout=60000)

        # Verify specific text
        expected_text = "Appointment request received. Please bring any MRI/CT scans with you. We will confirm via phone shortly."
        if expected_text in page.content():
            print("Success message verified!")
        else:
            print("Success message NOT found!")
            # print(page.content())

        # Take screenshot
        page.screenshot(path="verification/success_message.png")
        print("Screenshot taken at verification/success_message.png")

        browser.close()

if __name__ == "__main__":
    run()
