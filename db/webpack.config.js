const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const orgName = "template-ui";
const projectName = "db";
const SHA = process.env.GIT_COMMIT || process.env.CI_COMMIT_SHA || "stg";

const commondModules = (isProd) => {
  const useCSS = [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader", {
        paths: [require.resolve("webpack-config-single-spa")],
      }),
      options: {
        modules: true,
      },
    },
    "postcss-loader",
    "sass-loader",
  ];
  return [
    {
      test: /(\.scss|\.css)$/,
      exclude: /node_modules/,
      use: useCSS,
    },
  ];
  // todo: add url_loader for imafges and svgs
};

const commonPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      VERSION:
        process.env.GIT_COMMIT || process.env.CI_COMMIT_SHA || "development",
      LOV_SERVICE_URL: process.env.LOV_SERVICE_URL,
      // add any env variables in here and update package build and start scripts to set values
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
        },
        {
          from: "mfe.json",
          transform: {
            transformer(content) {
              return Buffer.from(
                content.toString()
                  .replace(/SHA/g, SHA)
                  .replace(/LOV_SERVICE_URL/g, process.env.LOV_SERVICE_URL)
              );
            },
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ];
  return plugins;
};

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
  });

  const args = argv || {};
  const isProd = args.p || args.mode === "production";

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // externals: [/^@org-name\/.+/]
    output: {
      path: path.resolve(
        process.cwd(),
        "dist",
        `${orgName}-${projectName}`,
        SHA
      ),
    },
    plugins: commonPlugins(),
    module: {
      rules: commondModules(isProd),
    },
    externals: [
      /^@template-ui\/.+/,
      /^@ofortawesomee\/.+/,
      "react",
      "react-dom",
      "react-bootstrap",
      "react-bootstrap-typeahead",
      "react-hook-form",
      "react-query",
      "moment",
    ],
  });
};
