from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Determine absolute path to the file
        cwd = os.getcwd()
        file_path = f"file://{cwd}/public/widgets/appointment-booking.html"
        print(f"Loading {file_path}")

        page.goto(file_path)

        # Wait for React to render
        page.wait_for_selector("form", timeout=5000)

        # Check for new fields
        pain_label = page.get_by_text("Pain Intensity Score")
        mri_label = page.get_by_text("I have recent MRI/CT Scan reports")

        if pain_label.is_visible():
            print("Pain Score label is visible")
        else:
            print("Pain Score label NOT visible")

        if mri_label.is_visible():
            print("MRI Checkbox label is visible")
        else:
            print("MRI Checkbox label NOT visible")

        # Take screenshot
        page.screenshot(path="verification/booking_widget.png", full_page=True)
        print("Screenshot saved to verification/booking_widget.png")

        browser.close()

if __name__ == "__main__":
    run()
