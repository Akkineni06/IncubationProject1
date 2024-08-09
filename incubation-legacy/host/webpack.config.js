const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'http://localhost:3000/',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Host',
      remotes: {
        ProductModule: 'ProductModule@http://localhost:3001/remoteEntry.js',
        CartModule: 'CartModule@http://localhost:3002/remoteEntry.js',
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
