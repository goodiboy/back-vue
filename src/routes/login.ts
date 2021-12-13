import Router from 'koa-router'
import { reset, login, register } from '../api/login'
const router = new Router()

router.prefix('/login')
router.post('/reset', reset)
router.post('/login', login)
router.post('/register', register)

export default router
