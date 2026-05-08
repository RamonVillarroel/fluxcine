/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Système Apple Dark Mode
        'apple-bg':        '#000000',
        'apple-surface':   '#1c1c1e',
        'apple-elevated':  '#2c2c2e',
        'apple-fill':      'rgba(120,120,128,0.2)',
        'apple-sep':       'rgba(84,84,88,0.55)',
        // Labels Apple
        'label':    '#ffffff',
        'label-2':  'rgba(235,235,245,0.6)',
        'label-3':  'rgba(235,235,245,0.3)',
        'label-4':  'rgba(235,235,245,0.16)',
        // Marque
        'flux-accent':    '#00d4ff',
        'flux-accentAlt': '#ff453a',
        // Aliases pratiques
        'flux-bg':      '#000000',
        'flux-surface': '#1c1c1e',
        'flux-elevated':'#2c2c2e',
        'flux-border':  'rgba(84,84,88,0.55)',
        'flux-text':    '#ffffff',
        'flux-muted':   'rgba(235,235,245,0.55)',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem',  { lineHeight: '1', letterSpacing: '-0.04em' }],
        '8xl': ['6rem',    { lineHeight: '1', letterSpacing: '-0.05em' }],
        '9xl': ['8rem',    { lineHeight: '0.9', letterSpacing: '-0.06em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up':  'fade-up 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both',
        shimmer:    'shimmer 1.6s ease-in-out infinite',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'fade-in':  'fade-up 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both',
      },
      boxShadow: {
        // Apple-style shadows (douces, larges)
        'apple-sm':   '0 2px 8px rgba(0,0,0,0.4)',
        'apple-md':   '0 8px 32px rgba(0,0,0,0.6)',
        'apple-lg':   '0 20px 60px rgba(0,0,0,0.8)',
        'apple-xl':   '0 32px 80px rgba(0,0,0,0.9)',
        'card-hover': '0 24px 64px rgba(0,0,0,0.75)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
