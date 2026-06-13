import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ScrollyBrew from "@/components/ScrollyBrew";
import PremiumMenu from "@/components/PremiumMenu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Crema — Artisan Roastery & Espresso Atelier" },
      {
        name: "description",
        content:
          "An immersive, scroll-driven journey through a single espresso shot — from micro-lot bean to the perfect crema. Reserve a seat at the cupping table.",
      },
      { property: "og:title", content: "Maison Crema — Artisan Roastery" },
      {
        property: "og:description",
        content:
          "A cinematic scrollytelling experience by a premium artisan cafeteria & roastery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: "Maison Crema",
          servesCuisine: "Coffee",
          priceRange: "€€€",
          address: {
            "@type": "PostalAddress",
            streetAddress: "14 Rue des Artisans",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: "#story", label: "Story" },
    { href: "#menu", label: "Menu" },
    { href: "#visit", label: "Visit" },
  ];
  return (
    <main className="relative min-h-screen bg-[#0D0C0A] text-foreground">
      {/* Top chrome */}
      <header className="fixed left-0 right-0 top-0 z-40 backdrop-blur-md bg-[#0D0C0A]/60 border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-5 md:px-12">
          <a href="#" className="font-display text-lg tracking-wide text-foreground">
            Maison<span className="text-[color:var(--color-gold)]">·</span>Crema
          </a>
          <nav className="hidden gap-10 text-[10px] uppercase tracking-[0.4em] text-foreground/60 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block text-[10px] uppercase tracking-[0.4em] text-foreground/60">
            Est. 2014
          </div>
          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative h-10 w-10 flex flex-col items-center justify-center gap-1.5 text-foreground"
          >
            <span
              className={`block h-px w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="flex flex-col px-6 pb-8 pt-2 gap-6 text-[11px] uppercase tracking-[0.4em] text-foreground/70">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 pb-4 transition-colors hover:text-[color:var(--color-gold)]"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 text-foreground/40">Est. 2014</div>
          </nav>
        </div>
      </header>

      <h1 className="sr-only">
        Maison Crema — Artisan Roastery and Espresso Atelier
      </h1>

      <section id="story">
        <ScrollyBrew />
      </section>

      <section id="menu">
        <PremiumMenu />
      </section>

      <footer
        id="visit"
        className="border-t border-white/5 bg-[#0A0908] px-6 py-16 md:px-12"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-2xl tracking-wide">
              Maison<span className="text-[color:var(--color-gold)]">·</span>Crema
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/50">
              An artisan roastery and espresso atelier. Single-origin micro-lots, roasted in small batches, served with intention.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">Visit</div>
            <address className="mt-4 not-italic text-sm leading-relaxed text-foreground/70">
              14 Rue des Artisans<br />
              75011 Paris<br />
              Tue–Sun · 8h — 19h
            </address>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li><a href="mailto:hello@maisoncrema.co" className="hover:text-[color:var(--color-gold)] transition-colors">hello@maisoncrema.co</a></li>
              <li><a href="tel:+33100000000" className="hover:text-[color:var(--color-gold)] transition-colors">+33 1 00 00 00 00</a></li>
              <li><a href="#" className="hover:text-[color:var(--color-gold)] transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-[0.4em] text-foreground/40 md:flex-row">
          <div>© {new Date().getFullYear()} Maison Crema · Crafted in small batches</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground/70 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
