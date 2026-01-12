from playwright.sync_api import sync_playwright, expect

def verify_appointment_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the appointment page
        # Assuming the server is running on localhost:3000
        page.goto("http://localhost:3000/appointments")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # Verify title contains "Best Neurosurgeon Hyderabad"
        print(f"Page title: {page.title()}")
        if "Best Neurosurgeon Hyderabad" not in page.title():
            print("WARNING: Title does not contain 'Best Neurosurgeon Hyderabad'")

        # Verify JSON-LD script is present
        # We look for a script with type="application/ld+json" that contains "Physician" and "MedicalClinic"
        scripts = page.locator('script[type="application/ld+json"]').all()
        found_schema = False
        for script in scripts:
            content = script.text_content()
            if "Physician" in content and "MedicalClinic" in content and "Dr. Sayuj Krishnan" in content:
                print("Found injected JSON-LD schema!")
                print(content[:200] + "...") # Print start of schema
                found_schema = True
                break

        if not found_schema:
            print("ERROR: JSON-LD schema not found or incorrect.")

        # Take screenshot
        page.screenshot(path="/home/jules/verification/appointment_page_schema.png")
        print("Screenshot saved to /home/jules/verification/appointment_page_schema.png")

        browser.close()

if __name__ == "__main__":
    verify_appointment_page()
