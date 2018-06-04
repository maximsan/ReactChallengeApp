var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/main.js',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    resolve: {
        extensions: ['.', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        inline: true,
        port: 3001,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    // plugins: [
    //     new webpack.ProvidePlugin({ // inject ES5 modules as global vars
    //         $: 'jquery',
    //         jQuery: 'jquery',
    //         'window.jQuery': 'jquery',
    //         Popper: ['popper.js', 'default']
    //     })
    // ]
};