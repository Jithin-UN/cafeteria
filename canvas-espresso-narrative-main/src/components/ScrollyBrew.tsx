import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import StoryOverlay from "./StoryOverlay";

const FRAME_COUNT = 144;
const framePath = (i: number) =>
  `/sequence/cafeteria/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

export default function ScrollyBrew() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);

    const tick = () => {
      loadedCount += 1;
      if (cancelled) return;
      setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
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
        // gracefully skip missing frames
        tick();
      };
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (idx: number) => {
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

    // background tone
    ctx.fillStyle = "#0D0C0A";
    ctx.fillRect(0, 0, w, h);

    // find nearest available frame
    let img = imagesRef.current[idx];
    if (!img) {
      for (let off = 1; off < FRAME_COUNT; off++) {
        img = imagesRef.current[idx - off] || imagesRef.current[idx + off] || null;
        if (img) break;
      }
    }
    if (!img) return;

    // object-fit: cover
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const ir = iw / ih;
    const cr = w / h;
    let dw: number, dh: number, dx: number, dy: number;
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

  // redraw on resize
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: "600vh" }}
      aria-label="Espresso brewing scrollytelling experience"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0D0C0A]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(13,12,10,0.85) 100%)",
          }}
        />

        {/* loader */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-[#0D0C0A]">
            <div className="font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Preparing your cup
            </div>
            <div className="font-display text-7xl tabular-nums text-foreground/90">
              {String(progress).padStart(3, "0")}
              <span className="text-gold">%</span>
            </div>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <div
                className="h-full bg-gold transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {loaded && <StoryOverlay scrollYProgress={scrollYProgress} />}

        {/* persistent chrome */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-foreground/40">
          Scroll · Slowly
        </div>
      </div>
    </section>
  );
}
