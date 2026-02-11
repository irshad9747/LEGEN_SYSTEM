import { useEffect, useRef, useState } from 'react';
import { useRetell } from '@/hooks/useRetell';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Phone, Volume2, X, Play, Square } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';




gsap.registerPlugin(ScrollTrigger);

const DemoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);


  const { isCallActive, agentState, error, startCall, stopCall } = useRetell();
  const [showDialog, setShowDialog] = useState(false);


  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const console = consoleRef.current;
    const phone = phoneRef.current;

    if (!section || !headline || !console || !phone) return;

    const ctx = gsap.context(() => {
      // Headline Animation
      gsap.fromTo(
        headline,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // Start when top of section hits 80% viewport height
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards Animation (Staggered)
      gsap.fromTo(
        [console, phone],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleStartVoiceDemo = async () => {
    try {
      setShowDialog(true);

      const agentId = import.meta.env.VITE_RETELL_AGENT_ID || 'agent_feec06aac5c5f41b7497892a86';

      console.log('Using Agent ID:', agentId);

      // Fetch access token from backend - works for both local and Vercel production
      const apiEndpoint = import.meta.env.PROD
        ? '/api/create-web-call'
        : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/create-web-call`;

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create web call');
      }

      const data = await response.json();
      await startCall(data.access_token);
    } catch (error) {
      console.error('Error starting demo:', error);
      setShowDialog(false);
    }
  };

  const handleStopVoiceDemo = () => {
    stopCall();
    setShowDialog(false);
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative w-full py-20 bg-primary-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light uppercase tracking-tight mb-4">
            Try the AI Receptionist <span className="text-[#4F6DFF]">Live</span>
          </h2>
          <p className="text-base lg:text-lg text-secondary-light max-w-xl mx-auto">
            This is a real AI receptionist demo. Ask anything. Experience how it handles customer calls.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Voice Console Card */}
          <div
            ref={consoleRef}
            className="glass-card rounded-3xl p-6 lg:p-8 glow-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#4F6DFF]/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-[#4F6DFF]" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-primary-light">
                  AI Receptionist — Live
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full live-pulse" />
                  <span className="text-xs font-mono text-secondary-light uppercase">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Waveform Display */}
            <div className="h-32 bg-[#070A12] rounded-2xl border border-white/5 flex items-center justify-center mb-6 overflow-hidden">
              {isCallActive ? (
                <div className="flex items-center gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-[#4F6DFF] rounded-full waveform-bar"
                      style={{
                        height: `${Math.random() * 40 + 8}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1 opacity-30">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-2 bg-secondary-light rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Status Text */}
            <div className="text-center mb-6">
              <p className="text-sm text-secondary-light">
                {error ? (
                  <span className="text-red-400">{error}</span>
                ) : isCallActive ? (
                  <span className="text-[#4F6DFF] flex items-center justify-center gap-2">
                    <Volume2 size={16} />
                    Listening... Speak now
                  </span>
                ) : (
                  'Click to start a voice conversation'
                )}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={isCallActive ? handleStopVoiceDemo : handleStartVoiceDemo}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium transition-all duration-300 ${isCallActive
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-[#4F6DFF] text-white btn-hover glow-border'
                }`}
            >
              {isCallActive ? (
                <>
                  <Square size={18} fill="currentColor" />
                  <span>Stop Voice Demo</span>
                </>
              ) : (
                <>
                  <Play size={18} fill="currentColor" />
                  <span>Start Voice Demo</span>
                </>
              )}
            </button>

            {/* Micro Copy */}
            <p className="text-center text-xs text-secondary-light/60 mt-4">
              Experience enterprise-grade AI voice technology.
              <br />
              <span className="text-[#4F6DFF]">No humans. No scripts.</span>
            </p>
          </div>

          {/* Phone Call Card */}
          <div
            ref={phoneRef}
            className="glass-card rounded-3xl p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary-light" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-primary-light">
                  Prefer Calling?
                </h3>
                <p className="text-xs text-secondary-light">
                  Call the demo number directly
                </p>
              </div>
            </div>

            {/* Phone Number Display */}
            <div className="bg-[#070A12] rounded-2xl border border-white/5 p-6 mb-6">
              <p className="text-xs font-mono text-secondary-light/60 uppercase tracking-wider mb-2">
                Demo Number
              </p>
              <a
                href="tel:+12317743468"
                className="font-display text-2xl lg:text-3xl text-primary-light hover:text-[#4F6DFF] transition-colors"
              >
                +1 (231) 774-3468
              </a>
              <p className="text-xs text-secondary-light/60 mt-2">
                This is a live AI demo number. Click to call on mobile.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-secondary-light">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                </div>
                <span>Real-time voice conversation</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary-light">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                </div>
                <span>Natural speech understanding</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary-light">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                </div>
                <span>Instant response, no wait time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Demo Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#0B0F1C] border border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary-light flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#4F6DFF]" />
              Voice Demo Active
            </DialogTitle>
            <DialogDescription className="sr-only">
              Live voice conversation with AI receptionist
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="flex flex-col items-center">
              {/* Animated Orb */}
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full bg-[#4F6DFF]/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-[#4F6DFF]/30 animate-ping" style={{ animationDelay: '0.3s' }} />
                <div className="absolute inset-4 rounded-full bg-[#4F6DFF] glow-orb flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Waveform */}
              <div className="flex items-center gap-1 mb-4">
                {agentState === 'speaking' ? (
                  [...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#4F6DFF] rounded-full waveform-bar"
                      style={{
                        height: `${Math.random() * 32 + 4}px`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))
                ) : (
                  // Static line when not speaking
                  <div className="w-full h-1 bg-[#4F6DFF]/20 rounded-full" />
                )}
              </div>

              <p className="text-center text-secondary-light mb-2">
                {agentState === 'speaking' ? 'Agent is speaking...' : 'Agent is listening...'}
              </p>
              <p className="text-center text-xs text-secondary-light/60">
                Try saying: "Hello, I'd like to book an appointment"
              </p>
            </div>
          </div>
          <button
            onClick={handleStopVoiceDemo}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full font-medium hover:bg-red-500/30 transition-colors"
          >
            <X size={18} />
            <span>End Demo</span>
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DemoSection;
