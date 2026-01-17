import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

interface FirebaseAdminConfig {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

function getFirebaseCredentials(): FirebaseAdminConfig | null {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // Handle private key with newlines, which can be tricky in env vars
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
        console.warn(
            'Missing Firebase Admin credentials. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
        );
        return null;
    }

    return { projectId, clientEmail, privateKey };
}

let app: App;

const credentials = getFirebaseCredentials();

if (credentials) {
    if (getApps().length === 0) {
        app = initializeApp({
            credential: cert(credentials),
            projectId: credentials.projectId,
        });
    } else {
        app = getApps()[0];
    }
}

// Export singleton instances
const firestore = credentials ? getFirestore(app!) : null;
try {
    if (firestore) {
        firestore.settings({ ignoreUndefinedProperties: true });
    }
} catch (e) {
    // Ignore if settings already applied
}

export const adminDb = firestore;
export const isFirebaseAdminInitialized = !!credentials;

