import Router from 'koa-router'
import list from '../api/users/list'
import operate from '../api/users/operate'
import del from '../api/users/del'
const router = new Router()

router.prefix('/users')
router.get('/list', list)
router.post('/operate', operate)
router.delete('/delete', del)

export default router
