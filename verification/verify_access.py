
from playwright.sync_api import sync_playwright
import re

def verify_accessibility(page):
    print("Navigating to appointments...")
    page.goto("http://localhost:3001/appointments")

    # Wait for the scheduler to load
    page.wait_for_selector("text=Reason for Visit")
    print("Scheduler loaded.")

    # Select a type
    print("Selecting New Consultation...")
    page.get_by_text("New Consultation", exact=True).click()

    # Select a date - click the first enabled date button in the grid
    # The date buttons are in the second section.
    # We can assume the default selected date is fine, but let's click one to be safe.
    # Look for the grid of dates.
    print("Selecting a date...")
    # Find a date button that is not disabled.
    # They have text like "15", "16", etc.
    # Avoid clicking the "New Consultation" button again.
    # We can look for buttons inside the date section.

    # Identify the section by heading
    date_section = page.locator("section").filter(has_text="Select Date")
    # Click a date (e.g. the one with "bg-blue-600" is selected, or any enabled one)
    # Let's just trust the default selection if it exists.

    # Scroll to the bottom to see Time Slots
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

    print("Selecting a time slot...")
    # Find buttons with time pattern "XX:XX"
    # We can use get_by_text with regex
    time_button = page.get_by_role("button", name=re.compile(r"\d{2}:\d{2}")).first

    if time_button.count() > 0:
        print(f"Found time slot: {time_button.inner_text()}")
        # Check if disabled
        if time_button.is_disabled():
            print("Time slot is disabled. Finding first enabled one...")
            time_button = page.get_by_role("button", name=re.compile(r"\d{2}:\d{2}")).filter(has_not=page.locator("[disabled]")).first

        if time_button.count() > 0:
            print(f"Clicking time slot: {time_button.inner_text()}")
            time_button.click()
            # Wait a bit for state update
            page.wait_for_timeout(500)
        else:
            print("No enabled time slots found on this date.")
            return
    else:
        print("No time slots found at all.")
        page.screenshot(path="verification/debug_no_slots.png")
        return

    # Click Next Step
    print("Clicking Next Step...")
    next_button = page.get_by_role("button", name="Next Step")

    if next_button.is_disabled():
        print("Next button is still disabled!")
        page.screenshot(path="verification/debug_disabled_2.png")
        return

    next_button.click()

    # Now we should be on the form (Step 2)
    print("Step 2 reached.")
    try:
        page.wait_for_selector("text=Patient Profile", timeout=5000)
    except:
        print("Patient Profile not found after clicking next.")
        page.screenshot(path="verification/debug_step2_fail.png")
        return

    # Verify input association

    # Check if clicking the label focuses the input
    print("Testing label click...")
    try:
        page.get_by_text("Full Name", exact=True).click()
    except:
        print("Label 'Full Name' not found.")
        page.screenshot(path="verification/debug_label_fail.png")
        return

    # Check if the input with id "patient-name" is focused
    is_focused = page.evaluate("document.getElementById('patient-name') === document.activeElement")
    print(f"Input 'patient-name' focused after clicking label: {is_focused}")

    if not is_focused:
        print("Failed: Clicking 'Full Name' label did not focus the input.")
    else:
        print("Success: Label click focused the input!")

        # Take the final verification screenshot showing the focus ring or just the form
        page.screenshot(path="verification/accessibility_check.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        try:
            verify_accessibility(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()
