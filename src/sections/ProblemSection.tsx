import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneOff, Users, Moon, RotateCcw, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: PhoneOff,
    title: 'Calls go unanswered',
    description: 'Every missed call is a potential customer lost to a competitor.',
  },
  {
    icon: Users,
    title: 'Staff is busy or unavailable',
    description: 'Your team can\'t be on the phone and serving customers at the same time.',
  },
  {
    icon: Moon,
    title: 'After-hours inquiries are lost',
    description: 'Customers call when it\'s convenient for them—not during your business hours.',
  },
  {
    icon: RotateCcw,
    title: 'Follow-ups don\'t happen',
    description: 'Without a system, leads slip through the cracks and never convert.',
  },
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const problemsEl = problemsRef.current;
    const solution = solutionRef.current;

    if (!section || !headline || !problemsEl || !solution) return;

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

      // Problem cards animation
      const cards = problemsEl.querySelectorAll('.problem-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: problemsEl,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Solution banner animation
      gsap.fromTo(
        solution,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: solution,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-primary-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div ref={headlineRef} className="text-center mb-12 lg:mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light uppercase tracking-tight mb-4">
              Missed Calls ={' '}
              <span className="text-red-400">Lost Revenue</span>
            </h2>
            <p className="text-base lg:text-lg text-secondary-light max-w-2xl mx-auto">
              The problem is clear. Every ring that goes unanswered costs you money.
            </p>
          </div>

          {/* Problems Grid */}
          <div
            ref={problemsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-12"
          >
            {problems.map((problem, index) => (
              <div
                key={index}
                className="problem-card glass-card rounded-2xl p-6 border-l-4 border-l-red-400/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-400/10 flex items-center justify-center flex-shrink-0">
                    <problem.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-primary-light mb-1">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-secondary-light">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transition Arrow */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#4F6DFF]/10 flex items-center justify-center">
              <ArrowDown className="w-6 h-6 text-[#4F6DFF] animate-bounce" />
            </div>
          </div>

          {/* Solution Banner */}
          <div
            ref={solutionRef}
            className="glass-card rounded-3xl p-8 lg:p-12 text-center glow-border"
          >
            <h3 className="font-display font-bold text-2xl lg:text-3xl text-primary-light mb-4">
              AI Fixes This <span className="text-[#4F6DFF]">Automatically</span>
            </h3>
            <p className="text-base text-secondary-light max-w-xl mx-auto mb-6">
              An AI receptionist answers every call instantly, 24/7. It never gets tired,
              never takes a break, and never misses an opportunity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#4F6DFF]/10 rounded-full">
                <span className="w-2 h-2 bg-[#4F6DFF] rounded-full" />
                <span className="text-sm text-secondary-light">24/7 Availability</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#4F6DFF]/10 rounded-full">
                <span className="w-2 h-2 bg-[#4F6DFF] rounded-full" />
                <span className="text-sm text-secondary-light">Instant Response</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#4F6DFF]/10 rounded-full">
                <span className="w-2 h-2 bg-[#4F6DFF] rounded-full" />
                <span className="text-sm text-secondary-light">Zero Missed Calls</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
