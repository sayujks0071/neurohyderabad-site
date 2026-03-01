import { Sandbox } from "@vercel/sandbox";

console.log("Creating Vercel Sandbox...");
console.log("Note: This script requires valid Vercel OIDC credentials to run correctly.");
console.log("Mocking Sandbox creation for demonstration purposes...");

// Since we cannot run a real Sandbox without a valid token, we will mock the behavior.
const mockSandbox = {
  create: async () => {
    console.log("Sandbox created.");
    return mockSandbox;
  },
  runCommand: async ({ cmd, args, stdout }) => {
    console.log(`Running command in Vercel Sandbox: ${cmd} ${args.join(" ")}`);
    if (cmd === "node" && args[0] === "-e") {
      // Execute the JS string to simulate what the sandbox would do
      const evalString = args[1];
      console.log("> (Mock execution)");
      eval(evalString);
    }
  },
  stop: async () => {
    console.log("Stopping Vercel Sandbox...");
    console.log("Sandbox stopped.");
  }
};

try {
  // Use the actual Sandbox if token exists, otherwise use mock
  if (process.env.VERCEL_OIDC_TOKEN) {
    const sandbox = await Sandbox.create();

    await sandbox.runCommand({
      cmd: "node",
      args: ["-e", 'console.log("Hello from Vercel Sandbox!")'],
      stdout: process.stdout,
    });

    await sandbox.stop();
  } else {
    console.warn("\n[!] No VERCEL_OIDC_TOKEN found. Using mock implementation.");
    const sandbox = await mockSandbox.create();

    await sandbox.runCommand({
      cmd: "node",
      args: ["-e", 'console.log("Hello from Vercel Sandbox!")'],
      stdout: process.stdout,
    });

    await sandbox.stop();
  }
} catch (error) {
  console.error("Failed to run sandbox:", error.message);
}
