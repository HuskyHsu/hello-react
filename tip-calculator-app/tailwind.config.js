module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        DEFAULT: "hsl(172, 67%, 45%)",
        "text-dark": "hsl(186, 14%, 43%)",
        "text-light": "hsl(180, 18%, 40%)",
        light: "hsl(185, 41%, 84%)",
        darkest: "hsl(183, 100%, 15%)",
        lightest: "hsl(189, 41%, 97%)",
        light: "hsl(172, 67%, 45%)",
        label: "hsl(184, 14%, 56%)",
      },
      fontFamily: {
        spaceMono: ["Space Mono", "monospace", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
