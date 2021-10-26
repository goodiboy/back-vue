import path from 'path'
import webpackNodeExternals from 'webpack-node-externals'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { APP_PATH, DIST_PATH } from './utils'
import webpack from 'webpack'

export default {
  target: 'node',
  entry: {
    server: path.join(APP_PATH, 'app.ts')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(DIST_PATH)
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [path.join(__dirname, '/node_modules')]
      }
    ]
  },
  // 排除不会使用的模块
  externals: [webpackNodeExternals()],
  plugins: [
    // eslint-disable-next-line
    // @ts-ignore
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'prod'
            ? JSON.stringify('production') // 必须使用JSON.stringify，直接使用字符串会报错
            : JSON.stringify('development')
      }
    })
  ],
  node: {
    global: true,
    __filename: true,
    __dirname: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // 必须加上这个才能把导入的文件重定向
  }
}
