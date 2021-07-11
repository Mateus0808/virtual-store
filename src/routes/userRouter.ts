import { Router } from 'express'

import UserController from '@controllers/UsersControllers'
import { UserAuthentication } from '@controllers/UserAuthentication'
import { middlewareAuth } from '../middlewares/auth'

const userAuth = new UserAuthentication()
const routes = Router()

routes.post('/login', userAuth.login)
routes.post('/user', UserController.create)
routes.get('/users', middlewareAuth, UserController.listUsers)
routes.get('/users/:id', middlewareAuth, UserController.oneUser)
routes.put('/users/:id', middlewareAuth, UserController.update)
routes.delete('/users/:id', middlewareAuth, UserController.delete)

export default routes
