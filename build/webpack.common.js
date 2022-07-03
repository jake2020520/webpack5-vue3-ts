const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CliPluginTypescript = require('@vue/cli-plugin-typescript');
const webpack = require('webpack');
console.log('process.env.NODE_ENV=:  ', process.env.NODE_ENV);
// const NODE_ENV = process.env.NODE_ENV // 打印环境变量
module.exports = function (mode) {
  return {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
      filename: '[name].[hash:8].js',
      path: path.resolve(__dirname, '../dist')
      // assetModuleFilename: 'asset/[name].[hash:8].[ext]',
    },
    module: {
      rules: [
        {
          // 解决element lodash 报错的问题
          test: /\.mjs$/i,
          resolve: { byDependency: { esm: { fullySpecified: false } } }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: mode === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: mode === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' }
          ]
        },
        // {
        //   test: /\.js$/,
        //   exclude: /(node_modules|dist)/,
        //   use: {
        //     loader: 'babel-loader',
        //   },
        // },
        {
          test: /\.vue$/,
          exclude: /(node_modules|dist)/,
          use: 'vue-loader'
        },
        // {
        //   test: /\.(t|j)s$/,
        //   exclude: /(node_modules|dist)/,
        //   use: [
        //     {
        //       loader: 'ts-loader',
        //       options: {
        //         // 指定特定的ts编译配置，为了区分脚本的ts配置
        //         configFile: path.resolve(__dirname, '../tsconfig.json'),
        //         appendTsSuffixTo: [/.vue$/],
        //         transpileOnly: true // 关闭类型检查，即只进行转译
        //       }
        //     }
        //     // {
        //     //   loader: 'eslint-loader',
        //     //   options: {
        //     //     // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        //     //     formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        //     //   }
        //     // }
        //   ]
        // },
        {
          test: /\.(t|j)s$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
            // ,
            //   {
            //     loader: 'eslint-loader',
            //     options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
            //       formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
            //   }
            // }
          ]
        },
        {
          test: /\.tsx$/,
          exclude: /(node_modules|dist)/,
          use: ['vue-loader', 'vue-tsx-loader']
        },
        // 打包图片等
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[hash:8].[ext]'
          }
        },
        // 打包字体等
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 匹配字体文件
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i, // 匹配音视频
          type: 'asset/resource',
          generator: {
            filename: 'meia/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.vue', '.ts', '.tsx', '.js', '.mjs'],
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    },
    plugins: [
      // 打包清空原打包文件 yarn add clean-webpack-plugin
      new CleanWebpackPlugin(),
      // 分离css  yarn add mini-css-extract-plugin -D  分离
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css'
      }),
      new VueLoaderPlugin(),
      new LodashModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        lodash: '-' //通过什么名称使用这个库
      })
    ],
    devServer: {
      // contentBase: path.resolve(__dirname, 'public'), // 静态文件目录
      compress: true, //是否启动压缩 gzip
      port: 8080, // 端口号
      open: true // 是否自动打开浏览器
    }
  };
};
