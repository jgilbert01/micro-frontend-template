const path = require('path');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');
const CopyPlugin = require('copy-webpack-plugin');

const orgName = 'mfe';
const projectName = 'about';
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
