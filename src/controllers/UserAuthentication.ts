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
}

export { UserAuthentication }
