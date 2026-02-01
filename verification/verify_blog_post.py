from playwright.sync_api import Page, expect, sync_playwright

def verify_blog_post(page: Page):
    # Navigate to the new blog post
    page.goto("http://localhost:3000/blog/cervical-myelopathy-symptoms-treatment-hyderabad")

    # Wait for the H1 to be visible and check text
    # The title in the MDX is "Clumsy Hands and Balance Issues: Signs of Cervical Myelopathy"
    # Note: Sometimes H1s are styled with CSS that might change casing, but usually text content is preserved.
    h1 = page.get_by_role("heading", level=1)
    expect(h1).to_be_visible(timeout=30000)
    expect(h1).to_have_text("Clumsy Hands and Balance Issues: Signs of Cervical Myelopathy")

    # Verify some content is present
    expect(page.get_by_text("The \"Silent\" Danger")).to_be_visible()

    # Take a screenshot
    page.screenshot(path="verification/blog_post.png", full_page=True)
    print("Verification successful, screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_blog_post(page)
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
