const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
module.exports = merge(commonConfig(process.env.NODE_ENV), {
  mode: 'production',
  entry: {
    vue: ['vue', 'vue-router']
  },
  output: {
    // 可以配置cdn 公用路径
    //  publicPath: 'https://www.baidu.com/cdn'
  },
  optimization: {
    chunkIds: 'natural', // 设置生成的文件名Id
    splitChunks: {
      /* SplitChunksPlugin去重和分离代码
      默认是async只针对异步导入
      initial 只针对同步导入
      all 异步同步都处理 （推荐）
       */
      // chunks:"all"
      cacheGroups: {
        vendors: {
          //包的第三方库放到了chunk-vendors文件去
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/, // 路径
          priority: -10, // 优先级 当匹配到 default与vendors时，谁的优先级高匹配谁
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2, // 表示拆分出来的包只要被应用 n次，如果少于则不拆分
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: '我的第一个项目 prod'
    }),
    // 压缩 css  yarn add css-minimizer-webpack-plugin  -D 压缩 css
    new CssMinimizerWebpackPlugin()
  ]
});
