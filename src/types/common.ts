// 返回的数据结构
import { MsgCode } from '../utils/utils'

export interface ResponseType<T = any> {
  data: T | null
  msg: string | null
  code: MsgCode
}

export interface EmailInfo {
  username: string
  nickname: string
  password: string
}
export interface PageType {
  pageNum: number
  pageSize: number
  total: number
}
