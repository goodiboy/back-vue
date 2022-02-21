import type { ParameterizedContext } from 'koa'
import type { MenuType } from '../../types/menu'
import { checkAttr, currentTime, fail, success } from '../../utils/utils'
import MenuModel from '../../model/menu/Menu'
import log from '../../lib/log'

export default async (ctx: ParameterizedContext) => {
  const { _id, ...params } = ctx.request.body as MenuType

  if (!params.path || !params.menuName || !params.component) {
    const error = checkAttr({
      path: params.path,
      menuName: params.menuName,
      component: params.component
    })
    return (ctx.body = fail(`${ctx.url}缺少参数 ${error}`))
  }

  // _id 存在的时候是编辑操作，不存在是添加操作
  if (_id) {
    try {
      await MenuModel.findByIdAndUpdate(_id, {
        ...params,
        updated: currentTime()
      })
      ctx.body = success('更新成功')
    } catch (e: any) {
      log.error(e.stack)
      ctx.body = fail(e.stack)
    }
  } else {
    try {
      if (params.parentId) {
        params.parentIds.push(params.parentId)
      }
      const menu = new MenuModel(params)
      await menu.save()
      ctx.body = success(null, '创建成功')
    } catch (e: any) {
      log.error(e.stack)
      ctx.body = fail('系统繁忙', e.stack)
    }
  }
}
