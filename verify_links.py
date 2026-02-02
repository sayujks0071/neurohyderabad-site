from playwright.sync_api import Page, expect, sync_playwright

def verify_stenosis_links(page: Page):
    # Go to the page
    page.goto("http://localhost:3000/conditions/spinal-stenosis-treatment-hyderabad")

    # Wait for content to load
    page.wait_for_selector("h1")

    # Find the "Treatment Options" section (or just search for the specific text)
    # The links are "Micro-Decompression" and "ULBD (Endoscopic)"

    # Check Micro-Decompression link
    micro_link = page.get_by_role("link", name="Micro-Decompression")
    expect(micro_link).to_be_visible()
    expect(micro_link).to_have_attribute("href", "/services/minimally-invasive-spine-surgery")

    # Check ULBD link
    ulbd_link = page.get_by_role("link", name="ULBD (Endoscopic)")
    expect(ulbd_link).to_be_visible()
    expect(ulbd_link).to_have_attribute("href", "/services/minimally-invasive-spine-surgery")

    # Scroll to the element to take a good screenshot
    ulbd_link.scroll_into_view_if_needed()

    # Take screenshot
    page.screenshot(path="verification_links.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_stenosis_links(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification_failed.png")
        finally:
            browser.close()
