import { connect, connection } from 'mongoose'
import { DB_URL } from '../config'
import log from './log'

const run = async (): Promise<void> => {
  await connect(DB_URL)
}

connection.on('connected', () => {
  log.info('数据库连接成功')
})

connection.on('disconnected', (error: Error) => {
  log.error('数据库断开连接' + error)
})

connection.on('error', (error: Error) => {
  log.error('数据库发生错误-->' + error)
})

export default run
