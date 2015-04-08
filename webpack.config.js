'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = function (prod) {

    var entry = [
        './app/index',
        'bootstrap-sass!./bootstrap-sass.config.js'
    ];

    if (!prod) {
        entry = entry.concat([
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
        ]);
    }

    var plugins = [
        // extract styles into separate file
        new ExtractTextPlugin('styles.css'),
        // gzipping text based files
        new CompressionPlugin({
               asset: '{file}.gz',
               algorithm: 'gzip',
               regExp: /\.js$|\.html$|\.css$/
        })
    ];

    if (prod) {
        plugins = plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
    			"process.env": {
    				"NODE_ENV": JSON.stringify("production")
    			}
    		}),
    		new webpack.optimize.DedupePlugin(),
    		new webpack.optimize.UglifyJsPlugin()
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
        loaders: [
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
          { test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
          },
          { test: /\.scss$/,
              loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!sass-loader' )
          },
          { test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ], exclude: /node_modules/ },
          // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
          // loads bootstrap's css.
          { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=application/font-woff' },
          { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&minetype=application/font-woff' },
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=application/octet-stream' },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=image/svg+xml' },
        ]
      },
    };
};
