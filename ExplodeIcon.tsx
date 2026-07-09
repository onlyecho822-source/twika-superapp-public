/**
 * ExplodeIcon — Nathan Poinsette × Manus Trademark
 * 3D icon that explodes into colored particles on tap/click.
 * Idle: gentle float + glow. Hover: scale + 3D tilt. Tap: BOOM.
 * Every app we build together uses this for interactive icons.
 */
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useCallback, type ReactNode } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
}

interface ExplodeIconProps {
  /** The icon content — emoji, SVG, or any ReactNode */
  children: ReactNode;
  /** Gradient CSS string for the card background */
  gradient?: string;
  /** Accent color for particles and glow */
  accentColor?: string;
  /** Label shown below the icon */
  label?: string;
  /** Label sub-text (e.g. price) */
  sublabel?: string;
  /** Whether this icon is currently selected */
  selected?: boolean;
  /** Called when the icon is clicked */
  onClick?: () => void;
  /** Extra className on the outer wrapper */
  className?: string;
}

const PARTICLE_COLORS = [
  '#00BCD4', '#D4AF37', '#22c55e', '#f97316',
  '#8b5cf6', '#ef4444', '#3b82f6', '#ffffff',
];

function generateParticles(accentColor: string): Particle[] {
  const count = 14;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 0,
    y: 0,
    color: i % 3 === 0 ? accentColor : PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    size: Math.random() * 6 + 4,
    angle: (360 / count) * i + Math.random() * 20 - 10,
    distance: Math.random() * 60 + 40,
  }));
}

export function ExplodeIcon({
  children,
  gradient = 'from-[#0e7490] to-[#00BCD4]',
  accentColor = '#00BCD4',
  label,
  sublabel,
  selected = false,
  onClick,
  className = '',
}: ExplodeIconProps) {
  const [exploding, setExploding] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const controls = useAnimation();

  const handleTap = useCallback(async () => {
    if (exploding) return;

    // 1. Compress → explode
    await controls.start({
      scale: 0.82,
      rotateX: 15,
      transition: { duration: 0.08, ease: 'easeIn' },
    });

    // 2. Spawn particles
    setParticles(generateParticles(accentColor));
    setExploding(true);

    // 3. Bounce back with 3D flip
    await controls.start({
      scale: [1.18, 1.05, 1],
      rotateX: [-8, 4, 0],
      rotateY: [6, -3, 0],
      transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
    });

    // 4. Clear particles after animation
    setTimeout(() => {
      setExploding(false);
      setParticles([]);
    }, 600);

    onClick?.();
  }, [exploding, controls, accentColor, onClick]);

  return (
    <div className={`relative flex flex-col items-center gap-1.5 cursor-pointer select-none ${className}`}>
      {/* ── Particle burst ── */}
      <AnimatePresence>
        {exploding && particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: tx, y: ty, scale: 0, rotate: p.angle * 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.2, 0, 0.8, 1] }}
              className="absolute pointer-events-none rounded-full z-20"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                top: '50%',
                left: '50%',
                marginTop: -p.size / 2,
                marginLeft: -p.size / 2,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* ── Icon card ── */}
      <motion.div
        animate={controls}
        whileHover={{
          scale: 1.12,
          rotateX: -8,
          rotateY: 6,
          transition: { duration: 0.2 },
        }}
        onTap={handleTap}
        style={{ transformStyle: 'preserve-3d', perspective: 400 }}
        className={`
          relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
          bg-gradient-to-br ${gradient}
          shadow-lg transition-shadow duration-200
          ${selected
            ? `ring-2 ring-[${accentColor}] shadow-[0_0_20px_${accentColor}60]`
            : 'hover:shadow-xl'
          }
        `}
      >
        {/* Gloss overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
          }}
        />
        {/* Idle float animation */}
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
          style={{ filter: selected ? `drop-shadow(0 0 8px ${accentColor})` : 'none' }}
        >
          {children}
        </motion.span>

        {/* Selected glow ring */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 2px ${accentColor}, 0 0 24px ${accentColor}50`,
            }}
          />
        )}
      </motion.div>

      {/* ── Label ── */}
      {label && (
        <div className="text-center">
          <div
            className={`text-xs font-bold leading-tight transition-colors ${
              selected ? `text-[${accentColor}]` : 'text-gray-700'
            }`}
            style={selected ? { color: accentColor } : {}}
          >
            {label}
          </div>
          {sublabel && (
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">{sublabel}</div>
          )}
        </div>
      )}
    </div>
  );
}
