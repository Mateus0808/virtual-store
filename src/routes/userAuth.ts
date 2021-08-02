import { Router } from 'express'
import { UserAuthentication } from '@controllers/UserAuthentication'
import { middlewareAuth } from '../middlewares/auth'

const userAuth = new UserAuthentication()
const routes = Router()

routes.post('/user', userAuth.create)
routes.post('/login', userAuth.login)
routes.post('/auth/:token', middlewareAuth, userAuth.recoverUserInformation)

export default routes
