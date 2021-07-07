import { Router } from 'express'

import UserController from '../controllers/UsersControllers'

const routes = Router()

routes.post('/user', UserController.create)
routes.get('/users', UserController.listUsers)
routes.get('/users/:id', UserController.oneUser)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

export default routes
