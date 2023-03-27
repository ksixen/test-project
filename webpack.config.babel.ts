import * as webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const scriptFiles = /\.(js|jsx|ts|tsx)?$/;
// const config = (): webpack.Configuration  => {
const config = () => {
  return {
    entry: "./src/index.tsx",
    amd: false,
    cache: true,
    mode: "development",
    devtool: "source-map",
    module: {
      rules: [
        {
          exclude: /(node_modules)/,
          test: scriptFiles,
          use: ["babel-loader", "ts-loader"],
          resolve: {
            extensions: [".jsx", ".tsx", ".ts", ".js"],
          },
        },
        {
          test: /\.s(a|c)ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader' ]
        }
      ],
    },
    output: {
      filename: "[name].[contenthash].js",
      clean: true,
      path: path.join(__dirname, "/dist/static"),
      asyncChunks: true,


    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new webpack.DefinePlugin({
        process: {env: {}}
    })
  
    ],
    optimization: {
      runtimeChunk: "multiple",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      allowedHosts: 'all',
    },  
  };
};

export default config();
