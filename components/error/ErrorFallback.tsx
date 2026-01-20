"use client";

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  componentName?: string;
}

export default function ErrorFallback({ 
  error, 
  resetError, 
  componentName = 'компонент' 
}: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 p-8 
                 border border-stone-anthracite/30 bg-ink-chrome/10"
    >
      <AlertTriangle className="w-8 h-8 text-engrave-dim" />
      
      <div className="text-center">
        <h3 className="font-mono text-sm text-engrave-fresco mb-2">
          ОШИБКА ЗАГРУЗКИ {componentName.toUpperCase()}
        </h3>
        {error && (
          <p className="font-mono text-xs text-stone-slate mb-4">
            {error.message || 'Неизвестная ошибка'}
          </p>
        )}
        <p className="font-mono text-[10px] text-engrave-dim">
          Попробуйте обновить страницу или вернуться позже
        </p>
      </div>
      
      {resetError && (
        <button
          onClick={resetError}
          className="flex items-center gap-2 px-4 py-2 
                   border border-stone-anthracite/30 
                   font-mono text-xs text-engrave-fresco
                   hover:border-engrave-line/50 transition-colors"
          aria-label="Попробовать снова"
        >
          <RefreshCw size={14} />
          ПОВТОРИТЬ
        </button>
      )}
    </motion.div>
  );
}

















