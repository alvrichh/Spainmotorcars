const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CONFIG_PATH = path.resolve(__dirname, "site.config.js");
const PARTIALS_DIR = path.resolve(__dirname, "src/partials");

// Every page template lives directly in src/ so relative asset paths match.
const pages = [
  { template: "./src/index.html", filename: "index.html" },
  { template: "./src/aviso-legal.html", filename: "aviso-legal.html" },
  { template: "./src/privacidad.html", filename: "privacidad.html" },
  { template: "./src/cookies.html", filename: "cookies.html" },
  { template: "./src/404.html", filename: "404.html" }
];

const loadSiteConfig = () => {
  delete require.cache[CONFIG_PATH];
  return require(CONFIG_PATH);
};

/**
 * html-loader preprocessor:
 *  - {{> name}}  inserts src/partials/name.html
 *  - {{key}}     inserts the value of `key` from site.config.js
 */
const preprocessHtml = (content, loaderContext) => {
  const site = loadSiteConfig();
  loaderContext.addDependency(CONFIG_PATH);

  // Partials may include other partials, so expand until none are left.
  const expandPartials = (html, depth = 0) => {
    if (depth > 5) {
      throw new Error("Partials nested too deeply (possible include loop).");
    }
    const expanded = html.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => {
      const file = path.join(PARTIALS_DIR, `${name}.html`);
      loaderContext.addDependency(file);
      return fs.readFileSync(file, "utf8");
    });
    return expanded === html ? html : expandPartials(expanded, depth + 1);
  };

  const withPartials = expandPartials(content);

  return withPartials.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    if (!(key in site)) {
      loaderContext.emitWarning(new Error(`Unknown site.config key: ${key}`));
      return match;
    }
    return site[key];
  });
};

module.exports = (_, argv = {}) => {
  const isProd = argv.mode === "production";
  const site = loadSiteConfig();

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: isProd ? "assets/js/[name].[contenthash:8].js" : "assets/js/[name].js",
      assetModuleFilename: "assets/media/[name].[hash:8][ext]",
      clean: true
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public")
      },
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: {
        // Mirror Vercel's cleanUrls locally: /aviso-legal -> /aviso-legal.html
        rewrites: [
          ...pages
            .filter((page) => page.filename !== "index.html")
            .map((page) => ({
              from: new RegExp(`^/${page.filename.replace(".html", "")}/?$`),
              to: `/${page.filename}`
            })),
          { from: /./, to: "/404.html" }
        ]
      },
      watchFiles: ["src/**/*.html", "site.config.js"]
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            preprocessor: preprocessHtml
          }
        },
        {
          test: /\.s?css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif|mp4|webm)$/i,
          type: "asset/resource"
        },
        {
          test: /\.(woff2?)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[hash:8][ext]"
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __SITE__: JSON.stringify({ email: site.email, brandName: site.brandName })
      }),
      ...pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            ...page,
            scriptLoading: "defer"
          })
      ),
      new CopyPlugin({
        patterns: [{ from: "public", to: "." }]
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
