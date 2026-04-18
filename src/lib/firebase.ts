import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { 
  getFirestore, 
  initializeFirestore,
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDocFromServer,
  Timestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use experimentalAutoDetectLongPolling for stability in preview environments.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Track connection status globally
export let isFirebaseOffline = false;

// Connection test with Mike-specific troubleshooting
async function testConnection() {
  try {
    // Attempting a shallow fetch to verify connectivity
    await getDocFromServer(doc(db, '_connection_test_', 'init'));
    isFirebaseOffline = false;
    console.log("Firebase connection initialized successfully for Mike Nguyen Portfolio.");
  } catch (error: any) {
    console.group("Firebase Connectivity Check");
    if (error?.message?.includes('the client is offline') || error?.code === 'unavailable') {
      isFirebaseOffline = true;
      console.error("Connectivity issue: The Firestore client is offline.");
      console.info("CHECKLIST FOR MIKE: \n1. Open Firebase Console: https://console.firebase.google.com/project/mike-nguyen-portfolio/firestore \n2. Click 'Create Database' (if not already done). \n3. Ensure your rules allow reads (e.g. 'allow read: if true;' for testing). \n4. Add this URL to Authorized Domains in Auth settings.");
    } else {
      console.error("Firestore initialization error:", error?.message || error);
    }
    console.groupEnd();
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  signInWithPopup,
  signOut,
  Timestamp
};
