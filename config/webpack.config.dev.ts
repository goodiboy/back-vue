import webpackMerge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import { Configuration } from 'webpack'

export default webpackMerge<Configuration>(baseConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  stats: { children: false }
})
