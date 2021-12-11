import Router from 'koa-router'
import { forget, login, register } from '../api/login'
const router = new Router()

router.prefix('/login')
router.post('/forget', forget)
router.post('/login', login)
router.post('/register', register)

export default router
