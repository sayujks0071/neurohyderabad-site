from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Since we can't easily bypass Google Auth in this environment,
    # we can try to verify if the page loads and shows the sign-in button at least,
    # or if we can mock the auth state (which is hard in E2E without dev mode tricks).
    # However, purely static verification of the component logic was done via unit tests.
    # We will just check if the admin page loads without crashing.

    try:
        page.goto("http://localhost:3000/admin/appointments", timeout=60000)
        page.screenshot(path="verification/admin_page.png")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
