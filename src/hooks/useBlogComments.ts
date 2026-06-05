import { useEffect, useState } from 'react';
import { Query, collection, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { safeSubscribeSnapshot } from '../lib/reliability/firebaseOps';

export interface BlogComment {
  id: string;
  authorName: string;
  text: string;
  createdAt: { toDate: () => Date } | null;
}

export function useBlogComments(postId: string | null) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const retry = () => setRetryTrigger((prev) => prev + 1);

  useEffect(() => {
    if (!postId) {
      setComments([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const commentQuery = query(collection(db, `blog_posts/${postId}/comments`), orderBy('createdAt', 'desc'));
    const unsubscribe = safeSubscribeSnapshot<BlogComment>(
      commentQuery,
      `blog_posts/${postId}/comments`,
      (items) => {
        setComments(items);
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [postId, retryTrigger]);

  return { comments, loading, error, setError, retry };
}
