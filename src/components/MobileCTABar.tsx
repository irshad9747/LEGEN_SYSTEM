import { useState, useEffect } from 'react';
import { Mic, Phone } from 'lucide-react';

const MobileCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.querySelector('#demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#0B0F1C]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToDemo}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#4F6DFF] text-white font-medium rounded-full btn-hover"
          >
            <Mic size={18} />
            <span>Talk to AI</span>
          </button>
          <a
            href="tel:+97400000000"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-primary-light font-medium rounded-full"
          >
            <Phone size={18} />
            <span>Call Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileCTABar;
