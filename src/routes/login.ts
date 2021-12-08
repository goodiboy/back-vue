import Router from 'koa-router'
import { forget, login } from '../api/login'
const router = new Router()

router.post('/forget', forget)
router.post('/login', login)

export default router
