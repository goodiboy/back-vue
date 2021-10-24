import Koa from 'koa'
import router from './routes'
import logUtil from './utils/logUtil'
import middleware from './utils/composeMiddleware'
import compress from 'koa-compress' // 压缩中间件
import './config/db'
const app = new Koa()
// 计算中间价使用的时间
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  logUtil.info(`log output info`)
})

// 压缩中间件
app.use(compress())
app.use(middleware).use(router.routes()).use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.log(err)
  logUtil.error(err.stack)
})
app.listen(3001)
