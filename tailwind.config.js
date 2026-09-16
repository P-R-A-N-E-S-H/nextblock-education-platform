/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a5f8',
          500: '#0e87eb',
          600: '#016ac9', // Strong high-contrast electric blue
          700: '#0254a3',
          800: '#064786',
          900: '#0a3c6f',
          950: '#07264a',
        },
        navy: {
          800: '#0f172a',
          900: '#090e1a',
          950: '#040711',
        },
        accent: {
          cyan: '#06b6d4',
          emerald: '#059669',
          amber: '#d97706',
          indigo: '#4f46e5',
          violet: '#7c3aed',
          rose: '#e11d48',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(2, 84, 163, 0.12), 0 0 1px 1px rgba(15, 23, 42, 0.08)',
        'premium-hover': '0 25px 50px -12px rgba(1, 106, 201, 0.22), 0 0 1px 1px rgba(1, 106, 201, 0.35)',
        'glow-blue': '0 0 35px -5px rgba(14, 135, 235, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.45)',
        'glow-emerald': '0 0 35px -5px rgba(5, 150, 105, 0.45)',
      }
    },
  },
  plugins: [],
}
