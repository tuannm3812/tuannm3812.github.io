import { addDoc, CollectionReference, Query, onSnapshot, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { OperationResult, mapErrorToResult } from './types';

export async function safeCreateDocument<T>(
  target: CollectionReference<DocumentData>,
  data: T,
  path: string,
): Promise<OperationResult<string>> {
  try {
    const ref = await addDoc(target, data as any);
    return { ok: true, data: ref.id };
  } catch (error) {
    return mapErrorToResult('create', error, path);
  }
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
