import type { ParameterizedContext } from 'koa'
import type { LoginForm } from '../../types/login'
import { checkCaptchaValid, fail, MsgCode, success } from '../../utils/utils'
import UserModel from '../../model/user/Users'
import bcrypt from 'bcrypt'
import { decryptRsa, handleUserInfo } from './util'

/**
 @api {post} /login/register 注册账号
 @apiVersion 0.1.0
 @apiGroup Login
 @apiName 注册账号
 @apiUse loginParams
 @apiBody {String} password rsa加密后的密码
 @apiBody {String} password2 rsa加密后的重复密码
 @apiBody {String} nickname 用户昵称
 @apiParamExample {json} 请求示例
 {
    captcha: "11"
    captchaId: "YpPSJqtoyFmNfUBMXFj-M"
    nickname: "测试注册"
    password: "=¥¥7ü\u001d\u0006íæ\u0007pBráÎc\u0001q(SC\ngQ\\¼]4x#TKóõ_,{û jc]¦û>Þt× È,R?4I½´¯FÈìå\tF)\u0002Yõx\f\r\u001a\r\u0001­I¤Tðp\u0001´¶¡OÍ{Í\u0014ðµD¥µh/è±-ÛÊìUî~Aå\u0016áÉÆé¥9!À¤Ö½S\u001bÛ%<=Ý\nïÚ~Ö®Å¶ýÃü§¦ÙÌå§°¡0¢¯!\u0016%@\u0018ÓÔ\u0015>\u000e§]ÑÄÛØ¶ríýv®i:ù¡Îòë\u001f\u001a\u0019\u0007rl3GV(\u0006fÚ\u0005\u001e2L7ã Öüû®ÓÒ\u0002ºeSY\u001f­Ý\u001d×,Yôÿ£÷µ­Îøç\u000eè%¬Ãý"
    password2: "=¥¥7ü\u001d\u0006íæ\u0007pBráÎc\u0001q(SC\ngQ\\¼]4x#TKóõ_,{û jc]¦û>Þt× È,R?4I½´¯FÈìå\tF)\u0002Yõx\f\r\u001a\r\u0001­I¤Tðp\u0001´¶¡OÍ{Í\u0014ðµD¥µh/è±-ÛÊìUî~Aå\u0016áÉÆé¥9!À¤Ö½S\u001bÛ%<=Ý\nïÚ~Ö®Å¶ýÃü§¦ÙÌå§°¡0¢¯!\u0016%@\u0018ÓÔ\u0015>\u000e§]ÑÄÛØ¶ríýv®i:ù¡Îòë\u001f\u001a\u0019\u0007rl3GV(\u0006fÚ\u0005\u001e2L7ã Öüû®ÓÒ\u0002ºeSY\u001f­Ý\u001d×,Yôÿ£÷µ­Îøç\u000eè%¬Ãý"
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
  const decryptPassword = decryptRsa(password)

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
    password: bcrypt.hashSync(decryptPassword, 12) // 密码加密
  }

  const account = new UserModel(userInfo)
  const resUser = await account.save() // 添加用户到数据库
  return (ctx.body = success(handleUserInfo(resUser)))
}
