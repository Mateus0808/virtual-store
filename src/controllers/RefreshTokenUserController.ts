import { Response, Request } from 'express'
import { RefreshTokenServices } from '../services/RefreshTokenServices'

class RefreshTokenUserController {
  async hadle (req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = req.params.idRefreshToken
      const refreshTokenServices = new RefreshTokenServices()
      const token = await refreshTokenServices.execute(refreshToken)
      return res.status(200).json(token)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

export { RefreshTokenUserController }
