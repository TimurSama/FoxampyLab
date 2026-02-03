"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, MessageCircle } from 'lucide-react';
import { TelegramService } from '@/lib/telegram';
import { useI18n } from '@/lib/i18n/context';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  showTelegramFallback?: boolean;
  telegramMessage?: string;
}

export default function ErrorModal({
  isOpen,
  onClose,
  error,
  showTelegramFallback = true,
  telegramMessage,
}: ErrorModalProps) {
  const { t } = useI18n();

  const handleTelegramClick = () => {
    if (telegramMessage) {
      const url = TelegramService.getBotUrlWithMessage(telegramMessage);
      window.open(url, '_blank');
    } else {
      const url = TelegramService.getBotUrl();
      window.open(url, '_blank');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-ink-deep border border-stone-anthracite/50 max-w-md w-full p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-stone-slate hover:text-engrave-fresco transition-colors"
              >
                <X size={20} />
              </button>

              {/* Icon */}
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-red-500" size={24} />
                <h3 className="font-mono text-lg text-engrave-fresco">
                  {t('common.error') || 'Ошибка'}
                </h3>
              </div>

              {/* Error message */}
              <p className="font-mono text-sm text-stone-slate mb-6 leading-relaxed">
                {error}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                {showTelegramFallback && (
                  <button
                    onClick={handleTelegramClick}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                             bg-[#0088cc] hover:bg-[#006699] text-white font-mono text-sm
                             transition-colors border border-[#006699]/50"
                  >
                    <MessageCircle size={16} />
                    <span>Написать в Telegram</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-stone-anthracite/50 
                           hover:border-engrave-line/50 text-engrave-fresco font-mono text-sm
                           transition-colors"
                >
                  {t('common.close') || 'Закрыть'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
