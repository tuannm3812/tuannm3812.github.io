import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts, BlogPost } from '../data/blog';
import { Calendar, User, ArrowRight, MessageSquare, LogIn } from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  db, 
  auth, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  signInWithPopup, 
  googleProvider,
  handleFirestoreError,
  OperationType,
  Timestamp
} from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface Comment {
  id: string;
  authorName: string;
  text: string;
  createdAt: Timestamp;
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedPost) return;

    const path = `blog_posts/${selectedPost.id}/comments`;
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(fetchedComments);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [selectedPost]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim() || !user || !selectedPost) return;

    setIsSubmitting(true);
    const path = `blog_posts/${selectedPost.id}/comments`;
    try {
      await addDoc(collection(db, path), {
        postId: selectedPost.id,
        authorName: user.displayName || 'Anonymous',
        text: newComment,
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight italic uppercase">Reflections <span className="text-brand">&</span> Insights.</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400">
          Thoughts on MLOps, Data Engineering, and the future of AI.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-8"
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand transition-all flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold group-hover:text-brand transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all shrink-0">
                  <ArrowRight size={24} />
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
            className="max-w-4xl mx-auto space-y-12"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-brand transition-colors flex items-center gap-2"
            >
              ← Back to all posts
            </button>

            <article className="space-y-8">
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
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                    {selectedPost.title}
                  </h1>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-400 leading-loose">
                   {selectedPost.content}
                </div>
            </article>

            {/* Comments Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-12 space-y-8">
               <h3 className="text-2xl font-bold flex items-center gap-3">
                 <MessageSquare className="text-brand" />
                 Comments ({comments.length})
               </h3>
               
               {!user ? (
                 <div className="p-8 rounded-2xl bg-brand/5 border border-brand/20 text-center space-y-4">
                   <p className="font-medium text-slate-600 dark:text-slate-400">Join the discussion by signing in with Google.</p>
                   <button 
                    onClick={handleLogin}
                    className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                   >
                     <LogIn size={20} className="text-brand" />
                     Sign in with Google
                   </button>
                 </div>
               ) : (
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full" />
                    <p className="font-bold">{user.displayName}</p>
                  </div>
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                    placeholder="Share your thoughts..."
                    rows={3}
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

               <div className="space-y-6">
                 {comments.length === 0 ? (
                   <p className="text-center text-slate-500 italic py-4">No comments yet. Be the first to start the conversation!</p>
                 ) : (
                   comments.map((comment) => (
                     <motion.div 
                        key={comment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-2"
                      >
                       <div className="flex justify-between items-center">
                         <span className="font-bold text-brand">{comment.authorName}</span>
                         <span className="text-xs text-slate-500">
                           {comment.createdAt?.toDate().toLocaleDateString()}
                         </span>
                       </div>
                       <p className="text-slate-600 dark:text-slate-400">{comment.text}</p>
                     </motion.div>
                   ))
                 )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
