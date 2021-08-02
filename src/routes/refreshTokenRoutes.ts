import { Router } from 'express'

import { RefreshTokenUserController } from '@controllers/RefreshTokenUserController'

const refreshTokenControllers = new RefreshTokenUserController()
const routes = Router()

routes.post('/refresh-token/:idRefreshToken', refreshTokenControllers.hadle)

export default routes
