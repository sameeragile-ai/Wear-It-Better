import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Loader2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    const saved = localStorage.getItem('wib_subscribers') || '[]';
    const list: string[] = JSON.parse(saved);

    if (list.includes(trimmed.toLowerCase())) {
      setStatus('duplicate');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      list.push(trimmed.toLowerCase());
      localStorage.setItem('wib_subscribers', JSON.stringify(list));
      setStatus('success');
      setEmail('');
    }, 700);
  };

  return (
    <section
      id="newsletter"
      aria-label="Join the Inner Circle"
      className="py-20 lg:py-24 bg-[#FBF8F3] text-[#2B2621] relative overflow-hidden border-t border-[#EAE2D5]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rounded Panel with --grad-champagne-panel & blurred orbs */}
        <div className="relative rounded-3xl bg-grad-champagne border border-[#EAE2D5] p-8 sm:p-12 lg:p-16 text-center shadow-warm-xl overflow-hidden">
          {/* Blurred Gold & Rose Orbs */}
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#F4E1DA]/60 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#E9D7AE]/70 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
              Private Releases & Salon Notes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight">
              Join the Inner Circle
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#7A6F63] leading-relaxed">
              Receive confidential notice of private bespoke fabric allocations, limited scent batch distillations, and seasonal salon gatherings.
            </p>

            {status === 'success' ? (
              <div className="mt-8 p-6 rounded-2xl bg-white/90 border border-[#B08A3E]/40 text-center space-y-2 shadow-warm-sm">
                <div className="w-10 h-10 rounded-full bg-grad-gold text-[#2B2621] flex items-center justify-center mx-auto shadow-warm-sm">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B2621]">You're on the list.</h3>
                <p className="text-xs text-[#7A6F63]">
                  Welcome to the salon. An inaugural invitation has been prepared for your inbox.
                </p>
              </div>
            ) : status === 'duplicate' ? (
              <div className="mt-8 p-6 rounded-2xl bg-white/90 border border-[#B08A3E]/40 text-center space-y-2 shadow-warm-sm">
                <div className="w-10 h-10 rounded-full bg-[#E9D7AE] text-[#8A6A2B] flex items-center justify-center mx-auto shadow-warm-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B2621]">Already Enrolled</h3>
                <p className="text-xs text-[#7A6F63]">
                  This email is already registered in our private register. Thank you for your continued patronship.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-xs text-[#8A6A2B] font-bold underline underline-offset-4 pt-1"
                >
                  Enter a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                {/* Desktop side by side, Mobile stacked */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6F63]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your email address"
                      className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-[#EAE2D5] text-[#2B2621] placeholder-[#7A6F63]/70 text-sm focus:outline-none focus:border-[#8A6A2B] shadow-warm-sm transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="py-3.5 px-8 rounded-full btn-grad-gold text-[#2B2621] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-warm-md hover:opacity-95 disabled:opacity-50 shrink-0"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Join</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-[#9C4A4F] text-center font-semibold">{errorMessage}</p>
                )}

                <p className="text-[11px] text-[#7A6F63] pt-1">
                  Strict privacy honored. Never sold or shared. Unsubscribe with one click anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
