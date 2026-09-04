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

    const supportsIntersectionObserver = "IntersectionObserver" in window;
    const revealImmediately = (node: HTMLElement) => node.classList.add("is-visible");

    const observer = supportsIntersectionObserver
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
        )
      : null;

    const watch = (node: HTMLElement) => {
      if (node.classList.contains("is-visible")) return;
      if (observer) observer.observe(node);
      else revealImmediately(node);
    };

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(watch);

    // Client components can stream in after this effect (for example the
    // case showcase). Observe new nodes too so they never remain transparent.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((addedNode) => {
          if (!(addedNode instanceof HTMLElement)) return;
          if (addedNode.matches("[data-reveal]")) watch(addedNode);
          addedNode.querySelectorAll<HTMLElement>("[data-reveal]").forEach(watch);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
