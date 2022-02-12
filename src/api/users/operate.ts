import type { ParameterizedContext } from 'koa'

import type { UserInfo } from '../../types/userInfo'
import { fail, MsgCode, success } from '../../utils/utils'
import UserModel from '../../model/Users'
import UsersCount from '../../model/UsersCount'
import bcrypt from 'bcrypt'
import log from '../../lib/log'

export default async (ctx: ParameterizedContext) => {
  const {
    _id,
    username,
    nickname,
    job,
    mobile,
    state,
    deptId,
    admin,
    roleList
  } = ctx.request.body as UserInfo

  // 存在id即是修改，不存在为添加
  if (_id) {
    if (!username || !deptId || !nickname) {
      return (ctx.body = fail())
    }
  } else {
    const res = await UserModel.findOne(
      { $or: [{ username, nickname }] },
      'username nickname'
    )

    // 用户已存在
    if (res) {
      return (ctx.body = fail(`${res.username},${res.nickname}已被注册`))
    }

    try {
      const doc = await UsersCount.findByIdAndUpdate(
        'userId',
        { $inc: { count: 1 } },
        { new: true }
      )

      const user = new UserModel({
        num: doc?.count,
        username,
        nickname,
        password: bcrypt.hashSync('123456', 12), // 密码加密
        job,
        mobile,
        state,
        deptId,
        admin,
        roleList
      })
      await user.save()
      ctx.body = success(null, '创建成功')
    } catch (e: any) {
      ctx.body = fail('创建失败', MsgCode.BUSINESS_ERROR)
      log.error('创建失败' + e.stack)
    }
  }
}
