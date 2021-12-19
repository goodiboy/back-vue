// 忘记密码
import { ParameterizedContext } from 'koa'
import { LoginForm } from '../../types/login'
import {
  catchError,
  checkCaptchaValid,
  fail,
  MsgCode,
  success
} from '../../utils/utils'
import isEmail from 'validator/lib/isEmail'
import UserModel from '../../model/Users'
import { nanoid } from 'nanoid'
import bcrypt from 'bcrypt'
import send from '../../lib/email'

/**
 @api {post} /login/reset 重置密码
 @apiVersion 0.1.0
 @apiGroup 用户验证
 @apiName 重置密码
 @apiUse loginParams
 @apiParamExample {json} 请求示例
  {
      captcha: "11"
      captchaId: "56Jj051C5argxUBcLSpld"
      username: "123@qq.com"
  }
 @apiSuccessExample {json} 请求成功数据
 {
    code: 200,
    msg: "密码重置成功，新的密码已发生到您的邮箱",
    data: 'adfa12'
 }
 */
export default async (ctx: ParameterizedContext) => {
  const { username, captcha, captchaId } = ctx.request.body as LoginForm

  // 校验验证码是否正确
  if (!(await checkCaptchaValid(captcha, captchaId, ctx))) {
    return
  }

  if (!isEmail(username)) {
    return (ctx.body = fail('邮箱格式错误'))
  }

  const user = await UserModel.findOne({ username })

  if (!user) {
    return (ctx.body = fail('用户不存在', MsgCode.USER_INVALID))
  }

  try {
    const pwd = nanoid(6)
    await UserModel.updateOne(
      { username },
      { password: bcrypt.hashSync(pwd, 12) }
    )

    const result = await send({
      username: user.username,
      password: pwd,
      nickname: user.nickname
    })
    ctx.body = success(
      result.messageId,
      '密码重置成功，新的密码已发生到您的邮箱'
    )
  } catch (e: any) {
    if (e.responseCode === 550) {
      return (ctx.body = catchError('邮箱未找到或访问被拒绝'))
    }
    ctx.body = ctx.body = catchError(e)
  }
}
