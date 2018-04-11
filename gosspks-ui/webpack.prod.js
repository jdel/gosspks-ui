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
    new webpack.HotModuleReplacementPlugin()
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
  // devtool: "source-map",
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
        NODE_ENV: JSON.stringify('production')
      },
    }),
    //new analyzer.BundleAnalyzerPlugin(),\
    new htmlWebpack({
      appMountId: "app",
      mobile: true,
      template: "./index.html",
      title: "GoSSPKS"
    }),
    
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: true,
      mangle: true,
      compress: {
        sequences: true,  // join consecutive statements with the “comma operator”
        properties: true,  // optimize property access: a["foo"] → a.foo
        dead_code: true,  // discard unreachable code
        drop_debugger: true,  // discard “debugger” statements
        drop_console: true, // discard “console” statements
        unsafe: false, // some unsafe optimizations (see below)
        conditionals: true,  // optimize if-s and conditional expressions
        comparisons: true,  // optimize comparisons
        evaluate: true,  // evaluate constant expressions
        booleans: true,  // optimize boolean expressions
        loops: true,  // optimize loops
        unused: true,  // drop unused variables/functions
        hoist_funs: true,  // hoist function declarations
        hoist_vars: false, // hoist variable declarations
        if_return: true,  // optimize if-s followed by return/continue
        join_vars: true,  // join var declarations
        cascade: true,  // try to cascade `right` into `left` in sequences
        side_effects: true,  // drop side-effect-free statements
        warnings: false  // warn about potentially dangerous optimizations/code
      }
    })
  ].concat(plugins)
};
