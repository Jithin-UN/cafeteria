import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useScroll, a as useTransform, b as useMotionValueEvent, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function useFadeRange(mv, start, end) {
  const mid1 = start + (end - start) * 0.15;
  const mid2 = end - (end - start) * 0.15;
  return useTransform(mv, [start, mid1, mid2, end], [0, 1, 1, 0]);
}
function StoryOverlay({ scrollYProgress }) {
  const opacity1 = useFadeRange(scrollYProgress, 0, 0.22);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [40, -40]);
  const opacity2 = useFadeRange(scrollYProgress, 0.32, 0.58);
  const y2 = useTransform(scrollYProgress, [0.32, 0.58], [60, -60]);
  const y2Sub = useTransform(scrollYProgress, [0.32, 0.58], [80, -80]);
  const opacity3 = useFadeRange(scrollYProgress, 0.68, 0.95);
  const y3 = useTransform(scrollYProgress, [0.68, 0.95], [50, -50]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 z-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        style: { opacity: opacity1, y: y1 },
        className: "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 text-[15px] uppercase tracking-[0.6em] text-gold/90", children: "Chapter One" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] text-black/90", children: "01. The Origin." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-sm font-light tracking-wide text-black/90 md:text-base", children: "Hand-selected, micro-lot beans — sourced from cloud-forest farms above 1,800 metres." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        style: { opacity: opacity2 },
        className: "absolute inset-0 flex items-center px-8 md:px-20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { y: y2 }, className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-[15px] uppercase tracking-[0.6em] text-gold/90", children: "Chapter Two" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1] text-black", children: "02. The Grind." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-md text-sm font-light tracking-wide text-black md:text-base", children: "Precision meets temperature control. 18 grams, calibrated to the tenth of a micron." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              style: { y: y2Sub },
              className: "absolute right-8 top-[18%] hidden max-w-[200px] text-right md:block md:right-20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.45em] text-black", children: "Aroma profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-lg italic text-crema/90", children: "cocoa · stone fruit · bergamot" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        style: { opacity: opacity3, y: y3 },
        className: "absolute inset-0 flex items-center justify-end px-8 md:px-20",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-[15px] uppercase tracking-[0.6em] text-gold/90", children: "Chapter Three" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1] text-black", children: "03. The Pour." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-6 ml-auto h-px w-40 bg-gradient-to-l from-gold to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ml-auto max-w-md text-sm font-light tracking-wide text-black md:text-base", children: "Capturing the perfect crema — a 25-second extraction at the golden ratio of 1 : 2." })
        ] })
      }
    )
  ] });
}
const FRAME_COUNT = 144;
const framePath = (i) => `/sequence/cafeteria/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
function ScrollyBrew() {
  const containerRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const imagesRef = reactExports.useRef([]);
  const currentFrameRef = reactExports.useRef(0);
  const [progress, setProgress] = reactExports.useState(0);
  const [loaded, setLoaded] = reactExports.useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  reactExports.useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;
    const images = new Array(FRAME_COUNT).fill(null);
    const tick = () => {
      loadedCount += 1;
      if (cancelled) return;
      setProgress(Math.round(loadedCount / FRAME_COUNT * 100));
      if (loadedCount >= FRAME_COUNT) {
        imagesRef.current = images;
        setLoaded(true);
        drawFrame(0);
      }
    };
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        images[i] = img;
        tick();
      };
      img.onerror = () => {
        tick();
      };
    }
    return () => {
      cancelled = true;
    };
  }, []);
  const drawFrame = (idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0D0C0A";
    ctx.fillRect(0, 0, w, h);
    let img = imagesRef.current[idx];
    if (!img) {
      for (let off = 1; off < FRAME_COUNT; off++) {
        img = imagesRef.current[idx - off] || imagesRef.current[idx + off] || null;
        if (img) break;
      }
    }
    if (!img) return;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const ir = iw / ih;
    const cr = w / h;
    let dw, dh, dx, dy;
    if (cr > ir) {
      dw = w;
      dh = w / ir;
      dx = 0;
      dy = (h - dh) / 2;
    } else {
      dh = h;
      dw = h * ir;
      dx = (w - dw) / 2;
      dy = 0;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  };
  useMotionValueEvent(frameIndex, "change", (v) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v)));
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      requestAnimationFrame(() => drawFrame(idx));
    }
  });
  reactExports.useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref: containerRef,
      className: "relative w-full",
      style: { height: "600vh" },
      "aria-label": "Espresso brewing scrollytelling experience",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 h-screen w-full overflow-hidden bg-[#0D0C0A]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 h-full w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0",
            style: {
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(13,12,10,0.85) 100%)"
            }
          }
        ),
        !loaded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-[#0D0C0A]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "Preparing your cup" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-7xl tabular-nums text-foreground/90", children: [
            String(progress).padStart(3, "0"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-40 overflow-hidden bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-gold transition-[width] duration-200",
              style: { width: `${progress}%` }
            }
          ) })
        ] }),
        loaded && /* @__PURE__ */ jsxRuntimeExports.jsx(StoryOverlay, { scrollYProgress }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-foreground/40", children: "Scroll · Slowly" })
      ] })
    }
  );
}
const roasts = [
  {
    name: "Ethiopia · Yirgacheffe",
    notes: "Jasmine · Citrus zest · Honey",
    altitude: "2,100 m",
    price: "€28"
  },
  {
    name: "Colombia · Huila",
    notes: "Caramel · Red apple · Cocoa",
    altitude: "1,850 m",
    price: "€24"
  },
  {
    name: "Panama · Geisha Reserve",
    notes: "Bergamot · White peach · Silk",
    altitude: "1,950 m",
    price: "€68"
  }
];
function GlowCard({
  children,
  className = ""
}) {
  const ref = reactExports.useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      onMouseMove: onMove,
      className: `group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-colors hover:border-white/10 ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            style: {
              background: "radial-gradient(400px circle at var(--mx) var(--my), oklch(0.78 0.13 70 / 0.18), transparent 60%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children })
      ]
    }
  );
}
function NanoButton({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.02] px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:text-espresso", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-out group-hover/btn:translate-x-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: "→" })
  ] });
}
function PremiumMenu() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-[#0D0C0A] px-6 py-32 md:px-16 md:py-48", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
        className: "mb-20 flex flex-col items-start justify-between gap-6 md:mb-28 md:flex-row md:items-end",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 text-[10px] uppercase tracking-[0.6em] text-gold/80", children: "The Cellar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] text-foreground", children: [
              "A curated ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-crema", children: "menu" }),
              ",",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "served by appointment."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm font-light leading-relaxed text-foreground/60", children: "Three signature roasts, tasting flights, and seats at our weekly cupping table — limited to twelve guests." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlowCard, { className: "md:col-span-4 md:row-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col justify-between p-10 md:p-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.5em] text-gold/80", children: "Signature Tasting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 font-display text-4xl leading-tight text-foreground md:text-6xl", children: "The Origin Flight" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-md text-sm font-light leading-relaxed text-foreground/65", children: "A guided 70-minute journey through three single-origin roasts, paired with hand-tempered chocolate from our atelier." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.4em] text-foreground/40", children: "Per guest" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl text-crema", children: "€42" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NanoButton, { children: "Reserve a seat" })
        ] })
      ] }) }),
      roasts.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlowCard, { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col justify-between p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-xl text-foreground", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl text-gold", children: r.price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs leading-relaxed text-foreground/55", children: r.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] uppercase tracking-[0.3em] text-foreground/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Altitude" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: r.altitude })
        ] })
      ] }) }, r.name))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-28 flex flex-col items-center gap-8 border-t border-white/5 pt-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.6em] text-gold/80", children: "Visit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl font-display text-2xl italic leading-snug text-foreground/85 md:text-3xl", children: '"Coffee, taken seriously, is a quiet form of architecture."' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs uppercase tracking-[0.4em] text-foreground/50", children: "14 Rue des Artisans · Open Tue–Sun" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NanoButton, { children: "Book a tasting" })
    ] })
  ] }) });
}
function Index() {
  const [open, setOpen] = reactExports.useState(false);
  const navLinks = [{
    href: "#story",
    label: "Story"
  }, {
    href: "#menu",
    label: "Menu"
  }, {
    href: "#visit",
    label: "Visit"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative min-h-screen bg-[#0D0C0A] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed left-0 right-0 top-0 z-40 backdrop-blur-md bg-[#0D0C0A]/60 border-b border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-5 md:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "font-display text-lg tracking-wide text-foreground", children: [
          "Maison",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--color-gold)]", children: "·" }),
          "Crema"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden gap-10 text-[10px] uppercase tracking-[0.4em] text-foreground/60 md:flex", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "transition-colors hover:text-foreground", children: l.label }, l.href)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-[10px] uppercase tracking-[0.4em] text-foreground/60", children: "Est. 2014" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "aria-label": "Toggle menu", "aria-expanded": open, onClick: () => setOpen((v) => !v), className: "md:hidden relative h-10 w-10 flex flex-col items-center justify-center gap-1.5 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block h-px w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block h-px w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col px-6 pb-8 pt-2 gap-6 text-[11px] uppercase tracking-[0.4em] text-foreground/70", children: [
        navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, onClick: () => setOpen(false), className: "border-b border-white/5 pb-4 transition-colors hover:text-[color:var(--color-gold)]", children: l.label }, l.href)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 text-foreground/40", children: "Est. 2014" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "sr-only", children: "Maison Crema — Artisan Roastery and Espresso Atelier" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "story", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollyBrew, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumMenu, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { id: "visit", className: "border-t border-white/5 bg-[#0A0908] px-6 py-16 md:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-12 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl tracking-wide", children: [
            "Maison",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--color-gold)]", children: "·" }),
            "Crema"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm leading-relaxed text-foreground/50", children: "An artisan roastery and espresso atelier. Single-origin micro-lots, roasted in small batches, served with intention." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.4em] text-foreground/40", children: "Visit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("address", { className: "mt-4 not-italic text-sm leading-relaxed text-foreground/70", children: [
            "14 Rue des Artisans",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "75011 Paris",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Tue–Sun · 8h — 19h"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.4em] text-foreground/40", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-foreground/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@maisoncrema.co", className: "hover:text-[color:var(--color-gold)] transition-colors", children: "hello@maisoncrema.co" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+33100000000", className: "hover:text-[color:var(--color-gold)] transition-colors", children: "+33 1 00 00 00 00" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-[color:var(--color-gold)] transition-colors", children: "Instagram" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-[0.4em] text-foreground/40 md:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Maison Crema · Crafted in small batches"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground/70 transition-colors", children: "Privacy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground/70 transition-colors", children: "Terms" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
