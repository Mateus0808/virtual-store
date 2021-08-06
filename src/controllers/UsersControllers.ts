import { Response, Request } from 'express'
import { UserService } from '../services/UserServices'

interface RequestCustom extends Request {
  userId: string
}

const UserController = {
  async listUsers (req: RequestCustom, res: Response): Promise<Response> {
    try {
      const userService = new UserService()
      const allUsers = await userService.findUsers()
      return res.status(200).json(allUsers)
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  },

  async oneUser (req: RequestCustom, res: Response): Promise<Response> {
    const userId = req.params.id
    const userService = new UserService()
    try {
      const allUsers = await userService.findUser(userId)
      return res.status(200).json(allUsers)
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  },

  async update (req: RequestCustom, res: Response): Promise<Response> {
    const userId = req.params.id
    const { ...data } = req.body
    const userService = new UserService()

    try {
      const userUpdate = await userService.update({ userId, ...data })
      return res.status(200).json(userUpdate)
    } catch (error) {
      return res.status(400).json({ erroror: error.message })
    }
  },

  async delete (req: RequestCustom, res: Response): Promise<Response> {
    const userId = req.params.id
    const userService = new UserService()

    try {
      await userService.delete(userId)
      return res.status(200).json({ Error: 'Deleted user!' })
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  }
}

export default UserController
