import { motion } from 'motion/react';

interface LeafClusterProps {
  className?: string;
  flipX?: boolean;
  rotate?: number;
}

export function PinkLeafCluster({
  className = '',
  flipX = false,
  rotate = 0,
}: LeafClusterProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 0.72, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none select-none ${className}`}
      style={{
        transform: `${flipX ? 'scaleX(-1)' : ''} rotate(${rotate}deg)`,
      }}
    >
      <svg
        viewBox="0 0 260 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-leaf-sway h-full w-full drop-shadow-[0_6px_16px_rgba(184,107,125,0.12)]"
      >
        <defs>
          <linearGradient id="pinkLeafA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8D4DD" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#DE97A9" stopOpacity="0.68" />
          </linearGradient>
          <linearGradient id="pinkLeafB" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FADEE5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C97C90" stopOpacity="0.62" />
          </linearGradient>
          <radialGradient id="blossomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF6F8" />
            <stop offset="60%" stopColor="#F6C5D1" />
            <stop offset="100%" stopColor="#E397AB" />
          </radialGradient>
        </defs>

        {/* Graceful botanical stem */}
        <path
          d="M235 20C178 44 126 96 76 176"
          stroke="#C88294"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />

        {/* Leaves along the stem */}
        <path
          d="M196 42C162 24 128 32 114 60C146 66 178 58 196 42Z"
          fill="url(#pinkLeafA)"
        />
        <path
          d="M174 74C198 104 196 138 172 156C154 128 156 96 174 74Z"
          fill="url(#pinkLeafB)"
        />
        <path
          d="M142 96C106 82 72 92 56 122C90 128 124 116 142 96Z"
          fill="url(#pinkLeafA)"
        />
        <path
          d="M116 132C136 164 130 198 104 212C90 184 96 154 116 132Z"
          fill="url(#pinkLeafB)"
        />
        <path
          d="M86 162C52 156 26 172 18 200C48 200 72 184 86 162Z"
          fill="url(#pinkLeafA)"
        />

        {/* Delicate 5-petal pink blossom */}
        <g transform="translate(178 54)">
          <ellipse cx="0" cy="-13" rx="7" ry="11" fill="url(#blossomGlow)" />
          <ellipse cx="12" cy="-4" rx="7" ry="11" transform="rotate(72 12 -4)" fill="url(#blossomGlow)" />
          <ellipse cx="8" cy="10" rx="7" ry="11" transform="rotate(144 8 10)" fill="url(#blossomGlow)" />
          <ellipse cx="-8" cy="10" rx="7" ry="11" transform="rotate(216 -8 10)" fill="url(#blossomGlow)" />
          <ellipse cx="-12" cy="-4" rx="7" ry="11" transform="rotate(288 -12 -4)" fill="url(#blossomGlow)" />
          <circle cx="0" cy="0" r="4.5" fill="#E8B98D" />
        </g>

        {/* Secondary tiny blossom */}
        <g transform="translate(106 112) scale(0.72)">
          <ellipse cx="0" cy="-12" rx="6.5" ry="10" fill="url(#blossomGlow)" />
          <ellipse cx="11" cy="-3" rx="6.5" ry="10" transform="rotate(72 11 -3)" fill="url(#blossomGlow)" />
          <ellipse cx="7" cy="9" rx="6.5" ry="10" transform="rotate(144 7 9)" fill="url(#blossomGlow)" />
          <ellipse cx="-7" cy="9" rx="6.5" ry="10" transform="rotate(216 -7 9)" fill="url(#blossomGlow)" />
          <ellipse cx="-11" cy="-3" rx="6.5" ry="10" transform="rotate(288 -11 -3)" fill="url(#blossomGlow)" />
          <circle cx="0" cy="0" r="4" fill="#E8B98D" />
        </g>
      </svg>
    </motion.div>
  );
}

export function PinkBlossomSvg({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="timelinePetal" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF7F9" />
          <stop offset="58%" stopColor="#F5BECB" />
          <stop offset="100%" stopColor="#D97E96" />
        </radialGradient>
      </defs>
      <g transform="translate(32 32)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d="M0 -4C6 -12 10 -22 0 -27C-10 -22 -6 -12 0 -4Z"
            fill="url(#timelinePetal)"
            stroke="#C77188"
            strokeWidth="0.6"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="5.5" fill="#F3D299" stroke="#C88E55" strokeWidth="0.8" />
        <circle cx="-2" cy="-1.5" r="1" fill="#8C4F3E" />
        <circle cx="2.2" cy="-1" r="1" fill="#8C4F3E" />
        <circle cx="0" cy="2.3" r="1" fill="#8C4F3E" />
      </g>
    </svg>
  );
}

export function PurpleBlossomSvg({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="purplePetalOuter" cx="50%" cy="35%" r="68%">
          <stop offset="0%" stopColor="#EBC6F0" />
          <stop offset="48%" stopColor="#A648A4" />
          <stop offset="100%" stopColor="#631C68" />
        </radialGradient>
        <radialGradient id="purplePetalInner" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F6DCF8" />
          <stop offset="55%" stopColor="#BD63BB" />
          <stop offset="100%" stopColor="#7C2A80" />
        </radialGradient>
        <radialGradient id="purpleCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCE9B2" />
          <stop offset="60%" stopColor="#E6B258" />
          <stop offset="100%" stopColor="#9A5928" />
        </radialGradient>
      </defs>

      <g transform="translate(40 40)">
        {/* Outer ring of 8 scalloped botanical petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={`outer-${deg}`} transform={`rotate(${deg})`}>
            <path
              d="M0 -6 C8 -15 13 -27 5 -33 C2 -35 0 -33 0 -31 C0 -33 -2 -35 -5 -33 C-13 -27 -8 -15 0 -6 Z"
              fill="url(#purplePetalOuter)"
              stroke="#521656"
              strokeWidth="0.65"
            />
            <path
              d="M0 -10 L0 -26"
              stroke="#F3D6F7"
              strokeOpacity="0.45"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Inner offset layer of 8 lush petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
          <g key={`inner-${deg}`} transform={`rotate(${deg})`}>
            <path
              d="M0 -4 C6 -12 10 -21 3.5 -25.5 C1.5 -27 0 -25.5 0 -24 C0 -25.5 -1.5 -27 -3.5 -25.5 C-10 -21 -6 -12 0 -4 Z"
              fill="url(#purplePetalInner)"
              stroke="#68216D"
              strokeWidth="0.55"
            />
          </g>
        ))}

        {/* Deep plum core halo & golden stamen */}
        <circle cx="0" cy="0" r="8.2" fill="#4B144E" fillOpacity="0.82" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={`stamen-${deg}`} transform={`rotate(${deg})`}>
            <line x1="0" y1="-3" x2="0" y2="-7.5" stroke="#F6D57C" strokeWidth="0.85" />
            <circle cx="0" cy="-8" r="1.15" fill="#FBE6A2" />
          </g>
        ))}
        <circle
          cx="0"
          cy="0"
          r="4.2"
          fill="url(#purpleCenterGlow)"
          stroke="#75411D"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  );
}

export function HangingFloralGarland() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: -14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none mx-auto mb-3 flex justify-center"
    >
      <svg viewBox="0 0 220 78" fill="none" className="h-16 w-48 sm:h-20 sm:w-56">
        <path
          d="M20 8C65 44 155 44 200 8"
          stroke="#CFA0AC"
          strokeWidth="1.4"
          strokeDasharray="2 3"
        />
        <line x1="110" y1="35" x2="110" y2="54" stroke="#CFA0AC" strokeWidth="1.2" />
        <g transform="translate(110 56) scale(0.55)">
          <circle cx="0" cy="-16" r="9" fill="#F5C3CF" />
          <circle cx="15" cy="-5" r="9" fill="#F8D2DC" />
          <circle cx="9" cy="13" r="9" fill="#F2B4C4" />
          <circle cx="-9" cy="13" r="9" fill="#F2B4C4" />
          <circle cx="-15" cy="-5" r="9" fill="#F8D2DC" />
          <circle cx="0" cy="0" r="5" fill="#E8BA88" />
        </g>
        <ellipse cx="66" cy="27" rx="11" ry="5" transform="rotate(24 66 27)" fill="#F3C9D4" />
        <ellipse cx="154" cy="27" rx="11" ry="5" transform="rotate(-24 154 27)" fill="#F3C9D4" />
      </svg>
    </motion.div>
  );
}
