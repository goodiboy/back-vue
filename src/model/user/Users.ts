import { model, Schema } from 'mongoose'
import type { Userinfo } from '../../types/userinfo'
import { currentTime } from '../../utils/utils'
const schema = new Schema<Userinfo>({
  num: { type: Number, required: true }, // 记录用户是第几位员工
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  created: { type: String, default: currentTime() },
  updated: { type: String, default: currentTime() },
  lastLogin: String,
  mobile: { type: String }, //手机号
  sex: Number, //性别 0:男  1：女
  deptId: Array, //部门
  job: String, //岗位
  state: {
    type: Number,
    default: 1
  }, // 1: 在职 2: 离职 3: 试用期
  admin: false, // 是否系统管理员
  roleList: [], //系统角色
  remark: String
})

const UserModel = model<Userinfo>('User', schema, 'users')

export default UserModel
