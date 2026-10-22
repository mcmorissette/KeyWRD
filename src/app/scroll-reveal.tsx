"use client";

import { useEffect } from "react";

const revealGroups = [
  ".problem-section .section-heading",
  ".problem-card",
  "#services .section-heading",
  ".service-card",
  ".why-copy",
  ".comparison-card",
  "#process .section-heading",
  ".process-step",
  ".data-copy",
  ".data-dashboard",
  ".help-section .section-heading",
  ".help-grid > article",
  ".about-grid > div",
  ".faq-intro",
  ".faq-list > details",
  ".contact-layout > *",
];

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = new Set<HTMLElement>();

    revealGroups.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("scroll-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 70}ms`);
        elements.add(element);
      });
    });

    const initialViewportLimit = window.innerHeight * 0.92;
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top <= initialViewportLimit) {
        element.classList.add("is-visible");
      }
    });

    document.documentElement.classList.add("scroll-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    elements.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-reveal-ready");
    };
  }, []);

  return null;
}
