import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/User'
import { validate } from 'class-validator'
import { generateToken, hidePassword } from '../utils/generateToken'

const phoneFormat = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/

interface InterfaceUsersService {
  userId?: string,
  name?: string,
  email?: string,
  phone?: string,
  gender?: string,
  dateBirth?: Date,
  password?: string
}

class UserService {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async create ({ email, phone, dateBirth, ...data }: InterfaceUsersService) {
    const dateBirthFormat = new Date(dateBirth)

    const numberFormated = phone.match(phoneFormat)
    if (!numberFormated) {
      throw new Error('Invalid phone!')
    }

    const userAlreadyExists = await this.userRepository.findOne({ email })
    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const userCreate = this.userRepository.create({
      email, phone, dateBirth: dateBirthFormat, ...data
    })

    const errors = await validate(userCreate)

    if (errors.length !== 0) {
      throw new Error(`${errors}`) // 'Error registering user! Check the data again.'
    }
    await this.userRepository.save(userCreate)

    const { password, ...userData } = userCreate
    const user = hidePassword({ password, ...userData })

    return {
      user,
      token: generateToken({ userId: user.id })
    }
  }

  async findUsers () {
    const allUsers = await this.userRepository.find()

    return allUsers
  }

  async findUser ({ userId }: InterfaceUsersService) {
    if (!userId) {
      throw new Error('User id is undefined!')
    }

    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new Error('User not found!')
    }
    return user
  }

  async update ({ userId, phone, dateBirth, ...data }: InterfaceUsersService) {
    const dateBirthFormat = new Date(dateBirth)

    const numberFormated = phone.match(phoneFormat)
    if (!numberFormated) {
      throw new Error('Invalid phone!')
    }

    const userExists = await this.userRepository.findOne(userId)
    if (!userExists) {
      throw new Error('User not found!')
    }

    const user = this.userRepository.merge(userExists, { phone, dateBirth: dateBirthFormat, ...data })

    const errors = await validate(user)
    if (errors.length !== 0) {
      throw new Error(`${errors}`)
    }

    await this.userRepository.save(user)
    return user
  }

  async delete ({ userId }: InterfaceUsersService) {
    const userExists = await this.userRepository.findOne(userId)
    if (!userExists) {
      throw new Error('User not found!')
    }
    await this.userRepository.delete(userId)
  }
}

export { UserService }
