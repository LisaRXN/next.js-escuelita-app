import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myorange: "#FA9F07",
        myzinc: "#193252",
        mygreen: "#65C5A9",
        myteal: "#2B797C",
        myred: "#D52346",
        mygray: "#485668",
        mygrey: "#818385",
        mylightgray: "#F3F3F3",
      },
      fontFamily: {
        montserrat: ["Montserrat Variable", "sans-serif"],
        inter: ["Inter Variable", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
};
