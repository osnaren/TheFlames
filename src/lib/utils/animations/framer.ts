/**
 * Framer Motion utility configurations
 *
 * This file contains reusable animation configurations and variants
 * to maintain consistent animations across the application.
 */

import { Variants } from 'framer-motion';

// Common animation variants for page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Slide in from left animation
export const slideInLeft: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  exit: { x: -100, opacity: 0, transition: { duration: 0.3 } },
};

// Slide in from right animation
export const slideInRight: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  exit: { x: 100, opacity: 0, transition: { duration: 0.3 } },
};

// Stagger children animations
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Scale animation for elements
export const scaleUp: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 12 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};
