/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  // Use corePlugins to enable/disable specific Tailwind features if needed
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to prevent conflicts with your existing styles
  },
  // Important: false - This ensures Tailwind doesn't override your custom styles with !important
  important: false,
  theme: {
    extend: {
      colors: {
        // Extend Tailwind's color palette with your theme colors
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
        'bg-light': 'var(--color-bg-light)',
        'text-light': 'var(--color-text-light)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      // Add your custom transition timing
      transitionDuration: {
        default: 'var(--transition-speed)',
      },
    },
  },
  plugins: [],
};
