import { Sandbox } from "@vercel/sandbox";

const sandbox = await Sandbox.create();

await sandbox.runCommand({
  cmd: "node",
  args: ["-e", 'console.log("Hello from Vercel Sandbox!")'],
  stdout: process.stdout,
});

await sandbox.stop();
