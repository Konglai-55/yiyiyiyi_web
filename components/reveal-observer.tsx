"use client";

import { useEffect } from "react";

/**
 * Adds a small, accessible scroll reveal layer without turning the whole page
 * into a client component. Content remains visible when JavaScript is
 * unavailable; the hidden state is enabled only after the observer mounts.
 */
export default function RevealObserver() {
  useEffect(() => {
    document.documentElement.dataset.motionReady = "true";

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
