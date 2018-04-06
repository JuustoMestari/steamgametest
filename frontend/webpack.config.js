const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// the clean options to use
let cleanOptions = {
  root:     __dirname,
  exclude:  [],
  verbose:  true,
  dry:      false
}


module.exports = {
    entry: {
		angular: './src/angular.js',
		vendors: './src/vendors.js',
        app: './src/app.js',
		styles: './src/styles.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader?-url!postcss-loader!sass-loader"
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader?-url!postcss-loader"
				})
			},
			{
		        test: /\.js$/,
		        exclude: /(node_modules|bower_components)/,
		        use: [{
			        loader: 'babel-loader',
			        options: {
				        presets: ['env']
					}
				}]
			},
			{
				test: /\.html$/,
				use: ['ngtemplate-loader','html-loader']
			}]
    },
    plugins: [
		new CleanWebpackPlugin('dist/', cleanOptions),
		new CopyWebpackPlugin([
			//copy index.html
			{ from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, 'dist/index.html') },
			//copy applist.json
			{ from: path.resolve(__dirname, 'src/data/applist.json'), to: path.resolve(__dirname, 'dist/applist.json') },
            //copy images
            { from: path.resolve(__dirname, 'src/assets/img/'), to: path.resolve(__dirname, 'dist/assets/img/') },
			//copy fonts
			{ from: path.resolve(__dirname, 'node_modules/font-awesome/fonts'), to: path.resolve(__dirname, 'dist/assets/fonts') },
		]),
        new ExtractTextPlugin("./assets/css/style.css"),
		new webpack.ProvidePlugin({
			$:		'jquery',
			jQuery:	'jquery',
			//required by bootstrap
			Tether: 'tether',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
    ],
    watch: false,
    devtool: 'cheap-eval-source-map',
	devServer:{
		port:8833,
		historyApiFallback: true,
		hot:true,
		clientLogLevel: "warning"
	}
};