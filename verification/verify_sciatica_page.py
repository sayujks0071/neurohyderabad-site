from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to sciatica treatment page...")
            page.goto("http://localhost:3000/conditions/sciatica-treatment-hyderabad")

            # Wait for main content
            expect(page.get_by_role("heading", name="Sciatica Treatment in Hyderabad")).to_be_visible()

            # Check for Why Choose section (new content)
            print("Checking for Why Choose section...")
            why_choose = page.get_by_role("heading", name="Why Choose Dr. Sayuj Krishnan?")
            expect(why_choose).to_be_visible()
            why_choose.scroll_into_view_if_needed()

            # Check for Internal Link to Exercises
            print("Checking for internal link to exercises...")
            exercise_link = page.get_by_role("link", name="View Recommended Sciatica Exercises")
            expect(exercise_link).to_be_visible()

            # Take screenshots
            print("Taking screenshots...")
            page.screenshot(path="verification/sciatica_page_full.png", full_page=True)

            # Take specific screenshot of the Why Choose section
            page.locator("section").filter(has_text="Why Choose Dr. Sayuj Krishnan?").screenshot(path="verification/why_choose_section.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
