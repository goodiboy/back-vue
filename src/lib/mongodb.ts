import { connect, Schema, model, connection } from 'mongoose'
import Config from '../config'
import log from '../plugin/log'
interface User {
  name: string
  email: string
  avatar?: string
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
})

// 3. Create a Model.
const UserModel = model<User>('User', schema, 'User')

const run = async (): Promise<void> => {
  // 4. Connect to MongoDB
  await connect(Config.DB_URL)

  // const doc = new UserModel({
  //   name: 'Bill',
  //   email: 'bill@initech.com',
  //   avatar: 'https://i.imgur.com/dM7Thhn.png'
  // })
  // await doc.save()
  console.log(await UserModel.find()) // 'bill@initech.com'
}

run().catch((err: Error) => log.error('数据库发生错误-->' + err))

connection.on('connected', () => {
  log.info('数据库连接成功')
})

connection.on('disconnected', (error: Error) => {
  log.error('数据库断开连接' + error)
})

connection.on('error', (error: Error) => {
  log.error('数据库发生错误-->' + error)
})
