import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserInfo } from '../types/userInfo'

@Entity()
export class Users {
  constructor(data?: UserInfo) {
    if (data) {
      this.username = data.username
      this.password = data.password
      this.nickname = data.nickname
    }
  }

  @ObjectIdColumn()
  id!: ObjectID

  @Column()
  username!: string

  @Column()
  nickname!: string

  @Column()
  password!: string

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  update!: Date
}
