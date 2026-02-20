from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to see more
        context = browser.new_context(viewport={"width": 1400, "height": 1000})
        page = context.new_page()

        try:
            print("Navigating to /neurosurgeon-banjara-hills...")
            page.goto("http://localhost:3000/neurosurgeon-banjara-hills")

            # Handle Privacy Popup
            try:
                print("Checking for privacy popup...")
                # Try to click "Decline" or "Accept All"
                # Locate by text "We value your privacy" or buttons
                decline_btn = page.get_by_role("button", name="Decline")
                if decline_btn.is_visible(timeout=5000):
                    decline_btn.click()
                    print("Dismissed privacy popup.")
                else:
                    accept_btn = page.get_by_role("button", name="Accept All")
                    if accept_btn.is_visible(timeout=1000):
                        accept_btn.click()
                        print("Dismissed privacy popup (Accept All).")
            except Exception as e:
                print(f"Privacy popup handling skipped: {e}")

            # Wait for map button
            print("Waiting for 'Load Map' button...")
            load_button = page.get_by_role("button", name="Load Map")
            load_button.wait_for(timeout=10000)

            # Scroll to it
            load_button.scroll_into_view_if_needed()

            # Wait a bit for smooth scroll/transitions
            page.wait_for_timeout(1000)

            # Locate container for screenshot
            # The button is inside the container.
            # We can use xpath to find the parent container or just rely on the class.
            # Or just screenshot the area around the button.

            # Let's find the container by the unique text "View Location on Map" and getting its parent.
            # The structure is: div > [icon, h3, p, button]
            # So the container is the parent of the h3 "View Location on Map".

            title_el = page.get_by_text("View Location on Map")
            container = title_el.locator("xpath=..") # This gets the overlay div
            # Wait, the overlay div is inside the main container div.
            # The main container has the border and shadow.
            # So we need the parent of the overlay.
            main_container = container.locator("xpath=..")

            print("Taking screenshot of map component...")
            main_container.screenshot(path="verification/map_embed_v2.png")

            # Hover state
            load_button.hover()
            page.wait_for_timeout(500)
            main_container.screenshot(path="verification/map_embed_hover_v2.png")
            print("Hover screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_v2.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
