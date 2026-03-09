/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#667eea',
          dark: '#764ba2',
        },
        success: {
          DEFAULT: '#38ef7d',
          dark: '#11998e',
        },
        accent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
