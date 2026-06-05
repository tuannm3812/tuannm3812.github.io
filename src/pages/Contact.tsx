import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, BarChart3 } from 'lucide-react';
import { resumeData } from '../data/resume';
import { cn } from '../lib/utils';
import { db, collection, serverTimestamp } from '../lib/firebase';
import FeatureErrorPanel from '../components/FeatureErrorPanel';
import { toDisplayMessage } from '../lib/reliability/messages';
import { safeCreateDocument } from '../lib/reliability/firebaseOps';
import { ReliabilityError, ReliabilityFailure } from '../lib/reliability/types';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<ReliabilityError | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!message) newErrors.message = 'Message is required';
    if (message.length > 5000) newErrors.message = 'Message must be under 5,000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setSubmitError(null);

    const result = await safeCreateDocument(
      collection(db, 'contacts'),
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      },
      'contacts',
    );

    if (!result.ok) {
      setStatus('error');
      setSubmitError(result.error);
      return;
    }

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const displayError = status === 'error' && submitError ? toDisplayMessage(submitError) : null;

  return (
    <div className="grid md:grid-cols-2 gap-10 py-8">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Let's Connect.</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Have an ML, data engineering, analytics, or applied AI opportunity in mind? Send a note and I will get back to you.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Me</p>
              <a href={`mailto:${resumeData.email}`} className="font-bold hover:text-brand transition-colors">
                {resumeData.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</p>
              <a href={`tel:${resumeData.phone.replace(/\s/g, '')}`} className="font-bold hover:text-brand transition-colors">
                {resumeData.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Location</p>
              <p className="font-bold">{resumeData.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
              <BarChart3 size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Kaggle</p>
              <a href={resumeData.kaggle} target="_blank" rel="noreferrer" className="font-bold hover:text-brand transition-colors">
                kaggle.com/tuannm3812
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200 dark:shadow-none relative overflow-hidden">
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
        ) : status === 'error' && displayError ? (
          <div className="py-12">
            <FeatureErrorPanel
              title={displayError.title}
              detail={displayError.detail}
              cta={displayError.cta}
              onRetry={() => {
                setStatus('idle');
                setSubmitError(null);
              }}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-slate-500">Full Name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all",
                  errors.name && "border-red-500"
                )}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-slate-500">Email Address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all",
                  errors.email && "border-red-500"
                )}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-slate-500">Your Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                maxLength={5000}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all resize-none",
                  errors.message && "border-red-500"
                )}
                placeholder="How can I help you?"
              />
              {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
            </div>

            <button
              disabled={status === 'submitting'}
              className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-light disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
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
