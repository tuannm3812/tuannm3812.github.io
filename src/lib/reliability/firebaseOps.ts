import {
  CollectionReference,
  doc,
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot,
  setDoc,
  WithFieldValue,
} from 'firebase/firestore';
import { mapErrorToResult } from './types';
import { raceWrite, WriteOutcome } from './pendingWrite';

const PENDING_AFTER_MS = 6000;

/**
 * Creates a document under a client-generated ID. Resolves `sent` once Firestore
 * acknowledges it, `failed` if it is rejected, or `queued` if it is still pending
 * (offline) after a few seconds — immediately when the browser reports offline.
 * A queued write is the original write; await `settled`, never retry it.
 */
export async function safeCreateDocument<T>(
  target: CollectionReference<T>,
  data: WithFieldValue<T>,
  path: string,
): Promise<WriteOutcome> {
  let ref;
  let write: Promise<void>;
  try {
    ref = doc(target);
    write = setDoc(ref, data);
  } catch (error) {
    return { status: 'failed', id: '', error: mapErrorToResult('create', error, path).error };
  }
  const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
  return raceWrite(write, ref.id, path, offline ? 0 : PENDING_AFTER_MS);
}

export function safeSubscribeSnapshot<T>(
  q: Query<DocumentData>,
  path: string,
  onItems: (items: T[]) => void,
  onError: (errorMessage: string) => void,
): () => void {
  return onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const items = snapshot.docs.map((docRef) => {
        const source = docRef.data() as Record<string, unknown>;
        return {
          id: docRef.id,
          ...(source as T),
        };
      }) as T[];
      onItems(items);
    },
    (error) => {
      const result = mapErrorToResult('list', error, path);
      onError(result.error.message);
    },
  );
}
