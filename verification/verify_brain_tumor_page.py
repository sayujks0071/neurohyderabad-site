from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Wait for server to start
        print("Waiting for server...")
        for i in range(30):
            try:
                page.goto("http://localhost:3000/services/brain-tumor-surgery-hyderabad")
                break
            except:
                time.sleep(1)
        else:
            print("Server failed to start")
            return

        print("Page loaded")

        # Verify title
        if "Brain Tumor Surgery" not in page.title():
            print(f"Unexpected title: {page.title()}")

        # Wait for the new section
        try:
            guides_section = page.locator("text=Comprehensive Condition Guides")
            guides_section.wait_for(timeout=10000)
            guides_section.scroll_into_view_if_needed()
            page.screenshot(path="verification/brain_tumor_guides.png")
            print("Screenshot of guides taken")
        except Exception as e:
            print(f"Could not find guides section: {e}")

        # Verify FAQ
        try:
            faq_section = page.locator("text=Frequently Asked Questions")
            faq_section.scroll_into_view_if_needed()
            # Expand the second opinion FAQ if it's an accordion (it's not, it's just text based on the code I saw)
            # wait, let me check the code. It maps faqs to div > p.
            # {faqs.map((faq) => ( <div key={faq.question}> ... </div> ))}

            second_opinion = page.locator("text=Can I get a second opinion")
            second_opinion.wait_for(timeout=5000)
            second_opinion.scroll_into_view_if_needed()
            page.screenshot(path="verification/brain_tumor_faq.png")
            print("Screenshot of FAQ taken")
        except Exception as e:
            print(f"Could not find FAQ: {e}")

        browser.close()

if __name__ == "__main__":
    run()
