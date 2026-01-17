import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";

type FirebaseClientConfig = {
  apiKey: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
  databaseURL?: string;
};

const firebaseConfig: FirebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

function getFirebaseApp(): FirebaseApp | null {
  if (app) return app;

  if (!firebaseConfig.apiKey) {
    console.warn("Firebase client config missing NEXT_PUBLIC_FIREBASE_API_KEY.");
    return null;
  }

  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return app;
}

export function getRealtimeDatabase(): Database | null {
  if (database) return database;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;

  database = getDatabase(firebaseApp);
  return database;
}
