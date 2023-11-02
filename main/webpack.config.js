const path = require('path');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const orgName = 'mfe';
const projectName = 'main';
const SHA = process.env.CI_COMMIT_SHA || process.env.GITHUB_SHA || 'stg';

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
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
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.ejs',
        filename: '../../index.html',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: 'public/**', to: '../../' },
          {
            from: 'mfe.json',
            transform: {
              transformer(content) {
                return Buffer.from(content.toString().replace(/SHA/g, SHA));
              },
            },
          }
        ],
      }),
      new InjectManifest({
        swSrc: './src/service-worker.js',
        swDest: '../../service-worker.js',
      }),
    ],
  });
};
