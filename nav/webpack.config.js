const path = require("path");
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'mfe',
    projectName: 'nav',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // externals: [/^@org-name\/.+/]    
    output: {
      path: path.resolve(process.cwd(), 'dist', 'mfe-nav', process.env.GITHUB_SHA || 'stg'),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'mfe.json' },
        ],
      }),
    ],
  });
};
