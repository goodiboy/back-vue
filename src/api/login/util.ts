import { UserInfo } from '../../types/userInfo'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../../config'

const handleUserInfo = (user: UserInfo) => {
  // eslint-disable-next-line
  // @ts-ignore
  user.password = undefined // 移除密码

  return {
    token: jsonwebtoken.sign({ user }, JWT_SECRET, {
      expiresIn: '1d' // 有效期一天
    }),
    userInfo: user
  }
}

export { handleUserInfo }
