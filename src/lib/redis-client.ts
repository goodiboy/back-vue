import { createClient } from 'redis'
import log from './log'
import { REDIS_CONFIG } from '../config'

const redisClient = createClient(REDIS_CONFIG)
redisClient.on('error', (err) => {
  log.error('Redis Client Error: ' + err)
})

export default redisClient
