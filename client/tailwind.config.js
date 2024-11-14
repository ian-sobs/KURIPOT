/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", "sans-serif"], //default font
      },
      screens: {
        sm: "640px",
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (desktops)
        xl: "1280px", // Extra large devices (large desktops)
        "2xl": "1536px", // For ultra-wide screens
      },
      fontSize: {
        xxs: ".65rem",
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
      backgroundImage: {
        "center-vertical":
          "linear-gradient(to top, transparent 0%, #293F80 30%, #293F80 50%, #293F80 70%, transparent 100%)",
      },
      // 293F80
    },
  },
  plugins: [require("daisyui")],
};
