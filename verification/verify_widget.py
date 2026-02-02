from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Define the mock script
    mock_script = """
        window.openai = {
            toolInput: {
                patientName: "Test Patient",
                service: "Spine Surgery",
                preferredDate: "2023-10-27"
            },
            callTool: async (name, data) => {
                console.log("callTool called with:", name, data);
                await new Promise(r => setTimeout(r, 1000));
                return { success: true };
            },
            sendFollowUpMessage: (msg) => {
                console.log("sendFollowUpMessage:", msg);
            },
            openExternal: (url) => {
                console.log("openExternal:", url);
            }
        };
        console.log("window.openai mocked");
    """

    page.add_init_script(mock_script)

    # Get absolute path to the widget file
    cwd = os.getcwd()
    file_path = f"file://{cwd}/public/widgets/appointment-booking.html"

    print(f"Navigating to {file_path}")
    page.goto(file_path)
    page.reload()

    # Verify initial state (pre-filled from toolInput)
    expect(page.locator("input[name='patientName']")).to_have_value("Test Patient", timeout=5000)

    # Fill remaining fields
    page.fill("input[name='phone']", "1234567890")
    page.select_option("select[name='appointmentTime']", "09:00 AM")
    page.fill("textarea[name='reason']", "Test reason")

    # Click submit
    print("Submitting form...")
    page.click("button[type='submit']")

    # Verify loading state
    expect(page.get_by_text("Sending...")).to_be_visible()

    # Wait for success
    print("Waiting for success message...")
    # Use heading to be specific
    expect(page.get_by_role("heading", name="Request Received")).to_be_visible(timeout=5000)

    # Verify success message text
    success_text = "Appointment request received. Please bring any MRI/CT scans with you. We will confirm via phone shortly."
    expect(page.get_by_text(success_text)).to_be_visible()

    # Take screenshot of success state
    page.screenshot(path="verification/success_state.png")
    print("Screenshot saved to verification/success_state.png")

    # Click 'Book Another Appointment' to verify reset behavior
    page.click("text=Book Another Appointment")

    # Verify form is visible again and empty (or reset to toolInput defaults)
    expect(page.locator("input[name='patientName']")).to_be_visible()
    expect(page.locator("input[name='patientName']")).to_have_value("Test Patient")
    expect(page.locator("input[name='phone']")).to_have_value("")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
