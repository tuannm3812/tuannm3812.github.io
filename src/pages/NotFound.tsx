import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  eyebrow?: string;
  message?: string;
  backTo?: string;
  backLabel?: string;
}

export default function NotFound({
  eyebrow = '404',
  message = "That page doesn't exist. It may have moved, or the link may be mistyped.",
  backTo = '/',
  backLabel = 'Back to home',
}: NotFoundProps) {
  return (
    <div className="max-w-3xl space-y-6 pb-24">
      <div className="space-y-3">
        <p className="section-eyebrow">{eyebrow}</p>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          Page not <span className="text-brand">found</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{message}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to={backTo} className="btn-primary">
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
        <Link to="/projects" className="btn-secondary">
          View projects
        </Link>
      </div>
    </div>
  );
}
