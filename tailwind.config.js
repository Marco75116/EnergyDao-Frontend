const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      magicWallet: "#6851FF",
      borderCardNavbar: "#00000014",
      bgCardNavbar: "#FAFAFA",
    },
    extend: {},
  },
  plugins: [],
};
