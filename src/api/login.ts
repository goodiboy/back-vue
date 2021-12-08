import send from '../lib/email'
import dayjs from 'dayjs'
import isEmail from 'validator/lib/isEmail'
import { ParameterizedContext } from 'koa'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { catchError, fail, success } from '../utils/utils'

export const forget = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request
  console.log(body)
  if (!isEmail(body.username)) {
    return (ctx.body = fail('邮箱格式错误'))
  }
  try {
    // body.username -> database -> email
    const result = await send({
      code: '1234',
      expire: dayjs().add(30, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      email: body.username,
      user: 'Brian'
    })
    ctx.body = success(result.messageId, '邮件发送成功')
  } catch (e: any) {
    if (e.responseCode === 550) {
      return (ctx.body = catchError('邮箱未找到或访问被拒绝'))
    }
    ctx.body = ctx.body = catchError()
  }
}

export const login = (ctx: ParameterizedContext) => {
  const token = jsonwebtoken.sign({ name: '测试' }, JWT_SECRET, {
    expiresIn: '1d'
  })
  ctx.body = success(token)
}
