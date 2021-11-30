import Koa from 'koa'
import router from './routes'
import log from './lib/log'
import middleware from './lib/compose'
import compress from 'koa-compress' // 压缩中间件
import './lib/mongodb'
import './lib/redisClient'

const app = new Koa()

const isProdMode = process.env.NODE_ENV === 'production'

// 计算中间价使用的时间
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  log.info(`log output info`)
})

app.use(middleware).use(router.routes()).use(router.allowedMethods())

// 如果是开发环境压缩中间件
if (isProdMode) {
  app.use(compress())
}
app.on('error', (err, ctx) => {
  console.log(err)
  log.error(err.stack)
})
app.listen(3001)
