const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const htmlWebpack = require("html-webpack-plugin");
const webpackNotifier = require("webpack-notifier");
const copyWebpack = require("copy-webpack-plugin");
const pkg = require("./package.json");
const context = path.join(__dirname);

const target = process.env.npm_lifecycle_event
  ? process.env.npm_lifecycle_event
  : "start";

var plugins = [];
if (target === "start") {
  plugins.push(
    new webpackNotifier({ title: pkg.name }),
    new webpack.HotModuleReplacementPlugin() /*,
         new webpack.optimize.CommonsChunkPlugin( { names: [ 'vendor', 'manifest' ] } )*/
  );
}

const es6Modules = [];

const sassLoaders = [
  {
    loader: "classnames-loader"
  },
  {
    loader: "style-loader"
  },
  {
    loader: "css-loader",
    options: {
      modules: false,
      sourceMap: true,
      importLoaders: 1,
      localIdentName: "[name]-[hash:base64:2]"
    }
  },
  {
    loader: "sass-loader",
    options: {
      sourceMap: true
    }
  }
];

module.exports = {
  entry: {
    app: context
  },
  output: {
    filename: "[name].js",
    publicPath: "/",
    path: __dirname + "/build"
  },
  devtool: "source-map",
  devServer: {
    host: "localhost",
    port: 8080,
    historyApiFallback: true,
    hot: true,
    inline: true,
    // Display only errors to reduce the amount of output.
    stats: "errors-only"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [context, "node_modules"]
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "stage-0", "react"]
            }
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: new RegExp(
          "node_modules/" + es6Modules.map(m => "(?!" + m + ")").join("")
        ),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "stage-0", "react"]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "source-map-loader"
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "resources/[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9-\.=]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: sassLoaders
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
    }),
    //new analyzer.BundleAnalyzerPlugin(),
    new htmlWebpack({
      appMountId: "app",
      mobile: true,
      template: "./index.html",
      title: pkg.name
    })
  ].concat(plugins)
};
