from playwright.sync_api import sync_playwright
import time

def verify_contact_form(page):
    print("Navigating to /contact...")
    page.goto("http://localhost:3000/contact", timeout=60000)
    page.wait_for_load_state("networkidle")

    # Hide cookie consent
    page.add_style_tag(content="div[role='dialog'][aria-labelledby='cookie-consent-title'] { display: none !important; }")

    print("Checking /contact for Pain Score slider...")
    pain_label = page.get_by_text("Pain Intensity Score (1-10)")
    pain_label.scroll_into_view_if_needed()
    pain_label.wait_for(state="visible", timeout=10000)

    time.sleep(0.5)
    page.screenshot(path="/home/jules/verification/contact_form_visible.png")
    print("Screenshot saved.")

def verify_appointments_form(page):
    print("Navigating to /appointments...")
    page.goto("http://localhost:3000/appointments", timeout=60000)

    # Hide cookie consent
    page.add_style_tag(content="div[role='dialog'][aria-labelledby='cookie-consent-title'] { display: none !important; }")

    # Wait for "Reason for Visit"
    try:
        page.get_by_text("Reason for Visit").wait_for(timeout=10000)
    except:
        print("Could not find Reason for Visit")
        page.screenshot(path="/home/jules/verification/appointments_error_1.png")
        return

    # Step 1: Select "New Consultation"
    print("Selecting Reason...")
    page.get_by_text("New Consultation").click()

    # Step 2: Select Date
    print("Selecting Date...")
    # Find enabled date button
    enabled_date = page.locator("button[aria-label^='Select ']:not([disabled])").nth(2) # 3rd button
    if enabled_date.count() == 0:
         enabled_date = page.locator("button[aria-label^='Select ']:not([disabled])").first

    enabled_date.click()

    # Step 3: Select Time
    print("Selecting Time...")
    try:
        # Wait for time slots to appear (might be async)
        page.locator("input[name='appointmentTime']").first.wait_for(timeout=5000)
        # Click the label of the first time slot
        page.locator("label:has(input[name='appointmentTime'])").first.click()
    except:
        print("Could not find time slots")
        page.screenshot(path="/home/jules/verification/appointments_error_2.png")
        return

    # Click Next Step
    print("Clicking Next Step...")
    page.get_by_text("Next Step").click()

    # Now we should be on Step 2 (Details)
    print("Checking /appointments for Pain Score...")
    try:
        pain_label = page.get_by_text("Current Pain Score (1-10)")
        pain_label.wait_for(timeout=10000)

        pain_label.scroll_into_view_if_needed()
        time.sleep(0.5)

        page.screenshot(path="/home/jules/verification/appointments_form.png")
        print("Screenshot saved to /home/jules/verification/appointments_form.png")
    except:
         print("Could not find Pain Score in Step 2")
         page.screenshot(path="/home/jules/verification/appointments_error_3.png")


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_contact_form(page)
            verify_appointments_form(page)
        finally:
            browser.close()
