/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        ringColor: {
          DEFAULT: 'transparent', // Set the default ring color to transparent
        },
        ringShadow: {
          DEFAULT: 'none', // Set the default box shadow to none
        },
        boxShadow: {
          DEFAULT: 'none', // Set the default box shadow to none
        },
      },
  },
  plugins: [],
}

