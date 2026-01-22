from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # We will assume we are running against the production build or dev server.
    # Since I cannot easily start a background server and wait for it in this environment robustly within one tool call,
    # I will try to access the file directly or mock the check if I can't hit localhost.
    # BUT, the instructions say "Start the local development server".
    # I will try to hit http://localhost:3000/locations/malakpet

    try:
        page.goto("http://localhost:3000/locations/malakpet")

        # Verify H1
        expect(page.locator("h1")).to_contain_text("Best Neurosurgeon in Malakpet")

        # Verify Services Block
        expect(page.get_by_text("Advanced Neurosurgery Services in Malakpet")).to_be_visible()

        # Verify Trust Proof
        expect(page.get_by_text("Why Patients Trust Dr. Sayuj Krishnan")).to_be_visible()

        # Take Screenshot
        page.screenshot(path="verification/malakpet_verified.png")
        print("Verification successful!")

    except Exception as e:
        print(f"Verification failed: {e}")
        # Capture screenshot anyway if possible
        try:
             page.screenshot(path="verification/malakpet_failed.png")
        except:
             pass
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
