const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};

const css = {
  test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
};

const images =  {
	test: /\.(png|jp(e*)g|svg)$/,  
	use: [{
	    loader: 'url-loader',
	    options: { 
	        limit: 8000, // Convert images < 8kb to base64 strings
	        name: 'images/[hash]-[name].[ext]'
		}
}]};

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: "/rt/"
  },
  module: {
    rules: [pug, css, images]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      inject: false
    })
 ],
 devServer: {
    contentBase: './dist'
},
};
module.exports = config;