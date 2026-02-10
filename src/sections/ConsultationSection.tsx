import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, User, Building, Phone, Clock, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const timeSlots = [
  'Morning (9AM - 12PM)',
  'Afternoon (12PM - 5PM)',
  'Evening (5PM - 8PM)',
];

const ConsultationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessType: '',
    phone: '',
    preferredTime: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const form = formRef.current;

    if (!section || !headline || !form) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        form,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.businessType || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Thank you! We will contact you soon.');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="consultation"
      className="relative w-full py-20 lg:py-32 bg-primary-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Headline */}
          <div ref={headlineRef} className="text-center mb-10 lg:mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light uppercase tracking-tight mb-4">
              Want This AI Answering{' '}
              <span className="text-[#4F6DFF]">Your Calls</span>?
            </h2>
            <p className="text-base lg:text-lg text-secondary-light">
              We design a custom AI receptionist using the same system you just spoke to.
            </p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-6 lg:p-10 glow-border"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-display font-semibold text-xl text-primary-light mb-2">
                  Thank You!
                </h3>
                <p className="text-secondary-light">
                  We&apos;ve received your request. Our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-light/50" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 text-primary-light placeholder:text-secondary-light/30 focus:border-[#4F6DFF]/50 focus:ring-2 focus:ring-[#4F6DFF]/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Business Type *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-light/50" />
                      <input
                        type="text"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        placeholder="e.g., Dental Clinic, Real Estate Agency"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 text-primary-light placeholder:text-secondary-light/30 focus:border-[#4F6DFF]/50 focus:ring-2 focus:ring-[#4F6DFF]/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-light/50" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+974 0000 0000"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 text-primary-light placeholder:text-secondary-light/30 focus:border-[#4F6DFF]/50 focus:ring-2 focus:ring-[#4F6DFF]/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Preferred Contact Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-light/50" />
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#070A12] border border-white/10 text-primary-light focus:border-[#4F6DFF]/50 focus:ring-2 focus:ring-[#4F6DFF]/10 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-light/50 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-[#4F6DFF] text-white font-medium rounded-xl btn-hover glow-border disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Book a Free Consultation</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-secondary-light/50 mt-4">
                  No commitment required. We&apos;ll discuss your needs and provide a custom solution.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
