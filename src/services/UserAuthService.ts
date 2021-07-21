import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import { generateToken, hidePassword } from '../utils/generateToken'
import jwt from 'jsonwebtoken'

interface interfaceLogin {
  email: string,
  password: string
}

interface interfaceToken {
  token: string
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

  async recoverUserInfo ({ token }: interfaceToken) {
    const decoded = jwt.decode(token, { complete: true })

    if (!decoded) {
      throw new Error('Provided token does not decode as JWT')
    }
    const { userId } = decoded.payload
    const userRepository = getCustomRepository(UserRepository)
    const userExists = await userRepository.findOne(userId)

    if (!userExists) {
      throw new Error('User not found')
    }
    return userExists
  }
}

export { UserAuthService }
