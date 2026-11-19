import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { PinkLeafCluster } from './FloralDecorations';

export function VenueSection() {
  const reduceMotion = useReducedMotion();
  const [chandelierError, setChandelierError] = useState(false);

  return (
    <section
      id="venue"
      className="relative z-10 mx-auto max-w-4xl overflow-hidden px-4 pt-2 pb-20 text-center sm:px-6 sm:pb-24"
    >
      <PinkLeafCluster
        className="absolute top-6 right-0 h-32 w-32 opacity-30 sm:h-44 sm:w-44"
        rotate={10}
      />
      <PinkLeafCluster
        className="absolute top-6 left-0 h-32 w-32 opacity-30 sm:h-44 sm:w-44"
        flipX
        rotate={-10}
      />

      {/* Descending crystal chandelier anchored at top center of the ballroom section */}
      {!chandelierError && (
        <motion.div
          aria-hidden="true"
          data-testid="venue-chandelier"
          initial={reduceMotion ? false : { opacity: 0, y: -72, scale: 1.08 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none relative z-10 mx-auto mb-2 flex w-40 justify-center sm:w-52"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-10 bottom-2 rounded-full bg-[radial-gradient(circle_at_50%_55%,rgba(255,224,196,0.58)_0%,rgba(247,203,216,0.24)_52%,transparent_75%)]"
          />
          <motion.img
            src="/assets/aistudio/chandelier-removebg-preview_d271c721.png"
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setChandelierError(true)}
            animate={reduceMotion ? undefined : { rotate: [-1.25, 1.25, -1.25] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              transformOrigin: 'top center',
              filter: 'sepia(0.32) hue-rotate(-32deg) contrast(0.92) brightness(1.06)',
            }}
            className="relative z-10 h-auto w-full opacity-85 mix-blend-multiply select-none"
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <span className="block text-xs font-semibold tracking-widest text-[#B55C73]">
          محل برگزاری
        </span>
        <h2 className="mt-1.5 font-display text-3xl font-bold text-[#682B3D] sm:text-4xl">
          تالار عروسی تاج کانتیننتال · تالار فریال
        </h2>
        <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#D17A91] to-transparent" />

        <div className="mt-8 overflow-hidden rounded-3xl border border-[#E2A9B8]/40 bg-gradient-to-b from-[#FFFDFE]/95 to-[#FCEFF3]/90 shadow-[0_12px_36px_rgba(184,107,125,0.12)]">
          {/* Exact requested Google Maps iframe */}
          <div className="relative aspect-[4/3] w-full bg-[#F9E3E9] sm:aspect-[16/9]">
            <iframe
              title="نقشه تالار عروسی تاج کانتیننتال"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.6108806804455!2d69.14069517633226!3d34.53808529191994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f211dfc784b%3A0x75a57d1ecfc6edcd!2zVGFqIENvbnRpbmVudGFsIFdlZGRpbmcgSGFsbCDYqtin2YTYp9ixINi52LHZiNiz24wg2KrYp9isINqp2KfZhtiq24zZhtmG2KrYp9mE!5e0!3m2!1sen!2snl!4v1794991171153!5m2!1sen!2snl"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-8">
            <div className="flex items-center gap-2 text-sm font-medium text-[#682B3D]">
              <MapPin className="h-4 w-4 shrink-0 text-[#C86D82]" aria-hidden="true" />
              <span>کابل، تالار عروسی تاج کانتیننتال</span>
            </div>

            <a
              href="https://maps.google.com/?q=Taj+Continental+Wedding+Hall+Kabul"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C86D82] via-[#B4576E] to-[#C86D82] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:brightness-105 whitespace-nowrap shrink-0"
            >
              <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
              <span>مسیریابی در گوگل مپ</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
