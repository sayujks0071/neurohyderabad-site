from playwright.sync_api import Page, expect, sync_playwright
import time

def test_booking_form_time_selection(page: Page):
    """
    Verifies that the time selection uses radio inputs and is keyboard navigable.
    """
    # 1. Arrange: Go to the test page.
    page.goto("http://localhost:3000/test-ux-booking")

    # Wait for hydration
    page.wait_for_selector("form")

    # 2. Act: Find the time radio group or labels.
    # The labels should contain the time text, e.g., "09:00 AM"
    first_time_label = page.get_by_text("09:00 AM", exact=True)

    # Click the label to select (simulating mouse user)
    first_time_label.click()

    # Verify the radio input is checked
    # Since inputs are sr-only, we check the label's class or the input's checked state
    first_radio = page.locator("input[name='appointmentTime'][value='09:00 AM']")
    expect(first_radio).to_be_checked()

    # 3. Verify Keyboard Navigation
    # Focus the first radio (it should be focused after click, or we can focus explicitly)
    first_radio.focus()

    # Press ArrowRight to move to the next radio (09:30 AM)
    page.keyboard.press("ArrowRight")

    # Verify the second radio is checked (native radio behavior)
    second_radio = page.locator("input[name='appointmentTime'][value='09:30 AM']")
    expect(second_radio).to_be_checked()

    # 4. Screenshot: Capture the state with a selected time.
    # We want to see the visual style (cyan background for selected).
    page.screenshot(path="verification/booking_form_time_selection.png")
    print("Screenshot saved to verification/booking_form_time_selection.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_booking_form_time_selection(page)
        finally:
            browser.close()
