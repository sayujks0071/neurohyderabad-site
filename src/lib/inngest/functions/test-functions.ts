import { inngest } from "@/src/lib/inngest";

// Hello World test function
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

// Test function for appointment workflow
export const testAppointmentFlow = inngest.createFunction(
  { id: "test-appointment-flow" },
  { event: "test/appointment.flow" },
  async ({ event, step }) => {
    const { patientName, patientEmail } = event.data;

    // Step 1: Log the test
    await step.run("log-test-start", async () => {
      console.log(`Starting test appointment flow for ${patientName}`);
      return { logged: true };
    });

    // Step 2: Simulate processing delay
    await step.sleep("processing-delay", "2s");

    // Step 3: Send test confirmation
    await step.run("send-test-confirmation", async () => {
      console.log(`Sending test confirmation to ${patientEmail}`);
      return { 
        confirmationSent: true,
        message: `Test confirmation sent to ${patientEmail}`
      };
    });

    return {
      success: true,
      patientName,
      patientEmail,
      message: `Test appointment flow completed for ${patientName}`
    };
  }
);

// Test function for error handling
export const testErrorHandling = inngest.createFunction(
  { id: "test-error-handling" },
  { event: "test/error.handling" },
  async ({ event, step }) => {
    const { shouldFail, errorMessage } = event.data;

    await step.run("test-step", async () => {
      if (shouldFail) {
        throw new Error(errorMessage || "Test error occurred");
      }
      return { success: true };
    });

    return { success: true, message: "No error occurred" };
  }
);


















