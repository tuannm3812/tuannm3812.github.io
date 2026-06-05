import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Calendar, LogIn, MessageSquare, User } from 'lucide-react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { blogPosts, BlogPost } from '../data/blog';
import {
  auth,
  collection,
  db,
  googleProvider,
  serverTimestamp,
  signInWithPopup,
} from '../lib/firebase';
import { useBlogComments } from '../hooks/useBlogComments';
import { safeCreateDocument } from '../lib/reliability/firebaseOps';
import FeatureErrorPanel from '../components/FeatureErrorPanel';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { comments, loading: commentsLoading, error: commentsError } = useBlogComments(selectedPost?.id ?? null);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handlePostComment = async () => {
    const comment = newComment.trim();
    if (!comment || !user || !selectedPost) return;

    setIsSubmitting(true);

    const result = await safeCreateDocument(
      collection(db, `blog_posts/${selectedPost.id}/comments`),
      {
        postId: selectedPost.id,
        authorName: user.displayName || 'Anonymous',
        text: comment,
        createdAt: serverTimestamp(),
      },
      `blog_posts/${selectedPost.id}/comments`,
    );

    if (!result.ok) {
      setIsSubmitting(false);
      return;
    }

    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          Reflections <span className="text-brand">&</span> Insights
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Short notes on MLOps, data engineering, and applied AI from projects and practice.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand transition-all flex gap-5 items-start"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-brand transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all shrink-0">
                  <ArrowRight size={20} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-brand transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </button>

            <article className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {selectedPost.author}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  {selectedPost.title}
                </h1>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedPost.content}
              </div>
            </article>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="text-brand" />
                Comments ({comments.length})
              </h3>

              {!user ? (
                <div className="p-6 rounded-xl bg-brand/5 border border-brand/20 text-center space-y-4">
                  <p className="font-medium text-slate-600 dark:text-slate-400">
                    Join the discussion by signing in with Google.
                  </p>
                  <button
                    onClick={handleLogin}
                    className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                  >
                    <LogIn size={20} className="text-brand" />
                    Sign in with Google
                  </button>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-3">
                    {user.photoURL && <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />}
                    <p className="font-bold">{user.displayName}</p>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                    placeholder="Share your thoughts..."
                    rows={3}
                    maxLength={2000}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handlePostComment}
                      disabled={isSubmitting || !newComment.trim()}
                      className="px-6 py-2 bg-brand text-white font-bold rounded-lg hover:bg-brand-light disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {commentsLoading ? (
                  <p className="text-sm text-slate-500 italic py-2">Loading comments…</p>
                ) : null}
                
                {commentsError ? (
                  <FeatureErrorPanel
                    title="Comments unavailable"
                    detail={commentsError}
                    cta="Retry"
                    onRetry={() => setSelectedPost(selectedPost ? { ...selectedPost } : null)}
                  />
                ) : null}

                {!commentsLoading && !commentsError && comments.length === 0 ? (
                  <p className="text-center text-slate-500 italic py-4">
                    No comments yet. Be the first to start the conversation.
                  </p>
                ) : null}

                {!commentsLoading && !commentsError && comments.length > 0 ? (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-brand">{comment.authorName}</span>
                        <span className="text-xs text-slate-500">
                          {comment.createdAt && typeof comment.createdAt.toDate === 'function'
                            ? comment.createdAt.toDate().toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{comment.text}</p>
                    </motion.div>
                  ))
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
