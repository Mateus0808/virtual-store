import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken'

interface interfaceLogin {
  email: string,
  password: string
}

class UserAuthService {
  async login ({ email, password }: interfaceLogin) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ email })
    if (!user) {
      throw new Error('User not found!')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      throw new Error('Invalid password!')
    }

    const token = generateToken({ userId: user.id })

    return { user, token }
  }
}

export { UserAuthService }
