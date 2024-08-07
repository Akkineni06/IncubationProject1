const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Host',
      remotes: {
        ProductModule: 'product@http://localhost:3001/remoteEntry.js',
        CartModule: 'cart@http://localhost:3002/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
