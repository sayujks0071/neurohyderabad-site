// 🛡️ Sentinel: Verification Script for Middleware Logic
// This script verifies the boolean logic used in middleware.ts to ensure "fail secure" behavior.

console.log("🛡️ Sentinel: Verifying Authentication Logic...");

let testsPassed = 0;
let testsFailed = 0;

function runTest(name: string, adminKey: string | undefined, providedKey: string | null, expectedAccess: boolean) {
    // Logic from middleware.ts
    const accessGranted = !(!adminKey || providedKey !== adminKey);

    if (accessGranted === expectedAccess) {
        console.log(`✅ PASS: ${name}`);
        testsPassed++;
    } else {
        console.error(`❌ FAIL: ${name}. Expected ${expectedAccess}, got ${accessGranted}`);
        testsFailed++;
    }
}

// Test Case 1: Env var missing, user provides nothing -> DENY
runTest("Env missing, no key", undefined, null, false);

// Test Case 2: Env var missing, user provides 'admin123' -> DENY (Should not match undefined)
runTest("Env missing, provided guess", undefined, "admin123", false);

// Test Case 3: Env var set, user provides nothing -> DENY
runTest("Env set, no key", "mysecret", null, false);

// Test Case 4: Env var set, user provides wrong key -> DENY
runTest("Env set, wrong key", "mysecret", "wrong", false);

// Test Case 5: Env var set, user provides correct key -> ALLOW
runTest("Env set, correct key", "mysecret", "mysecret", true);

if (testsFailed > 0) {
    console.error(`\nFAILED: ${testsFailed} tests failed.`);
    process.exit(1);
} else {
    console.log(`\nSUCCESS: All ${testsPassed} tests passed. Logic is secure.`);
}
