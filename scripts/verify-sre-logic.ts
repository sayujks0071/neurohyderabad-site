
import { analyzeEvent } from '../app/api/webhooks/vercel/sre-logic';

console.log("Verifying SRE Logic...\n");

// 1. Deployment Error
const deploymentErrorPayload = {
    id: "ev_123",
    type: "deployment.error",
    payload: {
        deployment: {
            id: "dpl_abc",
            url: "https://neurohyderabad-site-git-main.vercel.app",
            meta: {
                githubCommitSha: "a1b2c3d4"
            }
        },
        error: {
            code: "BUILD_FAILED",
            message: "Command failed with exit code 1"
        },
        project: {
            id: "prj_xyz",
            name: "neurohyderabad-site"
        }
    }
};

console.log("--- CASE 1: Deployment Error ---");
console.log(JSON.stringify(analyzeEvent("deployment.error", deploymentErrorPayload.payload), null, 2));

// 2. Checks Failed
const checksFailedPayload = {
    id: "ev_456",
    type: "deployment.checks.failed",
    payload: {
        deployment: {
            id: "dpl_def",
        },
        checks: [
            { name: "Lint Check", status: "completed", conclusion: "failure" },
            { name: "Unit Tests", status: "completed", conclusion: "failure" },
            { name: "E2E Tests", status: "completed", conclusion: "success" }
        ],
        project: { name: "neurohyderabad-site" }
    }
};

console.log("\n--- CASE 2: Checks Failed ---");
console.log(JSON.stringify(analyzeEvent("deployment.checks.failed", checksFailedPayload.payload), null, 2));

// 3. Domain Renewal Failed
const domainFailedPayload = {
    id: "ev_789",
    type: "domain.renewal.failed",
    payload: {
        domain: { name: "drsayuj.info" },
        errorReason: "payment_failed",
        failedAt: 1625243200000
    }
};

console.log("\n--- CASE 3: Domain Renewal Failed ---");
console.log(JSON.stringify(analyzeEvent("domain.renewal.failed", domainFailedPayload.payload), null, 2));

// 4. Attack Detected
const attackPayload = {
    id: "ev_000",
    type: "firewall-attack-blocked",
    payload: {
        projectId: "prj_xyz",
        attack: {
            type: "ddos",
            ip: "192.168.1.1"
        }
    }
};

console.log("\n--- CASE 4: Attack Detected ---");
console.log(JSON.stringify(analyzeEvent("firewall-attack-blocked", attackPayload.payload), null, 2));
