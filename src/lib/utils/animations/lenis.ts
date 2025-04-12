/**
 * Lenis smooth scrolling configuration
 *
 * This file provides a configured Lenis instance for smooth scrolling
 * and helper functions for integration with GSAP.
 */

import gsap from 'gsap';
import Lenis from 'lenis';

// Create and configure the Lenis smooth scroll instance
export const createSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), // Ease out expo
    direction: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP's ticker for consistent frame rate
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Add a helper method for programmatic scrolling
  const scrollTo = (target: string | HTMLElement | number, options = {}) => {
    lenis.scrollTo(target, options);
  };

  return { lenis, scrollTo };
};

// Export a singleton instance
let lenisInstance: ReturnType<typeof createSmoothScroll> | null = null;

export const initSmoothScroll = () => {
  if (!lenisInstance) {
    lenisInstance = createSmoothScroll();
  }
  return lenisInstance;
};

export default initSmoothScroll;
