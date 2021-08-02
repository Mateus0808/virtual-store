import { Router } from 'express'
import UserController from '@controllers/UsersControllers'
import { middlewareAuth } from '../middlewares/auth'

const routes = Router()

routes.get('/users', middlewareAuth, UserController.listUsers)
routes.get('/users/:id', middlewareAuth, UserController.oneUser)
routes.put('/users/:id', middlewareAuth, UserController.update)
routes.delete('/users/:id', UserController.delete)

export default routes
