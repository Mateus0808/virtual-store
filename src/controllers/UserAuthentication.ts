import { Request, Response } from 'express'

import { UserAuthService } from '../services/UserAuthService'

interface RequestCustom extends Request {
  userId: string
}

class UserAuthentication {
  async login (req: RequestCustom, res: Response) {
    const userAuthService = new UserAuthService()
    const { email, password } = req.body

    try {
      const userAuth = await userAuthService.login({ email, password })

      return res.status(200).json(userAuth)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  async recoverUserInformation (req: RequestCustom, res: Response): Promise<Response> {
    const { token } = req.params
    const userAuthService = new UserAuthService()

    try {
      const user = await userAuthService.recoverUserInfo({ token })
      return res.status(200).json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export { UserAuthentication }
