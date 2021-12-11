import 'reflect-metadata'
import Koa from 'koa'
import log from './lib/log'
import middleware from './lib/compose'
import compress from 'koa-compress' // 压缩中间件
// import './lib/mongodb'
import orm from './lib/orm'
import redisClient from './lib/redisClient'
// import { getRepository } from 'typeorm'
// import { Users } from './entity/Users'
;(async () => {
  // 链接redis数据库
  await redisClient.connect().catch((err) => {
    log.error('redis数据库链接失败' + err)
  })

  // 链接orm数据库
  await orm.catch((err) => {
    log.error('orm数据库链接失败' + err)
  })

  // const users = getRepository(Users)
  // console.log(await users.findOne())

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
