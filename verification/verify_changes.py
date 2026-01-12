import re
from playwright.sync_api import sync_playwright

def verify_endoscopic_spine_surgery_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the page
            page.goto("http://localhost:3000/services/endoscopic-spine-surgery-hyderabad")

            # Wait for content to load
            page.wait_for_selector("h1")

            # Check for the new "Clinical Success Rates" section
            success_rates_heading = page.get_by_role("heading", name="Clinical Success Rates", exact=True)
            if success_rates_heading.is_visible():
                print("✅ 'Clinical Success Rates' heading is visible")
                # Scroll to it
                success_rates_heading.scroll_into_view_if_needed()
            else:
                print("❌ 'Clinical Success Rates' heading NOT found")

            # Check for specific success rate content
            if page.get_by_text("90-95%").is_visible():
                print("✅ Success rate '90-95%' found")
            else:
                print("❌ Success rate '90-95%' NOT found")

            # Check for expanded "Advanced Endoscopic Techniques" section
            techniques_heading = page.get_by_role("heading", name="Advanced Endoscopic Techniques We Use", exact=True)
            if techniques_heading.is_visible():
                 print("✅ 'Advanced Endoscopic Techniques' heading is visible")
                 techniques_heading.scroll_into_view_if_needed()
            else:
                 print("❌ 'Advanced Endoscopic Techniques' heading NOT found")

            # Check for specific new technique
            if page.get_by_text("Endoscopic Lumbar Discectomy").is_visible():
                print("✅ New technique 'Endoscopic Lumbar Discectomy' found")
            else:
                print("❌ New technique 'Endoscopic Lumbar Discectomy' NOT found")

            # Take screenshot of the new Success Rates section
            page.screenshot(path="verification/endoscopic_page_verification.png", full_page=True)
            print("📸 Screenshot saved to verification/endoscopic_page_verification.png")

        except Exception as e:
            print(f"❌ Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_endoscopic_spine_surgery_page()
