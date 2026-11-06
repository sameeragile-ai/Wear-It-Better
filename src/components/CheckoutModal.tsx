import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, ArrowRight, ArrowLeft, Loader2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';
import { SmartImage } from './SmartImage';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    shippingCost,
    cartTotal,
    formatPrice,
    clearCart,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [placedItems, setPlacedItems] = useState(cart);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    // Step 1: Contact
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    // Step 2: Shipping
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useLockBody(isCheckoutOpen);

  if (!isCheckoutOpen) return null;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for dispatch.';
    }
    if (!formData.firstName.trim()) {
      errs.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name is required.';
    }
    return errs;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.address.trim()) {
      errs.address = 'Street address is required.';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required.';
    }
    if (!formData.postalCode.trim()) {
      errs.postalCode = 'Postal code is required.';
    }
    return errs;
  };

  const handleNextStep = () => {
    if (step === 1) {
      const errs = validateStep1();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      const errs = validateStep2();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderNum = `WIB-${randomNum}`;

    setTimeout(() => {
      setOrderNumber(newOrderNum);
      setPlacedItems([...cart]);
      clearCart();
      setIsProcessing(false);
      setStep(4);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B8964E', '#DCC08A', '#8A6A2B'],
        });
      } catch {}
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[105] flex items-center justify-center p-0 sm:p-6 bg-[#2B2621]/45 backdrop-blur-md">
        <div
          className="absolute inset-0"
          onClick={() => {
            if (step === 4) {
              setIsCheckoutOpen(false);
            }
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-[#EAE2D5] rounded-none sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(138,106,43,0.18),0_10px_30px_rgba(43,38,33,0.08)] overflow-hidden text-[#2B2621] flex flex-col h-full sm:h-auto sm:max-h-[92vh] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#EAE2D5] flex items-center justify-between bg-[#FBF8F3]/80 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg tracking-widest uppercase font-semibold text-[#2B2621]">
                  Wear It Better
                </span>
                <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#F3EDE3] text-[#8A6A2B] border border-[#EAE2D5] font-semibold">
                  Demo Checkout
                </span>
              </div>
              <p className="text-xs text-[#7A6F63] mt-0.5">Complimentary Worldwide Express Dispatch</p>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Close checkout"
              className="p-2 rounded-full border border-[#EAE2D5] text-[#7A6F63] hover:text-[#2B2621] hover:bg-[#F3EDE3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps (if not completed) */}
          {step < 4 && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#EAE2D5] bg-[#FBF8F3]/40 shrink-0">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[
                  { num: 1, label: 'Contact' },
                  { num: 2, label: 'Shipping' },
                  { num: 3, label: 'Review & Place' },
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-colors ${
                        step >= s.num
                          ? 'btn-grad-gold text-[#2B2621] shadow-warm-sm'
                          : 'bg-[#F3EDE3] text-[#7A6F63] border border-[#EAE2D5]'
                      }`}
                    >
                      {step > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider font-medium hidden sm:inline ${
                        step >= s.num ? 'text-[#8A6A2B] font-semibold' : 'text-[#7A6F63]'
                      }`}
                    >
                      {s.label}
                    </span>
                    {idx < 2 && (
                      <div
                        className={`w-8 sm:w-14 h-[1px] mx-1 transition-colors ${
                          step > s.num ? 'bg-[#8A6A2B]' : 'bg-[#EAE2D5]'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Collapsible Order Summary Bar (under 1024px) */}
          {step < 4 && (
            <div className="lg:hidden border-b border-[#EAE2D5] bg-[#FBF8F3] px-4 py-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                className="w-full flex items-center justify-between text-xs font-medium text-[#2B2621]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#8A6A2B] font-semibold uppercase tracking-wider">
                    {mobileSummaryOpen ? 'Hide' : 'Show'} Order Summary ({cart.length})
                  </span>
                  {mobileSummaryOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#8A6A2B]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#8A6A2B]" />
                  )}
                </div>
                <span className="font-mono text-sm font-semibold text-[#8A6A2B] tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </button>

              {mobileSummaryOpen && (
                <div className="pt-3 mt-3 border-t border-[#EAE2D5] space-y-2.5 max-h-48 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <span className="truncate max-w-[200px] text-[#2B2621]">
                        {item.name} ({item.size}) × {item.quantity}
                      </span>
                      <span className="font-mono tabular-nums text-[#8A6A2B]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Body: Split View between Forms and Order Summary */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white">
            {step === 4 ? (
              // STEP 4: Success View
              <div className="max-w-lg mx-auto text-center space-y-6 py-6 sm:py-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full btn-grad-gold text-[#2B2621] flex items-center justify-center mx-auto shadow-warm-lg"
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </motion.div>

                <div>
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8A6A2B]">
                    Order Confirmed
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#2B2621] font-normal mt-1">
                    Thank You, {formData.firstName}
                  </h3>
                  <p className="text-sm text-[#7A6F63] mt-2">
                    Your luxury order has been registered under:
                  </p>
                  <p className="font-mono text-xl sm:text-2xl text-[#8A6A2B] font-bold mt-1 tracking-wider">
                    {orderNumber}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EAE2D5] text-xs text-[#2B2621] space-y-2 text-left shadow-warm-sm">
                  <div className="flex items-center gap-2 text-[#8A6A2B] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Demo Confirmation Notice</span>
                  </div>
                  <p>
                    This is a complete demo checkout for client review. <strong>No real payment was charged</strong> and no financial information was captured.
                  </p>
                  <p className="text-[#7A6F63]">
                    A mock shipping dispatch notification has been scheduled to <strong>{formData.email}</strong>.
                  </p>
                </div>

                <div className="border-t border-[#EAE2D5] pt-4 text-left">
                  <h4 className="text-xs uppercase tracking-wider text-[#8A6A2B] font-semibold mb-3">
                    Items Summary ({placedItems.length})
                  </h4>
                  <div className="space-y-2">
                    {placedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs text-[#2B2621]">
                        <span className="truncate max-w-[240px]">
                          {item.name} ({item.size}) × {item.quantity}
                        </span>
                        <span className="font-mono tabular-nums text-[#8A6A2B] font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full py-3.5 rounded-full btn-grad-gold text-[#2B2621] font-semibold text-xs tracking-wider uppercase shadow-warm-md"
                >
                  Return to Boutique
                </button>
              </div>
            ) : (
              // STEPS 1 - 3
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Side */}
                <div className="lg:col-span-7 space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-serif text-2xl text-[#2B2621]">Contact Information</h3>
                      <p className="text-xs text-[#7A6F63]">
                        Where should we dispatch tracking credentials and fitting updates?
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Tariq"
                            className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                          />
                          {errors.firstName && <p className="text-[11px] text-rose-500 mt-1">{errors.firstName}</p>}
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Mansoor"
                            className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                          />
                          {errors.lastName && <p className="text-[11px] text-rose-500 mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tariq@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                        />
                        {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                          Phone Number (for courier SMS) *
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
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-serif text-2xl text-[#2B2621]">Delivery Address</h3>
                      <p className="text-xs text-[#7A6F63]">
                        Dispatched via DHL or FedEx Express in sealed luxury presentation boxes.
                      </p>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                          Country / Region
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                        >
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Canada">Canada</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="European Union">European Union</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="740 Fifth Avenue"
                          className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                        />
                        {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                            Apartment / Suite
                          </label>
                          <input
                            type="text"
                            value={formData.apartment}
                            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                            placeholder="Suite 1200"
                            className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="New York"
                            className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                          />
                          {errors.city && <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                            State / Province
                          </label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="NY"
                            className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#2B2621] font-semibold mb-1">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            placeholder="10019"
                            className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-[#2B2621] text-sm focus:outline-none focus:border-[#8A6A2B]"
                          />
                          {errors.postalCode && <p className="text-[11px] text-rose-500 mt-1">{errors.postalCode}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <h3 className="font-serif text-2xl text-[#2B2621]">Review & Place Order</h3>

                      <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EAE2D5] space-y-3 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-[#EAE2D5]">
                          <span className="text-[#7A6F63]">Recipient:</span>
                          <span className="font-medium text-[#2B2621]">
                            {formData.firstName} {formData.lastName} ({formData.phone})
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-2 border-b border-[#EAE2D5]">
                          <span className="text-[#7A6F63]">Destination:</span>
                          <span className="font-medium text-[#2B2621] text-right">
                            {formData.address}, {formData.apartment ? `${formData.apartment}, ` : ''}{formData.city}, {formData.postalCode}, {formData.country}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#7A6F63]">Payment Method:</span>
                          <span className="text-[#8A6A2B] font-semibold flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" /> Demo Mode — Zero Charge
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#F3EDE3] border border-[#EAE2D5] text-xs text-[#2B2621]">
                        This is a demonstration order. Clicking <strong>Place Order</strong> will finalize the transaction without taking payment and clear your bag.
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#EAE2D5]">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => (s - 1) as any)}
                        className="py-2.5 px-4 rounded-full border border-[#EAE2D5] bg-[#FBF8F3] text-[#2B2621] hover:bg-[#F3EDE3] flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="py-3 px-6 rounded-full btn-grad-gold text-[#2B2621] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-warm-sm"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="py-3.5 px-8 rounded-full btn-grad-gold text-[#2B2621] font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-warm-md disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Securing Allocation...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Place Demo Order ({formatPrice(cartTotal)})</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Contiguous Order Summary (Desktop) */}
                <div className="hidden lg:block lg:col-span-5 bg-[#FBF8F3] p-5 rounded-2xl border border-[#EAE2D5] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D5]">
                    <span className="text-xs uppercase tracking-wider text-[#8A6A2B] font-semibold">
                      Order Summary ({cart.length})
                    </span>
                    <span className="text-xs text-[#7A6F63]">{formatPrice(cartTotal)}</span>
                  </div>

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-[#EAE2D5] bg-white">
                          <SmartImage
                            src={item.image}
                            alt={item.name}
                            aspectRatio="portrait"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-xs text-[#2B2621] truncate font-medium">{item.name}</h5>
                          <p className="text-[10px] text-[#7A6F63]">
                            {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-[#8A6A2B] tabular-nums shrink-0 font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#EAE2D5] text-xs text-[#7A6F63]">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#2B2621] tabular-nums">{formatPrice(cartSubtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Express Courier</span>
                      <span className="font-mono tabular-nums">
                        {shippingCost === 0 ? (
                          <span className="text-emerald-700 font-semibold">Free</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-base font-serif font-semibold text-[#2B2621] pt-2 border-t border-[#EAE2D5]">
                      <span>Total Due</span>
                      <span className="text-[#8A6A2B] font-mono tabular-nums">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
