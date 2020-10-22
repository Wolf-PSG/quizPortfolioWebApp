const webpack = require('webpack');
const {join} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const outputPath = join(process.cwd(), '/dist');

// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); join(__dirname, "src", "index.js")

module.exports = {
  entry: './src/index.js',
  output: {
    path: join(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        // options: {
        //   presets: ["react", "es2015", "stage-1"]
        // },
      },
       {
        test: /\.html$/i,
        use: [{        
          loader: 'html-loader',
        }]
      },
     {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
       {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      use: [
        {        
          loader: 'file-loader',
        }
      ]
    
      },
      ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
    output: {
    path: outputPath
  },
  // output: {
  //   path: `${__dirname}/dist`,
  //   publicPath: '/',
  //   filename: 'bundle.js',
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: join(__dirname, "src", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new Serve({ static: outputPath }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('production')
    }),
    // new FaviconsWebpackPlugin()

    // new MiniCssExtractPlugin({ filename: isDevelopment ? '[name].css' : '[name].[hash].css', chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css' }),
  ],
  watch: true,
}
