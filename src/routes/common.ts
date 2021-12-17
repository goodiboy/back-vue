import Router from 'koa-router'
import getCaptcha from '../api/common/getCaptcha'
const router = new Router()

router.prefix('/common')
router.get('/getCaptcha', getCaptcha)

export default router
