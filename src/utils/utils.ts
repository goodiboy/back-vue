import logUtil from '../lib/log'

// 错误码
export enum MsgCode {
  SUCCESS = 200,
  PARAM_ERROR = 501, // 参数错误
  USER_ACCOUNT_ERROR = 402, //账号或密码错误
  USER_LOGIN_ERROR = 400, // 用户未登录
  BUSINESS_ERROR = 500, //业务请求失败
  AUTH_ERROR = 401 // 认证失败或TOKEN过期
}

// 分页结构
export interface PageType {
  page: {
    pageNum: number
    pageSize: number
  }
  skipIndex: number
}

// 返回的数据结构
export interface ResponseType<T = any> {
  data?: T | null
  msg?: string | null
  code?: MsgCode
}

/**
 * 分页结构封装
 * @param pageNum
 * @param pageSize
 */
export function pager({ pageNum = 1, pageSize = 10 }): PageType {
  pageNum = Number(pageNum)
  pageSize = Number(pageSize)
  const skipIndex = (pageNum - 1) * pageSize
  return {
    page: {
      pageNum,
      pageSize
    },
    skipIndex
  }
}

/**
 * 请求成功
 * @param data
 * @param msg
 * @param code
 */
export function success<T = any>({
  data,
  msg = null,
  code = MsgCode.SUCCESS
}: ResponseType<T>): ResponseType<T> {
  logUtil.debug(data)
  return {
    code,
    data,
    msg
  }
}

/**
 * 请求失败
 * @param data
 * @param msg
 * @param code
 */
export function fail<T = any>({
  data,
  msg,
  code = MsgCode.BUSINESS_ERROR
}: ResponseType<T>): ResponseType<T> {
  logUtil.debug(msg)
  return {
    code,
    data,
    msg
  }
}

/**
 * 请求报错
 * @param data
 * @param msg
 * @param code
 */
export function catchError<T = any>({
  data = null,
  msg,
  code = MsgCode.BUSINESS_ERROR
}: ResponseType<T>): ResponseType<T> {
  logUtil.error(msg)
  return {
    code,
    data,
    msg
  }
}
