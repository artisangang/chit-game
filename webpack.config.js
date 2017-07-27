const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets/js')
  },
  devtool: 'source-map',
  plugins: [
    
  ],
  module: {    
     rules: [   
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env"],
            plugins: ["transform-decorators-legacy"]
          }
        }
      },  
       {
         test: /\.scss$/,
         use: [
           'style-loader',
           'css-loader',
           'sass-loader'
         ]
       },
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'           
         ]
       },
       {
         test: /\.html$/,
         use: [
           'html-loader'        
         ]
       },
       {
       	test: /\.(png|svg|jpg|gif)$/,
       	use: [
       		'file-loader'
       	]
       },
       {
       	test: /\.(woff|woff2|eot|ttf|otf)$/,
       	use: [
       		'file-loader'
       	]
       }
     ],
     
   },
   resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./node_modules')
      ]
    }
};