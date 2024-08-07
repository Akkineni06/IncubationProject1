const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ProductModule',
      filename: 'remoteEntry.js',
      exposes: {
        './AddNewItem': './src/ProductComponents/AddNewItem',
        './AdminItemCard': './src/ProductComponents/AdminItemCard',
        './AdminItemsTable': './src/ProductComponents/AdminItemsTable',
        './CustomerItemsTable': './src/ProductComponents/CustomerItemsTable',
        './ItemCard': './src/ProductComponents/ItemCard',
        },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
