from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_miss_page(page: Page):
    """
    Verifies that the Minimally Invasive Spine Surgery page loads correctly
    and displays the new Cost Transparency and Patient Journey sections.
    """
    # 1. Arrange: Go to the MISS page.
    # Note: We assume the server is running on localhost:3000
    page.goto("http://localhost:3000/services/minimally-invasive-spine-surgery")

    # 2. Assert: Check if the page title is correct (basic check)
    # The title template in layout.tsx appends "| Dr. Sayuj Krishnan S"
    # So we should expect "Endoscopic Spine Surgery Hyderabad | Dr. Sayuj Krishnan | Dr. Sayuj Krishnan S"
    expect(page).to_have_title("Endoscopic Spine Surgery Hyderabad | Dr. Sayuj Krishnan | Dr. Sayuj Krishnan S")

    # 3. Verify Patient Journey Section
    # Check for the section title - using get_by_role instead of get_by_heading which might be newer
    journey_heading = page.get_by_role("heading", name="Your Treatment Journey")
    expect(journey_heading).to_be_visible()

    # Check for a specific step - being more specific using role to avoid ambiguity
    step_heading = page.get_by_role("heading", name="The Procedure")
    expect(step_heading).to_be_visible()

    # 4. Verify Cost Transparency Section
    # Check for the section title
    cost_heading = page.get_by_role("heading", name="Estimated Cost of Treatment")
    expect(cost_heading).to_be_visible()

    # Check for specific cost data - being more specific
    # exact=True ensures we only match "Endoscopic Discectomy" and not "Cervical Endoscopic Discectomy"
    discectomy_row = page.get_by_role("cell", name="Endoscopic Discectomy", exact=True)
    expect(discectomy_row).to_be_visible()

    cost_range = page.get_by_role("cell", name="₹95,000 - ₹1,35,000")
    expect(cost_range).to_be_visible()

    # 5. Screenshot: Capture the page content for visual verification
    # We scroll a bit to capture the relevant sections
    journey_heading.scroll_into_view_if_needed()
    time.sleep(1) # Allow for any transitions
    page.screenshot(path="verification/miss_page_journey.png")

    cost_heading.scroll_into_view_if_needed()
    time.sleep(1)
    page.screenshot(path="verification/miss_page_cost.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_miss_page(page)
            print("Verification script executed successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
