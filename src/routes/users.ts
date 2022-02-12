import Router from 'koa-router'
import list from '../api/users/list'
import operate from '../api/users/operate'
const router = new Router()

router.prefix('/users')
router.get('/list', list)
router.post('/operate', operate)

export default router
