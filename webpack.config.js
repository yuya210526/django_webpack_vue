var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  // モード指定
  mode: 'development',
  // エントリーポイント
  entry: './public/js/app.js',
  // コンパイルされたファイルの設定
  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module : {
    // Loaderの設定
    rules : [
      // CSSファイルの読み込み
      {
        // 対象となるファイルの拡張子
        test: /\.css/,
        // ローダー名
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップを有効にする
              sourceMap: true,
            },
          },
        ],
      },
    ]
  },

  resolve: {
    alias: {
      // 下記エイリアス設定がないとvueが走らない
      'vue': path.resolve('./node_modules/vue/dist/vue.js'),
    }
  },
}