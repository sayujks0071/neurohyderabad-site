
import { appointmentSchema } from "../packages/appointment-form/schema";
import { z } from "zod";

const validData = {
  patientName: "John Doe",
  email: "john@example.com",
  contactNumber: "9876543210",
  age: "30",
  gender: "male",
  requestedDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
  appointmentTime: "09:00 AM",
  reason: "Headache and nausea for 2 days",
  painScore: 5,
  mriScanAvailable: false
};

const invalidDataPastDate = {
  ...validData,
  requestedDate: new Date("2000-01-01")
};

const invalidMobile = {
    ...validData,
    contactNumber: "1234567890" // Invalid start digit
};

async function runTests() {
  console.log("--- Starting Schema Validation Tests ---");

  console.log("\n1. Testing Valid Data (Tomorrow)...");
  try {
    appointmentSchema.parse(validData);
    console.log("✅ Valid data passed");
  } catch (e: any) {
    console.error("❌ Valid data failed:", JSON.stringify(e.format(), null, 2));
  }

  console.log("\n2. Testing Past Date (2000-01-01)...");
  try {
    appointmentSchema.parse(invalidDataPastDate);
    console.error("❌ Past date passed (Should fail)");
  } catch (e: any) {
    // Check error message
    const msg = e.format().requestedDate?._errors[0];
    console.log(`✅ Past date failed as expected. Message: "${msg}"`);
  }

  console.log("\n3. Testing Invalid Mobile (1234567890)...");
  try {
    appointmentSchema.parse(invalidMobile);
    console.error("❌ Invalid mobile passed (Should fail)");
  } catch (e: any) {
    const msg = e.format().contactNumber?._errors[0];
    console.log(`✅ Invalid mobile failed as expected. Message: "${msg}"`);
  }

  console.log("\n4. Testing Start of Today (00:00:00)...");
  const startOfToday = new Date();
  startOfToday.setHours(0,0,0,0);
  const todayData = {
      ...validData,
      requestedDate: startOfToday
  };
  try {
      appointmentSchema.parse(todayData);
      console.log("ℹ️ 'Start of Today' passed validation.");
  } catch (e: any) {
      console.log("ℹ️ 'Start of Today' failed validation.");
  }

  console.log("\n--- Tests Completed ---");
}

runTests();
