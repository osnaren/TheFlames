/**
 * Application setup utilities
 *
 * This file contains setup functions for various libraries used in the application.
 */

import { initSmoothScroll } from './animations';

/**
 * Initialize all application-wide utilities and libraries
 */
export const setupApp = () => {
  // Initialize smooth scrolling
  const { lenis } = initSmoothScroll();

  // Add more initialization here as needed

  return {
    lenis,
    // Add more initialized utilities here
  };
};

export default setupApp;
