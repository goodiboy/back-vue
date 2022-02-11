// 整合中间件
import path from 'path'
import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import cors from '@koa/cors'
import json from 'koa-json'
import mount from 'koa-mount'
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
  helmet({
    contentSecurityPolicy: false // apidoc 生成的文件需要关闭这个安全策略才可以
  }),
  jwtError,
  jwt({ secret: JWT_SECRET }).unless({
    path: [/^\/common/, /^\/login/, /^\/users/, /doc/]
  }),
  router.routes(),
  router.allowedMethods(),
  mount('/doc', koaStatic(path.join(__dirname, '../../doc')))
])

export default middleware
