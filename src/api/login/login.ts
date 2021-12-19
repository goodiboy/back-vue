import { ParameterizedContext } from 'koa'
import { LoginForm } from '../../types/login'
import { checkCaptchaValid, fail, MsgCode, success } from '../../utils/utils'
import UserModel from '../../model/Users'
import bcrypt from 'bcrypt'
import { handleUserInfo } from './util'

/**
 @api {post} /login/login 登录
 @apiVersion 0.1.0
 @apiGroup 用户验证
 @apiName 登录
 @apiUse loginParams
 @apiBody {String} password 密码
 @apiParamExample {json} 请求示例
 {
    captcha: "11"
    captchaId: "XBC4bhwNaGAXjyYIqKy92"
    password: "123"
    username: "12345@qq.com"
 }
  @apiUse loginSuccessExample
 */
export default async (ctx: ParameterizedContext) => {
  const { username, password, captcha, captchaId } = ctx.request
    .body as LoginForm
  // 判断是否确实参数
  if (!username || !password || !captcha || !captchaId) {
    return (ctx.body = fail('缺失参数'))
  }

  // 校验验证码是否正确
  if (!(await checkCaptchaValid(captcha, captchaId, ctx))) {
    return
  }

  const user = await UserModel.findOne({ username }, { _id: 0 })

  // 如果用户不存在，或者密码不正确，返回错误信息
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return (ctx.body = fail('账号或密码错误', MsgCode.USER_ACCOUNT_ERROR))
  }

  return (ctx.body = success(handleUserInfo(user)))
}
