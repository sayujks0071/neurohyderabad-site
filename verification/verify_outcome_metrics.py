
from playwright.sync_api import sync_playwright

def verify_outcome_metrics(page):
    # Navigate to a page that uses OutcomeMetricsSection
    page.goto("http://localhost:3000/services/minimally-invasive-spine-surgery")

    # Wait for the heading to appear
    page.wait_for_selector("text=Outcome metrics for Minimally Invasive Spine Surgery")

    # Scroll to the element
    element = page.locator("text=Outcome metrics for Minimally Invasive Spine Surgery")
    element.scroll_into_view_if_needed()

    # Take a screenshot of the section
    # We select the parent section. The heading is inside the section.
    # The section has aria-labelledby="outcome-metrics-title"
    section = page.locator('section[aria-labelledby="outcome-metrics-title"]')
    section.screenshot(path="verification/outcome_metrics.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_outcome_metrics(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
