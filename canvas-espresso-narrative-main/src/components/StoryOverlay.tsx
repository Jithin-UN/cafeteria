import { motion, useTransform, type MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

function useFadeRange(mv: MotionValue<number>, start: number, end: number) {
  const mid1 = start + (end - start) * 0.15;
  const mid2 = end - (end - start) * 0.15;
  return useTransform(mv, [start, mid1, mid2, end], [0, 1, 1, 0]);
}

export default function StoryOverlay({ scrollYProgress }: Props) {
  const opacity1 = useFadeRange(scrollYProgress, 0.0, 0.22);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [40, -40]);

  const opacity2 = useFadeRange(scrollYProgress, 0.32, 0.58);
  const y2 = useTransform(scrollYProgress, [0.32, 0.58], [60, -60]);
  const y2Sub = useTransform(scrollYProgress, [0.32, 0.58], [80, -80]);

  const opacity3 = useFadeRange(scrollYProgress, 0.68, 0.95);
  const y3 = useTransform(scrollYProgress, [0.68, 0.95], [50, -50]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* SECTION 1 — The Bean */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-6 text-[15px] uppercase tracking-[0.6em] text-gold/90">
          Chapter One
        </div>
        <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] text-black/90">
          01. The Origin.
        </h2>
        <p className="mt-6 max-w-xl text-sm font-light tracking-wide text-black/90 md:text-base">
          Hand-selected, micro-lot beans — sourced from cloud-forest farms above
          1,800 metres.
        </p>
      </motion.div>

      {/* SECTION 2 — The Grind */}
      <motion.div
        style={{ opacity: opacity2 }}
        className="absolute inset-0 flex items-center px-8 md:px-20"
      >
        <motion.div style={{ y: y2 }} className="max-w-2xl">
          <div className="mb-4 text-[15px] uppercase tracking-[0.6em] text-gold/90">
            Chapter Two
          </div>
          <h2 className="font-display text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1] text-black">
            02. The Grind.
          </h2>
          <p className="mt-5 max-w-md text-sm font-light tracking-wide text-black md:text-base">
            Precision meets temperature control. 18 grams, calibrated to the
            tenth of a micron.
          </p>
        </motion.div>
        <motion.div
          style={{ y: y2Sub }}
          className="absolute right-8 top-[18%] hidden max-w-[200px] text-right md:block md:right-20"
        >
          <div className="text-[10px] uppercase tracking-[0.45em] text-black">
            Aroma profile
          </div>
          <p className="mt-3 font-display text-lg italic text-crema/90">
            cocoa · stone fruit · bergamot
          </p>
        </motion.div>
      </motion.div>

      {/* SECTION 3 — The Pour */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end px-8 md:px-20"
      >
        <div className="max-w-xl text-right">
          <div className="mb-4 text-[15px] uppercase tracking-[0.6em] text-gold/90">
            Chapter Three
          </div>
          <h2 className="font-display text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1] text-black">
            03. The Pour.
          </h2>
          <div className="my-6 ml-auto h-px w-40 bg-gradient-to-l from-gold to-transparent" />
          <p className="ml-auto max-w-md text-sm font-light tracking-wide text-black md:text-base">
            Capturing the perfect crema — a 25-second extraction at the golden
            ratio of 1 : 2.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
