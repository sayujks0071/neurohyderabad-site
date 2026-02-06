from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/conditions/brain-tumor-surgery-hyderabad")

        # Locate the section containing LocalNAP. It's inside a section with LocalNAP
        # LocalNAP has an aria-label "Clinic contact details"
        nap_section = page.get_by_label("Clinic contact details")

        expect(nap_section).to_be_visible()

        # Scroll to it
        nap_section.scroll_into_view_if_needed()

        # Wait a bit for animations
        page.wait_for_timeout(1000)

        # Screenshot
        nap_section.screenshot(path="verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
