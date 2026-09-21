/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2-rgb) / <alpha-value>)',
        line: 'var(--line)',
        ink: 'rgb(var(--text-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Manrope Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        spin3d: {
          from: { transform: 'rotateX(-10deg) rotateY(0deg)' },
          to: { transform: 'rotateX(-10deg) rotateY(360deg)' },
        },
        gridflow: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 64px' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        spin3d: 'spin3d 26s linear infinite',
        gridflow: 'gridflow 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
