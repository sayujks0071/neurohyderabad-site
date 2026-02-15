from playwright.sync_api import Page, expect, sync_playwright
import time

def test_malakpet_cost_section(page: Page):
    # 1. Arrange: Go to the Malakpet Neurosurgeon page.
    # Assuming the dev server is running on localhost:3000
    page.goto("http://localhost:3000/neurosurgeon-malakpet")

    # 2. Act: Scroll to find the Cost Transparency Section.
    # Look for the heading "Estimated Cost of Treatment" which is in the component.
    cost_heading = page.get_by_role("heading", name="Estimated Cost of Treatment")

    # Scroll into view to ensure it renders if lazy loaded
    cost_heading.scroll_into_view_if_needed()

    # 3. Assert: Check if the section is visible and contains expected text.
    expect(cost_heading).to_be_visible()

    # Check for specific Malakpet costs we added - CORRECTED VALUES
    expect(page.get_by_text("Neurosurgeon Consultation")).to_be_visible()
    expect(page.get_by_text("₹800 - ₹1,000")).to_be_visible()

    # Check for the disclaimer about Yashoda Malakpet (Use first() to avoid strict mode error)
    expect(page.get_by_text("Yashoda Hospitals Malakpet").first).to_be_visible()

    # 4. Screenshot: Capture the section.
    page.screenshot(path="verification/malakpet_cost_verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_malakpet_cost_section(page)
            print("Verification script passed successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error_screenshot.png")
        finally:
            browser.close()
