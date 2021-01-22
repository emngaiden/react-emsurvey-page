const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 80,
    publicPath: "http://localhost:80/dist/",
    historyApiFallback: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};