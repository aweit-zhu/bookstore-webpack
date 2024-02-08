const path = require("path");
const fs = require("fs");
const srcDir = path.resolve(__dirname, "src");
const pagesDir = path.resolve(__dirname, "src", "pages");
const CopyWebPackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(srcDir, "index.js"),
    login: path.resolve(srcDir, "pages", "login", "login.js"),
    backend: path.resolve(srcDir, "pages", "backend", "back.js"),
    slide: path.resolve(srcDir,'assets', 'js', "slide.js"),
    cart: path.resolve(srcDir, "pages", "cart", "cart.js"),
    order: path.resolve(srcDir, "pages", "order", "order.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    clean: true,
  },
  resolve: {
    alias: {
      "@": [path.resolve(__dirname, "src"), path.resolve(__dirname, "public")],
    },
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, "index.html"), // 指定index.html模板文件的路径
      filename: "index.html", // 指定生成的index.html文件名称
      chunks: ["index","slide"], // 指定要插入到HTML文件中的JavaScript模块
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, "pages", "login", "login.html"),
      filename: "login.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, "pages", "backend", "back.html"),
      filename: "back.html",
      chunks: ["index","backend"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, "pages", "cart", "cart.html"),
      filename: "cart.html",
      chunks: ["index","cart"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, "pages", "order", "order.html"),
      filename: "order.html",
      chunks: ["index","order"],
    }),
    new MiniCssExtractPlugin(),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src","templates"),
          to: path.resolve(__dirname, "dist","templates"),
          //filter: (resourcePath) => !resourcePath.endsWith(".html"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], //'style-loader'
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: true,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname,'src', 'assets'),
      publicPath: '/public',
    },
  },
  stats: {
    modulesSpace: 999,
  },
  optimization: {
    minimize: true,
  },
};
