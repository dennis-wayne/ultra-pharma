"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { navItems } from "@/content/site";
import { ThemeToggle } from "@/components/primitives/theme-toggle";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const current = navItems
    .filter(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    let previous = window.scrollY;
    let travel = 0;
    let frame = 0;
    let hidden = false;
    let solid = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const show = () => {
      hidden = false;
      if (header.current)
        gsap.to(header.current, {
          yPercent: 0,
          duration: reduced.matches ? 0 : 0.3,
          overwrite: true,
        });
    };
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - previous;
      travel = Math.sign(delta) !== Math.sign(travel) ? delta : travel + delta;
      if (y > 24 !== solid) {
        solid = y > 24;
        setScrolled(solid);
      }
      if (!header.current) return;
      const focused = header.current.contains(document.activeElement);
      const hide = y > 180 && travel > 16 && !focused && !open;
      const nextHidden = hide
        ? true
        : travel < -12 || y < 180 || focused || open
          ? false
          : hidden;
      if (nextHidden !== hidden) {
        hidden = nextHidden;
        gsap.to(header.current, {
          yPercent: hidden ? -110 : 0,
          duration: reduced.matches ? 0 : 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      }
      previous = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    show();
    update();
    const node = header.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    node?.addEventListener("focusin", show);
    return () => {
      window.removeEventListener("scroll", onScroll);
      node?.removeEventListener("focusin", show);
      cancelAnimationFrame(frame);
      if (node) gsap.killTweensOf(node);
    };
  }, [open]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1101px)");
    const close = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header
        ref={header}
        data-slot="site-header"
        data-scrolled={scrolled || undefined}
        className="site-header"
      >
        <div className="shell header-row">
          <Wordmark />
          <nav aria-label="Primary" className="pill-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-primary btn-sm header-cta">
              Talk to us
            </Link>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="icon-btn mobile-menu-trigger"
                aria-label="Open menu"
              >
                <List size={20} aria-hidden />
              </button>
            </Dialog.Trigger>
          </div>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-scrim" />
        <Dialog.Content className="mobile-drawer" aria-describedby={undefined}>
          <div className="mb-3 flex items-center justify-between border-b border-rule pb-4">
            <Dialog.Title className="m-0 font-display text-2xl font-medium">
              Explore Ultra Pharma
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="icon-btn"
                aria-label="Close menu"
              >
                <X size={18} aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={current === item.href ? "page" : undefined}
              >
                {item.label}
                <span aria-hidden className="text-ink-400">
                  ↗
                </span>
              </Link>
            ))}
          </nav>
          <p className="mb-0 mt-5 border-t border-rule pt-5 text-sm text-ink-500">
            Regulatory affairs and market access.
            <br />
            Nairobi, Kenya.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
