import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Demo', href: '#demo' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'How It Works', href: '#education' },
    { label: 'Book Consultation', href: '#consultation' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#070A12]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-display font-bold text-lg lg:text-xl tracking-tight text-primary-light"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              LEGEN<span className="text-[#4F6DFF]">SYSTEM</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-secondary-light hover:text-primary-light transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#consultation')}
                className="px-5 py-2.5 bg-[#4F6DFF] text-white text-sm font-medium rounded-full btn-hover"
              >
                Book a Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-primary-light"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-[#0B0F1C] border-b border-white/5 p-6 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-left text-lg text-primary-light py-2"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#consultation')}
              className="mt-4 px-5 py-3 bg-[#4F6DFF] text-white font-medium rounded-full"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
