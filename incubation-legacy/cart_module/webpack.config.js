const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3002/',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3002,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'CartModule',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/CartComponents/Cart',
        './UseCart': './src/CartComponents/UseCart'
      },
    //   remotes: {
    //     ProductModule: 'ProductModule@http://localhost:3001/remoteEntry.js',
    //   },
      shared: { 
        "react": { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
