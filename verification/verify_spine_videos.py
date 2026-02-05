from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000/spine-surgery")

    # Wait for the video section to be visible
    # The component title is "Watch How We Plan & Deliver Neurosurgical Care"
    video_section_title = page.get_by_text("Watch How We Plan & Deliver Neurosurgical Care")
    expect(video_section_title).to_be_visible()

    # Scroll to it
    video_section_title.scroll_into_view_if_needed()

    # Take a screenshot of the surrounding area
    # Locate the section container if possible, or just the viewport
    # I'll try to find the section by text

    # Locate the parent section. The title is inside a div inside a section.
    # I'll just screenshot the page around this element.

    page.screenshot(path="verification/spine_videos.png")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
