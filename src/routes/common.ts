import Router from 'koa-router'
import Common from '../api/Common'
const router = new Router()

router.prefix('/common')
router.get('/getCaptcha', Common.getCaptcha)

export default router
