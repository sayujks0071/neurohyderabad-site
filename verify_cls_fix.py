from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for server to be ready (naive wait)
            page.wait_for_timeout(5000)

            page.goto("http://localhost:3000/")

            # Verify LocalReputationPanel is present
            # Look for "Trusted by Patients Across Hyderabad"
            header = page.get_by_role("heading", name="Trusted by Patients Across Hyderabad")
            expect(header).to_be_visible(timeout=30000)

            # Verify Testimonials are present
            testimonial = page.get_by_text("Dr. Sayuj performed my endoscopic spine surgery")
            expect(testimonial).to_be_visible()

            # Take screenshot
            page.screenshot(path="verification_screenshot.png", full_page=True)
            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification_failure.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
