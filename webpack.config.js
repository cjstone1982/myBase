var path=require("path");
var webpack=require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');         //生成html
module.exports={
    entry: {
        main:"./src/App",
        vendors: ['react', 'react-dom', 'react-router', 'react-redux', 'redux']
    },
    output: { 
        path: path.join(__dirname,"./app/main"), //打包输出的路径
        filename: "[name].js",              //打包后的名字
        publicPath: "/main"                      //静态页面文件调用的路径
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: "babel-loader",query: {presets: ['react','es2015']}},   /*es6 to es5*/
            {test: /\.jsx$/,loader: 'babel-loader', query: {presets: ['react', 'es2015']}}, /*jsx to js,es5 to es6*/
            {test: /\.css$/, loader: "style!css"},                                          /*css to css*/
            {test: /\.(jpg|png|otf)$/, loader: "url?limit=8192"},                           /*images 打包*/
            {test: /\.less/, exclude: /^node_modules$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {//后续直接 require('jquery') 即可
            // jquery          : './src/source/js/jquery.min.js',
            // moment          : './src/source/js/moment.min.js',
            // loadReact       : './src/source/js/jquery.min.js',
            // loadReactDom    : './src/source/js/react-dom.min.js',
            // loadReactRouter : './src/source/js/react-router.min.js',
        }
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),                                        //生成独立css
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),           //提取公用代码
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false }}),     //压缩代码
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({                                                     //根据模板插入css/js等生成最终HTML
            filename: '../../views/index.handlebars',                               //生成的html存放路径，相对于 path
            template: './src/template/index.html',                                  //html模板路径
            hash: true,                                                             //为静态资源生成hash值
        })
    ]
}