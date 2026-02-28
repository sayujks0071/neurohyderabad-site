
import { analyzeEvent, formatSlackMessage, SREReport } from '../src/lib/vercel-sre';
import { DeploymentEvent } from '../app/api/webhooks/vercel/status/store';

console.log('🧪 Testing Vercel SRE Assistant Logic...\n');

// Mock History
const mockHistory: DeploymentEvent[] = [
    {
        eventId: 'evt_123',
        eventType: 'deployment.error',
        projectId: 'prj_test',
        deploymentId: 'dpl_fail_1',
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        status: 'error'
    }
];

// Test Case 1: Deployment Error (Build Failure)
const errorPayload = {
    deployment: {
        id: 'dpl_error_now',
        name: 'neurohyderabad-site',
        url: 'drsayuj-site-fail.vercel.app',
        buildErrorAt: Date.now()
    },
    project: {
        id: 'prj_test',
        name: 'neurohyderabad-site'
    },
    error: {
        code: 'BUILD_FAILED',
        message: 'Command "npm run build" exited with 1'
    }
};

console.log('--- Case 1: Deployment Error ---');
const errorReport = analyzeEvent('deployment.error', errorPayload, mockHistory);
console.log(formatSlackMessage(errorReport));
console.log('\n');


// Test Case 2: Deployment Succeeded (Recovery)
const successPayload = {
    deployment: {
        id: 'dpl_success_now',
        name: 'neurohyderabad-site',
        url: 'drsayuj.info'
    },
    project: {
        id: 'prj_test',
        name: 'neurohyderabad-site'
    }
};

console.log('--- Case 2: Deployment Recovery ---');
const successReport = analyzeEvent('deployment.succeeded', successPayload, mockHistory);
console.log(formatSlackMessage(successReport));
console.log('\n');


// Test Case 3: Domain Issue
const domainPayload = {
    domain: {
        name: 'drsayuj.info',
    },
    errorReason: 'DNS_CONFIGURATION'
};

console.log('--- Case 3: Domain Renewal Failed ---');
const domainReport = analyzeEvent('domain.renewal.failed', domainPayload, mockHistory);
console.log(formatSlackMessage(domainReport));
console.log('\n');

console.log('✅ Test complete.');
