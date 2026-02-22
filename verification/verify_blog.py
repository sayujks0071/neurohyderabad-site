from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to blog post...")
            response = page.goto("http://localhost:3000/blog/neck-pain-dizziness-cervicogenic-vertigo-hyderabad", timeout=60000)
            print(f"Response status: {response.status}")

            # Wait for content to load
            page.wait_for_selector("h1", timeout=30000)

            # Take screenshot
            page.screenshot(path="verification/blog_post.png", full_page=True)
            print("Screenshot saved to verification/blog_post.png")

        except Exception as e:
            print(f"Error: {e}")
            # Try to screenshot error
            try:
                page.screenshot(path="verification/error.png")
            except:
                pass
        finally:
            browser.close()

if __name__ == "__main__":
    run()
