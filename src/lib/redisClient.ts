import { createClient } from 'redis'
import log from './log'
import { REDIS_CONFIG } from '../config'

const client = createClient(REDIS_CONFIG)
client.on('error', (err) => {
  log.error('Redis Client Error: ' + err)
})

client.connect()

export default client
