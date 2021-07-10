import { Response, Request } from 'express'
import { UserService } from '../services/UserService'

interface RequestCustom extends Request {
  userId: string
}

const UserController = {
  async create (req: RequestCustom, res: Response): Promise<Response> {
    const { ...data } = req.body

    const userService = new UserService()
    try {
      const user = await userService.create({ ...data })

      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async listUsers (req: RequestCustom, res: Response): Promise<Response> {
    const userService = new UserService()
    const allUsers = await userService.findUsers()
    return res.status(200).json(allUsers)
  },

  async oneUser (req: RequestCustom, res: Response): Promise<Response> {
    const userId = req.params.id
    const userService = new UserService()
    try {
      const allUsers = await userService.findUser({ userId })

      return res.status(200).json(allUsers)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async update (req: RequestCustom, res: Response): Promise<Response> {
    const userId = req.params.id
    const { ...data } = req.body
    const userService = new UserService()

    try {
      const userUpdate = await userService.update({ userId, ...data })
      return res.status(200).json(userUpdate)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async delete (req: RequestCustom, res: Response): Promise<Response> {
    const userId = req.params.id
    const userService = new UserService()

    try {
      await userService.delete({ userId })
      return res.status(200).json({ message: 'Deleted user!' })
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}

export default UserController
