const path = require('path');
<<<<<<< HEAD
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    open: true
  },

  plugins: [
    new CopyWebpackPlugin(
      { 
        patterns: [
          {
            from: path.resolve(__dirname, 'index.html'),
            to: path.resolve(__dirname, 'build')
          },
          {
            from: path.resolve(__dirname, 'assets', '**', '*'),
            to: path.resolve(__dirname, 'build')
          }
        ]
      }
    ),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
}
=======

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'developemnt',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g||png||svg||gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:6].[ext]',
          outputPath: 'images',
          publicPath: 'images',
          emitFile: true,
          esModule: false,
        },
      },

    ],
  },

};
>>>>>>> 1290ed9472e85b6d67b7ce5b79674476b0538905
