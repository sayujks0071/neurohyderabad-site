from playwright.sync_api import sync_playwright

def verify_trust_signals():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use 'networkidle' to ensure the page is fully loaded, including client-side hydration
        # But 'networkidle' can be flaky with ongoing polling/analytics, so 'domcontentloaded' or just waiting for selector is safer.
        # We'll stick to waiting for selector.
        page = browser.new_page()

        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000")

            # Wait for the TrustSignals text to appear.
            # We look for "Multilingual Support" which is unique to this component.
            print("Waiting for 'Multilingual Support' text...")
            page.get_by_text("Multilingual Support").wait_for(timeout=10000)

            # Locate the parent container of this text.
            # The structure is: div (glass container) > div (flex container) > div (item) > span (text)
            # We want to capture the whole glass container.

            # We can find the container by looking for the one that contains "Multilingual Support"
            # and verify it has the expected class, or just take a screenshot of it.

            # Let's locate the main wrapper.
            # Since we didn't add an ID, we'll traverse up from the text or use a locator that targets the container properties.
            # Or easier: just screenshot the section that contains it.

            # We can select the parent of the parent of the text "Multilingual Support".
            # The text "Multilingual Support" is in a span, which is in a div (item), which is in a div (flex wrapper), which is in a div (glass container).
            # So we need to go up 3 levels?
            # Let's inspect the code I wrote:
            # <div (glass)>
            #   <div (flex)>
            #     <div (item)>
            #       <span (text)>Multilingual Support</span>

            # Using xpath to find the glass container
            glass_container = page.locator("xpath=//span[text()='Multilingual Support']/../../..")

            # Scroll to it
            glass_container.scroll_into_view_if_needed()

            # Take screenshot of the element
            print("Taking screenshot...")
            glass_container.screenshot(path="verification/trust_signals.png")
            print("Screenshot saved to verification/trust_signals.png")

        except Exception as e:
            print(f"Error: {e}")
            # Take full page screenshot for debug
            page.screenshot(path="verification/debug_full_page.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_trust_signals()
