from playwright.sync_api import sync_playwright

def verify_endoscopic_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to page...")
        try:
            page.goto("http://localhost:3000/services/endoscopic-spine-surgery-hyderabad", timeout=60000)
            page.wait_for_load_state("networkidle")
        except Exception as e:
            print(f"Navigation failed: {e}")
            browser.close()
            return

        print("Taking full page screenshot...")
        page.screenshot(path="verification/full_page.png", full_page=True)

        # Check for specific text
        if page.get_by_text("Estimated Cost of Treatment").is_visible():
            print("Found 'Estimated Cost of Treatment'")
        else:
            print("Could NOT find 'Estimated Cost of Treatment'")

        if page.get_by_text("Advanced Endoscopic Techniques We Use").is_visible():
            print("Found 'Advanced Endoscopic Techniques We Use'")
        else:
            print("Could NOT find 'Advanced Endoscopic Techniques We Use'")

        browser.close()

if __name__ == "__main__":
    verify_endoscopic_page()
