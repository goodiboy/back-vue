import type { ParameterizedContext } from 'koa'
import { fail, formatParam, pager, success } from '../../utils/utils'
import type { UserListParams, UserQueryForm } from '../../types/userInfo'
import UserModel from '../../model/Users'

export default async (ctx: ParameterizedContext) => {
  const { username, state, _id, pageNum, pageSize } = ctx.request
    .query as unknown as UserListParams

  const { page, skipIndex } = pager({ pageNum, pageSize })

  const params = formatParam<UserQueryForm>({
    _id,
    state: state != 0 ? state : undefined,
    username
  })

  try {
    const query = UserModel.find(params)
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
