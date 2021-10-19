const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// function resolve(dir) {
//   return path.resolve(__dirname, dir);
// }
module.exports =  {
  productionSourceMap: true,
  publicPath: './',
  devServer: {
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        changeOrigin: true, // 是否跨域
        // pathRewrite: {
        //   '^/api': '/' // 需要rewrite重写的,
        // }
      },
    },
  },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.api\.js$/,
      include: path.resolve('./src/apis'),
      loader: 'imports-loader',
      options: {
        type: 'module',
        imports: [
          // 这里的路径可以写相对于api.js文件位置的路径 如果api.js不在同一级, 可以用@/
          'default @/apis/utils/http.js http',
          'default @/apis/utils/constant.js CONSTANT',
        ]
      }
    });
    // 文件体积报告 
    config
      .plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
        generateStatsFile: true // 不打开网站，但是在dist生成stats.json文件
      }));
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    } else {
      // 开发环境使用
      config.devtool = 'eval-source-map';
    }
  },
  chainWebpack: config => {
    // loader：是webpack用来预处理模块的，在一个模块被引入之前，会预先使用loader处理模块的内容，在你打包的时候对某些内容需要loader来处理一下，比如css模块；默认webpack只会处理js代码，所以当我们想要去打包其他内容时，就需要相应的loader去处理某些内容
    // rules是一个数组，你所有的loader配置都可以写在这个数组里，每个loader配置是一个对象，匹配不同的规则；

    // test:test后是一个正则表达式，匹配不同的文件类型;

    // use:在这个规则中，当你匹配了这个文件后，需要使用相应的loader去处理这类型的文件，use接收的是一个数组，意味着当他匹配到文件后，它可以启用很多的loader去处理文件的内容；
    // 为api接口注入http，CONSTANT
    // 这个也能使用
    // config.module
    // .rule('api')
    // .test(/\.api\.js$/)
    // .include.add(path.join(__dirname, 'src/apis'))
    //   .end()
    // .use('imports')
    //   .loader('imports-loader')
    //   .options({
    //     type: 'module',
    //     imports: [
    //       'default @/apis/utils/http.js http',
    //       'default @/apis/utils/constant.js CONSTANT',
    //     ]
    // });

    config.resolve.alias
      .set("@", path.join(__dirname, 'src'));

    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
            // Provide path to the file with resources
            // 要公用的scss的路径
            resources: './src/styles/color.scss'
        })
        .end();
    });
  }
};