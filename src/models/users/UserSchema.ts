import mongoose, { Schema } from 'mongoose'
import { UserModel } from './UserModel'

const UserSchema = new Schema<UserModel>({
  //用户集合
  userId: Number, //用户ID, 自增长
  userName: String, //用户名称
  userPwd: String, //用户密码, md5加密
  userEmail: String, //用户邮箱
  mobile: String, //手机号
  sex: Number, //性别0:男1:女
  deptId: [], //部门
  job: String, //岗位
  state: {
    // 1:在职2:离职3:试用期
    type: Number,
    default: 1
  },
  role: {
    // 用户角色0: 系统管理员1: 普通用户
    type: Number,
    default: 1
  },
  rolesList: [], //系统角色
  createTime: {
    //创建时间
    type: Date,
    default: new Date()
  },
  lastLoginTime: {
    //更新时间
    type: Date,
    default: new Date()
  },
  remark: String //备注字段
})

export default mongoose.model<UserModel>('users', UserSchema, 'users')
