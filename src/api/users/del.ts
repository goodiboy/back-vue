import type { ParameterizedContext } from 'koa'
import UserModel from '../../model/Users'
import { fail, success } from '../../utils/utils'
import log from '../../lib/log'

export default async (ctx: ParameterizedContext) => {
  const { _ids } = ctx.request.query

  try {
    const res = await UserModel.updateMany({ _id: { $in: _ids } }, { state: 2 })
    // 本来就是离职的(state=2)的在进行更新，是更新不到的，更新数量为0
    if (res.modifiedCount) {
      return (ctx.body = success(null, '删除成功'))
    }
    ctx.body = fail('删除失败，无法对已离职的再进行删除')
  } catch (e: any) {
    log.error(e.stack)
    ctx.body = fail('删除失败')
  }
}
