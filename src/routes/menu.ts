import Router from 'koa-router'
import list from '../api/menu/list'
import operate from '../api/menu/operate'
import del from '../api/menu/del'
const router = new Router()

router.prefix('/menu')
router.get('/list', list)
router.post('/operate', operate)
router.delete('/delete', del)

export default router
