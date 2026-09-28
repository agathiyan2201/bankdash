/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        brand: {
          blue: '#1814F3',
          navy: '#343C6A',
          muted: '#718EBF',
          soft: '#B1B1B1',
          bg: '#F5F7FA',
          border: '#DFEAF2',
          green: '#16DBAA',
          red: '#FE5C73',
          ink: '#232323',
        },
      },
      boxShadow: { card: '0 4px 20px rgba(52, 60, 106, 0.06)' },
    },
  },
  plugins: [],
};
