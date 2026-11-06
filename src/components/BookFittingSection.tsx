import React, { useState } from 'react';
import { MapPin, Clock, Mail, Phone, ExternalLink, Check, Loader2 } from 'lucide-react';
import { BOUTIQUE_INFO } from '../constants';

export const BookFittingSection: React.FC = () => {
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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address required.';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number required for confirmation.';
    if (!formData.date) errs.date = 'Please select a preferred date.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <section
      id="contact"
      aria-label="Book a Fitting and Boutique Contact"
      className="py-20 lg:py-28 bg-grad-warm text-[#2B2621] border-t border-[#EAE2D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Appointment Form on White Card with --grad-border */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#EAE2D5] shadow-warm-lg">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
              Private Atelier Session
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-grad-heading font-normal tracking-tight">
              Book a Fitting Consultation
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#7A6F63] mb-8 leading-relaxed">
              Reserve an uninterrupted 60-minute appointment at our Fifth Avenue salon or via private digital video consultation.
            </p>

            {isSuccess ? (
              <div className="p-8 rounded-2xl bg-[#FBF8F3] border border-[#B08A3E]/40 text-center space-y-4 shadow-warm-sm">
                <div className="w-12 h-12 rounded-full bg-grad-gold text-[#2B2621] flex items-center justify-center mx-auto shadow-warm-sm">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B2621]">Appointment Request Received</h3>
                <p className="text-sm text-[#7A6F63] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our bespoke concierge will confirm your session for <strong>{formData.service}</strong> on <strong>{formData.date}</strong> via phone within 2 hours.
                </p>
                <div className="p-3 rounded-xl bg-white border border-[#EAE2D5] text-xs text-[#7A6F63]">
                  <em>Note: This is a demonstration booking. No real appointment was placed.</em>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      service: 'Bespoke suit',
                      date: '',
                      message: '',
                    });
                  }}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-[#8A6A2B] hover:underline"
                >
                  Schedule another consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A6F63] font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Julian Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-sm text-[#2B2621] focus:outline-none focus:border-[#8A6A2B] focus:ring-1 focus:ring-[#8A6A2B] transition-all"
                    />
                    {errors.name && <p className="text-[11px] text-[#9C4A4F] font-semibold mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A6F63] font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-sm text-[#2B2621] focus:outline-none focus:border-[#8A6A2B] focus:ring-1 focus:ring-[#8A6A2B] transition-all"
                    />
                    {errors.email && <p className="text-[11px] text-[#9C4A4F] font-semibold mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A6F63] font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (212) 555-0198"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-sm text-[#2B2621] focus:outline-none focus:border-[#8A6A2B] focus:ring-1 focus:ring-[#8A6A2B] transition-all"
                    />
                    {errors.phone && <p className="text-[11px] text-[#9C4A4F] font-semibold mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A6F63] font-bold mb-1">
                      Service Requested *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-sm text-[#2B2621] focus:outline-none focus:border-[#8A6A2B] focus:ring-1 focus:ring-[#8A6A2B] transition-all font-medium"
                    >
                      <option value="Bespoke suit">Bespoke Two-Piece Suit</option>
                      <option value="Kurta & waistcoat">Kurta & Embroidered Waistcoat</option>
                      <option value="Kameez Shalwar">Bespoke Kameez Shalwar</option>
                      <option value="Fragrance consultation">Private Fragrance Consultation</option>
                      <option value="Other">Wedding / Full Wardrobe Commission</option>
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7A6F63] font-bold mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-sm text-[#2B2621] focus:outline-none focus:border-[#8A6A2B] focus:ring-1 focus:ring-[#8A6A2B] transition-all"
                  />
                  {errors.date && <p className="text-[11px] text-[#9C4A4F] font-semibold mt-1">{errors.date}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7A6F63] font-bold mb-1">
                    Style Notes or Fabric Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Occasion date, preferred lapels, silk vs wool..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF8F3] border border-[#EAE2D5] text-sm text-[#2B2621] focus:outline-none focus:border-[#8A6A2B] focus:ring-1 focus:ring-[#8A6A2B] transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full btn-grad-gold text-[#2B2621] font-bold text-xs tracking-wider uppercase shadow-warm-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Request...</span>
                    </>
                  ) : (
                    <span>Submit Appointment Request (Demo)</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Boutique Info & Styled Map on --grad-hero */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
                Flagship Boutique
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-grad-heading font-medium tracking-tight">
                New York Atelier Salon
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#2B2621]/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8A6A2B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2B2621]">{BOUTIQUE_INFO.address}</p>
                  <p className="text-[#7A6F63] text-xs">Between 57th & 58th Street</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8A6A2B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2B2621]">{BOUTIQUE_INFO.hours}</p>
                  <p className="text-[#7A6F63] text-xs">By appointment & private walk-ins</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8A6A2B] shrink-0" />
                <a
                  href={`mailto:${BOUTIQUE_INFO.email}`}
                  className="hover:text-[#8A6A2B] font-medium transition-colors"
                >
                  {BOUTIQUE_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8A6A2B] shrink-0" />
                <a
                  href={`tel:${BOUTIQUE_INFO.phone}`}
                  className="hover:text-[#8A6A2B] font-medium transition-colors"
                >
                  {BOUTIQUE_INFO.phone}
                </a>
              </div>
            </div>

            {/* Styled Map Panel on --grad-hero */}
            <div className="rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-warm-lg" style={{ background: 'var(--grad-hero)' }}>
              <div className="relative aspect-[16/10] p-6 flex flex-col justify-between overflow-hidden">
                {/* Map Grid Pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="lightGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#8A6A2B" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#lightGrid)" />
                </svg>

                {/* Central Pin */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="relative flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-grad-gold text-[#2B2621] flex items-center justify-center shadow-warm-md border border-white">
                      <MapPin className="w-5 h-5 fill-current" />
                    </div>
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-wider bg-white text-[#2B2621] px-3 py-0.5 rounded-full shadow-warm-sm border border-[#EAE2D5]">
                      740 Fifth Avenue
                    </span>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="relative z-10 bg-white/95 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-[#EAE2D5] shadow-warm-sm">
                  <div className="text-[11px]">
                    <span className="font-bold block text-[#2B2621]">Midtown Manhattan</span>
                    <span className="text-[#7A6F63]">Fifth Avenue Salon Suite 1200</span>
                  </div>
                  <a
                    href={BOUTIQUE_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#8A6A2B] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Get directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
