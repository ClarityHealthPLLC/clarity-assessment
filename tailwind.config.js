/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:    '#0d1b2a',
          teal:    '#1a8a8a',
          tealDark:'#136e6e',
          tealLight:'#e6f5f5',
          accent:  '#2cb5b5',
          white:   '#ffffff',
          offWhite:'#f7f9f9',
          slate:   '#1e2d3d',
          text:    '#1a2332',
          muted:   '#5a6a7a',
          border:  '#d0dde6',
        },
        severity: {
          normal:  '#22c55e',
          mild:    '#eab308',
          moderate:'#f97316',
          severe:  '#ef4444',
          extreme: '#7f1d1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(13,27,42,0.08)',
        'cardHover': '0 4px 24px rgba(13,27,42,0.14)',
      }
    },
  },
  plugins: [],
}
