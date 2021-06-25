import { Router } from 'express'

import UserController from '../controllers/UserControllers'

const routes = Router()

routes.post('/user', UserController.create)

export default routes
