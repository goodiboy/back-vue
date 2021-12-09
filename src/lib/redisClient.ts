import { createClient } from 'redis'
import log from './log'
import { REDIS_CONFIG } from '../config'

const redisClient = createClient(REDIS_CONFIG)
redisClient.on('error', (err) => {
  log.error('Redis Client Error: ' + err)
})

// redisClient.connect().catch((err) => {
//   log.error('redis链接错误' + err)
// })

export default redisClient
