import { Response, Request } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'

const UserController = {
  async create (req: Request, res: Response): Promise<Response> {
    const body = req.body

    const { firstName, lastName, email, dateBirth, gender, phone, password } = body

    const userRepository = getCustomRepository(UserRepository)
    const user = userRepository.create({
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateBirth,
      password
    })

    await userRepository.save(user)

    return res.status(201).json(user)
  }
}

export default UserController
