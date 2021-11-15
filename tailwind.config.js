module.exports = {
  purge: [
			"./source/**/*.html",
			"./source/**/*.ts",
		],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       colors: {
        senseiGreen: "#14c949",
        lightGreen: "#bcffd1",
        darkGreen: "#139539",
        senseiGrey: "#dadada",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

/* ./tailwind.config.js */
