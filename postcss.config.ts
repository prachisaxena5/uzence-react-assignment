/** @type {import('postcss-load-config').Config} */
export default {
  // Use plugin names as keys and configuration objects as values
  plugins: {
    '@tailwindcss/postcss': {}, // Tailwind CSS plugin
    'autoprefixer': {},       // Autoprefixer plugin
  },
};