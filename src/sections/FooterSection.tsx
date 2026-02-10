import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Linkedin, Instagram, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 bg-secondary-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
            {/* Brand */}
            <div>
              <a
                href="#"
                className="inline-block font-display font-bold text-xl text-primary-light mb-4"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                LEGEN<span className="text-[#4F6DFF]">SYSTEM</span>
              </a>
              <p className="text-sm text-secondary-light mb-4">
                AI-powered voice receptionist for modern businesses. Never miss a call again.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary-light hover:bg-[#4F6DFF]/20 hover:text-[#4F6DFF] transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary-light hover:bg-[#4F6DFF]/20 hover:text-[#4F6DFF] transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://wa.me/97400000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary-light hover:bg-[#4F6DFF]/20 hover:text-[#4F6DFF] transition-colors"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-primary-light mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@legensystem.com"
                    className="flex items-center gap-2 text-sm text-secondary-light hover:text-[#4F6DFF] transition-colors"
                  >
                    <Mail size={16} />
                    <span>info@legensystem.com</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-secondary-light">
                  <MapPin size={16} />
                  <span>Serving Qatar & GCC</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-primary-light mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      const demoSection = document.querySelector('#demo');
                      demoSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-secondary-light hover:text-[#4F6DFF] transition-colors"
                  >
                    Try Live Demo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const useCasesSection = document.querySelector('#use-cases');
                      useCasesSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-secondary-light hover:text-[#4F6DFF] transition-colors"
                  >
                    Use Cases
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const consultationSection = document.querySelector('#consultation');
                      consultationSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-secondary-light hover:text-[#4F6DFF] transition-colors"
                  >
                    Book Consultation
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-secondary-light/50">
                &copy; {new Date().getFullYear()} Legen System. All rights reserved.
              </p>
              <p className="text-xs text-secondary-light/50">
                Remote setup • Local understanding • In-person meetings available in Qatar
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
