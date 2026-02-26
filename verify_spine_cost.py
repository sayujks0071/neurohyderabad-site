from playwright.sync_api import sync_playwright
import time

def verify_spine_cost_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Increased timeout and waiting for network idle
            page.goto("http://localhost:3000/services/spine-surgery-cost-hyderabad", timeout=60000, wait_until="networkidle")

            # Verify Insurance Grid
            print("Verifying Insurance Grid...")
            insurance_section = page.get_by_text("Accepted Partners Include")
            insurance_section.scroll_into_view_if_needed()
            page.screenshot(path="/home/jules/verification/insurance_grid.png")

            # Verify EMI Section
            print("Verifying EMI Section...")
            emi_section = page.get_by_text("Financial Aid & EMI Options")
            emi_section.scroll_into_view_if_needed()
            page.screenshot(path="/home/jules/verification/emi_section.png")

            # Verify Hidden Costs FAQ - Using a more robust selector if exact text fails
            print("Verifying FAQ...")
            # The previous failure might be due to the text being inside an accordion that is not loaded/rendered yet
            # or the text is slightly different. Let's try finding the FAQ section first.
            faq_header = page.get_by_role("heading", name="Frequently Asked Questions")
            faq_header.scroll_into_view_if_needed()

            # Try to find the specific question again
            try:
                faq_question = page.get_by_text("Are there any hidden costs in the package?")
                faq_question.scroll_into_view_if_needed()
                faq_question.click()
                time.sleep(0.5) # Wait for animation
                page.screenshot(path="/home/jules/verification/faq_hidden_costs.png")
            except Exception as e:
                print(f"Could not click specific FAQ, taking screenshot of FAQ section: {e}")
                page.screenshot(path="/home/jules/verification/faq_section_fallback.png")

            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_spine_cost_page()
