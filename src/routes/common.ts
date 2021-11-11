import Router from 'koa-router'
import common from '../api/Common'
const router = new Router()

router.get('/getCaptcha', common.getCaptcha)

export default router
