import send from '../plugin/email'
import dayjs from 'dayjs'
import isEmail from 'validator/lib/isEmail'
import { ParameterizedContext } from 'koa'

class Login {
  async forget(ctx: ParameterizedContext) {
    const { body } = ctx.request
    console.log(body)
    if (!isEmail(body.username)) {
      return (ctx.body = {
        code: -1,
        msg: '邮箱格式错误'
      })
    }
    try {
      // body.username -> database -> email
      const result = await send({
        code: '1234',
        expire: dayjs().add(30, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Brian'
      })
      ctx.body = {
        code: 200,
        data: result.messageId,
        msg: '邮件发送成功'
      }
    } catch (e: any) {
      console.log(e)
      if (e.responseCode === 550) {
        return (ctx.body = {
          code: -1,
          msg: '邮箱未找到或访问被拒绝'
        })
      }
      ctx.body = {
        code: -1,
        msg: '系统出现异常，请稍后重试'
      }
    }
  }
}

// 方便在调用的时候直接打login就有自动导入和函数提示
const login = new Login()

export default login
