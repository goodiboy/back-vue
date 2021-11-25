/**
 * 日志记录配置
 */
import log4js from 'log4js'

const enum Levels {
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal'
}
/**
 * 配置信息
 */
log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file', // 文件
      filename: 'logs/info.log'
    },
    error: {
      type: 'dateFile', //日期文件
      filename: 'logs/error', // pattern已经带有log后缀
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true // 设置文件名 filename + pattern
    }
  },
  categories: {
    default: { appenders: ['console'], level: Levels.debug }, // 默认
    info: { appenders: ['info', 'console'], level: Levels.info }, // 信息打印
    error: { appenders: ['error', 'console'], level: Levels.error } // 错误打印
  }
})

class Log {
  /**
   * level为debug的日志记录
   * @param content
   */
  debug(content: any) {
    const logger = log4js.getLogger(Levels.debug)
    logger.level = Levels.debug
    logger.debug(content)
  }

  /**
   * level为info的日志记录
   * @param content
   */
  info(content: any) {
    const logger = log4js.getLogger(Levels.info)
    logger.level = Levels.info
    logger.info(content)
  }

  /**
   * level为error的日志记录
   * @param content
   */
  error(content: any) {
    const logger = log4js.getLogger(Levels.error)
    logger.level = Levels.error
    logger.error(content)
  }
}
export default new Log()
