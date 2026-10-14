const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CONFIG_PATH = path.resolve(__dirname, "site.config.js");
const STRINGS_PATH = path.resolve(__dirname, "src/i18n/strings.js");
const PARTIALS_DIR = path.resolve(__dirname, "src/partials");
const SRC_DIR = path.resolve(__dirname, "src");

/**
 * Pages and their translations. `es` and `en` are the public URLs of the
 * Spanish and English versions, used for the language switcher and hreflang.
 */
const pages = [
  { template: "index.html", lang: "es", es: "/", en: "/en/" },
  { template: "aviso-legal.html", lang: "es", es: "/aviso-legal", en: "/en/legal-notice" },
  { template: "privacidad.html", lang: "es", es: "/privacidad", en: "/en/privacy" },
  { template: "cookies.html", lang: "es", es: "/cookies", en: "/en/cookies" },
  { template: "404.html", lang: "es", es: "/", en: "/en/" },
  { template: "en/index.html", lang: "en", es: "/", en: "/en/" },
  { template: "en/legal-notice.html", lang: "en", es: "/aviso-legal", en: "/en/legal-notice" },
  { template: "en/privacy.html", lang: "en", es: "/privacidad", en: "/en/privacy" },
  { template: "en/cookies.html", lang: "en", es: "/cookies", en: "/en/cookies" }
];

const pageByTemplate = new Map(pages.map((page) => [path.join(SRC_DIR, page.template), page]));

const fresh = (file) => {
  delete require.cache[file];
  return require(file);
};

// Variables available to every template for a given page.
const pageVariables = (page) => {
  const site = fresh(CONFIG_PATH);
  const strings = fresh(STRINGS_PATH)[page.lang];
  const vars = { ...site, lang: page.lang, urlEs: page.es, urlEn: page.en };

  // Language switcher state: mark the current language.
  vars.esCurrent = page.lang === "es" ? 'aria-current="true"' : "";
  vars.enCurrent = page.lang === "en" ? 'aria-current="true"' : "";

  Object.entries(strings).forEach(([key, value]) => {
    vars[`t.${key}`] = value;
  });
  return vars;
};

/**
 * html-loader preprocessor:
 *  - {{> name}}   inserts src/partials/name.html
 *  - {{key}}      inserts a value from site.config.js or the page variables
 *  - {{t.key}}    inserts a string from src/i18n/strings.js in the page language
 * Asset paths are written as "./assets/..." everywhere and rewritten for pages
 * that live in a subfolder (src/en/).
 */
const preprocessHtml = (content, loaderContext) => {
  const page = pageByTemplate.get(loaderContext.resourcePath);
  if (!page) {
    throw new Error(`No page entry for ${loaderContext.resourcePath}`);
  }
  loaderContext.addDependency(CONFIG_PATH);
  loaderContext.addDependency(STRINGS_PATH);
  const vars = pageVariables(page);

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

  const withVars = expandPartials(content).replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
    if (!(key in vars)) {
      loaderContext.emitWarning(new Error(`Unknown template key: ${key}`));
      return match;
    }
    return vars[key];
  });

  const toSrc = path.relative(path.dirname(loaderContext.resourcePath), SRC_DIR);
  const assetPrefix = toSrc ? `${toSrc.split(path.sep).join("/")}/assets/` : "./assets/";
  return withVars.replace(/(["'(])\.\/assets\//g, `$1${assetPrefix}`);
};

module.exports = (_, argv = {}) => {
  const isProd = argv.mode === "production";
  const site = fresh(CONFIG_PATH);

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: isProd ? "assets/js/[name].[contenthash:8].js" : "assets/js/[name].js",
      assetModuleFilename: "assets/media/[name].[hash:8][ext]",
      clean: true
    },
    performance: {
      // Hero videos are large by nature and only load on the homepage.
      assetFilter: (file) => !/\.(mp4|webm|map)$/.test(file)
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
            .filter((page) => page.template !== "index.html")
            .map((page) => {
              const clean = page.template.replace(/(\/?index)?\.html$/, "");
              return { from: new RegExp(`^/${clean}/?$`), to: `/${page.template}` };
            }),
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
            template: `./src/${page.template}`,
            filename: page.template,
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
