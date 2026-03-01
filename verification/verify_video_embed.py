from playwright.sync_api import sync_playwright, expect

def test_video_embed():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Assuming app is running on localhost:3000
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000/services/minimally-invasive-spine-surgery")

            # Locate the iframe
            iframe_locator = page.locator("iframe[src*='youtube.com/embed/HPhPB5jY0xk']")

            # Scroll into view
            iframe_locator.scroll_into_view_if_needed()

            # Assert visible
            expect(iframe_locator).to_be_visible()

            # Check title
            heading = page.get_by_text("Watch: Endoscopic Discectomy for L5-S1 Herniation")
            expect(heading).to_be_visible()

            # Take screenshot
            page.screenshot(path="verification/video_embed_verification.png")
            print("Verification successful: Video iframe and new heading found.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/video_embed_failure.png")
        finally:
            browser.close()

if __name__ == "__main__":
    test_video_embed()
