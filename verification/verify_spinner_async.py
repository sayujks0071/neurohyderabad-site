import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        print("Navigating to contact page...")
        page.goto("http://localhost:3000/contact")

        # Check if page loaded
        expect(page.get_by_role("heading", name="Contact Dr Sayuj Krishnan")).to_be_visible(timeout=60000)

        print("Filling the form...")
        page.fill('input[name="fullName"]', "Test User")
        page.fill('input[name="phone"]', "9876543210")
        page.fill('input[name="email"]', "test@example.com")
        page.fill('input[name="city"]', "Hyderabad")
        page.fill('textarea[name="concern"]', "This is a test submission to verify spinner.")

        # Find the submit button
        submit_button = page.get_by_role("button", name="Request Call Back")

        # Intercept the request to delay it so we can see the spinner
        # We won't block the route, we just won't fulfill it immediately?
        # Or simpler: verify "Sending..." appears immediately after click.

        # We can use page.wait_for_request to hold execution if needed, but we want to catch the UI state *during* the request.
        # If the API is fast, it might flash.
        # So I will route it to a non-existent URL or just never fulfill it for the first screenshot?

        # Proper way:
        # page.route("**/api/lead", lambda route: None) # Hang the request?
        # But verify_spinner.py handles logic.

        # Let's try just clicking and checking rapidly.

        print("Clicking submit...")
        # To simulate a slow network, we can route and delay fulfillment using page.wait_for_timeout INSIDE the test, not the route handler.
        # But route handler logic is separate.

        # Alternative: Route to a hang.

        req_got = False
        def handle(route):
            nonlocal req_got
            req_got = True
            # Do nothing -> Hangs request? No, it might timeout the browser request?
            # We can fulfill after a delay. But we can't delay in the handler.
            # We can store the route and fulfill later?
            # Python threading? Too complex.

            # Simple approach: Verify "Sending..." appears. Even if it fails later.
            route.continue_()

        # Actually, let's just use network throttling if possible?
        # Or just assert "Sending..." is visible.

        # Let's try the blocking sleep in route handler but acknowledging it freezes the thread?
        # "route handlers defined in Python must not use blocking time.sleep() as it freezes the main test thread"
        # So the page interaction freezes too?

        # Correct approach from memory: "store the route object and fulfill it asynchronously or use page.wait_for_timeout() in the test body."

        # I'll just click and expect "Sending..." immediately. The API call will take at least some ms.

        submit_button.click()

        # Wait for "Sending..."
        sending_button = page.get_by_role("button", name="Sending...")
        expect(sending_button).to_be_visible()
        expect(sending_button).to_have_attribute("aria-busy", "true")

        print("Taking screenshot of loading state...")
        page.screenshot(path="verification/loading_state.png")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
        raise e
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
