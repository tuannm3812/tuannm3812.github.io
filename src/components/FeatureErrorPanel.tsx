import React from 'react';
import { AlertTriangle } from 'lucide-react';

export interface FeatureErrorPanelProps {
  title: string;
  detail: string;
  cta?: string;
  onRetry?: () => void;
}

export default function FeatureErrorPanel({ title, detail, cta, onRetry }: FeatureErrorPanelProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="mt-1 text-red-600" />
        <div className="space-y-2">
          <h3 className="font-bold text-red-700 dark:text-red-300">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{detail}</p>
          {onRetry && cta ? (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white hover:opacity-90 cursor-pointer"
            >
              {cta}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
