from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1400, "height": 1000})
        page = context.new_page()

        try:
            print("Navigating to /neurosurgeon-banjara-hills...")
            page.goto("http://localhost:3000/neurosurgeon-banjara-hills")

            # Wait for any text to confirm load
            page.wait_for_selector("h1", timeout=10000)
            print("Page loaded.")

            # Look for the map container by text
            map_text = page.locator("text='View Location on Map'")
            map_text.wait_for(timeout=10000)
            print("Found map text.")

            # Get the container
            # The structure is div > div > [icon, h3, p, button]
            # So map_text is h3. parent is the inner div. parent of that is the main container.
            overlay_div = map_text.locator("xpath=..")

            # Print inner HTML of the overlay div to see if the button exists
            html = overlay_div.inner_html()
            print(f"Overlay HTML: {html}")

            # Try to find button inside
            button = overlay_div.locator("button")
            if button.count() > 0:
                print("Button found in DOM.")
                print(f"Button text: {button.inner_text()}")
                print(f"Button visible: {button.is_visible()}")

                # Scroll to it
                button.scroll_into_view_if_needed()

                # Take screenshot
                main_container = overlay_div.locator("xpath=..")
                main_container.screenshot(path="verification/map_embed_debug.png")
                print("Saved debug screenshot.")
            else:
                print("Button NOT found in DOM.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_debug.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
