import Router from 'koa-router'
import common from './common'
import login from './login'
const router = new Router()
// router.prefix('/api')

router.use(
  common.routes(),
  login.routes()
  // usersRouter.allowedMethods()
)

export default router
