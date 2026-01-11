from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        page.goto("http://localhost:3000")

        # Wait for hydration
        page.wait_for_load_state("networkidle")

        # Check if the search button exists (placeholder or real)
        search_button = page.get_by_role("button", name="Search site")
        expect(search_button).to_be_visible()

        # Take initial screenshot
        page.screenshot(path="verification/search_initial.png")

        # Click search to trigger lazy load
        search_button.click()

        # Wait for modal to appear
        search_input = page.get_by_placeholder("Search conditions, treatments, or resources")
        expect(search_input).to_be_visible()

        # Type a query
        search_input.fill("spine")

        # Wait for results
        results = page.locator("[data-index]")
        expect(results.first).to_be_visible()

        # Take screenshot of open search
        page.screenshot(path="verification/search_open.png")

        browser.close()

if __name__ == "__main__":
    run()
