import Router from 'koa-router'
import login from '../api/Login'
const router = new Router()

router.post('/forget', login.forget)

export default router
