module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // false 不使用 profill
        /*
         * usage 根据代码使用需要的porfill,不需要的不适用,
         * usage 因为有些库已经实现了自己的profill，
         * usage 我们再给他配置新的profill时可能会报错。exclude:"/node_modules/"
         */
        /*
         * entry 只要是模板浏览器需要的profill,全部加上,我们还需要在入口文件下引入
         * entry import 'core-js/stable';
         * entry import 'regenerator-runtime/runtime'
         */
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    // tsc会自动加上profill吗？答案是不会。
    [
      '@babel/preset-typescript',
      {
        // 这个打开，会报错，目前不知为何
        // allExtensions: true // 支持所有文件扩展名，否则在vue文件中使用ts会报错
      }
    ]
    // '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ],
    ['@vue/babel-plugin-jsx']
  ]
};
