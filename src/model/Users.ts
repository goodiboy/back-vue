import { model, Schema } from 'mongoose'
import { UserInfo } from '../types/userInfo'
import { CurrentTime } from '../utils/utils'
const schema = new Schema<UserInfo>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  created: { type: String, default: CurrentTime() },
  update: { type: String, default: CurrentTime() }
})

const UserModel = model<UserInfo>('User', schema, 'users')

export default UserModel
