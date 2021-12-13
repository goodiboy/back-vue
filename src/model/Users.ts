import { model, Schema } from 'mongoose'
import { UserInfo } from '../types/userInfo'
import { currentTime } from '../utils/utils'
const schema = new Schema<UserInfo>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  created: { type: String, default: currentTime() },
  update: { type: String, default: currentTime() }
})

const UserModel = model<UserInfo>('User', schema, 'users')

export default UserModel
