import { fail, MsgCode } from '../utils/utils'
import { Next, ParameterizedContext } from 'koa'
import log from './log'

// jwt鉴权错误
const jwtError = (ctx: ParameterizedContext, next: Next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 200
      ctx.body = fail('认证失败或TOKEN过期', MsgCode.AUTH_ERROR)
    } else {
      throw err
    }
  })
}

// 计算中间价使用的时间
const calcTime = async (ctx: ParameterizedContext, next: Next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

export { jwtError, calcTime }
