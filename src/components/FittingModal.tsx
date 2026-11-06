import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';

export const FittingModal: React.FC = () => {
  const { isFittingModalOpen, setIsFittingModalOpen } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke suit',
    date: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useLockBody(isFittingModalOpen);

  if (!isFittingModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address required.';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number required.';
    if (!formData.date) errs.date = 'Please pick a preferred date.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#2B2621]/40 backdrop-blur-md">
        <div
          className="absolute inset-0"
          onClick={() => setIsFittingModalOpen(false)}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-lg bg-white border border-[#EAE2D5] rounded-3xl p-6 sm:p-8 text-[#2B2621] shadow-[0_25px_60px_-15px_rgba(138,106,43,0.18),0_10px_30px_rgba(43,38,33,0.08)] overflow-hidden max-h-[90vh] overflow-y-auto z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsFittingModalOpen(false)}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full border border-[#EAE2D5] text-[#7A6F63] hover:text-[#2B2621] hover:bg-[#F3EDE3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDE3] border border-[#EAE2D5] text-[#8A6A2B] text-[10px] font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Atelier Appointment</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2621]">Book a Private Fitting</h3>
            <p className="text-xs text-[#7A6F63] mt-1">
              Midtown Manhattan Salon (740 Fifth Avenue) or Private Video Session
            </p>
          </div>

          {isSuccess ? (
            <div className="p-6 rounded-2xl bg-[#FBF8F3] border border-[#EAE2D5] text-center space-y-4">
              <div className="w-12 h-12 rounded-full btn-grad-gold text-[#2B2621] flex items-center justify-center mx-auto shadow-warm-sm">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-serif text-xl text-[#2B2621]">Consultation Requested</h4>
              <p className="text-xs text-[#7A6F63] leading-relaxed">
                Thank you, <strong className="text-[#2B2621]">{formData.name}</strong>. Our bespoke master cutter will review your date ({formData.date}) and telephone you at <strong className="text-[#2B2621]">{formData.phone}</strong> to confirm your swatch preferences.
              </p>
              <div className="p-2.5 rounded-xl bg-[#F3EDE3] text-[11px] text-[#7A6F63] border border-[#EAE2D5]">
                <em>Demo Only: No actual booking charges or notifications sent.</em>
              </div>
              <button
                type="button"
                onClick={() => setIsFittingModalOpen(false)}
                className="w-full py-3 rounded-full btn-grad-gold text-[#2B2621] text-xs font-semibold uppercase tracking-wider shadow-warm-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Julian Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="julian@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (212) 555-0198"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                    Service *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                  >
                    <option value="Bespoke suit">Bespoke Two-Piece Suit</option>
                    <option value="Kurta & waistcoat">Silk Kurta & Waistcoat</option>
                    <option value="Kameez Shalwar">Egyptian Giza Kameez</option>
                    <option value="Fragrance consultation">Private Fragrance Flight</option>
                    <option value="Wedding wardrobe">Full Wedding Wardrobe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                  />
                  {errors.date && <p className="text-[11px] text-rose-500 mt-1">{errors.date}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                  Style or Sizing Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Lapel style, event date, fabric weight..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full btn-grad-gold text-[#2B2621] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-sm hover:opacity-95 disabled:opacity-50 transition-opacity"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking Session...</span>
                  </>
                ) : (
                  <span>Request Atelier Session (Demo)</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
