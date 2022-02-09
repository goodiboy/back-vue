import { model, Schema } from 'mongoose'
import { UserInfo } from '../types/userInfo'
import { currentTime } from '../utils/utils'
const schema = new Schema<UserInfo>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  created: { type: String, default: currentTime() },
  update: { type: String, default: currentTime() },
  mobile: { type: String }, //手机号
  sex: Number, //性别 0:男  1：女
  deptId: Array, //部门
  job: String, //岗位
  state: {
    type: Number,
    default: 1
  }, // 1: 在职 2: 离职 3: 试用期
  userRole: {
    type: Number,
    default: 1
  }, // 用户角色 0：系统管理员  1： 普通用户
  systemRole: [], //系统角色
  remark: String
})

const UserModel = model<UserInfo>('User', schema, 'users')

export default UserModel
