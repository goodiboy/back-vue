import Router from 'koa-router'
import getCaptcha from '../api/common/captcha'
const router = new Router()

router.prefix('/common')
router.get('/getCaptcha', getCaptcha)

export default router
