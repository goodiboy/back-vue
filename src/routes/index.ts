import Router from 'koa-router'
import common from './common'
import login from './login'
import users from './users'
import menu from './menu'
const router = new Router()

router.use(
  common.routes(),
  login.routes(),
  users.routes(),
  menu.routes()
  // usersRouter.allowedMethods()
)

export default router
