from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_spine_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to page...")
            page.goto("http://localhost:3000/services/spine-surgery-hyderabad", timeout=60000)

            # Wait for content to load
            page.wait_for_load_state("networkidle")

            print("Checking H1...")
            expect(page.locator("h1")).to_contain_text("Best Spine Surgeon")

            print("Taking screenshot...")
            page.screenshot(path="verification/spine_page.png", full_page=True)
            print("Screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_spine_page()
