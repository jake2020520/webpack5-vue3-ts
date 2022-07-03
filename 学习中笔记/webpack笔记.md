## webpack5 配置的一些知识点梳理

- webpack 原理理解：
  从入口文件开始，一步一步找到应用程序所需要的所有模块，生成一张依赖关系图，然后根据依赖关系图打包所有的模块。（不同的文件对应不用的 loader 打包），如果不在依赖关系图中的模块，是不会被打包的。
  还有一个性能优化的点，tree shaking,这块的意思就是当你引入一个 js 文件，里面声明了一个函数，但是至始至终都没有用到，那么处于性能优化考虑，这个函数也是不能被打包的，就可以利用 tree shaking。

- webpack 中文文档 https://webpack.docschina.org/concepts/loaders/#example
- https://blog.csdn.net/lin_fightin/article/details/115140736

- webpack 各个相互关联插件，如果版本对不上，一定要回到 node_modules 里面去看 package.json,看主要插件的关联

1、--config
运用 --config 修改指定的配置文件
webpack --config ./build/webpack.config.js

2、npm 使用中的一些简写
devDependencies 里面的插件只用于开发环境，不用于生产环境，
dependencies 是需要发布到生产环境的。

```
npm i module_name  -S  = >  npm install module_name --save    写入到 dependencies 对象
npm i module_name  -D  => npm install module_name --save-dev   写入到 devDependencies 对象
npm i module_name  -g  全局安装
```

3、path.resolve 和 path.join 的用法
path.resolve() 方法将路径或路径片段的序列解析为绝对路径
console.log(path.resolve(\_\_dirname)); //E:\nodejs
a.console.log(path.resolve('js/common','./test')); //E:\nodejs\js\common\test
b.console.log(path.resolve('./js/common','./test')); //E:\nodejs\js\common\test
c.console.log(path.resolve('/js/common','/test')); //E:\test
d.console.log(path.resolve('/js/common','../test')); //E:\js\test
path.join 定义 用于连接路径。会把全部给定的 path 片段连接到一起，并规范化生成的路径。
path.join('/foo', 'bar', './baz');
// '/foo/bar/baz'
path.join('/foo', 'bar', '/baz', '..');
// '/foo/bar'

4、webpack 多入口开发

```
entry:{
  home: path.resolve(__dirname, '../src/home/index.js'),
  about: path.resolve(__dirname, '../src/about/index.js')
},
plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/home/index.html') ,
    filename: 'home.html',
    chunks: ['home'],
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/about/index.html') ,
    filename: 'about.html',
    chunks: ['about'],
  }),
]
```

5、css 相关 loader 的作用

- yarn add style-loader css-loader less less-loader -D；
- 先使用 less-loader 将 .less 文件转换成 css，再使用 css-loader 加载 css 文件，最后使用 style-loader 将 css-loader 处理的样式注入到 HTML 页面中。

6、为 css 添加浏览器前缀

- 创建 /postcss.config.js 这个 postcss 工具的适配也是根据 browserslist 工具找到的浏览器来进行适配的，如果 browserslist 工具找到的浏览器都支持这个 css 属性，那么这个 css 属性不需要加上前缀。后期的 babel 也都是通过 browserslist 工具来进行适配。

```
yarn add postcss-loader postcss-preset-env -D
// postcss.config.js
module.exports = {
  plugins: [require('postcss-preset-env')],
}

```

7、打包分离 压缩 css
// 样式被打包到 js 文件里面不是我们想要的，而我们希望得到的是 css 文件，通过 link 标签引入到 html 文件中。

```
yarn add mini-css-extract-plugin -D // 分离
yarn add css-minimizer-webpack-plugin --save-dev // 压缩
```

- 这里要注意把 style-loader 去掉，不然会报错，自行验证；
- plugins 要写在 module 后面，不然会出错，自行验证。

8、cross-env
// 传递参数 cross-env NODE_ENV=dev
// 获取 process.env.NODE_ENV

9、图片和文字的处理
Asset Modules ：webpack5 之后就是用这个打包就可以了

```
module.exports = {
    output: {
        assetModuleFilename: "images/[name].[hash:8].[ext]"
    },
    module: {
        rules: [{
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
}

```

