// export default class Config {
//   // mongodb配置
//   static DB_URL =
//     'mongodb://admin:123456@8.134.51.195:9527/back_vue?authSource=admin'
//
//   // email配置
//   static EMAIL_CONFIG = {
//     host: 'smtp.qq.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: '659555839@qq.com', // generated ethereal user
//       pass: 'ulmludfxxzwvbbga' // generated ethereal password
//     }
//   }
// }

// mongodb配置
const DB_URL = 'mongodb://admin:123456@8.134.51.195:9527/back_vue'

// email配置
const EMAIL_CONFIG = {
  host: 'smtp.qq.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '659555839@qq.com', // generated ethereal user
    pass: 'ulmludfxxzwvbbga' // generated ethereal password
  }
}

const REDIS_CONFIG = {
  url: 'redis://www.gdrcz.com:9901',
  password: '123456'
}
export { DB_URL, EMAIL_CONFIG, REDIS_CONFIG }
