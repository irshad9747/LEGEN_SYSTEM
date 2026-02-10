import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ChevronRight, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const liveIndicatorRef = useRef<HTMLDivElement>(null);
  const ctaLeftRef = useRef<HTMLDivElement>(null);
  const ctaRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const liveIndicator = liveIndicatorRef.current;
    const ctaLeft = ctaLeftRef.current;
    const ctaRight = ctaRightRef.current;

    if (!section || !headline || !subheadline || !liveIndicator || !ctaLeft || !ctaRight) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.2 });

      loadTl
        .fromTo(
          headline,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
        )
        .fromTo(
          subheadline,
          { y: -18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          liveIndicator,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          [ctaLeft, ctaRight],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        );

      // Scroll-driven exit animation (Desktop Only)
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 1024px)": function () {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=130%',
              pin: true,
              scrub: 0.6,
              onLeaveBack: () => {
                // Reset all elements to visible when scrolling back
                gsap.set([headline, subheadline, liveIndicator, ctaLeft, ctaRight], {
                  opacity: 1,
                  y: 0,
                  x: 0,
                });
              },
            },
          });

          // ENTRANCE (0-30%): Hold position (already animated on load)
          // SETTLE (30-70%): Static
          // EXIT (70-100%): Elements exit

          scrollTl
            .fromTo(
              headline,
              { y: 0, opacity: 1 },
              { y: '-18vh', opacity: 0, ease: 'power2.in' },
              0.7
            )
            .fromTo(
              subheadline,
              { y: 0, opacity: 1 },
              { y: '-14vh', opacity: 0, ease: 'power2.in' },
              0.72
            )
            .fromTo(
              liveIndicator,
              { y: 0, opacity: 1 },
              { y: '-10vh', opacity: 0, ease: 'power2.in' },
              0.74
            )
            .fromTo(
              ctaLeft,
              { x: 0, opacity: 1 },
              { x: '-6vw', opacity: 0, ease: 'power2.in' },
              0.75
            )
            .fromTo(
              ctaRight,
              { x: 0, opacity: 1 },
              { x: '6vw', opacity: 0, ease: 'power2.in' },
              0.75
            );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.querySelector('#demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-primary-dark overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="absolute inset-0 bg-gradient-vignette" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Live Indicator */}
        <div
          ref={liveIndicatorRef}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full live-pulse" />
            <span className="text-xs font-mono text-secondary-light uppercase tracking-wider">
              Live AI Demo Available Now
            </span>
          </div>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-4 lg:mb-6">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-light uppercase tracking-tight">
            Never Miss a
            <br />
            <span className="text-[#4F6DFF]">Customer Call</span> Again.
          </h1>
        </div>

        {/* Subheadline */}
        <div
          ref={subheadlineRef}
          className="text-center max-w-2xl mx-auto mb-10 lg:mb-12"
        >
          <p className="text-base lg:text-lg text-secondary-light">
            Experience a live AI Voice Receptionist that answers, understands,
            and converts calls — 24/7.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div ref={ctaLeftRef}>
            <button
              onClick={scrollToDemo}
              className="flex items-center gap-2 px-6 py-3.5 lg:px-8 lg:py-4 bg-[#4F6DFF] text-white font-medium rounded-full btn-hover glow-border"
            >
              <span>Talk to the AI Now</span>
              <ArrowDown size={18} />
            </button>
          </div>
          <div ref={ctaRightRef}>
            <a
              href="tel:+97400000000"
              className="flex items-center gap-2 px-6 py-3.5 lg:px-8 lg:py-4 bg-white/5 border border-white/10 text-primary-light font-medium rounded-full btn-hover hover:bg-white/10 transition-colors"
            >
              <Phone size={20} />
              <span>Call the AI Demo</span>
              <ChevronRight size={16} className="opacity-60" />
            </a>
          </div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;
