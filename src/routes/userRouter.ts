import { Router } from 'express'

import UserController from '../controllers/UsersControllers'

const routes = Router()

routes.post('/user', UserController.create)
routes.get('/users', UserController.read)

export default routes
