/**
 * 维护用户ID自增长表
 */
import { model, Schema } from 'mongoose'

type SchemaType = {
  _id: string
  count: number
}

const schema = new Schema<SchemaType>({
  _id: String,
  count: Number
})

const UsersCount = model<SchemaType>('users-counts', schema)

export default UsersCount
