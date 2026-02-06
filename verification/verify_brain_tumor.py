from playwright.sync_api import Page, expect, sync_playwright

def test_brain_tumor_page(page: Page):
    # 1. Navigate to the page
    page.goto("http://localhost:3000/services/brain-tumor-surgery-hyderabad")

    # 2. Verify Page Title (part of original page)
    expect(page.get_by_role("heading", name="Advanced Brain Tumor Surgery in Hyderabad")).to_be_visible()

    # 3. Verify New Section: Your Treatment Pathway
    # Use get_by_role heading to be specific
    expect(page.get_by_role("heading", name="Your Treatment Pathway")).to_be_visible()

    # Verify one of the steps exists
    expect(page.get_by_text("Tumor Board Review")).to_be_visible()

    # 4. Verify New Section: Advanced Surgical Techniques
    expect(page.get_by_role("heading", name="Advanced Surgical Techniques")).to_be_visible()
    expect(page.get_by_text("Neuronavigation Microsurgery")).to_be_visible()

    # 5. Verify New Section: Comprehensive Patient Support
    expect(page.get_by_role("heading", name="Comprehensive Patient Support")).to_be_visible()
    expect(page.get_by_text("Financial counselling for insurance and corporate approvals")).to_be_visible()

    # 6. Screenshot
    page.screenshot(path="verification/brain_tumor_page.png", full_page=True)
    print("Verification successful!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_brain_tumor_page(page)
        finally:
            browser.close()
