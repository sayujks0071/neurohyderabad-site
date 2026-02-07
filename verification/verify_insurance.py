from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Go to the page
    print("Navigating to page...")
    page.goto("http://localhost:3000/services/endoscopic-spine-surgery-hyderabad")

    # Wait for the Insurance section to be visible
    print("Waiting for Insurance section...")
    insurance_header = page.get_by_text("Insurance & Cashless Treatment")
    insurance_header.scroll_into_view_if_needed()

    # Take screenshot of the viewport
    print("Taking screenshot...")
    page.screenshot(path="verification/insurance_block.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
