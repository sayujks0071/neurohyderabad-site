from playwright.sync_api import sync_playwright

def verify_ai_chat():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to /ai-chat...")
            page.goto("http://localhost:3000/ai-chat", wait_until="networkidle")

            # Wait for chat container to be visible
            page.wait_for_selector(".max-w-4xl.mx-auto", timeout=10000)

            print("Taking screenshot...")
            page.screenshot(path="/tmp/ai-chat-verification.png", full_page=True)
            print("Screenshot saved to /tmp/ai-chat-verification.png")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="/tmp/ai-chat-error.png")
            print("Error screenshot saved to /tmp/ai-chat-error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_ai_chat()