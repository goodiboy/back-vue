// 整合中间件
import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import json from 'koa-json'
import helmet from 'koa-helmet'
import jwt from 'koa-jwt'
import { JWT_SECRET } from '../config'
import { calcTime, jwtError } from './custom-middle'
import router from '../routes'

const middleware = compose([
  calcTime,
  bodyParser({
    enableTypes: ['json', 'form', 'text']
  }),
  cors(),
  json(),
  helmet(),
  jwtError,
  jwt({ secret: JWT_SECRET }).unless({ path: [/^\/common/, /\/login/] }),
  router.routes(),
  router.allowedMethods()
])

export default middleware
