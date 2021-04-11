const path = require('path');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

const orgName = 'mfe';
const projectName = 'shared';
const SHA = process.env.CI_COMMIT_SHA || process.env.GITHUB_SHA || 'stg';

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // externals: [/^@org-name\/.+/]
    output: {
      path: path.resolve(
        process.cwd(),
        'dist',
        `${orgName}-${projectName}`,
        SHA
      ),
    },
    plugins: [
      new DefinePlugin({
        'process.env.USER_POOL_ID': JSON.stringify(process.env.USER_POOL_ID),
        'process.env.USER_POOL_WEB_CLIENT_ID': JSON.stringify(process.env.USER_POOL_WEB_CLIENT_ID),
        'process.env.USER_POOL_DOMAIN': JSON.stringify(process.env.USER_POOL_DOMAIN),
      }),
      new CopyPlugin({
        patterns: [{
          from: 'mfe.json',
          transform: {
            transformer(content) {
              return Buffer.from(content.toString().replace(/SHA/g, SHA));
            },
          },
        }],
      }),
    ],
  });
};
