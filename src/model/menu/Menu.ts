import { model, Schema, Types } from 'mongoose'
import { MenuType } from '../../types/menu'
import { currentTime } from '../../utils/utils'

const schema = new Schema<MenuType>({
  menuType: Number, //菜单类型
  menuName: String, //菜单名称
  menuCode: String, //权限标识
  path: String, //路由地址
  icon: String, //图标
  component: String, //组件地址
  menuState: Number, //菜单状态
  parentId: Types.ObjectId,
  parentIds: [Types.ObjectId],
  createTime: { type: String, default: currentTime() }, //创建时间
  updateTime: { type: String, default: currentTime() } //更新时间
})

const MenuModel = model('menus', schema)

export default MenuModel
