import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, Undo2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-6 z-[120] flex flex-col gap-2.5 max-w-sm pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#EAE2D5] text-[#2B2621] shadow-[0_15px_35px_rgba(43,38,33,0.12)] flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'undo' ? (
                <Undo2 className="w-4 h-4 text-[#8A6A2B] shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-[#8A6A2B] shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-[#8A6A2B] shrink-0" />
              )}
              <span className="truncate leading-tight font-medium text-[#2B2621]">{toast.message}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action?.onClick();
                    removeToast(toast.id);
                  }}
                  className="px-2.5 py-1 rounded-full btn-grad-gold text-[#2B2621] font-semibold text-[11px] tracking-wide uppercase hover:opacity-95 transition-opacity shadow-warm-sm"
                >
                  {toast.action.label}
                </button>
              )}

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notice"
                className="p-1 rounded-full text-[#7A6F63] hover:text-[#2B2621] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
