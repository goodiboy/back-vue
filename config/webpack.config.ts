import path from 'path'
import webpackNodeExternals from 'webpack-node-externals'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default {
  target: 'node',
  mode: 'production',
  entry: {
    server: path.join(__dirname, '../src/app.ts')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist')
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
  externals: [webpackNodeExternals()],
  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new CleanWebpackPlugin()
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
