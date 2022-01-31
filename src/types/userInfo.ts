export enum UserState {
  working, // 在职
  quit, // 离职
  trial // 试用期
}

export enum Role {
  admin, // 管理员
  ordinary // 普通用户
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
  role: Role
  roleList: Role[]
  remark: string
}
