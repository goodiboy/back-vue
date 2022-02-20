export interface MenuType {
  menuType: number //菜单类型
  menuName: string //菜单名称
  menuCode: string //权限标识
  path: string //路由地址
  icon: string //图标
  component: string //组件地址
  menuState: number //菜单状态
  parentId: string
  parentIds: string[]
  createTime: string //创建时间
  updateTime: string //更新时间
}
