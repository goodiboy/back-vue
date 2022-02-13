import type { ParameterizedContext } from 'koa'
import { fail, formatParam, pager, success } from '../../utils/utils'
import type { UserListParams, UserQueryForm } from '../../types/userInfo'
import UserModel from '../../model/Users'

/**
 @api {get} /users/list 用户列表
 @apiVersion 0.1.0
 @apiGroup Users
 @apiName 用户列表
 @apiParam {Number} [state]  用户状态：1: 在职 2: 离职 3: 试用期
 @apiParam {String} [username]  用户名
 @apiParam {String} [nickname]  昵称
 @apiParam {String} [pageNum]  页码
 @apiParam {String} [pageSize]  每页的大小

 @apiParamExample {json} 请求示例
 {
    state: 1
    pageNum: 1
    pageSize: 10
 }
 @apiSuccessExample {json} 请求成功数据
 {
  "code": 200,
  "data": {
    "page": {
      "pageNum": 1,
      "pageSize": 10,
      "total": 1
    },
    "list": [
      {
        "_id": "6208b93e323ad3e3e6820919",
        "num": 100001,
        "username": "admin@qq.com",
        "nickname": "测试用户",
        "created": "2022-02-13 15:51:56",
        "update": "2022-02-13 15:51:56",
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
        "__v": 0
      }
    ]
  },
  "msg": null
  }
 */
export default async (ctx: ParameterizedContext) => {
  const { username, state, nickname, pageNum, pageSize } = ctx.request
    .query as unknown as UserListParams

  const { page, skipIndex } = pager({ pageNum, pageSize })

  // todo 模糊搜索

  const params = formatParam<UserQueryForm>({
    nickname,
    state: state != 0 ? state : undefined,
    username
  })

  try {
    const query = UserModel.find(params, { password: 0 })
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await UserModel.countDocuments(params)

    ctx.body = success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (e: any) {
    fail(e.stack)
  }
}