10、browserslist
为了适配各种各样的浏览器不只是网页大小的适配，包括像某些浏览器支持的特性，某些浏览器不支持的特性等等，所以我们一般会通过一些工具如 babel,autoperfix 自动添加前缀的工具来帮助我们，但是不能所有的浏览器都要加，有些浏览器都被淘汰了，加的话只会徒增文件大小，所以我们需要 browserslit 工具来帮助我们查找我们需要适配的浏览器，过滤掉不需要适配的浏览器。怎么查找呢，通过 caniuse 这个权威网站，提供的 caniuse-list 工具，使我们配置的 browserslit 可以通过条件比如>1%,last 2 version, no dead 等的条件进行查找，找到符合条件的浏览器然后共享给 babel 等工具让他们按照这些浏览器进行转化。从而达到适配效果

11、'@babel/plugin-transform-runtime'
要 exclude: /(node_modules|bower_components)/
不然会报错

12、
ts 文件转换时，是有两种，一种是 tsc 与 ts-loader,其实 ts-loader 也是依赖于 tsc 的。另一种是 babel-loader 搭配预设 preset-typescript。两者的优缺点发呢比是，ts-loader 会对代码进行类型检测，发现错误停止打包，但是不会自动加上 Profill。而 babel-loader 搭配 preset-typescript 可以加上 profill，设置效果同 preset-env 设置 Porfill 一样，都是通过 useBuiltIns，一般使用第二个值，useage，它会根据代码需要的自动加上对应得 Profill。但是 babel-loader 不会进行类型检测。但我们代码有类型错误时，babel-loader 是可以打包成功的。所以 ts 官网推荐我们结合 tsc+babel-loader 进行搭配。如可以先通过 tsc --noEmit 进行检测，或者通过 tsc --noEmit --watch 监听 ts 文件的变化，一旦错误立马报错，然后正常才使用 Bbael-loader，这也是转化 ts 最好的办法。

13、eslint 静态代码分析工具（在没有任何代码执行的情况下，对代码进行分析）eslint 也是以来 js 得编译器，通过编译器检查哪些代码写的不合理
env 对应的是适合的浏览器，es，还有模块化选择。extends 一般用于框架的时候，要继承其他插件的规则。parserOptions 主要是用来解析得东西，如里面的 parser 属性就是设置编译器的。plugins 是使用了哪些插件。rules 是用来编写自己的规则的。eslint 本质也是要依赖于 js 编译器，他也会将 js 代码进行词法分析，转成 tokens 数组，然后在进行语法分析，转成 AST 树，遍历 AST 树，使用 eslint 得插件进行检查，有错误再报

14、webpack-dev-server(简称 WDS)内部已经实现了 HRM，WDS 提供两个服务，一个是基于 http 请求的 express 服务器，处理静态资源。http 是短连接，一般相应结束即断开，服务器无法主动推送数据给浏览器，除非发送给浏览器信号如 etag 等让浏览器主动请求，但是每次都会请求整个文件，也不好。
第二个服务则是 WDS 实现了 i 记得 HRM server。内部封装了底层为 WebSocket 的 socket 长连接，服务器可以主动推送数据给浏览器。每次服务器监听的抹开一改变，就会生成两个文件，json 记录着变化，还有一个 js 文件，服务器主动推送这两个文件给浏览器，浏览器通过 HRM 的 runtime 机制，根据文件的变化从而渲染更新部分的 UI，达到热替换的效果。

15、SplitChunksPlugin 去重和分离代码

16、三个 webpack 文件
开发与生产环境的分离，我们主要可以抽离出三个文件，dev, common,prod。第一种方式是直接在 package.json 下配置 build，后面跟着–config prod 文件，指定运行 build 时候就使用生产环境。serve 就指定为开发环境。第二种就是 build 和 serve 都指定到 common 文件，然后–env 显式传入当前是什么环境传给 common,common 里面是要给函数，拿到传入的 env 就可以判断是什么环境了，然后再把该值赋予 process.env.NODE_ENV，这样在其他文件就可以拿到当前是什么环境了。然后使用 webpack 提供的 webpack-merge 去合并，判断当前是什么环境，再去合并。比如开发环境就合并开发的文件。然后记住在 babel.config.js 文件中，可以通过我们上面的传值，process.env.NODE_ENV 去拿到当前的环境，因为有些 preset 是要在开发模式运行的，比如 react 的热替换。这样就可以完成环境分离了

