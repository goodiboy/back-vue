import Router from 'koa-router'
import reset from '../api/login/reset'
import login from '../api/login/login'
import register from '../api/login/register'
const router = new Router()

router.prefix('/login')
router.post('/reset', reset)
router.post('/login', login)
router.post('/register', register)

export default router
