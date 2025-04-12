/**
 * GSAP utility configurations
 *
 * This file contains reusable GSAP animation configurations
 * to maintain consistent animations across the application.
 */

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Common timing configurations
export const timings = {
  slow: 1.5,
  medium: 0.8,
  fast: 0.4,
};

// Common easing configurations
export const easings = {
  smooth: 'power3.out',
  bounce: 'bounce.out',
  elastic: 'elastic.out(1, 0.3)',
  back: 'back.out(1.7)',
};

// Helper function for scroll animations
export const createScrollAnimation = (trigger: string, target: string, options = {}) => {
  return ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    toggleActions: 'play none none reverse',
    ...options,
    animation: gsap.from(target, {
      y: 50,
      opacity: 0,
      duration: timings.medium,
      ease: easings.smooth,
      ...options.animation,
    }),
  });
};

// Function to smoothly scroll to element
export const scrollToElement = (element: string | Element, duration = 1) => {
  gsap.to(window, {
    duration,
    scrollTo: {
      y: element,
      offsetY: 50,
    },
    ease: easings.smooth,
  });
};

export default gsap;
