import { Response } from 'express'

import { UserAuthService } from '../services/UserAuthServices'
import { RequestCustom } from '../@types/requestCustomInterface'

class UserAuthentication {
  async create (req: RequestCustom, res: Response): Promise<Response> {
    const { ...data } = req.body

    const userAuthService = new UserAuthService()
    try {
      const user = await userAuthService.create({ ...data })

      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }

  async login (req: RequestCustom, res: Response) {
    const userAuthService = new UserAuthService()
    const { email, password } = req.body
    try {
      const userAuth = await userAuthService.login({ email, password })
      return res.status(200).json(userAuth)
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  }

  async recoverUserInformation (req: RequestCustom, res: Response): Promise<Response> {
    const { token } = req.params
    const userAuthService = new UserAuthService()

    try {
      const user = await userAuthService.recoverUserInfo(token)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export { UserAuthentication }
