import send from '../lib/email'
import dayjs from 'dayjs'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail'
import { ParameterizedContext } from 'koa'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import {
  catchError,
  checkCaptchaValid,
  fail,
  MsgCode,
  success
} from '../utils/utils'
import { LoginForm } from '../types/login'
import UserModel from '../model/Users'
import { UserInfoSchema } from '../types/userInfo'

const handleUserInfo = (user: UserInfoSchema) => {
  // eslint-disable-next-line
  // @ts-ignore
  delete user.password // 把用户信息返回，删除密码

  return {
    token: jsonwebtoken.sign({ user }, JWT_SECRET, {
      expiresIn: '1d' // 有效期一天
    }),
    userInfo: user
  }
}

// 忘记密码
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

// 登陆接口
export const login = async (ctx: ParameterizedContext) => {
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

// 注册接口
export const register = async (ctx: ParameterizedContext) => {
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