17、动态导入，懒加载

```
import(
    /* webpackChunkName: 'element' */
    /* webpackPrefetch: true */
  '../mine/ceshi').then((res:any)=>{
    console.log('-ceshi-',res)
    if(data.age%2===0){
      document.body.appendChild(res.default)
    }else{
      document.body.removeChild(res.default)
    }
  })
```

preload 的作用是也是提前下载，但他是在父文件，也就是代码所在的文件被加载的时候，以并行方式开始下载，而 prefetch 是会在父文件加载完后加载。preload 具有中等优先级，是会立即下载，用于当下时刻。而 prefetch 是在浏览器闲暇时下载，用于未来的某些时刻。
一般路由是设置 preloade，而组件一般通过 prefetch，一些用户可能不会点击到的就不做预加载处理。

18、optimization 这个属性主要是用来性能优化的，比如 chunkIds，splitChunks，还有 runtimeChunk。

```
  optimization:{
    chunkIds:'natural',// 设置生成的文件名Id
    splitChunks:{
      /* SplitChunksPlugin去重和分离代码
      默认是async只针对异步导入
      initial 只针对同步导入
      all 异步同步都处理 （推荐）
       */
      // chunks:"all"
      cacheGroups:{
        vendors:{//包的第三方库放到了chunk-vendors文件去
          name:'chunk-vendors',
          test:/[\\/]node_modules[\\/]/,// 路径
          priority: -10, // 优先级 当匹配到 default与vendors时，谁的优先级高匹配谁
          chunks:'initial'
        },
        common:{
          name:'chunk-common',
          minChunks:2, // 表示拆分出来的包只要被应用 n次，如果少于则不拆分
          priority: -20,
          chunks:'initial',
          reuseExistingChunk:true
        }
      }
    }
  }
```

19、CDN 内容分发网络，简单地说就是通过相互连接的网络系统，通过利用靠近客户的服务器来给客户提供更好的体验，提高性能，降低成本。
假如 A 要请求一张图片 a,但是 a 的服务器离他很远，而 A 的旁边有很多 CDN，所以最靠近 A 的节点被我们称作边缘节点，他有一个父节点，父节点连接着源节点/原站。服务器会把数据 a 放在源站，然后第一次请求 a 时，A 通过边缘节点向父节点发送请求，父节点向原站发送请求，拿到数据然后自己备份一份，在传给边缘节点，边缘节点备份后返回给 A，下次假设有 B 也是同一个边缘节点也想访问 a，因为有缓存了，所以会直接返回。假设有 C，不同同一个边缘节点，但他们的边缘节点的父节点都是同一个，那么 C 会通过边缘节点向父节点发送请求，父节点因为缓存过了，所以直接返回。大大提高了性能。

- webpack 里面利用 CDN
- 打包的所有静态资源，放到 CDN 服务器，用户所有资源都是通过 CDN 服务器加载的；
- 一些第三方资源放到 CDN 服务器
- defer async 的区别
  蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。
  ![Alt](./defer和async.jpeg)
  a、defer 和 async 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
  b、它俩的差别在于脚本下载完之后何时执行，显然 defer 是最接近我们对于应用脚本加载和执行的要求的
  c、关于 defer，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
  d、async 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
  e、仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics

  20、shimming 是一个概念，是某一类型功能的统称
  eg: 我们现在引入了一个 abc 的库，这个库依赖于 lodash，但是他没对他做引用，就是在 abc 的库的源码没有 import lodash 这个库，abc 认为你的源代码引入了 lodash 库，所以当我们运行的时候就会报错。
  解决方案：
  只要有某个东西引入了某个库，那么就自动导入这个库
  webpack 内置一个插件叫 ProvidePlugin

  ```
    new webpack.ProvidePlugin({
        lodash:'-'
      })
  ```

  21、Webpack DllPlugin webpack4 后逐渐被遗弃
  https://www.cnblogs.com/skychx/p/webpack-dllplugin.html

  22、在 webpack 有一个 optimization.minimizer 的属性(optimization 是 webpack 用于优化的属性)，在 Production 模式下，默认就是使用 TerserPlugin 来处理代码的

  23、tree shaking
