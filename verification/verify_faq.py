from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_faq(page: Page):
    print("Navigating to page...")
    page.goto("http://localhost:3000/services/endoscopic-spine-surgery-hyderabad")

    print("Waiting for FAQ section...")
    # The FAQ section header
    faq_heading = page.get_by_role("heading", name="Frequently Asked Questions")
    expect(faq_heading).to_be_visible(timeout=60000)

    print("Scrolling to FAQ...")
    faq_heading.scroll_into_view_if_needed()

    # Check for the new FAQ question
    print("Checking for new FAQ...")
    new_faq = page.get_by_text("Is endoscopic spine surgery covered by health insurance?")
    expect(new_faq).to_be_visible()

    # Check for the answer
    answer_text = "Yes. Endoscopic spine surgery is a recognized medical procedure"
    new_answer = page.get_by_text(answer_text)
    expect(new_answer).to_be_visible()

    print("Taking screenshot...")
    # Take a screenshot of the FAQ area specifically if possible, or viewport
    page.screenshot(path="verification/faq_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_faq(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
