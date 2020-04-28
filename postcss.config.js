module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 0,
      autoprefixer: { grid: "autoplace" },
    },
    "postcss-nested": {},
    "postcss-css-variables": {},
  },
};
