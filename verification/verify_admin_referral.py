from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_admin_referral_ui(page: Page):
    # 1. Arrange: Go to the Admin Referral page.
    # We use localhost:3000 as default, adding key for middleware bypass
    print("Navigating to /admin/referrals?key=supersecretkey...")
    page.goto("http://localhost:3000/admin/referrals?key=supersecretkey", timeout=60000)

    # 2. Assert: Verify the page title and key elements are present.
    print("Verifying UI elements...")
    expect(page.get_by_role("heading", name="Referral Processor (Admin)")).to_be_visible(timeout=30000)

    # Verify inputs exist
    expect(page.get_by_label("Admin Access Key")).to_be_visible()
    # For file input, we can check by type or generic presence
    # The file input is hidden but the drop zone is visible
    expect(page.get_by_text("Drop PDF here or click to upload")).to_be_visible()

    # Verify button exists and is disabled initially
    submit_btn = page.get_by_role("button", name="Analyze Referral")
    expect(submit_btn).to_be_visible()
    expect(submit_btn).to_be_disabled()

    # 3. Act: Type in the admin key
    page.get_by_label("Admin Access Key").fill("supersecretkey")

    # 4. Screenshot: Capture the UI
    print("Taking screenshot...")
    page.screenshot(path="/home/jules/verification/admin-referral-ui.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait a bit for server to start
            time.sleep(10)
            verify_admin_referral_ui(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
