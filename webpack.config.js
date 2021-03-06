const path  = require('path'); 
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

// Webpack.config.js file
// you must create this file in the root of the project folder, because that's where
// Webpack will look for it. 

// tell what is the entry point 
// tell where to output the final bundle file. 
/*
  output gets set to an object 
  there's two things we have to provide here
  The first is the path, and the second is the filename
*/ 

// gives you an absolute path to the directory 
// use node webpack.config.js to print it
//console.log(path.join(__dirname, 'public'));

//./\.js$/ test files that ends with .js 
// well run any javascript files thru Babel 


module.exports = (env) => {
  const isProduction = env === 'production'; 

  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' }); 

  console.log('env', env); 
  return{
  entry: './src/app.js',
  output:{
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/, 
      exclude: /node_modules/
    },{
      test: /\.s?css$/,
      use: [
          MiniCssExtractPlugin.loader,
          {
              loader: 'css-loader',
              options: {
                  sourceMap: true
              }
          },
          {
              loader: 'sass-loader',
              options: {
                  sourceMap: true
              }
          }
      ]
     }],

 },
 plugins:[
  CSSExtract
 ],
 devtool: isProduction  ? 'source-map' : 'inline-source-map',
  devServer:{
    contentBase: path.join(__dirname, 'public'), 
    historyApiFallback:true,
    publicPath: '/dist/'
  }
 }
};

// loader
// a loader lets you customize the behavior of webpack 
// when it loads a given file. 

// s?css makes it that it searchs for either scss or css files to load 

// historyApiFallback tells the dev server that we're going to be handling routing via our client side code and that it should return to this page. 