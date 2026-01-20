from playwright.sync_api import sync_playwright

def verify_spine_cost():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the spine surgery page
            page.goto("http://localhost:3000/spine-surgery")

            # Wait for the Cost section to load
            cost_heading = page.get_by_text("Estimated Cost of Treatment")
            cost_heading.wait_for()

            # Scroll to the cost section
            cost_heading.scroll_into_view_if_needed()

            # Take a screenshot of the page, or specifically the cost section if possible
            # I'll take a full page screenshot to see context, but also element screenshot

            # Locate the section container (it has bg-white rounded-2xl border border-blue-100)
            # It's hard to target by class, so I'll target the table or the heading's parent
            # The structure is <section><div class="p-6 bg-blue-50 ..."><h2>...</h2></div><table>...</table></section>

            # Let's just screenshot the viewport after scrolling
            page.screenshot(path="/home/jules/verification/spine-surgery-cost.png")
            print("Screenshot saved to /home/jules/verification/spine-surgery-cost.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_spine_cost()
