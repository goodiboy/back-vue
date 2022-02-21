import type { ParameterizedContext } from 'koa'
import { formatTree, success } from '../../utils/utils'
import MenuModel from '../../model/menu/Menu'

export default async (ctx: ParameterizedContext) => {
  const { menuName, menuState } = ctx.request.query

  // todo 模糊搜索

  const params: any = {}
  if (menuName) params.menuName = menuName
  if (menuState) params.menuState = menuState
  const menuList = (await MenuModel.find(params)) || []

  const menuTree = formatTree(menuList, null)
  return (ctx.body = success(menuTree))
}
