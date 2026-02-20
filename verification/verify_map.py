from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        try:
            print("Navigating to /neurosurgeon-banjara-hills...")
            page.goto("http://localhost:3000/neurosurgeon-banjara-hills")

            # Wait for the map component to be visible.
            # The component has text "View Location on Map"
            print("Waiting for map component...")
            map_locator = page.get_by_text("View Location on Map")
            map_locator.wait_for()

            # Scroll to it
            map_locator.scroll_into_view_if_needed()

            # Take a screenshot of the map component area
            # Finding the container: it's the parent of the text container
            # The text "View Location on Map" is inside a div, which is inside the main container.
            # Let's target the button "Load Map" and then find its container or just screenshot the whole area.

            load_button = page.get_by_role("button", name="Load Map")
            load_button.wait_for()

            # Screenshot the whole page for context
            page.screenshot(path="verification/page_full.png", full_page=True)
            print("Full page screenshot saved.")

            # Screenshot specifically the map area (approximate by element handle if possible, or just crop later)
            # Actually, let's just use the button's bounding box to find the container
            # The container has class "relative w-full rounded-2xl..."
            # We can use a locator for that class if we are sure, or just the parent of the button's parent.

            # Let's try to locate the container by its text content unique to the overlay
            container = page.locator("div.relative.w-full.rounded-2xl").first
            if container.count() > 0:
                container.screenshot(path="verification/map_embed.png")
                print("Map embed screenshot saved.")
            else:
                print("Could not locate specific map container for screenshot.")

            # Simulate hover on the button
            load_button.hover()
            page.wait_for_timeout(500) # Wait for transition
            container.screenshot(path="verification/map_embed_hover.png")
            print("Map embed hover screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
