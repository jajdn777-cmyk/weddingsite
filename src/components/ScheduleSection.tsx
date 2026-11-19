import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Cake, DoorOpen, Heart, Sparkles, Utensils } from 'lucide-react';
import { PurpleBlossomSvg } from './FloralDecorations';

const SCHEDULE_ITEMS = [
  {
    time: '۰۶:۰۰ شام',
    title: 'ورود و استقبال از مهمانان گرامی',
    description: 'پذیرایی اولیه با چای، نوشیدنی‌های گرم و شیرینی سنتی',
    Icon: DoorOpen,
  },
  {
    time: '۰۷:۰۰ شب',
    title: 'تلاوت کلام‌الله مجید و آغاز محفل',
    description: 'خوش‌آمدگویی و طنین آیات متبرکه قرآن کریم',
    Icon: Sparkles,
  },
  {
    time: '۰۸:۰۰ شب',
    title: 'آیین شرعی عقد نکاح و نکاح‌خط',
    description: 'لحظهٔ مقدس ثبت پیوند زناشویی با حضور بزرگواران و شهود',
    Icon: Heart,
  },
  {
    time: '۰۹:۰۰ شب',
    title: 'صرف شام فاخر و پذیرایی',
    description: 'بوفهٔ کامل غذاهای اصیل افغانی و دسرها',
    Icon: Utensils,
  },
  {
    time: '۱۰:۰۰ شب',
    title: 'برش کیک و شادمانی پایان محفل',
    description: 'عکس‌های یادگاری، بریدن کیک و بدرود مهمانان عزیز',
    Icon: Cake,
  },
];

export function ScheduleSection() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 72%', 'end 60%'],
  });

  const blossomTop = useTransform(scrollYProgress, [0, 1], ['4%', '94%']);
  const blossomRotate = useTransform(scrollYProgress, [0, 1], [-12, 32]);

  return (
    <section
      id="schedule"
      className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 text-center sm:mb-16"
      >
        <span className="block text-xs font-medium tracking-[0.14em] text-[#8E5369]">
          برنامه محفل
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-[#4E2334] sm:text-4xl">
          محفل در یک نگاه
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-3.5 h-px w-12 bg-gradient-to-r from-transparent via-[#9B5E78]/65 to-transparent"
        />
      </motion.div>

      <div ref={timelineRef} className="relative mx-auto max-w-2xl">
        {/* Minimal vertical axis line on the right */}
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-3 right-3.5 w-[1.5px] bg-[#DFBECA]/75 sm:right-4"
        />

        {/* Distinct purple botanical blossom anchored on the right vertical axis */}
        <motion.div
          style={
            reduceMotion
              ? { top: '50%' }
              : { top: blossomTop, rotate: blossomRotate }
          }
          className="pointer-events-none absolute right-3.5 z-20 translate-x-1/2 -translate-y-1/2 drop-shadow-[0_6px_16px_rgba(110,37,98,0.38)] sm:right-4"
        >
          <div
            aria-hidden="true"
            className="absolute inset-1 rounded-full bg-[#9A4396]/20 blur-md"
          />
          <PurpleBlossomSvg className="relative h-11 w-11 sm:h-12 sm:w-12" />
        </motion.div>

        <ol className="space-y-10 sm:space-y-12">
          {SCHEDULE_ITEMS.map((item, idx) => {
            const IconComponent = item.Icon;
            return (
              <motion.li
                key={item.time}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-start justify-between gap-4 pr-10 sm:gap-8 sm:pr-12"
              >
                {/* Open minimal circular node centered on the right axis */}
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-3.5 z-10 h-3 w-3 translate-x-1/2 rounded-full border-2 border-[#7E4367] bg-[#FFF6F8] sm:right-4"
                />

                {/* Right side in RTL: Title & concise description */}
                <div className="min-w-0 flex-1 text-right">
                  <h3 className="font-display text-lg font-bold leading-snug text-[#4E2334] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#7F5464] sm:text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Left side in RTL: Time + minimal icon on far left */}
                <div className="flex shrink-0 items-center gap-2 pt-1.5 text-xs font-medium text-[#7B4D62] tabular-nums sm:gap-2.5 sm:text-sm">
                  <span className="whitespace-nowrap">{item.time}</span>
                  <IconComponent
                    className="h-4 w-4 shrink-0 text-[#86506D]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

