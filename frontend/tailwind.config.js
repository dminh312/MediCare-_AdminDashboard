/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "error-container": "#ffdad6",
        "secondary-fixed-dim": "#ffb1c8",
        "primary": "#ff5252",
        "on-secondary-fixed-variant": "#98004a",
        "background": "#fffbfb",
        "tertiary-fixed-dim": "#fabd00",
        "outline-variant": "#d8c2c2",
        "on-tertiary-fixed-variant": "#5e4100",
        "on-tertiary-container": "#281900",
        "on-secondary-fixed": "#3e001d",
        "on-error": "#ffffff",
        "primary-container": "#ffebee",
        "on-secondary-container": "#3e001d",
        "on-primary-fixed": "#410002",
        "outline": "#857373",
        "on-secondary": "#ffffff",
        "on-primary-fixed-variant": "#93000a",
        "surface-container-high": "#ffe9e9",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#f3eaea",
        "surface-bright": "#fffbfb",
        "surface-container": "#ffefef",
        "error": "#ba1a1a",
        "inverse-primary": "#ffb4ab",
        "secondary": "#ff4081",
        "on-error-container": "#410002",
        "inverse-on-surface": "#fbeeee",
        "inverse-surface": "#362f2f",
        "tertiary": "#7e5700",
        "on-tertiary": "#ffffff",
        "secondary-fixed": "#ffd9e2",
        "primary-fixed": "#ffdad6",
        "on-background": "#1a1111",
        "surface-container-low": "#fff5f5",
        "tertiary-fixed": "#ffdf9e",
        "surface-tint": "#ff5252",
        "surface-container-highest": "#ffe3e3",
        "secondary-container": "#ffd9e2",
        "on-tertiary-fixed": "#281900",
        "on-primary": "#ffffff",
        "on-primary-container": "#d32f2f",
        "primary-fixed-dim": "#ffb4ab",
        "on-surface": "#1a1111",
        "surface": "#fffbfb",
        "surface-variant": "#f4dddd",
        "on-surface-variant": "#534343",
        "tertiary-container": "#ffdf9e"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Inter"],
        "body": ["Inter"],
        "label": ["Inter"]
      },
      keyframes: {
        slideUpFade: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        'slide-up-fade': 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
