import type { ParameterizedContext } from 'koa'
import { fail, success } from '../../utils/utils'
import log from '../../lib/log'
import MenuModel from '../../model/menu/Menu'

/**
 @api {delete} /menu/delete 菜单删除
 @apiVersion 0.1.0
 @apiGroup Menu
 @apiName 用户删除
 @apiParam {String} id  需要删除的菜单ID

 @apiParamExample {json} 请求示例
 {
    _id: "6208b93e323ad3e3e6820919"
 }
 @apiSuccessExample {json} 请求成功数据
 {
  "code": 200,
  "data": "删除成功"
 }
 */
export default async (ctx: ParameterizedContext) => {
  const { _id } = ctx.request.query
  if (!_id) {
    return (ctx.body = fail('缺少参数_id'))
  }
  try {
    const res = await MenuModel.findByIdAndRemove(_id)
    if (res) {
      return (ctx.body = success(null, '删除成功'))
    }
    ctx.body = fail('删除失败')
  } catch (e: any) {
    log.error(e.stack)
    ctx.body = fail('删除失败')
  }
}
