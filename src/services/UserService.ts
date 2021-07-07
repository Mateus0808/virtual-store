import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/User'
import { validate } from 'class-validator'

const phoneFormat = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/

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

  async create ({ firstName, lastName, email, phone, gender, dateBirth, password }: InterfaceUsersService) {
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
      firstName, lastName, email, phone, gender, dateBirth: dateBirthFormat, password
    })

    const errors = await validate(user)

    if (errors.length !== 0) {
      throw new Error('Error registering user! Check the data again.')
    }
    await this.userRepository.save(user)

    return user
  }

  async findUsers () {
    const allUsers = await this.userRepository.find()

    return allUsers
  }

  async findUser ({ userId }: InterfaceUsersService) {
    const oneUser = await this.userRepository.findOne(userId)
    if (!oneUser) {
      throw new Error('User not found!')
    }
    return oneUser
  }

  async update ({ userId, firstName, lastName, email, phone, gender, dateBirth, password }: InterfaceUsersService) {
    const userExists = await this.userRepository.findOne(userId)

    if (!userExists) {
      throw new Error('User not found!')
    }

    this.userRepository.merge(userExists, { firstName, lastName, email, phone, gender, dateBirth, password })
    const userUpdate = await this.userRepository.save(userExists)

    return userUpdate
  }

  async delete ({ userId }: InterfaceUsersService) {
    const userExists = this.userRepository.findOne(userId)
    if (!userExists) {
      throw new Error('User not found!')
    }
    await this.userRepository.delete(userId)
  }
}

export { UserService }
