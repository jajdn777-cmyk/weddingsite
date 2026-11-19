import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Hand, RotateCcw } from 'lucide-react';
import {
  getCountdownBreakdown,
  padTwo,
  toPersianDigits,
  WEDDING_DATE_ISO,
} from '../utils/countdown';
import { PinkLeafCluster } from './FloralDecorations';

interface DigitProps {
  value: string;
  reduceMotion: boolean | null;
}

function SilkDigits({ value, reduceMotion }: DigitProps) {
  const chars = Array.from(value);

  return (
    <span className="inline-flex items-center justify-center tabular-nums" dir="ltr">
      {chars.map((char, index) => {
        const positionFromRight = chars.length - 1 - index;
        return (
          <span
            key={positionFromRight}
            className="relative inline-flex h-[1.3em] min-w-[0.62em] items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={char}
                initial={
                  reduceMotion
                    ? false
                    : { y: '72%', opacity: 0, filter: 'blur(3px)' }
                }
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                exit={
                  reduceMotion
                    ? undefined
                    : { y: '-72%', opacity: 0, filter: 'blur(3px)' }
                }
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex h-full items-center justify-center will-change-transform"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        );
      })}
    </span>
  );
}

export function FoggedCountdown() {
  const reduceMotion = useReducedMotion();
  const [breakdown, setBreakdown] = useState(() =>
    getCountdownBreakdown(WEDDING_DATE_ISO),
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);

  useEffect(() => {
    const update = () => setBreakdown(getCountdownBreakdown(WEDDING_DATE_ISO));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const paintFogLayer = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, Math.round(rect.width));
    const height = Math.max(170, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    // Rose-blush frosted condensation mist blending seamlessly with the pink theme
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(249, 222, 231, 0.94)');
    grad.addColorStop(0.5, 'rgba(244, 207, 220, 0.95)');
    grad.addColorStop(1, 'rgba(247, 214, 225, 0.94)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 14; i++) {
      const cx = ((i * 89 + 29) % 100) * 0.01 * width;
      const cy = ((i * 53 + 19) % 100) * 0.01 * height;
      const r = Math.max(width, height) * (0.16 + (i % 4) * 0.05);
      const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      cloudGrad.addColorStop(0, 'rgba(255, 240, 245, 0.45)');
      cloudGrad.addColorStop(1, 'rgba(244, 207, 220, 0)');
      ctx.fillStyle = cloudGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 48; i++) {
      const dx = ((i * 173 + 11) % 100) * 0.01 * width;
      const dy = ((i * 227 + 37) % 100) * 0.01 * height;
      const dr = 0.8 + (i % 3) * 0.7;
      ctx.fillStyle =
        i % 2 === 0 ? 'rgba(255, 242, 246, 0.38)' : 'rgba(196, 114, 136, 0.09)';
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    if (isCleared) return;
    paintFogLayer();
    const handleResize = () => {
      if (!hasInteracted && !isCleared) {
        paintFogLayer();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCleared, hasInteracted, paintFogLayer]);

  const checkClearedProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    const stepX = Math.max(8, Math.floor(w / 24));
    const stepY = Math.max(8, Math.floor(h / 16));
    const imgData = ctx.getImageData(0, 0, w, h).data;

    let transparentSamples = 0;
    let totalSamples = 0;

    for (let y = 0; y < h; y += stepY) {
      for (let x = 0; x < w; x += stepX) {
        const idx = (y * w + x) * 4 + 3;
        totalSamples++;
        if (imgData[idx] < 90) {
          transparentSamples++;
        }
      }
    }

    if (totalSamples > 0 && transparentSamples / totalSamples >= 0.3) {
      setIsCleared(true);
    }
  };

  const eraseAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const radius = window.innerWidth < 640 ? 48 : 58;
    ctx.globalCompositeOperation = 'destination-out';

    const prev = lastPointRef.current ?? { x, y };
    const dist = Math.hypot(x - prev.x, y - prev.y);
    const steps = Math.max(1, Math.ceil(dist / 10));

    for (let i = 0; i <= steps; i++) {
      const ix = prev.x + ((x - prev.x) * i) / steps;
      const iy = prev.y + ((y - prev.y) * i) / steps;

      const brush = ctx.createRadialGradient(ix, iy, radius * 0.25, ix, iy, radius);
      brush.addColorStop(0, 'rgba(0, 0, 0, 1)');
      brush.addColorStop(0.65, 'rgba(0, 0, 0, 0.88)');
      brush.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = brush;
      ctx.beginPath();
      ctx.arc(ix, iy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };
    strokeCountRef.current += 1;

    if (strokeCountRef.current % 5 === 0) {
      checkClearedProgress();
    }
  };

  const getLocalCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isCleared) return;
    setHasInteracted(true);
    isDrawingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = getLocalCoords(e);
    lastPointRef.current = pt;
    eraseAt(pt.x, pt.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isCleared) return;
    const pt = getLocalCoords(e);
    eraseAt(pt.x, pt.y);
  };

  const handlePointerEnd = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkClearedProgress();
  };

  const handleResetFog = () => {
    strokeCountRef.current = 0;
    setHasInteracted(false);
    setIsCleared(false);
    window.requestAnimationFrame(() => paintFogLayer());
  };

  const units = [
    { id: 'days', label: 'روز', value: toPersianDigits(padTwo(breakdown.days)) },
    { id: 'hours', label: 'ساعت', value: toPersianDigits(padTwo(breakdown.hours)) },
    { id: 'minutes', label: 'دقیقه', value: toPersianDigits(padTwo(breakdown.minutes)) },
    { id: 'seconds', label: 'ثانیه', value: toPersianDigits(padTwo(breakdown.seconds)) },
  ];

  // Quiet hairline indicator of seconds progress within the minute
  const minuteProgress = (60 - breakdown.seconds) / 60;

  return (
    <section
      id="countdown"
      className="relative z-10 mx-auto max-w-3xl overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-24"
    >
      <PinkLeafCluster
        className="absolute -top-4 right-0 h-28 w-28 opacity-25 sm:h-36 sm:w-36"
        rotate={15}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-2xl font-bold text-[#682B3D] sm:text-3xl">
          زمان باقی‌مانده تا آغاز محفل
        </h2>
        <div className="mx-auto mt-3 h-px w-14 bg-gradient-to-r from-transparent via-[#D17A91]/70 to-transparent" />

        {/* Rose-tinted frosted glass surface — blends with the pink floral backdrop, zero stark white box */}
        <div
          ref={containerRef}
          data-testid="countdown-card"
          data-cleared={isCleared ? 'true' : 'false'}
          aria-label="شمارش معکوس تا آغاز محفل"
          className="relative mt-8 overflow-hidden rounded-3xl border border-[#D48A9E]/35 bg-gradient-to-br from-[#FADBE5]/55 via-[#F6CBD8]/45 to-[#F2BDCD]/55 px-3 py-9 shadow-[0_12px_36px_rgba(180,87,110,0.1)] backdrop-blur-md sm:px-10 sm:py-12"
        >
          <div
            dir="ltr"
            aria-live="off"
            className="grid grid-cols-4 divide-x divide-[#C87B90]/25 text-center"
          >
            {units.map((unit) => (
              <div
                key={unit.id}
                data-testid={`countdown-${unit.id}`}
                className="flex flex-col items-center justify-center px-1 sm:px-4"
              >
                <div className="font-display text-4xl font-bold leading-none text-[#682B3D] sm:text-6xl">
                  <SilkDigits value={unit.value} reduceMotion={reduceMotion} />
                </div>
                <span className="mt-2.5 text-xs font-medium text-[#8C4559] sm:text-sm">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Subtle hairline thread tracking the passing seconds */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-0 h-[1.5px] overflow-hidden rounded-full bg-[#C87B90]/15"
          >
            <div
              className="h-full w-full origin-left bg-gradient-to-r from-[#D48A9E]/50 via-[#B4576E]/75 to-[#D48A9E]/50 transition-transform duration-700 ease-out"
              style={{ transform: `scaleX(${minuteProgress})` }}
            />
          </div>

          {/* Interactive rose-mist fog layer */}
          <AnimatePresence>
            {!isCleared && (
              <motion.div
                key="countdown-fog-overlay"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                className="absolute inset-0 z-10"
              >
                <canvas
                  ref={canvasRef}
                  data-testid="countdown-fog-canvas"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  className="h-full w-full cursor-grab touch-none backdrop-blur-md active:cursor-grabbing"
                />

                <div
                  className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-300 ${
                    hasInteracted ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div
                    data-testid="countdown-wipe-gesture"
                    aria-hidden="true"
                    className="mb-2.5 flex flex-col items-center"
                  >
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : { x: [-14, 14, -14], rotate: [-6, 6, -6] }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              duration: 2.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                      }
                      className="text-[#7E3950]"
                    >
                      <Hand className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.7} />
                    </motion.div>
                    <svg
                      viewBox="0 0 64 10"
                      fill="none"
                      className="mt-1 h-2 w-12 text-[#8E465B]/55"
                    >
                      <path
                        d="M4 6 C20 2, 44 2, 60 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="3 3"
                      />
                    </svg>
                  </div>
                  <p className="font-display text-xl font-bold text-[#682B3D] sm:text-2xl">
                    غبار شیشه را پاک کنید
                  </p>
                  <p className="mt-1.5 text-xs text-[#7E4354] sm:text-sm">
                    انگشت خود را روی شیشه بکشید تا شمارش معکوس آشکار شود
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex justify-center">
          {!isCleared ? (
            <button
              type="button"
              onClick={() => setIsCleared(true)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 py-2 text-xs font-medium text-[#8C5262] underline underline-offset-4 transition-colors hover:text-[#682B3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4576E]"
            >
              نمایش شمارش معکوس
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetFog}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-[#8C5262] transition-colors hover:text-[#682B3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4576E]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              پوشاندن دوباره با غبار
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
