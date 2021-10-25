import Router from 'koa-router'
import UserSchema from '../models/users/UserSchema'
import { catchError, fail, MsgCode, success } from '../utils/utils'

const usersRouter = new Router()
// 设置前缀
usersRouter.prefix('/users')

usersRouter.post('/login', async (ctx) => {
  try {
    const { userPwd, userName } = ctx.request.body
    const res = await UserSchema.findOne({ userName, userPwd })
    if (res) {
      ctx.body = success({
        data: res
      })
    } else {
      ctx.body = fail({
        msg: '账号或者密码错误',
        code: MsgCode.USER_ACCOUNT_ERROR
      })
    }
  } catch (e: any) {
    ctx.body = catchError({
      msg: e.message
    })
  }
})

export default usersRouter
