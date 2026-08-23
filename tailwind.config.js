/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#101014',
        paper: '#f6f2eb',
        ember: '#d85d38',
        volt: '#b9f26d',
        ocean: '#176b87'
      },
      boxShadow: {
        line: '0 1px 0 rgba(16, 16, 20, 0.12)'
      }
    }
  },
  plugins: []
};
