import { Document } from 'mongoose'

export interface UserModel extends Document {
  userId: number //用户ID, 自增长
  userName: string //用户名称
  userPwd: string //用户密码, md5加密
  userEmail: string //用户邮箱
  mobile: string //手机号
  sex: number //性别0:男1:女
  deptId: string[] //部门
  job: string //岗位
  state: number
  role: number
  rolesList: number[] //系统角色
  createTime: Date
  lastLoginTime: Date
  remark: string //备注字段
}
