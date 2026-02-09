from playwright.sync_api import sync_playwright
import time

def run():
    print("Starting Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            url = "http://localhost:3000/spine-surgery"
            print(f"Navigating to {url}...")
            # Increased timeout for first load
            page.goto(url, timeout=60000, wait_until="domcontentloaded")

            heading_text = "Am I a Candidate for Endoscopic Spine Surgery?"
            print(f"Waiting for heading: '{heading_text}'")

            # Wait for the heading to be visible
            heading = page.get_by_text(heading_text)
            heading.wait_for(state="visible", timeout=30000)

            print("Found heading. Scrolling into view...")
            heading.scroll_into_view_if_needed()

            # Wait for any lazy loading or layout shifts
            time.sleep(2)

            # Find the section containing the heading. It has 'bg-blue-50' class.
            # We can use xpath to find the ancestor section.
            # Or just take a screenshot of the viewport centered on the heading.

            # Let's try to locate the section wrapper
            section = page.locator("section:has-text('Am I a Candidate for Endoscopic Spine Surgery?')").first

            print("Taking screenshot of the section...")
            section.screenshot(path="verification/candidate_section.png")
            print("Screenshot saved to verification/candidate_section.png")

        except Exception as e:
            print(f"Error during verification: {e}")
            try:
                page.screenshot(path="verification/error_screenshot.png", full_page=True)
                print("Saved error_screenshot.png")
            except Exception as inner_e:
                print(f"Failed to save error screenshot: {inner_e}")
        finally:
            browser.close()
            print("Browser closed.")

if __name__ == "__main__":
    run()
