from playwright.sync_api import sync_playwright
import time

def verify_home_page():
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to Home
        print("Navigating to Home...")
        page.goto("http://localhost:3000")

        # Wait for content to load
        print("Waiting for network idle...")
        # page.wait_for_load_state("networkidle") # networkidle can be flaky with streaming/analytics

        # Wait for a key element to ensure render
        page.wait_for_selector("h1")

        # Wait a bit more for dynamic content
        time.sleep(5)

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/home_page.png", full_page=True)

        print("Done.")
        browser.close()

if __name__ == "__main__":
    verify_home_page()
