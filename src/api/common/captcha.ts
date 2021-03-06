import { createMathExpr } from 'svg-captcha'
import type { ParameterizedContext } from 'koa'
import { nanoid } from 'nanoid'
import redisClient from '../../lib/redis-client'
import { success } from '../../utils/utils'

/**
 @api {get} /common/getCaptcha 获取用户验证码
 @apiVersion 0.1.0
 @apiName 获取验证码
 @apiGroup Common
 @apiSuccessExample {json} 接口返回数据
 {
    "code": 200,
    "data": {
        "captchaId": "n5WU8c4Ds1Sw8VLgb9rNP",
        "captcha": svg标签图片,
        "captchaText": "4 + 3"
    },
    "msg": null
 }
 */
export default async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line
  // @ts-ignore
  const captcha = createMathExpr({
    color: false,
    fontSize: 36,
    width: 130, // 宽度
    height: 38 // 高度
  })
  const captchaId = nanoid()
  // 设置定时，EX代表秒，即5分支后验证码失效
  redisClient.set(captchaId, captcha.text, { EX: 5 * 60 })
  ctx.body = success({
    captchaId,
    captcha: captcha.data,
    captchaText: captcha.text
  })
}
