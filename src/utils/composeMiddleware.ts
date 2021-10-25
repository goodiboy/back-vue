// 整合中间件
import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import json from 'koa-json'
import helmet from 'koa-helmet'

const middleware = compose([
  bodyParser({
    enableTypes: ['json', 'form', 'text']
  }),
  cors(),
  json(),
  helmet()
])

export default middleware
