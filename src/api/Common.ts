import SvgCaptcha from 'svg-captcha'
import { ParameterizedContext } from 'koa'
export default class Common {
  static async getCaptcha(ctx: ParameterizedContext) {
    // eslint-disable-next-line
    // @ts-ignore
    const captcha = new SvgCaptcha.create({
      size: 4, // 数量
      ignoreChars: '0oil', // 排除某些字母
      color: true,
      noise: Math.floor(Math.random() * 5), // 线条的数量
      width: 150, // 宽度
      height: 38 // 高度
    })
    ctx.body = {
      code: 200,
      data: captcha.data
    }
  }
}
