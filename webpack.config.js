const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv = {}) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "assets/js/[name].[contenthash:8].js" : "assets/js/[name].js",
      assetModuleFilename: "assets/media/[name].[hash:8][ext]",
      clean: true
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist")
      },
      port: 3000,
      open: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader"
        },
        {
          test: /\.scss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif|mp4|webm)$/i,
          type: "asset/resource"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        scriptLoading: "defer"
      }),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: "assets/css/[name].[contenthash:8].css"
            })
          ]
        : [])
    ]
  };
};

