import type { ParameterizedContext } from 'koa'

import type { UserInfo } from '../../types/userInfo'
import { fail, MsgCode, success } from '../../utils/utils'
import UserModel from '../../model/Users'
import UsersCount from '../../model/UsersCount'
import bcrypt from 'bcrypt'
import log from '../../lib/log'

export default async (ctx: ParameterizedContext) => {
  /**
   @api {post} /users/delete 用户添加和删除
   @apiVersion 0.1.0
   @apiGroup Users
   @apiName 用户添加和删除
   @apiBody {String} [_id] 用户id，编辑的时候是必须的
   @apiBody {String} username 用户名
   @apiBody {String} nickname 昵称
   @apiBody {String} mobile 手机号
   @apiBody {Array} deptId 部门id列表
   @apiBody {String} job 岗位id
   @apiBody {Number} state 用户状态：1: 在职 2: 离职 3: 试用期
   @apiBody {Array} roleList 系统角色列表


   @apiParamExample {json} 请求示例
   {
        "_id": "6208b93e323ad3e3e6820919",
        "username": "admin@qq.com",
        "nickname": "测试用户",
        "mobile": "13800138000",
        "deptId": [
          "60167059c9027b7d2c520a61",
          "60167345c6a4417f2d27506f"
        ],
        "job": "60180b80b1eaed6c45fbebe1",
        "state": 1,
        "roleList": [
          "60180b80b1eaed6c45fbebe1",
          "60180b07b1eaed6c45fbebdb"
        ],
   }
   @apiSuccessExample {json} 请求成功数据
   {
    "code": 200,
    "data": "删除成功"
   }
   */
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

    try {
      await UserModel.findByIdAndUpdate(_id, {
        mobile,
        job,
        state,
        roleList,
        deptId
      })
      ctx.body = success(null, '更新成功')
    } catch (e: any) {
      log.error(e.stack)
      ctx.body = fail(e.stack)
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
