/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Fond général
        'flux-bg':       '#09090f',
        'flux-surface':  '#0f0e1a',
        'flux-elevated': '#161425',
        'flux-border':   'rgba(139,92,246,0.18)',
        // Accents violet
        'flux-accent':   '#8b5cf6',
        'flux-accent2':  '#a78bfa',
        'flux-accent3':  '#c4b5fd',
        'flux-glow':     '#7c3aed',
        // Accent rouge conservé
        'flux-accentAlt':'#ff453a',
        // Labels sémantiques (héritage Apple conservé)
        'label':   '#f4f0ff',
        'label-2': 'rgba(228,220,255,0.65)',
        'label-3': 'rgba(228,220,255,0.35)',
        'label-4': 'rgba(228,220,255,0.15)',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        // Dégradé global de page
        'page-gradient': 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(139,92,246,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 90% 30%, rgba(124,58,237,0.1) 0%, transparent 60%)',
        // Shine sur les cartes
        'card-shine': 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
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
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.45s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':    'fade-up 0.35s cubic-bezier(0.22,1,0.36,1) both',
        shimmer:      'shimmer 1.7s ease-in-out infinite',
        'scale-in':   'scale-in 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
      boxShadow: {
        'violet-sm':  '0 0 20px rgba(139,92,246,0.2)',
        'violet-md':  '0 0 40px rgba(139,92,246,0.25)',
        'card':       '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
