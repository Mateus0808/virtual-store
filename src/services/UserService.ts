import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/User'
import { validate } from 'class-validator'

const phoneFormat = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/
// const dateFormat = /^{1}|{2}{3}-[0-9]{2}-[0-9]{2}/

interface InterfaceUsersService {
  userId?: string,
  firstName?: string,
  lastName?: string,
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

    const user = this.userRepository.create({
      email, phone, dateBirth: dateBirthFormat, ...data
    })
    console.log(user)
    const errors = await validate(user)

    if (errors.length !== 0) {
      throw new Error(`${errors}`) // 'Error registering user! Check the data again.'
    }
    await this.userRepository.save(user)

    return user
  }

  async findUsers () {
    const allUsers = await this.userRepository.find()

    return allUsers
  }

  async findUser ({ userId }: InterfaceUsersService) {
    if (!userId) {
      throw new Error('User id is undefined!')
    }

    const oneUser = await this.userRepository.findOne(userId)
    if (!oneUser) {
      throw new Error('User not found!')
    }
    return oneUser
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

    const userUpdate = this.userRepository.merge(userExists, { phone, dateBirth: dateBirthFormat, ...data })

    const errors = await validate(userUpdate)
    if (errors.length !== 0) {
      throw new Error(`${errors}`)
    }

    await this.userRepository.save(userUpdate)
    return userUpdate
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
