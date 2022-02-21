import logUtil from '../lib/log'
import redisClient from '../lib/redis-client'
import type { ParameterizedContext } from 'koa'
import type { ResponseType } from '../types/common'
import dayjs from 'dayjs'
// 错误码
export enum MsgCode {
  SUCCESS = 200,
  PARAM_ERROR = 501, // 参数错误
  USER_ACCOUNT_ERROR = 402, //账号或密码错误
  USER_EXISTED = 403, // 用户已存在，昵称重复
  USER_INVALID = 405, // 用户不存在
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

/**
 * 分页结构封装
 * @param pageNum
 * @param pageSize
 */
export const pager = ({ pageNum = 1, pageSize = 10 }): PageType => {
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
export const success = <T = any>(
  data: T,
  msg: string | null = null,
  code = MsgCode.SUCCESS
): ResponseType<T> => {
  // logUtil.debug(data)
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
export const catchError = <T = any>(
  msg = '系统出现异常，请稍后重试',
  code = MsgCode.BUSINESS_ERROR,
  data: T | null = null
): ResponseType<T> => {
  logUtil.error(msg)
  return {
    code,
    data,
    msg
  }
}

/**
 * 请求失败,参数错误
 * @param data
 * @param msg
 * @param code
 */
export const fail = <T = any>(
  msg = '参数错误',
  code = MsgCode.PARAM_ERROR,
  data: T | null = null
): ResponseType<T> => {
  logUtil.debug(msg)
  return {
    code,
    data,
    msg
  }
}

/**
 * 校验图像验证码是否正确
 * @param captcha 图像验证码
 * @param captchaId 验证码id
 * @param ctx koa上下文
 */
export const checkCaptchaValid = async (
  captcha: string,
  captchaId: string,
  ctx: ParameterizedContext
) => {
  const value = await redisClient.get(captchaId)
  if (!value) {
    ctx.body = fail('验证码已失效，请重新获取')
    return false
  }
  if (value.toLocaleLowerCase() !== captcha.toLocaleLowerCase()) {
    ctx.body = fail('验证码不正确，请重新输入')
    return false
  }
  return true
}

/**
 * 获取当前的时间
 */
export const currentTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 格式化参数，把undefined的参数移除
 * @param params
 */
export const formatParam = <T = any>(params: T): T => {
  const res: any = {}
  for (const key in params) {
    if (params[key]) {
      res[key] = params[key]
    }
  }
  return res
}

/**
 * 检测哪个属性是undefined
 * @param params
 */
export const checkAttr = (params: Record<string, any>) => {
  console.log(params)
  const invalid: string[] = []

  for (const attr in params) {
    if (params[attr] === undefined) {
      invalid.push(attr)
    }
  }
  return invalid.join(',')
}

/**
 * 把列表数据格式化成树数据
 * @param root 需要出来的列表数据
 * @param parentId 父级id
 * @param children 子级数组字段名
 */
export const formatTree = (
  root: any[],
  parentId: string,
  children = 'children'
) => {
  // const list = root.filter((item) => {
  //   return item.parentId.toString() === parentId.toString()
  // })

  const list: any[] = []
  const newRoot: any[] = []
  root.forEach((item) => {
    if (item.parentId.toString() === parentId.toString()) {
      list.push(item)
    } else {
      newRoot.push(item)
    }
  })

  list.forEach((item) => {
    // item[children] = formatTree(root, item._id)
    item[children] = formatTree(newRoot, item._id)
  })

  return list
}
