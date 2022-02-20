import type { PageType } from './common'

export enum UserState {
  working, // 在职
  quit, // 离职
  trial // 试用期
}

export interface Role {
  roleName: string
  _id: string
}

export enum Sex {
  man,
  woman
}

export interface Userinfo {
  _id: string
  num: number
  username: string
  password: string
  nickname: string
  created: string
  update: string
  mobile: string
  sex: Sex
  deptId: string[]
  job: string
  state: UserState
  admin: boolean
  roleList: Role[]
  remark: string
}

// 用户查询表单
export interface UserQueryForm {
  nickname?: string
  username?: string
  state?: UserState | number // 有一个选项是0代表全部
}

export type UserListParams = UserQueryForm & PageType
