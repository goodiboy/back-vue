import { Types } from 'mongoose'

export enum MenuState {
  'ENABLE' = 1, // 启用
  'DISABLE' = 2 // 禁用
}

export interface MenuType {
  _id: string
  menuName: string //菜单名称
  menuCode: string //权限标识
  path: string //路由地址
  icon: string //图标
  component: string //组件地址
  menuState: MenuState //菜单状态
  parentId: Types.ObjectId[] | null
  created: string //创建时间
  updated: string //更新时间
  children?: MenuType[]
}
