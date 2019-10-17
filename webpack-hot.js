const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const port = process.env.PORT || 8080;
const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  contentBase: '/',
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});

devServer.listen(port, '0.0.0.0', err => {
  if (err) {
    console.error(err);
  }
  console.log(`=> \u{1f525} webpack dev server running on port ${port}`);
});
