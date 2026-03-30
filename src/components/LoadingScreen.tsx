import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const phases = [
  'Initializing...',
  'Tracing Signal Geometry...',
  'Placing Core Marker...',
  'Rendering IEEE Wordmark...',
  'Finalizing AP-S Lockup...',
];

const logoColors = {
  navy: '#1A3761',
  blue: '#00629B',
  teal: '#0D9AA6',
  green: '#7DC242',
  orange: '#F5A623',
};

export const LoadingScreen: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 4) {
        setStep(step + 1);
      } else {
        setTimeout(onFinished, 1000);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [step, onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-surface-dim"
    >
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 space-y-1 font-mono text-[10px] text-primary">
          <p>INITIALIZING_CORE_SYSTEMS...</p>
          <p>ESTABLISHING_UPLINK_092...</p>
          <p>DECRYPTING_MISSION_DATA...</p>
        </div>
        <div className="absolute right-10 bottom-10 space-y-1 text-right font-mono text-[10px] text-primary">
          <p>LAT: 22.5726 N</p>
          <p>LNG: 88.3639 E</p>
          <p>ALT: 12.4 KM</p>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative flex flex-col items-center px-6">
        <div className="relative w-[320px] sm:w-[440px] md:w-[620px]">
          <svg viewBox="0 0 1026 375" className="h-auto w-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0  0 1 0 0 0.72  0 0 1 0 0.92  0 0 0 0.45 0"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d="M16 184 L16 306 C16 330 30 340 54 340 H148 C94 332 52 310 28 270 C20 255 17 236 16 184 Z"
              fill={logoColors.navy}
              initial={{ opacity: 0, y: 14 }}
              animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            />

            <motion.path
              d="M54 31 C54 146 112 238 246 289"
              stroke={logoColors.blue}
              strokeWidth="34"
              strokeLinecap="square"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={step >= 1 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              filter="url(#logo-glow)"
            />
            <motion.path
              d="M114 31 C114 124 165 198 285 228"
              stroke={logoColors.teal}
              strokeWidth="34"
              strokeLinecap="square"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={step >= 1 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.16 }}
              filter="url(#logo-glow)"
            />
            <motion.path
              d="M174 31 C174 102 218 158 315 170"
              stroke={logoColors.green}
              strokeWidth="28"
              strokeLinecap="square"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={step >= 1 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut', delay: 0.28 }}
              filter="url(#logo-glow)"
            />

            <motion.circle
              cx="280"
              cy="50"
              r="30"
              fill={logoColors.orange}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={step >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              style={{ transformOrigin: 'center', transformBox: 'fill-box' as any }}
              filter="url(#logo-glow)"
            />

            <motion.g
              initial={{ opacity: 0, x: 22, y: -10 }}
              animate={step >= 3 ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 22, y: -10 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <text
                x="382"
                y="102"
                fill={logoColors.blue}
                fontSize="136"
                fontWeight="900"
                letterSpacing="-8"
                fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif"
              >
                IEEE
              </text>
            </motion.g>

            <motion.g
              initial={{ opacity: 0, y: 26 }}
              animate={step >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <text
                x="330"
                y="342"
                fill={logoColors.teal}
                fontSize="286"
                fontWeight="900"
                letterSpacing="-18"
                fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif"
              >
                AP-
              </text>
              <text
                x="810"
                y="342"
                fill={logoColors.teal}
                fontSize="286"
                fontWeight="900"
                letterSpacing="-12"
                fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif"
              >
                S
              </text>
              <text
                x="988"
                y="161"
                fill={logoColors.teal}
                fontSize="34"
                fontWeight="700"
                fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif"
              >
                TM
              </text>
            </motion.g>
          </svg>
        </div>

        <div className="relative mt-12 h-1 w-64 overflow-hidden bg-surface-container-highest">
          <motion.div
            className="absolute inset-0 bg-primary shadow-[0_0_10px_rgba(0,212,255,0.8)]"
            initial={{ x: '-100%' }}
            animate={{ x: `${(step / 4) * 100 - 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-4 text-center font-label text-[10px] uppercase tracking-[0.4em] text-primary/60 animate-pulse">
          {phases[step]}
        </p>
      </div>
    </motion.div>
  );
};

