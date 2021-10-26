import webpackMerge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import { Configuration } from 'webpack'
import TerserWebpackPlugin from 'terser-webpack-plugin'
export default webpackMerge<Configuration>(baseConfig, {
  mode: 'production',
  stats: { children: false },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            dead_code: true,
            drop_console: false,
            drop_debugger: false
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true
        },
        parallel: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  }
})
