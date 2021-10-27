import Router from 'koa-router'
import usersRouter from './users'
import publicRouter from './publicRouter'
const router = new Router()
// router.prefix('/api')

router.use(
  publicRouter.routes(),
  usersRouter.routes()
  // usersRouter.allowedMethods()
)

export default router
