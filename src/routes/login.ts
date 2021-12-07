import Router from 'koa-router'
import Login from '../api/Login'
const router = new Router()

router.post('/forget', Login.forget)
router.post('/login', Login.login)

export default router
