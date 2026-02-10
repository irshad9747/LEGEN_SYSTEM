import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Scissors, Home, GraduationCap, Building2, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: Stethoscope,
    title: 'Clinics & Healthcare',
    features: [
      'Schedule patient appointments 24/7',
      'Handle prescription refill requests',
      'Send appointment reminders',
      'Route urgent calls to on-call staff',
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: Scissors,
    title: 'Salons & Service Businesses',
    features: [
      'Book appointments without back-and-forth',
      'Handle cancellation and rescheduling',
      'Answer pricing and service questions',
      'Capture missed after-hours calls',
    ],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    icon: Home,
    title: 'Real Estate & Consulting',
    features: [
      'Qualify buyer and seller leads instantly',
      'Schedule property viewings',
      'Answer common listing questions',
      'Follow up with potential clients',
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    title: 'Education & Visa Services',
    features: [
      'Handle admission inquiries',
      'Schedule consultation calls',
      'Answer program questions',
      'Collect student information',
    ],
  },
  {
    id: 'local',
    label: 'Local Business',
    icon: Building2,
    title: 'Local & Professional Businesses',
    features: [
      'Never miss a customer inquiry',
      'Handle multiple simultaneous calls',
      'Provide consistent information',
      'Work after hours and weekends',
    ],
  },
];

const WhoItsForSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('healthcare');

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const tabs = tabsRef.current;
    const content = contentRef.current;

    if (!section || !headline || !tabs || !content) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headline,
        { x: -60, opacity: 0 },
        {
          x: 0,
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

      // Tabs animation
      const tabButtons = tabs.querySelectorAll('.tab-button');
      gsap.fromTo(
        tabButtons,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tabs,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content card animation
      gsap.fromTo(
        content,
        { x: 80, opacity: 0, rotateY: 10 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const activeIndustry = industries.find((i) => i.id === activeTab);

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;

    const content = contentRef.current;
    if (content) {
      gsap.to(content, {
        opacity: 0,
        x: -20,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTab(tabId);
          gsap.fromTo(
            content,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out' }
          );
        },
      });
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="relative w-full py-20 lg:py-32 bg-primary-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-25" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Headline & Tabs */}
            <div>
              {/* Headline */}
              <div ref={headlineRef} className="mb-8">
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light uppercase tracking-tight mb-4">
                  Built for{' '}
                  <span className="text-[#4F6DFF]">Businesses</span>
                  <br />
                  That Receive Calls
                </h2>
                <p className="text-base text-secondary-light">
                  Whatever your industry, if customers call you, we can help.
                </p>
              </div>

              {/* Tabs */}
              <div ref={tabsRef} className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => handleTabChange(industry.id)}
                    className={`tab-button flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === industry.id
                        ? 'bg-[#4F6DFF] text-white'
                        : 'bg-white/5 text-secondary-light hover:bg-white/10 hover:text-primary-light'
                      }`}
                  >
                    <industry.icon size={16} />
                    <span>{industry.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Content Card */}
            <div ref={contentRef} className="lg:pt-16">
              {activeIndustry && (
                <div className="glass-card rounded-3xl p-6 lg:p-8 glow-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#4F6DFF]/10 flex items-center justify-center">
                      <activeIndustry.icon className="w-6 h-6 text-[#4F6DFF]" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-primary-light">
                      {activeIndustry.title}
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {activeIndustry.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-secondary-light"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#4F6DFF]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-[#4F6DFF]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
