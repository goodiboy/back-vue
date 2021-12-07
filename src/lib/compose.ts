// 整合中间件
import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import json from 'koa-json'
import helmet from 'koa-helmet'
import jwt from 'koa-jwt'
import { JWT_SECRET } from '../config'

const middleware = compose([
  bodyParser({
    enableTypes: ['json', 'form', 'text']
  }),
  cors(),
  json(),
  helmet(),
  jwt({ secret: JWT_SECRET }).unless({ path: [/^\/common/, /\/login/] })
])

export default middleware
