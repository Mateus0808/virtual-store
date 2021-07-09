import { Response, Request } from 'express'
import { UserService } from '../services/UserService'

const UserController = {
  async create (req: Request, res: Response): Promise<Response> {
    const { name, email, dateBirth, gender, phone, password } = req.body

    const userService = new UserService()
    try {
      const user = await userService.create({ name, email, dateBirth, gender, phone, password })

      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async listUsers (req: Request, res: Response): Promise<Response> {
    const userService = new UserService()

    const allUsers = await userService.findUsers()
    return res.status(200).json(allUsers)
  },

  async oneUser (req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const userService = new UserService()
    try {
      const allUsers = await userService.findUser({ userId })

      return res.status(200).json(allUsers)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async update (req: Request, res: Response): Promise<Response> {
    const userId = req.params.id
    const { name, email, dateBirth, gender, phone, password } = req.body

    const userService = new UserService()
    try {
      const userUpdate = await userService.update({ userId, name, email, dateBirth, gender, phone, password })

      return res.status(200).json(userUpdate)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async delete (req: Request, res: Response): Promise<Response> {
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
