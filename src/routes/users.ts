import Router from 'koa-router'
import list from '../api/users/list'
const router = new Router()

router.prefix('/users')
router.get('/list', list)

export default router
