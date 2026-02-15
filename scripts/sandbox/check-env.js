console.log("Hello from the sandbox!");

const sensitiveVars = ["DATABASE_URL", "VERCEL_TOKEN", "AWS_ACCESS_KEY_ID"];
let exposed = false;

sensitiveVars.forEach((key) => {
  if (process.env[key]) {
    console.error(`WARNING: ${key} is exposed!`);
    exposed = true;
  } else {
    console.log(`OK: ${key} is NOT exposed.`);
  }
});

if (exposed) {
  process.exit(1);
} else {
  console.log("Environment check passed: No sensitive variables exposed.");
}
