"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/** Native scrolling; one observer starts finite, compositor-friendly entrances. */
export function MotionProvider() {
  const pathname = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cleanups: Array<() => void> = [];
      const context = gsap.context(() => {
        gsap.fromTo(
          "[data-hero] > *",
          { opacity: 0.2, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
        const portals = document.querySelectorAll("[data-portal-intro]");
        if (portals.length) {
          gsap.fromTo(
            portals,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.09,
              delay: 0.15,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
          );
          gsap.fromTo(
            "[data-pathway-route]",
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.4,
              delay: 0.35,
              ease: "power2.inOut",
            },
          );
        }
        const stageLinks = document.querySelectorAll("[data-hero-stages] > *");
        if (stageLinks.length) {
          gsap.fromTo(
            stageLinks,
            { opacity: 0.2, x: 14 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.07,
              delay: 0.15,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
          );
        }
      });
      const entrances = new Map<Element, () => void>();
      const observer = new IntersectionObserver(
        (records) => {
          for (const record of records) {
            if (!record.isIntersecting) continue;
            observer.unobserve(record.target);
            const enter = entrances.get(record.target);
            if (enter) context.add(enter);
            entrances.delete(record.target);
          }
        },
        { rootMargin: "0px 0px 48px 0px", threshold: 0 },
      );
      const register = (
        node: HTMLElement,
        targets: HTMLElement[],
        kind = "reveal",
        x = 0,
      ) => {
        if (!targets.length) return;
        const from =
          kind === "icon"
            ? { scale: 0.88, rotation: -4 }
            : kind === "draw"
              ? { scaleX: 0, transformOrigin: "left" }
              : kind === "media"
                ? { scale: 0.98, opacity: 0.25 }
                : { opacity: 0.18, y: x ? 0 : 16, x };
        context.add(() => gsap.set(targets, from));
        entrances.set(node, () => {
          gsap.to(targets, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: kind === "icon" ? 0.5 : 0.6,
            stagger:
              targets.length > 1
                ? { amount: Math.min(targets.length * 0.055, 0.22) }
                : 0,
            ease: kind === "icon" ? "back.out(1.2)" : "power3.out",
            clearProps: "transform,opacity,transformOrigin",
          });
        });
        observer.observe(node);
      };
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((node) => register(node, [node]));
      document
        .querySelectorAll<HTMLElement>("[data-reveal-group]")
        .forEach((node) =>
          register(node, Array.from(node.children) as HTMLElement[]),
        );
      document
        .querySelectorAll<HTMLElement>("[data-slide-in]")
        .forEach((node) =>
          register(
            node,
            [node],
            "reveal",
            node.dataset.slideIn === "left" ? -16 : 16,
          ),
        );
      document
        .querySelectorAll<HTMLElement>("[data-media-in]")
        .forEach((node) => register(node, [node], "media"));
      document
        .querySelectorAll<HTMLElement>("[data-draw]")
        .forEach((node) => register(node, [node], "draw"));
      document
        .querySelectorAll<HTMLElement>("[data-icon-pop]")
        .forEach((node) => register(node, [node], "icon"));
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document
          .querySelectorAll<HTMLElement>("[data-magnetic]")
          .forEach((node) => {
            let rect: DOMRect;
            const x = gsap.quickTo(node, "x", {
              duration: 0.3,
              ease: "power3.out",
            });
            const y = gsap.quickTo(node, "y", {
              duration: 0.3,
              ease: "power3.out",
            });
            const enter = () => {
              rect = node.getBoundingClientRect();
            };
            const move = (event: MouseEvent) => {
              if (!rect) return;
              x((event.clientX - rect.left - rect.width / 2) * 0.06);
              y((event.clientY - rect.top - rect.height / 2) * 0.1);
            };
            const reset = () => {
              x(0);
              y(0);
            };
            node.addEventListener("mouseenter", enter);
            node.addEventListener("mousemove", move);
            node.addEventListener("mouseleave", reset);
            node.addEventListener("focusin", reset);
            cleanups.push(() => {
              node.removeEventListener("mouseenter", enter);
              node.removeEventListener("mousemove", move);
              node.removeEventListener("mouseleave", reset);
              node.removeEventListener("focusin", reset);
              x.tween.kill();
              y.tween.kill();
              gsap.set(node, { clearProps: "transform" });
            });
          });
      }
      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof HTMLElement)) return;
        let node: HTMLElement | null = event.target;
        while (node && node !== document.body) {
          if (
            node.matches(
              "[data-reveal], [data-reveal-group], [data-media-in], [data-slide-in]",
            )
          ) {
            observer.unobserve(node);
            entrances.delete(node);
            const targets = node.hasAttribute("data-reveal-group")
              ? Array.from(node.children)
              : [node];
            gsap.killTweensOf(targets);
            gsap.set(targets, { clearProps: "transform,opacity" });
          }
          node = node.parentElement;
        }
      };
      document.addEventListener("focusin", onFocus);
      return () => {
        observer.disconnect();
        document.removeEventListener("focusin", onFocus);
        cleanups.forEach((cleanup) => cleanup());
        context.revert();
      };
    });
    return () => media.revert();
  }, [pathname]);
  return null;
}
