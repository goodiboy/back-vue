import mongoose from 'mongoose'
import logUtil from '../plugin/log'
;(async () => {
  const config = {
    url: 'mongodb://localhost:9527/manager'
  }

  await mongoose.connect(config.url)
  const db = mongoose.connection

  db.on('error', () => {
    console.log(23)
    logUtil.error('数据库链接失败')
  })

  db.on('open', () => {
    console.log(23)
    logUtil.info('数据库连接成功')
  })
})()
