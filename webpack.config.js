let path = require('path');
let webpack = require('webpack');
let HappyPack = require('happypack');
let os = require('os');
let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss']);
//插件
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let glob = require('glob');

let entries = getEntry('./src/page/*/*.js'); // 获得入口 js 文件
let chunks = Object.keys(entries);

//本地服务
let ENV = process.env.NODE_ENV || 'development';
let isDev = ENV === 'development';

let  domain = '//m.toplife.com';




module.exports = {
    //入口文件
    entry: entries,
    output: {
        //对应一个绝对路径 dist
        path: path.join(__dirname, 'dist'),
        //将输出文件写入到 dist 目录下
        filename: isDev ? '[name].js' : '[name].[hash:8].js',
        publicPath: '/',
        chunkFilename: isDev ? 'm/[id].js' : 'm/[id].[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            include: path.resolve(__dirname, 'src'),
            options: {
                loaders:{
                    scss:ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: 'happypack/loader?id=vue'
                    }),
                    js:'happypack/loader?id=js'
                }
            }
        }, {
            test: /\.js$/,
            use:'happypack/loader?id=js',
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'happypack/loader?id=css'
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'happypack/loader?id=scss'
            })
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(jpg|jpeg|gif|png)$/i,
            use:['file-loader?name=m/img/[name].[ext]']
        }, {
            test: /\.woff(2)?(\??.*)$/,
            loader: 'url-loader?limit=1000&minetype=application/font-woff&name=m/font/[name].[ext]'
        }, {
            test: /\.(ttf|eot|svg)(\??.*)$/,
            loader: 'file-loader?name=m/font/[name].[ext]'
        }]
    },
    //解析：配置模块如何解析，import的文件后缀名
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.vue'],
        alias: {
            Public: path.resolve(__dirname, 'src/public/'),
            'vue$': 'vue/dist/vue.common.js',
            'vuex$': 'vuex/dist/vuex.js',
            'vue-router$': 'vue-router/dist/vue-router.js'
        }
    },
    plugins: [
        new HappyPack({
            id: 'vue',
            cache:false,
            threadPool: happyThreadPool,
            loaders: ['css-loader?sourceMap!sass-loader?sourceMap','postcss-loader?sourceMap']
        }),

        new HappyPack({
            id: 'css',
            cache:false,
            threadPool: happyThreadPool,
            loaders: ['css-loader?sourceMap','postcss-loader?sourceMap']
        }),

        new HappyPack({
            id: 'scss',
            cache:false,
            threadPool: happyThreadPool,
            loaders: ['css-loader?sourceMap!sass-loader?sourceMap','postcss-loader?sourceMap']
        }),
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['cache-loader','babel-loader']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: ENV === 'production' ? '[name].[contenthash:8].css' : '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename:'m/[name].js',
            minChunks: ({resource}) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            )
        }),
        //定义全局变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                test: process.env.test,
                pre: process.env.pre,
                mock: JSON.stringify(process.env.mock),
                HOME_DOMAIN:JSON.stringify(domain)
            }
        })
    ],
    devtool: isDev ? 'inline-source-map' : false,
    //本地开发server
    devServer: {
        host: 'localhost',
        port: 80,
        hot: true,
        https: false,
        disableHostCheck: true
    }

}

var pages = getEntry('./src/page/**/*.html',true);

for (var pathname in pages) {
    // 配置生成的 html 文件，定义路径等
    let entryName =pages[pathname][1];
    let templatePath = pages[pathname][0];
    var conf = {
        filename: pathname + '.html', // html 文件输出路径
        template: templatePath, // 模板路径
        inject: true,              // js 插入位置
        cache:true
    };
    if (entryName in module.exports.entry) {
        conf.chunks = ['vendors', entryName];
        conf.hash = false;
    }else{
        conf.chunks = [''];
        conf.hash = false;
    }
    // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}

// 根据项目具体需求，输出正确的 js 和 html 路径
function getEntry(globPath,html) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        pathname = 'm' + '/' + basename; // 正确输出 js 和 html 的路径
        if(html){
            pathname =  basename;
            entries[pathname] = [entry,'m' + '/' + basename];
        }else{
            entries[pathname] = [ 'webpack-dev-server/client?http://0.0.0.0',
                'webpack/hot/only-dev-server','babel-polyfill',
                entry];
        }

    });
    return entries;
}
