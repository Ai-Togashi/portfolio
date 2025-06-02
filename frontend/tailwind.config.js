/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        bgfade: "bgfade 20s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        bgfade: {
          "0%": { backgroundColor: "#fefce8" },   
          "25%": { backgroundColor: "#ecfccb" },  
          "50%": { backgroundColor: "#e0f2fe" },  
          "75%": { backgroundColor: "#fae8ff" },  
          "100%": { backgroundColor: "#fefce8" }, 
        },
      },
    },
  },
  plugins: [],
};


