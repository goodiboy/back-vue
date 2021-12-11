export interface UserInfo {
  username: string
  password: string
  nickname: string
}

export interface UserInfoSchema extends UserInfo {
  created: string
  update: string
}
