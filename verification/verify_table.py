
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 2000})
        page = context.new_page()

        try:
            # Navigate to the target page
            page.goto("http://localhost:3000/services/minimally-invasive-spine-surgery")

            # Wait for content to load - use exact=True to avoid ambiguity
            expect(page.get_by_role("heading", name="Minimally Invasive Spine Surgery", exact=True)).to_be_visible()

            # Locate the comparison table - target it more specifically by looking for a header within it
            # We use exact=True to avoid partial matches on the paragraph text
            table_header = page.get_by_text("Endoscopic (Keyhole) Surgery", exact=True)
            table_header.scroll_into_view_if_needed()

            # Verify table headers exist
            expect(page.get_by_text("Feature", exact=True)).to_be_visible()
            expect(page.get_by_text("Traditional Open Surgery", exact=True)).to_be_visible()

            # Take a screenshot of the table section
            page.screenshot(path="verification/comparison_table.png")
            print("Screenshot saved to verification/comparison_table.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
