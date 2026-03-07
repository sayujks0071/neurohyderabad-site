import os
from playwright.sync_api import sync_playwright, expect

def test_spinal_fracture_section():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Increase navigation timeout to 60 seconds because dev server is slow
        page.set_default_timeout(60000)

        # Navigate to the page
        print("Navigating to page...")
        page.goto("http://localhost:3000/services/spinal-fusion-surgery-hyderabad")

        # Wait for the new section to be visible
        print("Looking for 'Traumatic Spine Fracture Treatment' section...")
        section_locator = page.get_by_role("heading", name="Traumatic Spine Fracture Treatment")
        expect(section_locator).to_be_visible(timeout=60000)

        # Scroll to the section
        section_locator.scroll_into_view_if_needed()

        # Take a screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/spinal_fracture_section.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    test_spinal_fracture_section()
