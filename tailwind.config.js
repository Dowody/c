/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#1a1a2e',
          100: '#16213e',
          200: '#0f3460',
          300: '#0d1117',
          400: '#161b22',
          500: '#21262d',
          600: '#30363d',
          700: '#484f58',
          800: '#6e7681',
          900: '#c9d1d9'
        },
        brand: {
          50: '#6366f1',
          100: '#4f46e5',
          200: '#3730a3'
        }
      },
      boxShadow: {
        'modern': '0 10px 25px rgba(0, 0, 0, 0.3)',
        'inner-modern': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)'
      },
      borderRadius: {
        'large': '1.5rem'
      }
    },
  },
  plugins: [],
}
