import Router from 'koa-router'
import common from './common'
import login from './login'
import users from './users'
const router = new Router()

router.use(
  common.routes(),
  login.routes(),
  users.routes()
  // usersRouter.allowedMethods()
)

export default router
