from playwright.sync_api import sync_playwright
import time

def verify_referral_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            # Navigate to /admin/referrals with key query param
            print("Navigating to page...")
            page.goto("http://localhost:3000/admin/referrals?key=secret")

            # Wait for content
            page.wait_for_selector("h1")

            # Take screenshot of initial state
            page.screenshot(path="verification_initial.png")
            print("Initial screenshot taken.")

            # Check if the title is correct
            title = page.locator("h1").inner_text()
            print(f"Page title: {title}")
            assert title == "Referral Analyzer"

            # Create a dummy PDF (minimal valid PDF)
            with open("dummy.pdf", "wb") as f:
                f.write(b"%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000102 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n149\n%%EOF\n")

            page.set_input_files("input[type='file']", "dummy.pdf")

            # Take screenshot after upload
            page.screenshot(path="verification_uploaded.png")
            print("Upload screenshot taken.")

            # Click Analyze
            page.click("button:has-text('Analyze')")

            # Wait for loading or result
            time.sleep(2)

            # Take screenshot after click
            page.screenshot(path="verification_analyzing.png")
            print("Analyzing screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_referral_page()
