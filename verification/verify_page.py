from playwright.sync_api import sync_playwright

def verify_endoscopic_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        print("Navigating to page...")
        page.goto("http://localhost:3000/services/endoscopic-spine-surgery-hyderabad")

        # Wait for content to load
        page.wait_for_load_state("networkidle")

        # Scroll to view new sections
        print("Scrolling to Cost Section...")
        page.get_by_role("heading", name="Estimated Cost of Treatment").scroll_into_view_if_needed()

        # Take screenshot of Cost Section
        page.screenshot(path="verification/cost_section.png")
        print("Screenshot of Cost Section saved.")

        # Scroll to view Advanced Techniques
        print("Scrolling to Advanced Techniques Section...")
        page.get_by_role("heading", name="Advanced Endoscopic Techniques We Use").scroll_into_view_if_needed()

        # Take screenshot of Techniques Section
        page.screenshot(path="verification/techniques_section.png")
        print("Screenshot of Techniques Section saved.")

        # Scroll to view Recovery Timeline
        print("Scrolling to Recovery Timeline...")
        page.get_by_role("heading", name="Recovery Timeline").scroll_into_view_if_needed()

        # Take screenshot of Recovery Timeline
        page.screenshot(path="verification/recovery_section.png")
        print("Screenshot of Recovery Section saved.")

        browser.close()

if __name__ == "__main__":
    verify_endoscopic_page()
