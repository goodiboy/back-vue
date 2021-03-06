import Koa from 'koa'
import log from './lib/log'
import middleware from './lib/compose'
import compress from 'koa-compress' // 压缩中间件
import redisClient from './lib/redis-client'
import run from './lib/mongodb'
;(async () => {
  // 链接redis数据库
  await redisClient.connect().catch((err) => {
    log.error('redis数据库链接失败' + err)
  })

  // 链接mongodb数据库
  await run().catch((err: Error) => log.error('数据库发生错误-->' + err))

  const app = new Koa()

  app.use(middleware)

  const isProdMode = process.env.NODE_ENV === 'production'
  // 如果是生产环境压缩中间件
  if (isProdMode) {
    app.use(compress())
  }
  app.on('error', (err, ctx) => {
    log.error(err.stack)
  })
  app.listen(3001)
  log.info('服务器启动成功')
})()
