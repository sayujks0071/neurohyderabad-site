from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_malakpet_page(page: Page):
    # Go to the Malakpet page
    page.goto("http://localhost:3000/neurosurgeon-malakpet")

    # Wait for the USP section
    usp_heading = page.get_by_role("heading", name="Why Daycare Spine Surgery at Malakpet?")
    expect(usp_heading).to_be_visible()

    # Check for "Stitchless" benefit
    expect(page.get_by_text("Stitchless: Tiny 6-8mm incision")).to_be_visible()

    # Check for "Fast Recovery" benefit
    expect(page.get_by_text("Fast Recovery: Walk within 3 hours")).to_be_visible()

    # Check for "Reduced Pain" benefit (Updated check)
    expect(page.get_by_text("Reduced Pain: Minimal tissue damage")).to_be_visible()

    # Check for "Sciatica & Leg Pain" link in the grid
    sciatica_link = page.get_by_role("link", name="Sciatica & Leg Pain")
    expect(sciatica_link).to_be_visible()
    expect(sciatica_link).to_have_attribute("href", "/conditions/sciatica-pain-treatment-hyderabad")

    # Take a screenshot
    page.screenshot(path="verification_malakpet_v2.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_malakpet_page(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
