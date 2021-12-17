import { ParameterizedContext } from 'koa'
import { LoginForm } from '../../types/login'
import { checkCaptchaValid, fail, MsgCode, success } from '../../utils/utils'
import UserModel from '../../model/Users'
import bcrypt from 'bcrypt'
import { handleUserInfo } from './util'

/**
 @api {post} /login/register 注册账号
 @apiVersion 0.1.0
 @apiGroup 用户验证
 @apiName 注册账号
 @apiUse loginParams
 @apiBody {String} password 密码
 @apiBody {String} password2 重复密码
 @apiBody {String} nickname 用户昵称
 @apiParamExample {json} 请求示例
 {
    captcha: "vcgu"
    captchaId: "YpPSJqtoyFmNfUBMXFj-M"
    nickname: "测试注册"
    password: "123"
    password2: "123"
    username: "12345@qq.com"
  }
 @apiUse loginSuccessExample
 */
export default async (ctx: ParameterizedContext) => {
  const { username, password, password2, captcha, nickname, captchaId } = ctx
    .request.body as LoginForm

  // 判断是否确实参数
  if (
    !username ||
    !password ||
    !password2 ||
    !captcha ||
    !nickname ||
    !captchaId
  ) {
    return (ctx.body = fail('缺失参数'))
  }

  // 校验验证码是否正确
  if (!(await checkCaptchaValid(captcha, captchaId, ctx))) {
    return
  }

  // 查询邮箱是否已注册
  const user1 = await UserModel.findOne({ username })
  if (user1) {
    return (ctx.body = fail('该邮箱已注册', MsgCode.USER_EXISTED))
  }

  // 查询昵称是否已被使用
  const user2 = await UserModel.findOne({ nickname })
  if (user2) {
    return (ctx.body = fail('用户昵称已存在', MsgCode.USER_EXISTED))
  }

  const userInfo = {
    username,
    nickname,
    password: bcrypt.hashSync(password, 12) // 密码加密
  }

  const account = new UserModel(userInfo)
  const resUser = await account.save() // 添加用户到数据库
  return (ctx.body = success(handleUserInfo(resUser)))
}
