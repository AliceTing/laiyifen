let path = require('path');
let webpack = require('webpack');

//插件
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ImageminPlugin = require('imagemin-webpack-plugin').default;
let CompressionPlugin = require("compression-webpack-plugin");
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
//本地服务
let ENV = process.env.NODE_ENV || 'development';
let pre = process.env.pre;
let test = process.env.test;
let isDev = (ENV === 'development');
let publicPath = '//static.360buyimg.com/tp-statics/' + new Date().getFullYear() + '-' + (parseInt(new Date().getMonth() + 1)) + '-' + new Date().getDate() + '/';
let domain = '//m.toplife.com';
let outPath = path.join(__dirname, 'cdn');

if (pre) {
    publicPath = '//mbeta.toplife.com/';
    domain = '//mbeta.toplife.com';
    outPath = path.join(__dirname, 'dist');
}

if (test) {
    publicPath = '/';
    domain = '//m.toplife.com';
    outPath = path.join(__dirname, 'dist');
}

let glob = require('glob');

let entries = getEntry('./src/page/*/*.js'); // 获得入口 js 文件
let chunks = Object.keys(entries);


const cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: true,
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

module.exports = {
    //入口文件
    entry: entries,
    output: {
        //对应一个绝对路径 dist
        path: outPath,
        //将输出文件写入到 dist 目录下
        filename: '[name].[hash:8].js',
        publicPath: publicPath,
        chunkFilename: 'm/[id].[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: cssLoaders({
                    sourceMap: false,
                    extract: true
                }),
                postcss: [autoprefixer({
                    browsers: ['> 1%', 'last 10 versions']
                })],
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader']
            })
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader', 'sass-loader']
            })
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(jpg|jpeg|gif|png)$/i,
            loader: 'file-loader?name=m/img/[name].[ext]'
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
        extensions: ['.js', '.vue'],
        alias: {
            Public: path.resolve(__dirname, 'src/public/'),
            'vue$': 'vue/dist/vue.common.js',
            'vuex$': 'vuex/dist/vuex.js',
            'vueRouter$': 'vue-router/dist/vue-router.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(outPath),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true
        }),
        //定义全局变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                test: process.env.test,
                pre: process.env.pre,
                HOME_DOMAIN:JSON.stringify(domain)
            }
        }),


        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename:'m/[name].[hash:8].js',
            minChunks: ({resource}) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            )
        }),

        new ParallelUglifyPlugin({
            sourceMap: false,
            uglifyJS: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                mangle: true
            }
        }),

        // image minifying
        new ImageminPlugin({
            optipng: {
                optimizationLevel: 9
            },
            gifsicle: {
                optimizationLevel: 3
            },
            jpegtran: {
                progressive: false
            },
            svgo: {},
            pngquant: {
                floyd: 0.5,
                speed: 3
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devtool: false
};

var pages = getEntry('./src/page/**/*.html',true);

for (var pathname in pages) {
    // 配置生成的 html 文件，定义路径等
    let entryName =pages[pathname][1];
    let templatePath = pages[pathname][0];
    var conf = {
        filename: pathname + '.html', // html 文件输出路径
        template: templatePath, // 模板路径
        inject: true,              // js 插入位置
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
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
            entries[pathname] = ['babel-polyfill',entry];
        }

    });
    return entries;
}

