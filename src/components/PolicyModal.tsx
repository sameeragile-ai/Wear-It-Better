import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';

export const PolicyModal: React.FC = () => {
  const { policyModal, closePolicyModal } = useStore();
  const { isOpen, type } = policyModal;

  useLockBody(isOpen);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 bg-[#2B2621]/40 backdrop-blur-md">
        <div className="absolute inset-0" onClick={closePolicyModal} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-2xl bg-white border border-[#EAE2D5] rounded-3xl p-6 sm:p-8 text-[#2B2621] shadow-[0_25px_60px_-15px_rgba(138,106,43,0.18),0_10px_30px_rgba(43,38,33,0.08)] overflow-hidden flex flex-col max-h-[85vh] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5]">
            <div className="flex items-center gap-2.5">
              {isPrivacy ? (
                <Shield className="w-5 h-5 text-[#8A6A2B]" />
              ) : (
                <FileText className="w-5 h-5 text-[#8A6A2B]" />
              )}
              <h3 className="font-serif text-2xl text-[#2B2621]">
                {isPrivacy ? 'Privacy & Data Discretion' : 'Terms of Sale & Bespoke Charter'}
              </h3>
            </div>
            <button
              type="button"
              onClick={closePolicyModal}
              className="p-2 rounded-full border border-[#EAE2D5] text-[#7A6F63] hover:text-[#2B2621] hover:bg-[#F3EDE3] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 text-xs sm:text-sm text-[#7A6F63] leading-relaxed pr-2">
            {isPrivacy ? (
              <>
                <p>
                  At <strong className="text-[#2B2621]">Wear It Better</strong>, client confidentiality and sartorial discretion are foundational values. We treat your personal data, body dimensions, and fragrance preferences with the same exacting standard as our hand-stitched tailoring.
                </p>
                <h4 className="font-serif text-base text-[#8A6A2B] font-semibold pt-2">
                  1. Information We Collect
                </h4>
                <p>
                  We collect information necessary to fulfill your sartorial commissions and orders, including your name, shipping address, contact phone number, email address, and bespoke measurement profiles. We do not sell, rent, or lease patron registries to third parties.
                </p>
                <h4 className="font-serif text-base text-[#8A6A2B] font-semibold pt-2">
                  2. Secure Processing
                </h4>
                <p>
                  Digital transactions are protected with end-to-end 256-bit encryption through certified PCI-DSS compliant gateways. Fitting details and private tailoring blueprints are stored within encrypted customer records accessible only to your appointed master cutter.
                </p>
              </>
            ) : (
              <>
                <p>
                  These Terms of Sale govern orders, commissions, and private fitting appointments with <strong className="text-[#2B2621]">Wear It Better Atelier LLC</strong> (740 Fifth Avenue, Suite 1200, New York, NY 10019).
                </p>
                <h4 className="font-serif text-base text-[#8A6A2B] font-semibold pt-2">
                  1. Ready-to-Wear Returns & Trial Vials
                </h4>
                <p>
                  Ready-to-wear menswear garments may be returned or exchanged within 30 days of delivery, provided pieces are unworn with original atelier security tags attached. Fragrance bottles include a matching 2ml trial vial for sampling prior to unsealing the full-size box.
                </p>
                <h4 className="font-serif text-base text-[#8A6A2B] font-semibold pt-2">
                  2. Bespoke Commissions
                </h4>
                <p>
                  Bespoke garments are created from individually drafted patterns. Commission lead times generally span 4 to 6 weeks. Two fitting milestones are included with every commission to guarantee absolute comfort and posture precision.
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#EAE2D5] flex justify-end">
            <button
              type="button"
              onClick={closePolicyModal}
              className="py-2.5 px-6 rounded-full btn-grad-gold text-[#2B2621] text-xs font-semibold tracking-wider uppercase shadow-warm-sm"
            >
              Understood
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
