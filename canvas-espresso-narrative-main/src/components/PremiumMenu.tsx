import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";

const roasts = [
  {
    name: "Ethiopia · Yirgacheffe",
    notes: "Jasmine · Citrus zest · Honey",
    altitude: "2,100 m",
    price: "€28",
  },
  {
    name: "Colombia · Huila",
    notes: "Caramel · Red apple · Cocoa",
    altitude: "1,850 m",
    price: "€24",
  },
  {
    name: "Panama · Geisha Reserve",
    notes: "Bergamot · White peach · Silk",
    altitude: "1,950 m",
    price: "€68",
  },
];

function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-colors hover:border-white/10 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), oklch(0.78 0.13 70 / 0.18), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function NanoButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.02] px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:text-espresso">
      <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-out group-hover/btn:translate-x-0" />
      <span className="relative">{children}</span>
      <span className="relative">→</span>
    </button>
  );
}

export default function PremiumMenu() {
  return (
    <section className="relative bg-[#0D0C0A] px-6 py-32 md:px-16 md:py-48">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col items-start justify-between gap-6 md:mb-28 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.6em] text-gold/80">
              The Cellar
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] text-foreground">
              A curated <em className="text-crema">menu</em>,
              <br />
              served by appointment.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-foreground/60">
            Three signature roasts, tasting flights, and seats at our weekly
            cupping table — limited to twelve guests.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-2">
          {/* feature card */}
          <GlowCard className="md:col-span-4 md:row-span-2">
            <div className="flex h-full flex-col justify-between p-10 md:p-14">
              <div>
                <div className="text-[10px] uppercase tracking-[0.5em] text-gold/80">
                  Signature Tasting
                </div>
                <h3 className="mt-6 font-display text-4xl leading-tight text-foreground md:text-6xl">
                  The Origin Flight
                </h3>
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-foreground/65">
                  A guided 70-minute journey through three single-origin roasts,
                  paired with hand-tempered chocolate from our atelier.
                </p>
              </div>
              <div className="mt-12 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">
                    Per guest
                  </div>
                  <div className="mt-2 font-display text-3xl text-crema">€42</div>
                </div>
                <NanoButton>Reserve a seat</NanoButton>
              </div>
            </div>
          </GlowCard>

          {/* small cards */}
          {roasts.map((r) => (
            <GlowCard key={r.name} className="md:col-span-2">
              <div className="flex h-full flex-col justify-between p-7">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display text-xl text-foreground">
                      {r.name}
                    </h4>
                    <span className="font-display text-xl text-gold">
                      {r.price}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/55">
                    {r.notes}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  <span>Altitude</span>
                  <span className="text-foreground/70">{r.altitude}</span>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* footer block */}
        <div className="mt-28 flex flex-col items-center gap-8 border-t border-white/5 pt-16 text-center">
          <div className="text-[10px] uppercase tracking-[0.6em] text-gold/80">
            Visit
          </div>
          <p className="max-w-xl font-display text-2xl italic leading-snug text-foreground/85 md:text-3xl">
            "Coffee, taken seriously, is a quiet form of architecture."
          </p>
          <div className="mt-2 text-xs uppercase tracking-[0.4em] text-foreground/50">
            14 Rue des Artisans · Open Tue–Sun
          </div>
          <NanoButton>Book a tasting</NanoButton>
        </div>
      </div>
    </section>
  );
}
