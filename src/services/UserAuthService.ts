import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import { generateToken, hidePassword } from '../utils/generateToken'

interface interfaceLogin {
  email: string,
  password: string
}

class UserAuthService {
  async login ({ email, password }: interfaceLogin) {
    const userRepository = getCustomRepository(UserRepository)

    const userLogin = await userRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne()

    if (!userLogin) {
      throw new Error('User not found!')
    }

    const passwordCompare = await bcrypt.compare(password, userLogin.password)
    if (!passwordCompare) {
      throw new Error('Invalid password!')
    }

    const user = hidePassword(userLogin)
    const token = generateToken({ userId: userLogin.id })
    return { user, token }
  }
}

export { UserAuthService }
