module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        DEFAULT: "hsl(172, 67%, 45%)",
        "text-dark": "hsl(186, 14%, 43%)",
        light: "hsl(185, 41%, 84%)",
        darkest: "hsl(183, 100%, 15%)",
        lightest: "hsl(189, 41%, 97%)",
        light: "hsl(172, 67%, 45%)",
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
