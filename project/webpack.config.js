let webpack = require('webpack');
let path = require('path');
let autoprefixer = require('autoprefixer');
let GLOBALS = {
  DEFINE_OBJ: {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true,
  },

  folders: {
    SRC: path.resolve(__dirname, 'src'),
    COMPONENT: path.resolve(__dirname, 'src/components'),
    BUILD: path.resolve(__dirname, 'build'),
    BOWER: path.resolve(__dirname, 'bower_components'),
    NPM: path.resolve(__dirname, 'node_modules'),
  },
};

let config = {

  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  //方便打包后调试--生产阶段则一定不要启用这个选项
  devtool: 'cheap-eval-source-map',

  entry: {
    index: [
       // necessary for hot reloading with IE:
    //  'eventsource-polyfill',
    //  'react-hot-loader/patch',
    //  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',

      './src/index.js',
    ],
  },

  // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  target: 'web',
  output: {
    path: GLOBALS.folders.BUILD,
    publicPath: '/',
    filename: 'scripts/bundle.js',
  },
  devServer: {
    /**
     * contentBase:默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
     * port:设置默认监听端口，如果省略，默认为”8080“
     * inline:设置为`true`，当源文件改变时会自动刷新页面
     * historyApiFallback:在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为`true`，所有的跳转将指向index.html
     */
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },

      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },

      {
        test: /\.(ttf|eot|svg|cur)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
          },
        ]
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ['shared/scss']
            }
          }
        ]
      },

      {
        test: /\.(js|jsx)?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "shared"),
          path.resolve(__dirname, "packages"),
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["env", { "modules": false }]
              ],
              plugins: ['syntax-dynamic-import'],
              cacheDirectory: true,
            }
          },
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "shared"),
      path.resolve(__dirname, "packages"),
    ],
  },
  performance: {
    hints: false, // enum
    maxAssetSize: 24000000, // int (in bytes),
    maxEntrypointSize: 40000000, // int (i bytes
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,

      // set to false to see a list of every file being bundled.
      noInfo: true,
    }),
    new webpack.DefinePlugin(GLOBALS.DEFINE_OBJ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

module.exports = config;

