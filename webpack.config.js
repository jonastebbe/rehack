'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = function (prod) {

    var entry = [
        './app/index'
    ];

    if (!prod) {
        entry = entry.concat([
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
        ]);
    }

    var plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ];

    if (prod) {
        plugins = plugins.concat([
            new webpack.DefinePlugin({
    			"process.env": {
    				"NODE_ENV": JSON.stringify("production")
    			}
    		}),
    		new webpack.optimize.DedupePlugin(),
    		new webpack.optimize.UglifyJsPlugin(),
            // extract styles into separate file
            new ExtractTextPlugin('styles.css'),
            // gzipping text based files
            new CompressionPlugin({
                   asset: '{file}.gz',
                   algorithm: 'gzip',
                   regExp: /\.js$|\.html$|\.css$/
            })
        ]);
    }

    var loaders = [
        { test: /\.jsx$/, loaders: [
          'react-hot',
          'jsx?harmony',
          'babel-loader',
        ], exclude: /node_modules/ },
        { test: /\.js$/, loaders: [
          'react-hot',
          'jsx?harmony',
          'babel-loader',
        ], exclude: /node_modules/ },
        { test: /\.json$/, loaders: [
          'json-loader'
        ]},
        { test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ], exclude: /node_modules/ }

    ];

    if (prod) {
        loaders = loaders.concat([
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!sass-loader' )
            },
        ]);
    }

    if (!prod) {
        loaders = loaders.concat([
            { test: /\.css$/,
              loaders: [
                'style-loader',
                'css-loader',
              ]
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]);
    }

    return {
      devtool: 'eval',
      entry: entry,
      output: {
        path: __dirname + '/build/',
        filename: 'bundle.js',
        publicPath: '/build/'
      },
      plugins: plugins,
      resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
      },
      module: {
        loaders: loaders
      },
    };
};
