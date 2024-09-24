/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Red': 'hsl(14, 86%, 42%)',
        'Green': 'hsl(159, 69%, 38%)',
        
        'Rose_1': 'hsl(20, 50%, 98%)',
        'Rose_2': 'hsl(13, 31%, 94%)',
        'Rose_3': 'hsl(14, 25%, 72%)',
        'Rose_4': 'hsl(7, 20%, 60%)',
        'Rose_5': 'hsl(12, 20%, 44%)',
        'Rose_6': 'hsl(14, 65%, 9%)'
      }
    },
  },
  plugins: [],
}

