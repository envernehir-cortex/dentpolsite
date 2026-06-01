import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2D3035',
        brand: {
          green: '#9DB4A0',
          dark: '#869C89',
        },
        sage: {
          DEFAULT: '#8FA888',
          light: '#E8EDE6',
        },
        offWhite: '#F5F6F4',
        border: '#D8DDD6',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        serif: ['var(--font-playfair-display)'],
      },
    },
  },
  plugins: [],
};
export default config;
