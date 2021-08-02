import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/UserModel'
import { validate } from 'class-validator'

const phoneFormat = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/

interface InterfaceUsersService {
  userId?: string,
  name?: string,
  email?: string,
  phone?: string,
  gender?: string,
  dateBirth?: Date,
  password?: string,
  token?: string
}

class UserService {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async findUsers () {
    const allUsers = await this.userRepository.find()

    return allUsers
  }

  async findUser ({ userId }: InterfaceUsersService) {
    if (!userId) { throw new Error('User id is undefined!') }

    const user = await this.userRepository.findOne(userId)
    if (!user) { throw new Error('User not found!') }

    return user
  }

  async update ({ userId, phone, dateBirth, ...data }: InterfaceUsersService) {
    const dateBirthFormat = new Date(dateBirth)

    const numberFormated = phone.match(phoneFormat)
    if (!numberFormated) { throw new Error('Invalid phone!') }

    const userExists = await this.userRepository.findOne(userId)
    if (!userExists) { throw new Error('User not found!') }

    const user = this.userRepository.merge(userExists, {
      phone, dateBirth: dateBirthFormat.toString(), ...data
    })

    const errors = await validate(user, { skipMissingProperties: true })
    if (errors.length !== 0) { throw new Error(`${errors}`) }

    await this.userRepository.save(user)
    return user
  }

  async delete ({ userId }: InterfaceUsersService) {
    const userExists = await this.userRepository.findOne(userId)
    if (!userExists) { throw new Error('User not found!') }

    await this.userRepository.delete(userId)
  }
}

export { UserService }
