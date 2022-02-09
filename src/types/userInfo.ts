export enum UserState {
  working, // 在职
  quit, // 离职
  trial // 试用期
}

export enum UserRole {
  admin, // 管理员
  ordinary // 普通用户
}

export interface SystemRole {
  roleName: string
  _id: string
}

export enum Sex {
  man,
  woman
}

export interface UserInfo {
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
  userRole: UserRole
  systemRole: SystemRole[]
  remark: string
}
