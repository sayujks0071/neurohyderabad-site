from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the page
            page.goto("http://localhost:3000/neurosurgeon-malakpet")

            # Verify H1
            h1 = page.locator("h1")
            expect(h1).to_contain_text("Brain-Spine Specialist")

            # Verify Conditions Section
            conditions_heading = page.get_by_role("heading", name="Conditions We Treat at Malakpet")
            expect(conditions_heading).to_be_visible()

            # Verify a condition item
            # Use specific locator to avoid strict mode issues if multiple exist
            sciatica_item = page.locator("div", has_text="Sciatica & Leg Pain").first
            expect(sciatica_item).to_be_visible()

            # Verify Credentials
            # Target the list item inside the Credentials section
            credentials_section = page.locator("div", has_text="Credentials & Qualifications")
            credential_item = credentials_section.get_by_text("MBBS, DNB Neurosurgery").first
            expect(credential_item).to_be_visible()

            # Take screenshot
            page.screenshot(path="verification_malakpet.png", full_page=True)
            print("Verification successful! Screenshot saved to verification_malakpet.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification_failure.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
