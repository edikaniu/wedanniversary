/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#FBF3EB',
        },
        rose: {
          DEFAULT: '#B76E79',
          blush: '#E8B4B8',
          deep: '#8B3A4A',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8C99B',
          dark: '#9A7D4E',
        },
        'warm-brown': {
          DEFAULT: '#6B4F3E',
          dark: '#1A0F0A',
          muted: '#A08B7A',
          medium: '#8A7262',
        },
        'rose-warm': '#C48B6A',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Garamond', 'serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1000ms ease-out both',
        'fade-in': 'fadeIn 800ms ease-out both',
        heartbeat: 'heartbeat 3s ease-in-out infinite',
        'float-heart': 'floatHeart var(--duration, 20s) linear var(--delay, 0s) infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scale-in': 'scaleIn 400ms ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        floatHeart: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: 'var(--max-opacity, 0.15)' },
          '90%': { opacity: 'var(--max-opacity, 0.15)' },
          '100%': { transform: 'translateY(-10vh) rotate(45deg)', opacity: '0' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
