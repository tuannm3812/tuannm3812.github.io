import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resume';
import { cn } from '../lib/utils';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'contacts');
      } catch (err) {
        // Error already logged by handleFirestoreError
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-16 py-12">
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Let's Connect.</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400">
            Have a project in mind or just want to chat about AI? Feel free to reach out.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand transition-colors group">
            <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Me</p>
              <a href={`mailto:${resumeData.email}`} className="text-lg font-bold hover:text-brand transition-colors">
                {resumeData.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand transition-colors group">
            <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Call Me</p>
              <p className="text-lg font-bold">{resumeData.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand transition-colors group">
            <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Location</p>
              <p className="text-lg font-bold">{resumeData.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200 dark:shadow-none relative overflow-hidden">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20"
          >
            <div className="w-20 h-20 bg-brand/10 text-brand rounded-full flex items-center justify-center">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-bold italic">Message Received!</h3>
            <p className="text-slate-500 dark:text-slate-400">Thanks for reaching out, Tuan will get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 px-6 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all",
                  errors.name && "border-red-500"
                )}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all",
                  errors.email && "border-red-500"
                )}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Your Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all resize-none",
                  errors.message && "border-red-500"
                )}
                placeholder="How can I help you?"
              />
              {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
            </div>

            <button
              disabled={status === 'submitting'}
              className="w-full py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-light disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
