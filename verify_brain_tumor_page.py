from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000/services/brain-tumor-surgery-hyderabad")

    # Wait for the heading to appear
    page.wait_for_selector("h2:has-text('Advanced Surgical Procedures')")

    # Scroll to the section
    element = page.locator("h2:has-text('Advanced Surgical Procedures')")
    element.scroll_into_view_if_needed()

    # Take a screenshot of the section and surrounding area
    # I'll take a full page screenshot to be safe, or just the section
    page.screenshot(path="verification_brain_tumor.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
