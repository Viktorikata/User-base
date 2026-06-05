const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";

  return {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      clean: true,
      publicPath: "/User-base/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
        test: /\.tsx?$/,
        use: {
            loader: "ts-loader",
            options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "tsconfig.json"),
            },
        },
        exclude: /node_modules/,
        },
        {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        },        
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
    ],
    devtool: isDev ? "eval-source-map" : "source-map",
    devServer: {
      port: 3000,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
  };
};
