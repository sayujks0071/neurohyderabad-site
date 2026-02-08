import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Retry loop for server start
        for i in range(30):
            try:
                print(f"Attempt {i+1}: Navigating to home page...")
                page.goto("http://localhost:3000")
                break
            except Exception as e:
                print(f"Connection failed: {e}")
                time.sleep(2)
        else:
            print("Failed to connect to localhost:3000")
            return

        try:
            # Dismiss cookie banner if present (guessing selector, or looking for common text)
            # based on memory instructions.
            # "Frontend verification scripts using Playwright must explicitly dismiss the Cookie Consent banner"
            # I'll look for "Accept" or "Cookie" buttons.
            try:
                page.get_by_role("button", name="Accept").click(timeout=2000)
                print("Dismissed cookie banner")
            except:
                pass

            # Wait for TrustSignals to be visible
            print("Waiting for TrustSignals...")
            # Using a text that is unique to TrustSignals component
            trust_signals_text = page.get_by_text("Multilingual Support")
            trust_signals_text.wait_for(timeout=10000)

            # Scroll to it
            trust_signals_text.scroll_into_view_if_needed()

            # Take screenshot of the section
            # The TrustSignals component is wrapped in a Section with padding py-8.
            # We can find the container.
            # Structure: Section > TrustSignals > div.relative...

            # Let's locate the 'Multilingual Support' text and go up to the container.
            # Or just take a screenshot of the viewport where it is visible.

            print("Taking screenshot...")
            page.screenshot(path="verification/trust_signals_page.png")

            # Locate the specific card
            card = page.locator("text=Multilingual Support").locator("xpath=../../..")
            # text is inside div > div > div.relative...
            # The structure in TrustSignals.tsx:
            # div.relative... > div.flex... > div > span...

            # Let's use the text to find the container more robustly or just screenshot the area
            page.locator("text=Multilingual Support").first.screenshot(path="verification/trust_signals_element.png")

            print("Done.")
        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
