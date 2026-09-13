'use client';
import { useEffect } from 'react';

export default function CorporateMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>('.c-header');
    const hero = document.querySelector<HTMLElement>('.c-hero, .p-hero');
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scroll-section]'),
    );
    const revealBlocks = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'),
    );
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sectionLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        '.c-mobile-dock a[href^="#"], .c-header nav a[href^="#"]',
      ),
    );
    let lastScrollY = window.scrollY;
    let frame = 0;

    root.classList.add('c-motion-ready');
    root.dataset.scrollDirection = 'down';

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.42;
      let activeHref: string | null = null;

      sectionLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        const section = document.querySelector<HTMLElement>(href);
        if (section && section.getBoundingClientRect().top <= marker) {
          activeHref = href;
        }
      });

      sectionLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === activeHref;
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    };

    const updateMotion = () => {
      const nextScrollY = Math.max(window.scrollY, 0);
      if (Math.abs(nextScrollY - lastScrollY) > 2) {
        root.dataset.scrollDirection =
          nextScrollY > lastScrollY ? 'down' : 'up';
      }
      header?.classList.toggle('is-scrolled', nextScrollY > 24);

      const shouldHide = nextScrollY > lastScrollY;

      if (nextScrollY <= 24) {
        header?.classList.remove('is-hidden');
      } else if (shouldHide) {
        header?.classList.add('is-hidden');
      } else if (nextScrollY !== lastScrollY) {
        header?.classList.remove('is-hidden');
      }

      const pageRange = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      root.style.setProperty(
        '--page-progress',
        String(Math.min(nextScrollY / pageRange, 1)),
      );

      if (!reduceMotion.matches && hero) {
        const heroRange = Math.max(hero.offsetHeight * 0.72, 1);
        root.style.setProperty(
          '--hero-progress',
          String(Math.min(nextScrollY / heroRange, 1)),
        );

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const progress = Math.min(
            Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0),
            1,
          );
          section.style.setProperty('--section-progress', String(progress));
        });
      }

      updateActiveSection();

      lastScrollY = nextScrollY;
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMotion);
    };

    let revealObserver: IntersectionObserver | null = null;
    let heroObserver: IntersectionObserver | null = null;

    if (reduceMotion.matches) {
      header?.classList.add('is-entered');
      hero?.classList.add('is-ready');
      revealBlocks.forEach((block) => block.classList.add('is-inview'));
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            (entry.target as HTMLElement).classList.toggle(
              'is-inview',
              entry.isIntersecting,
            );
          });
        },
        { threshold: 0.06, rootMargin: '-4% 0px -10% 0px' },
      );

      revealBlocks.forEach((block) => revealObserver?.observe(block));

      if (hero) {
        heroObserver = new IntersectionObserver(
          ([entry]) => hero.classList.toggle('is-ready', entry.isIntersecting),
          { threshold: 0.28 },
        );
        heroObserver.observe(hero);
      }

      window.requestAnimationFrame(() => {
        header?.classList.add('is-entered');
        if (window.scrollY < window.innerHeight * 0.72) {
          hero?.classList.add('is-ready');
        }
      });
    }

    updateMotion();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      revealObserver?.disconnect();
      heroObserver?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
      header?.classList.remove('is-entered');
      hero?.classList.remove('is-ready');
      root.classList.remove('c-motion-ready');
      delete root.dataset.scrollDirection;
      root.style.removeProperty('--page-progress');
      root.style.removeProperty('--hero-progress');
    };
  }, []);
  return null;
}
