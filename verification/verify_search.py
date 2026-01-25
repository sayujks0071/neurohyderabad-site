import time
from playwright.sync_api import sync_playwright, expect

def test_search_modal(page):
    # Go to home page
    page.goto("http://localhost:3000")

    # Wait for page to load
    page.wait_for_load_state("networkidle")

    # Click search button (Cmd+K button)
    # It has text "Search" and "⌘K"
    search_button = page.get_by_role("button", name="Search ⌘K")
    if not search_button.is_visible():
        # Maybe mobile view or just "Search"
        search_button = page.get_by_role("button", name="Search")

    search_button.click()

    # Wait for modal to appear
    # The modal has an input with placeholder "Search conditions..."
    search_input = page.get_by_placeholder("Search conditions, treatments, or resources...")
    expect(search_input).to_be_visible()

    # Take screenshot of empty state (should show "Powered by AI")
    page.screenshot(path="verification/search_empty.png")

    # Type "headache"
    search_input.fill("headache")

    # Wait for results (debounced + network)
    # Results should appear. They are buttons inside div[role="dialog"]
    # We expect some result with title "Headache" or related
    # Or at least the loading spinner should have appeared and gone

    # Wait a bit for debounce (300ms) + fetch
    time.sleep(2)

    page.screenshot(path="verification/search_results.png")

    # Check if we have results
    # The results are buttons with class "flex w-full flex-col..."
    # We can check for specific text if we know the content
    # Since we are using real backend, "headache" might match "Brain Tumor" or "Migraine"

    # Verify at least one result or "No results found"
    # But for "headache" we expect results if AI works

    # Let's just screenshot for visual verification

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            test_search_modal(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
