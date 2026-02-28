
import asyncio
from playwright.async_api import async_playwright, expect

async def verify_appointment_form():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the appointments page (assuming it's at /appointments or root, checking previous context)
        # Based on file list, there is a /appointments route
        try:
            print("Navigating to appointment page...")
            await page.goto("http://localhost:3000/appointments", timeout=60000)

            # Fill the form
            print("Filling the form...")
            await page.get_by_label("Patient Full Name").fill("Test Patient")
            await page.get_by_label("Email Address").fill("test@example.com")
            await page.get_by_label("Phone Number").fill("9876543210")
            await page.get_by_label("Age").fill("30")
            await page.get_by_label("Gender").select_option("male")

            # Select date (might be tricky with custom calendar, but let's try direct input if possible or clicking)
            # The code showed a custom Calendar component.
            # Let's try to set the hidden input if standard interaction fails, or just click a date.
            # For now, let's try to skip date if it's required (it is).
            # The Calendar component in read_file output shows it renders an input?
            # Actually, let's look for "Preferred Date".
            # await page.get_by_label("Preferred Date").fill("2024-12-31") # Try simple fill first

            # Handle the time selection (buttons)
            print("Selecting time...")
            await page.get_by_role("button", name="09:00 AM").click()

            await page.get_by_label("Reason for Visit").fill("Test appointment for UI verification")

            # Submit
            print("Submitting...")
            submit_button = page.get_by_role("button", name="Submit Request")
            await submit_button.click()

            # Check for "Sending..." state (might be too fast to catch, but we can try)
            # await expect(submit_button).to_have_text("Sending...")

            # Wait for success message
            print("Waiting for success message...")
            await expect(page.get_by_text("Appointment request received")).to_be_visible(timeout=10000)

            # Verify the exact text
            success_text = await page.get_by_text("Appointment request received").text_content()
            print(f"Success text found: {success_text}")

            # Take screenshot
            await page.screenshot(path="verification_success.png")
            print("Screenshot saved to verification_success.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="verification_error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_appointment_form())
