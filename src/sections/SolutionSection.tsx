import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Filter, Calendar, Database, Globe, BarChart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Mic,
    title: 'AI Voice Receptionist',
    description: 'Human-like conversations that answer, qualify, and convert callers.',
  },
  {
    icon: Filter,
    title: 'Lead Capture & Qualification',
    description: 'Automatically gather information and score leads based on your criteria.',
  },
  {
    icon: Calendar,
    title: 'Appointment Booking',
    description: 'Check real-time availability and book meetings directly into your calendar.',
  },
  {
    icon: Database,
    title: 'CRM Integration',
    description: 'Seamlessly sync with your existing tools and workflows.',
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'English & Arabic support for diverse customer bases.',
  },
  {
    icon: BarChart,
    title: 'Analytics Dashboard',
    description: 'Track call volume, conversion rates, and ROI in real-time.',
  },
];

const SolutionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !cards || !cta) return;

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

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.capability-card');
      gsap.fromTo(
        cardElements,
        { y: 50, opacity: 0, rotateY: 10 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        cta,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToConsultation = () => {
    const consultationSection = document.querySelector('#consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-secondary-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div ref={headlineRef} className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F6DFF]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#4F6DFF]" />
              <span className="text-xs font-mono text-[#4F6DFF] uppercase tracking-wider">
                What We Do
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light uppercase tracking-tight mb-4">
              We Don&apos;t Sell Tools.
              <br />
              We Build <span className="text-[#4F6DFF]">Systems</span>.
            </h2>
            <p className="text-base lg:text-lg text-secondary-light max-w-2xl mx-auto">
              Legen System designs AI-powered call systems that help businesses capture,
              manage, and convert every inquiry.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12"
          >
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="capability-card glass-card rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-[#4F6DFF]/10 flex items-center justify-center mb-4">
                  <capability.icon className="w-6 h-6 text-[#4F6DFF]" />
                </div>
                <h3 className="font-display font-semibold text-primary-light mb-2">
                  {capability.title}
                </h3>
                <p className="text-sm text-secondary-light">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="text-center">
            <p className="text-secondary-light mb-4">
              No technical knowledge required. We handle everything.
            </p>
            <button
              onClick={scrollToConsultation}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F6DFF] text-white font-medium rounded-full btn-hover glow-border"
            >
              <span>Get Started</span>
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
