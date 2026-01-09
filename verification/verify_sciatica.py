
from playwright.sync_api import sync_playwright

def verify_sciatica_costs():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        try:
            page.goto("http://localhost:3000/conditions/sciatica-treatment-hyderabad", timeout=60000)

            # Wait for content to load
            page.wait_for_selector('h1', state='visible')

            # Scroll to find the Cost Transparency Section
            # It has a heading "Estimated Cost of Treatment"
            cost_section = page.get_by_role("heading", name="Estimated Cost of Treatment")
            cost_section.scroll_into_view_if_needed()

            # Take a screenshot of the cost section
            page.screenshot(path="verification/sciatica-cost-section.png")
            print("Screenshot taken successfully")

        except Exception as e:
            print(f"Error: {e}")
            # Take a screenshot anyway for debugging
            page.screenshot(path="verification/error-state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_sciatica_costs()
