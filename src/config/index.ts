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

// redis配置
const REDIS_CONFIG = {
  url: 'redis://www.gdrcz.com:9901',
  password: '123456'
}

// jwt密钥
const JWT_SECRET = 'whT63AimjiZ2SLF9JdfPeRyiwojozXg1'

export { DB_URL, EMAIL_CONFIG, REDIS_CONFIG, JWT_SECRET }
