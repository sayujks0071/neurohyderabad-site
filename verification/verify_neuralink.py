from playwright.sync_api import Page, expect, sync_playwright

def test_chat_assistant_button(page: Page):
    """
    This test verifies that the 'Web AI Assistant' button is visible on the appointments page
    and that the NeuraLinkBookingApp loads correctly.
    """

    # 1. Arrange: Go to the appointments page.
    print("Navigating to appointments page...")
    page.goto("http://localhost:3000/appointments")

    # 2. Assert: Check if the 'Voice AI Assistant' button is visible (part of NeuraLinkBookingApp)
    # This confirms the main component rendered.
    voice_ai_button = page.get_by_role("button", name="Voice AI Assistant")
    expect(voice_ai_button).to_be_visible()
    print("Voice AI Assistant button is visible.")

    # 3. Assert: Check if the 'Web AI Assistant' floating button is visible.
    # This button is part of the ChatBot component (or its placeholder).
    # Since we lazy loaded it, it might take a moment, but expect() handles waiting.
    web_ai_button = page.get_by_role("button", name="Web AI Assistant")
    expect(web_ai_button).to_be_visible()
    print("Web AI Assistant button is visible.")

    # 4. Act: Click the 'Web AI Assistant' button to open the chat.
    # This will trigger the dynamic import of the real ChatBot component if it wasn't fully loaded yet.
    web_ai_button.click()

    # 5. Assert: Check if the chat window opens.
    # The chat window has a title "Real-time Neuro AI"
    chat_window_title = page.get_by_text("Real-time Neuro AI")
    expect(chat_window_title).to_be_visible()
    print("Chat window opened successfully.")

    # 6. Screenshot: Capture the state with the chat window open.
    page.screenshot(path="/home/jules/verification/neuralink-chat.png")
    print("Screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        # Launch browser.
        # Note: In the sandbox, we might need to rely on the existing server if it was running,
        # but since I just built it, I need to start it.
        # However, the instructions say "Start the Application" first.
        # I will assume the user (me) will start the server before running this script.
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_chat_assistant_button(page)
        except Exception as e:
            print(f"Test failed: {e}")
            # Take a failure screenshot
            try:
                page.screenshot(path="/home/jules/verification/failure.png")
            except:
                pass
            raise
        finally:
            browser.close()
