/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'station-navy': '#07111F',
        'station-storm': '#102A43',
        'station-slate': '#243B53',
        'station-fog': '#9FB3C8',
        'station-metal': '#52616B',
        'station-cyan': '#39D9E6',
        'station-red': '#D94141',
        'station-amber': '#F5B960',
        'station-green': '#63D471',
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'Courier New', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'flicker': 'flicker 0.15s infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 8px rgba(57, 217, 230, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 16px rgba(57, 217, 230, 0.8))' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
