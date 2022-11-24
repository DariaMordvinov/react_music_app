const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./client/index.js"],
  output: {
    filename: "bundle.js",
    publicPath: '/',
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
        },
        {
          test: /\.css/,
          use: ["style-loader", "css-loader"],
        }
      ],
   },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build')
    },
    proxy: {
      '/': 'http://localhost:8080'
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
}
