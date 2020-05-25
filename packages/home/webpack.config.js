var path=require('path');
var webpack=require('webpack');
var htmlWebpackPlugin=require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
    mode: 'production',
    entry:"./src/index.js",
    output:{
      //  publicPath: "https://dashboard-home.herokuapp.com/"
          publicPath: "http://localhost:8080/"
    },
    module:{
        rules:[
           {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use: {
                loader: 'babel-loader',
                options:{
                    presets: [
                       '@babel/preset-env',
                       '@babel/preset-react'
                    ]
                 }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['css-loader','style-loader','sass-loader']
            },
            {
                test: /\.(jpe?g|svg|gif|png)$/i,
                use: 'file-loader'
            }
        ]
    },
  //   devServer:{
  //    contentBase: path.join(__dirname,"dist"),
  //    port: process.env.port
  //   },
      optimization: {
        splitChunks: {
         cacheGroups: {
             vendor:{
                test: /node_modules/,
                chunks: "initial",
                name: "vendor",
                enforce: true
             }
        }
    }
      },
      plugins:[
        new htmlWebpackPlugin({
            template: path.resolve(__dirname,'public/index.html'),
            filename: 'index.html'
        }),
       new ModuleFederationPlugin({
            name:'app_home',
            filename: 'remoteEntry.js',
            library: {type:'var', name:'app_home'},
            exposes:{
             AppContainer:'./src/app',
            },
            shared:['react','react-dom','react-router-dom']
        }),
        
    ],


}
