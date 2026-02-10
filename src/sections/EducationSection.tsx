import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Ear, UserCheck, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageSquare,
    title: 'Real-time voice conversations',
    description: 'Responds instantly with natural, human-like speech',
  },
  {
    icon: Ear,
    title: 'Understands natural speech',
    description: 'No rigid menus—just talk naturally',
  },
  {
    icon: UserCheck,
    title: 'Handles interruptions naturally',
    description: 'Adapts to the flow of conversation',
  },
  {
    icon: Calendar,
    title: 'Collects caller information',
    description: 'Gathers details and qualifies leads automatically',
  },
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const featuresEl = featuresRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !featuresEl || !cta) return;

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
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Features stagger animation
      const featureCards = featuresEl.querySelectorAll('.feature-card');
      gsap.fromTo(
        featureCards,
        { y: 60, opacity: 0, rotateY: 15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresEl,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.5,
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
            end: 'top 60%',
            scrub: 0.5,
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
      id="education"
      className="relative w-full py-20 lg:py-32 bg-primary-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light uppercase tracking-tight mb-4">
            You Just Spoke to an{' '}
            <span className="text-[#4F6DFF]">AI Receptionist</span>
          </h2>
          <p className="text-base lg:text-lg text-secondary-light max-w-2xl mx-auto">
            This is how modern businesses stop losing customers.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card glass-card rounded-2xl p-6 card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4F6DFF]/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#4F6DFF]" />
              </div>
              <h3 className="font-display font-semibold text-primary-light mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div ref={ctaRef} className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-lg text-secondary-light">
              Ready to never miss a call again?
            </p>
            <button
              onClick={scrollToConsultation}
              className="flex items-center gap-2 px-6 py-3 bg-[#4F6DFF] text-white font-medium rounded-full btn-hover glow-border"
            >
              <span>Get Your AI Receptionist</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
