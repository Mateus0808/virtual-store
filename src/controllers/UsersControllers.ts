import { Response, Request } from 'express'
import { UserService } from '../services/UserService'

interface InterfaceUserService {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  gender: string,
  dateBirth: Date,
  password: string
}

const UserController = {
  async create (req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, dateBirth, gender, phone, password } = req.body
    const dateBirthFormat = new Date(dateBirth)
    const userService = new UserService()
    try {
      const user: InterfaceUserService = await userService.create({ firstName, lastName, email, dateBirthFormat, gender, phone, password })
      console.log('date: ' + typeof (user.dateBirth))
      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({
        message: err.message
      })
    }
  },

  async read (req: Request, res: Response): Promise<Response> {
    const userService = new UserService()

    const allUsers = await userService.findUsers()

    return res.status(200).json(allUsers)
  }

  // async update (req: Request, res: Response): Promise<Response> {
  //   const { firstName, lastName, email, dateBirth, gender, phone, password } = req.body
  //   //const userId = req.params.userId

  //   const userService = new UserService()

  //     const userUpdate = userService.update({ firstName, lastName, email, dateBirth, gender, phone, password })
  // }

}

export default UserController
