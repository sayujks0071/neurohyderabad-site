import time
from playwright.sync_api import sync_playwright

def verify_appointment_form():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # Navigate to the page
        print("Navigating to appointment page...")
        page.goto("http://localhost:3000/appointments")

        # Wait for hydration
        page.wait_for_timeout(2000)

        # 1. Check for Cookie Banner and dismiss if present
        try:
            cookie_btn = page.locator("button:has-text('Accept')").first
            if cookie_btn.is_visible(timeout=2000):
                cookie_btn.click()
                print("Dismissed cookie banner")
        except:
            pass

        # Step 1: Select Appointment Type
        print("Selecting Appointment Type...")
        try:
            page.get_by_role("button", name="New Consultation").click()
        except Exception as e:
            print(f"Error selecting type: {e}")
            page.screenshot(path="debug_error_type.png")
            raise e

        # Step 2: Select Date and Time (Iterative)
        print("Finding a date with available slots...")
        # Wait for the date selection section to be visible
        page.wait_for_selector("section:has-text('Select Date')", timeout=5000)

        # Capture console logs
        page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))

        # Locate date buttons
        # We target the specific section by finding the h3
        date_section = page.locator("section").filter(has=page.locator("h3", has_text="Select Date"))
        # The date buttons are in the second grid (first is headers) or the one with buttons
        date_buttons = date_section.locator(".grid button")

        count = date_buttons.count()
        print(f"Found {count} date buttons in the Select Date section.")

        slots_found = False

        for i in range(count):
            btn = date_buttons.nth(i)

            # Skip if disabled (weekend)
            if btn.is_disabled():
                print(f"Date button {i} is disabled (Weekend). Skipping.")
                continue

            print(f"Checking date button {i}...")
            btn.click()

            # Wait for slots to render or "No slots available" message
            # We give it a generous timeout because of animation and potential re-renders
            try:
                # Check for "No slots available" message first
                no_slots_msg = page.locator("text=No slots available for this date")
                if no_slots_msg.is_visible(timeout=1500):
                    print(f"No slots available for date {i}. Trying next...")
                    continue

                # Wait for at least one time slot button
                page.wait_for_selector("button:has-text(':')", timeout=3000)
                time_slots = page.locator("button:has-text(':')")

                if time_slots.count() > 0:
                    # Try to find an enabled slot
                    for j in range(time_slots.count()):
                        slot = time_slots.nth(j)
                        if not slot.is_disabled():
                            slot_time = slot.text_content()
                            print(f"Found enabled slot: {slot_time}. Clicking...")
                            slot.click()
                            slots_found = True
                            break

                    if slots_found:
                        break
                    else:
                        print(f"All slots disabled for date {i}.")
            except Exception as e:
                print(f"Error checking slots for date {i}: {e}")
                continue

        if not slots_found:
            print("Could not find any date with available slots!")
            page.screenshot(path="debug_no_slots_all.png")
            raise Exception("No slots available")

        # Step 4: Click Next Step
        print("Clicking Next Step...")
        next_btn = page.get_by_role("button", name="Next Step")

        # Wait a moment for validation state to update
        page.wait_for_timeout(1000)

        # Check if enabled
        if next_btn.is_disabled():
            print("Next Step button is DISABLED")
            # Log current values if possible?
            page.screenshot(path="debug_step1.png")
            raise Exception("Next Step button is disabled despite selections")

        next_btn.click()

        # Step 5: Fill Form
        print("Testing Form Validation & Submission...")

        # Wait for Step 2 form
        page.wait_for_selector("input[name='patientName']", timeout=5000)

        # Fill Valid Data
        print("Filling Patient Details...")
        page.fill("input[name='patientName']", "Test Patient")
        page.fill("input[name='contactNumber']", "9876543210") # Valid Indian number
        page.fill("input[name='age']", "30")
        page.select_option("select[name='gender']", "male")
        page.fill("textarea[name='symptoms']", "Headache for 3 days")

        if page.locator("input[name='email']").is_visible():
            page.fill("input[name='email']", "test@example.com")

        if page.locator("input[name='painScore']").is_visible():
             page.fill("input[name='painScore']", "5")

        # Submit
        print("Submitting form...")
        submit_btn = page.get_by_role("button", name="Confirm Booking")
        submit_btn.click()

        # Verify Success
        print("Verifying success...")
        try:
            # Wait for success message
            page.wait_for_selector("text=Appointment request received", timeout=15000)
            print("Success message found!")
        except:
            print("Success message NOT found or timed out")
            page.screenshot(path="debug_submit_fail.png")
            # Check for error messages
            if page.locator("text=Please enter").count() > 0:
                 print("Validation errors found on page:")
                 print(page.locator("text=Please enter").all_text_contents())
            raise Exception("Form submission failed")

        print("Verification Successful!")
        browser.close()

if __name__ == "__main__":
    verify_appointment_form()
