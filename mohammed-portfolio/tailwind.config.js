/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C63FF',
          50: '#F1F0FF',
          100: '#E4E2FF',
          200: '#C9C5FF',
          300: '#ADA7FF',
          400: '#8F87FF',
          500: '#6C63FF',
          600: '#5147E8',
          700: '#3E36C4',
          800: '#2E2894',
          900: '#211D6B',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          400: '#A688FF',
          500: '#8B5CF6',
          600: '#7440E0',
        },
        accent: {
          DEFAULT: '#22D3EE',
          soft: '#67E8F9',
        },
        online: '#34D399',
        surface: {
          dark: '#0A0A0A',
          'dark-elevated': '#111114',
          'dark-card': '#131318',
          light: '#FFFFFF',
          'light-elevated': '#F7F6FE',
          'light-card': '#FBFAFF',
        },
        ink: {
          dark: '#08060D',
          light: '#F8F8F8',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        arabic: ['"IBM Plex Sans Arabic"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(rgba(8,6,13,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(8,6,13,0.045) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora': 'linear-gradient(120deg, #6C63FF 0%, #8B5CF6 45%, #22D3EE 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(108, 99, 255, 0.55)',
        'glow-lg': '0 0 90px -20px rgba(139, 92, 246, 0.55)',
        card: '0 8px 30px -12px rgba(0,0,0,0.35)',
        'card-light': '0 8px 30px -14px rgba(35, 25, 80, 0.18)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.2, 0.6, 0.4, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        blink: 'blink 1s step-end infinite',
        marquee: 'marquee 28s linear infinite',
      },
      backgroundSize: {
        'grid-cell': '44px 44px',
        '200%': '200% 200%',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
