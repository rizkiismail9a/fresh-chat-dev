/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        danau: "url('./src/assets/image/bg.jpg')",
      },
    },
    screens: {
      desktop: "1440px",
      tablet: "768px",
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
