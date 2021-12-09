import 'reflect-metadata'
import Koa from 'koa'
import log from './lib/log'
import middleware from './lib/compose'
import compress from 'koa-compress' // 压缩中间件
// import './lib/mongodb'
import './lib/redisClient'
const app = new Koa()

const isProdMode = process.env.NODE_ENV === 'production'

app.use(middleware)

// 如果是开发环境压缩中间件
if (isProdMode) {
  app.use(compress())
}
app.on('error', (err, ctx) => {
  log.error(err.stack)
})
app.listen(3001)
