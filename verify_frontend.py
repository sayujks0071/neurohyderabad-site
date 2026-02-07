from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_appointment_form(page: Page):
    print("Navigating to /appointments...")
    page.goto("http://localhost:3000/appointments")

    # page.wait_for_load_state("networkidle")
    page.wait_for_selector("h2:has-text('Book Consultation')")

    print("Handling cookie banner...")
    try:
        accept_btn = page.get_by_role("button", name="Accept All")
        if accept_btn.is_visible():
            accept_btn.click()
            print("Accepted cookies.")
            time.sleep(0.5)
    except:
        pass

    print("Locating Appointment Scheduler...")
    try:
        start_booking = page.get_by_role("button", name="Start Booking")
        if start_booking.is_visible():
            start_booking.click()
            print("Clicked Start Booking.")
            time.sleep(1)
    except:
        pass

    print("Selecting New Consultation...")
    try:
        type_btn = page.get_by_text("New Consultation").first
        if type_btn.is_visible():
            type_btn.click()
            print("Selected New Consultation.")
            time.sleep(0.5)
    except Exception as e:
        print(f"Could not select type: {e}")

    print("Selecting a weekday date...")
    # Try to click "Mon" or "Tue" or "Wed" or "Thu" or "Fri"
    # Assuming they are visible.
    weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    clicked_date = False
    for day in weekdays:
        try:
            # Look for element with text "Mon" inside a button or clickable div
            # The screenshot shows "Mon" and "9" stacked.
            # I'll try to click the text "Mon".
            day_el = page.get_by_text(day, exact=True).first
            if day_el.is_visible():
                day_el.click()
                print(f"Clicked {day}.")
                clicked_date = True
                break
        except:
            continue

    if not clicked_date:
        print("Could not find a weekday. Trying to click any date button.")
        # Try generic date button
        # page.locator(".date-button-class").first.click()
        pass

    time.sleep(1) # Wait for slots to load

    print("Selecting time slot...")
    try:
        # Look for time buttons again
        # e.g. "10:00"
        # The screenshot showed "No slots available" for Sunday. Hopefully weekday has slots.
        # I'll look for any time button.

        # Try finding a button with text containing ":"
        time_slot = page.locator('button:has-text(":")').first
        if time_slot.is_visible():
            time_slot.click()
            print(f"Clicked time slot: {time_slot.text_content()}")
        else:
            print("No time slots found even after selecting weekday.")
            page.screenshot(path="/home/jules/verification/no_slots.png")
            # Maybe I need to change month?
            # But usually there are slots.
            # I'll try another day.

    except Exception as e:
        print(f"Time selection failed: {e}")

    time.sleep(1)

    print("Clicking Next Step...")
    next_btn = page.get_by_role("button", name="Next Step")
    if next_btn.is_enabled():
        next_btn.click()
        print("Clicked Next Step.")
    else:
        print("Next Step disabled. Force clicking time slot again?")
        # Try to click "11:00" explicitly
        page.get_by_role("button", name="11:00").first.click()
        time.sleep(0.5)
        next_btn.click()

    print("Waiting for Step 2...")
    page.wait_for_selector("text=Patient Profile", timeout=10000)

    print("Checking for Pain Score label...")
    # Expect "Current Pain Score (1-10)"
    try:
        expect(page.get_by_text("Current Pain Score (1-10)")).to_be_visible(timeout=5000)
        print("Label found!")
    except:
        print("Label NOT found. Taking screenshot.")
        page.screenshot(path="/home/jules/verification/failed_label.png")
        raise Exception("Label not found")

    print("Taking verification screenshot...")
    page.screenshot(path="/home/jules/verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 1024})
        try:
            verify_appointment_form(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
