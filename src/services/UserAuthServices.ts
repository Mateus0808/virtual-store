import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import { generateToken } from '../provider/generateToken'
import { hidePassword } from '../provider/hidePassword'
import jwt from 'jsonwebtoken'
import { validate } from 'class-validator'
import { GenerateRefreshToken } from '../provider/GenerateRefreshToken'
import { InterfaceUsersService, interfaceLogin } from '../@types/userInterface'
import { phoneFormat } from '../provider/phoneMatch'

class UserAuthService {
  async create ({ email, phone, dateBirth, ...data }: InterfaceUsersService) {
    const userRepository = getCustomRepository(UserRepository)
    const numberFormated = phone.match(phoneFormat)

    if (!numberFormated) { throw new Error('Invalid phone!') }

    const userAlreadyExists = await userRepository.findOne({ email })
    if (userAlreadyExists) { throw new Error('User already exists!') }

    const user = userRepository.create({
      email, phone, dateBirth, ...data
    })

    const errors = await validate(user)

    if (errors.length !== 0) { throw new Error(`${errors}`) }
    await userRepository.save(user)
    delete user.password
    return {
      user,
      token: generateToken({ userId: user.id })
    }
  }

  async login ({ email, password }: interfaceLogin) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne()

    if (!user) { throw new Error('User or password incorrect!') }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) { throw new Error('User or password incorrect!') }

    const userLogin = hidePassword(user)
    delete userLogin?.tempPassword
    const token = generateToken({ userId: user.id })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(user.id)
    return { user, token, refreshToken }
  }

  async recoverUserInfo (token: string) {
    const decoded = jwt.decode(token, { complete: true })

    if (!decoded) { throw new Error('Provided token does not decode as JWT') }

    const { userId } = decoded.payload
    const userRepository = getCustomRepository(UserRepository)
    const userExists = await userRepository.findOne(userId)

    if (!userExists) { throw new Error('User not found') }

    return userExists
  }
}

export { UserAuthService }
