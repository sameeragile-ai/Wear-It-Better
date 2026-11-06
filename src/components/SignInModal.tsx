import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Check, Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';

export const SignInModal: React.FC = () => {
  const { isSignInOpen, setIsSignInOpen, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<string | null>(null);

  useLockBody(isSignInOpen);

  if (!isSignInOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid client email.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSignedInUser(email);
      addToast(`Welcome back, ${email}`, 'success');
      setTimeout(() => {
        setIsSignInOpen(false);
        setSignedInUser(null);
        setEmail('');
        setPassword('');
      }, 1200);
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#2B2621]/40 backdrop-blur-md">
        <div
          className="absolute inset-0"
          onClick={() => setIsSignInOpen(false)}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-md bg-white border border-[#EAE2D5] rounded-3xl p-6 sm:p-8 text-[#2B2621] shadow-[0_25px_60px_-15px_rgba(138,106,43,0.18),0_10px_30px_rgba(43,38,33,0.08)] overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsSignInOpen(false)}
            aria-label="Close sign in"
            className="absolute top-4 right-4 p-2 rounded-full border border-[#EAE2D5] text-[#7A6F63] hover:text-[#2B2621] hover:bg-[#F3EDE3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full border border-[#8A6A2B]/40 flex items-center justify-center mx-auto mb-3 bg-[#FBF8F3]">
              <span className="font-serif text-[#8A6A2B] font-bold text-lg">W</span>
            </div>
            <h3 className="font-serif text-2xl text-[#2B2621]">Client Portal</h3>
            <p className="text-xs text-[#7A6F63] mt-1">
              Access your bespoke measurement history and private fragrance archives.
            </p>
          </div>

          {signedInUser ? (
            <div className="p-6 rounded-2xl bg-[#FBF8F3] border border-[#EAE2D5] text-center space-y-2">
              <div className="w-10 h-10 rounded-full btn-grad-gold text-[#2B2621] flex items-center justify-center mx-auto shadow-warm-sm">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#2B2621]">Authenticated</h4>
              <p className="text-xs text-[#7A6F63]">
                Logged in as <strong>{signedInUser}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6F63]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@wearitbetter.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6F63]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                  />
                </div>
              </div>

              {error && <p className="text-xs text-rose-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full btn-grad-gold text-[#2B2621] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-sm hover:opacity-95 disabled:opacity-50 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Sign In (Demo Mode)</span>
                )}
              </button>

              <div className="p-3 rounded-xl bg-[#F3EDE3] text-[11px] text-[#7A6F63] text-center border border-[#EAE2D5]">
                <em>Demo Only: Any email and a 6+ character password will authenticate successfully.</em>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
