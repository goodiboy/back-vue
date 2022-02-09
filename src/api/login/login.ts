import type { ParameterizedContext } from 'koa'
import type { LoginForm } from '../../types/login'
import { checkCaptchaValid, fail, MsgCode, success } from '../../utils/utils'
import UserModel from '../../model/Users'
import bcrypt from 'bcrypt'
import { decryptRsa, handleUserInfo } from './util'

/**
 @api {post} /login/login 登录
 @apiVersion 0.1.0
 @apiGroup 用户验证
 @apiName 登录
 @apiUse loginParams
 @apiBody {String} password rsa加密后的密码
 @apiParamExample {json} 请求示例
 {
    captcha: "6"
    captchaId: "pzL-UGugYcFciUtOvDol5"
    password: "=¥¥7ü\u001d\u0006íæ\u0007pBráÎc\u0001q(SC\ngQ\\¼]4x#TKóõ_,{û jc]¦û>Þt× È,R?4I½´¯FÈìå\tF)\u0002Yõx\f\r\u001a\r\u0001­I¤Tðp\u0001´¶¡OÍ{Í\u0014ðµD¥µh/è±-ÛÊìUî~Aå\u0016áÉÆé¥9!À¤Ö½S\u001bÛ%<=Ý\nïÚ~Ö®Å¶ýÃü§¦ÙÌå§°¡0¢¯!\u0016%@\u0018ÓÔ\u0015>\u000e§]ÑÄÛØ¶ríýv®i:ù¡Îòë\u001f\u001a\u0019\u0007rl3GV(\u0006fÚ\u0005\u001e2L7ã Öüû®ÓÒ\u0002ºeSY\u001f­Ý\u001d×,Yôÿ£÷µ­Îøç\u000eè%¬Ãý"
    username: "abc@qq.com"
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
  const decryptPassword = decryptRsa(password)

  // 校验验证码是否正确
  if (!(await checkCaptchaValid(captcha, captchaId, ctx))) {
    return
  }

  const user = await UserModel.findOne({ username })

  // 如果用户不存在，或者密码不正确，返回错误信息
  if (!user || !(await bcrypt.compare(decryptPassword, user.password))) {
    return (ctx.body = fail('账号或密码错误', MsgCode.USER_ACCOUNT_ERROR))
  }

  return (ctx.body = success(handleUserInfo(user)))
}
