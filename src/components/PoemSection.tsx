import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PinkLeafCluster } from './FloralDecorations';

const POEM_LINES = [
  'به نام آنکه جان را فکرت آموخت',
  'چراغ دل به نور جان برافروخت',
  'بیا تا گل برافشانیم و می در ساغر اندازیم',
  'فلک را سقف بشکافیم و طرحی نو دراندازیم',
];

export function PoemSection() {
  return (
    <section
      id="poem"
      aria-label="شعر دعوت‌نامه"
      className="relative z-10 mx-auto max-w-3xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16"
    >
      <PinkLeafCluster
        className="absolute -bottom-6 -left-6 h-36 w-36 opacity-35 sm:h-44 sm:w-44"
        flipX
        rotate={18}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border-y border-[#D894A6]/35 bg-gradient-to-b from-transparent via-[#FCEAEF]/65 to-transparent px-5 py-12 text-center sm:px-12 sm:py-16"
      >
        <div className="mb-7 flex items-center justify-center gap-3 text-[#C26D83]">
          <span className="h-px w-16 bg-gradient-to-l from-[#D17A91] to-transparent" />
          <Sparkles className="h-4 w-4 text-[#D17A91]" aria-hidden="true" />
          <span className="h-px w-16 bg-gradient-to-r from-[#D17A91] to-transparent" />
        </div>

        <div dir="rtl" lang="fa" className="space-y-4 sm:space-y-6">
          {POEM_LINES.map((line, idx) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.85,
                delay: idx * 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ fontFamily: 'var(--font-calligraphy)' }}
              className="text-2xl leading-[2.4] font-normal text-[#682B3D] sm:text-3xl sm:leading-[2.45]"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-3 text-[#C26D83]">
          <span className="h-px w-16 bg-gradient-to-l from-[#D17A91] to-transparent" />
          <span aria-hidden="true" className="font-display text-base text-[#C26D83]">
            ❦
          </span>
          <span className="h-px w-16 bg-gradient-to-r from-[#D17A91] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
