const webpack = require("webpack");
const path    = require('path');
const hwp     = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.tsx'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module:{
        rules:[
            {
                test: /\.(tsx|ts)?$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins:[
        new hwp({template:path.join(__dirname, '/src/index.html')}),
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only'
    },
}