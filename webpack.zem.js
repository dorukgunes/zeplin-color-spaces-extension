module.exports = function ({ module: { rules, ...module }, ...webpackConfig }) {
  return {
    ...webpackConfig,
    entry: "./src/index.ts",
    resolve: {
      extensions: [".ts"],
    },
    module: {
      ...module,
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        ...rules
      ],
    },
  };
};
