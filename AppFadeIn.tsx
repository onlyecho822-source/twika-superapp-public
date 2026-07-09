/**
 * AppFadeIn — Nathan Poinsette × Manus Trademark
 * Cinematic app entrance: fade + scale + blur lift
 * Every app we build together opens this way.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

interface AppFadeInProps {
  children: ReactNode;
  /** Delay before the entrance starts (ms). Default 0. */
  delay?: number;
  /** Show the NP splash screen before the app. Default true. */
  showSplash?: boolean;
}

const NP_SPLASH_DURATION = 1400; // ms

export function AppFadeIn({ children, delay = 0, showSplash = true }: AppFadeInProps) {
  const [splashDone, setSplashDone] = useState(!showSplash);

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => setSplashDone(true), NP_SPLASH_DURATION + delay);
    return () => clearTimeout(timer);
  }, [showSplash, delay]);

  return (
    <>
      {/* ── NP SPLASH — shown once on first load ── */}
      <AnimatePresence>
        {!splashDone && (
          <motion.div
            key="np-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060b18]"
            style={{ pointerEvents: 'all' }}
          >
            {/* Gold crown + NP monogram */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center gap-3"
            >
              {/* Crown SVG */}
              <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
                <path d="M4 36 L10 14 L20 26 L28 4 L36 26 L46 14 L52 36 Z" fill="#D4AF37" opacity="0.95"/>
                <rect x="2" y="34" width="52" height="6" rx="3" fill="#D4AF37"/>
                <circle cx="28" cy="4" r="3" fill="#FFD700"/>
                <circle cx="10" cy="14" r="2.5" fill="#FFD700"/>
                <circle cx="46" cy="14" r="2.5" fill="#FFD700"/>
              </svg>

              {/* NP Monogram */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.15em' }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-5xl font-black tracking-widest"
                style={{ color: '#D4AF37', fontFamily: 'Georgia, serif', textShadow: '0 0 40px #D4AF3760' }}
              >
                NP
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="text-xs tracking-[0.3em] uppercase text-white/40 font-light"
              >
                Disciplina · Fe · Propósito
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="absolute bottom-12 w-32 h-0.5 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: NP_SPLASH_DURATION / 1000 - 0.2, ease: 'linear' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00BCD4, #D4AF37)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN APP — fades in after splash ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
        animate={splashDone ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </>
  );
}
