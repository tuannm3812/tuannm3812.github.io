import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, LogIn, MessageSquare, User, Clock } from 'lucide-react';
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
import NotFound from './NotFound';
import { toDisplayMessage, toSignInMessage } from '../lib/reliability/messages';
import { ReliabilityError } from '../lib/reliability/types';
import { SettledWrite } from '../lib/reliability/pendingWrite';
import { safeGetItem, safeRemoveItem, safeSetItem } from '../lib/safeStorage';

function calculateReadTime(html: string): string {
  const wordsPerMinute = 225;
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function Blog() {
  // The open post lives in the URL (/blog/:postId), so it survives refresh, can be
  // shared, and Back returns to the list.
  const { postId } = useParams();
  const selectedPost: BlogPost | null = postId
    ? (blogPosts.find((post) => post.id === postId) ?? null)
    : null;
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    retry: retryComments,
  } = useBlogComments(selectedPost?.id ?? null);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQueued, setIsQueued] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [commentSubmitError, setCommentSubmitError] = useState<ReliabilityError | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    if (selectedPost) document.title = `${selectedPost.title} | Tuan Nguyen`;
    else if (postId) document.title = 'Post Not Found | Tuan Nguyen';
  }, [selectedPost, postId]);

  useEffect(() => {
    if (selectedPost) {
      const cached = safeGetItem(`blog_comment_draft_${selectedPost.id}`);
      setNewComment(cached || '');
    } else {
      setNewComment('');
    }
    setCommentSubmitError(null);
  }, [selectedPost]);

  const handleCommentChange = (text: string) => {
    setNewComment(text);
    if (selectedPost) {
      safeSetItem(`blog_comment_draft_${selectedPost.id}`, text);
    }
  };

  useEffect(() => {
    if (!selectedPost) {
      setScrollPercent(0);
      return;
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent((window.scrollY / totalHeight) * 100);
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);

  const handleLogin = async () => {
    setSignInError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      // The comment draft is in storage, so a failed sign-in loses nothing.
      setSignInError(toSignInMessage(error));
    }
  };

  const handlePostComment = async () => {
    const comment = newComment.trim();
    if (!comment || !user || !selectedPost) return;

    setIsSubmitting(true);
    setCommentSubmitError(null);

    const postId = selectedPost.id;
    const outcome = await safeCreateDocument(
      collection(db, `blog_posts/${selectedPost.id}/comments`),
      {
        postId: selectedPost.id,
        authorName: user.displayName || 'Anonymous',
        text: comment,
        createdAt: serverTimestamp(),
      },
      `blog_posts/${selectedPost.id}/comments`,
    );

    // Offline: wait for the queued original write instead of retrying (duplicates).
    let result: SettledWrite;
    if (outcome.status === 'queued') {
      setIsQueued(true);
      result = await outcome.settled;
      setIsQueued(false);
    } else {
      result = outcome;
    }

    setIsSubmitting(false);
    if (result.status === 'failed') {
      setCommentSubmitError(result.error);
      return;
    }
    safeRemoveItem(`blog_comment_draft_${postId}`);
    setNewComment('');
  };

  if (postId && !selectedPost) {
    return (
      <NotFound
        eyebrow="Writing"
        message="That post doesn't exist. It may have been renamed or removed."
        backTo="/blog"
        backLabel="Back to all posts"
      />
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-3xl space-y-3">
        <p className="section-eyebrow">Writing</p>
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
                className="surface-card surface-card-hover group relative flex items-start gap-5 p-5 focus-within:ring-2 focus-within:ring-brand"
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
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {calculateReadTime(post.content)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-brand transition-colors">
                    {/* The ::after overlay stretches the link over the whole card, so the
                        card stays clickable while keyboard users get one real link. */}
                    <Link
                      to={`/blog/${post.id}`}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="icon-tile rounded-full group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all">
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
            {/* Reading progress indicator */}
            <div className="fixed top-16 left-0 right-0 h-1 bg-slate-200/50 dark:bg-slate-800/50 z-50 pointer-events-none">
              <div
                className="h-full bg-brand transition-all duration-75 ease-out rounded-r-full"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>

            <Link
              to="/blog"
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-brand transition-colors flex w-fit items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>

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
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {calculateReadTime(selectedPost.content)}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  {selectedPost.title}
                </h1>
              </div>

              {/* Post content is authored HTML from src/data/blog.ts, never user input, so
                  dangerouslySetInnerHTML carries no injection risk here. */}
              <div
                className="blog-article"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </article>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="text-brand" />
                Comments ({comments.length})
              </h3>

              {!user ? (
                <div className="soft-panel space-y-4 border-brand/20 bg-brand/5 p-6 text-center">
                  <p className="font-medium text-slate-600 dark:text-slate-400">
                    Join the discussion by signing in with Google.
                  </p>
                  {signInError ? (
                    <p role="alert" className="text-sm font-medium text-red-500">
                      {signInError}
                    </p>
                  ) : null}
                  <button onClick={handleLogin} className="btn-secondary mx-auto">
                    <LogIn size={20} className="text-brand" />
                    {signInError ? 'Try again' : 'Sign in with Google'}
                  </button>
                </div>
              ) : (
                <div className="surface-card space-y-4 p-5">
                  <div className="flex items-center gap-3">
                    {user.photoURL && (
                      <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
                    )}
                    <p className="font-bold">{user.displayName}</p>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => handleCommentChange(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full resize-none rounded-lg border border-slate-100 bg-slate-50 p-4 focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-950"
                    placeholder="Share your thoughts..."
                    rows={3}
                    maxLength={2000}
                  />
                  {isQueued ? (
                    <p role="status" className="text-xs font-medium text-amber-600 py-1">
                      You're offline. Your comment is saved and will post automatically when you
                      reconnect. Keep this tab open.
                    </p>
                  ) : null}
                  {commentSubmitError ? (
                    <p className="text-xs text-red-500 font-medium py-1">
                      Failed to post comment: {toDisplayMessage(commentSubmitError).detail}
                    </p>
                  ) : null}
                  <div className="flex justify-end">
                    <button
                      onClick={handlePostComment}
                      disabled={isSubmitting || !newComment.trim()}
                      className="btn-primary bg-brand px-6 py-2 text-white hover:bg-brand-light disabled:opacity-50"
                    >
                      {isQueued
                        ? 'Waiting for connection...'
                        : isSubmitting
                          ? 'Posting...'
                          : 'Post Comment'}
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
                    onRetry={retryComments}
                  />
                ) : null}

                {!commentsLoading && !commentsError && comments.length === 0 ? (
                  <p className="text-center text-slate-500 italic py-4">
                    No comments yet. Be the first to start the conversation.
                  </p>
                ) : null}

                {!commentsLoading && !commentsError && comments.length > 0
                  ? comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="surface-card space-y-2 p-4"
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
                  : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
