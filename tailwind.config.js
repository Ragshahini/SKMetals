/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1e3a8a',
        'dark-blue': '#1b3d81',
        'light-gray': '#f3f4f6',
        'gold': '#b5a642',
        'copper': '#b87333',
        'black': '#000000',
        'cream': '#f5f5dc',
      },
      fontFamily: {
        sans: ['Open Sans', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
