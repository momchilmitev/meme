require("dotenv").config();
const webpack = require("webpack");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  context: __dirname,
  devtool: "eval-source-map",
  entry: {
    general: "./src/js/general.js",
    memes: "./src/js/memes.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      NAME: JSON.stringify(process.env.NAME),
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(__dirname + "/*.html"),
      minimize: true,
    }),
  ],
};

if (isProduction) {
  module.exports.plugins.push(
    webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  );
}
