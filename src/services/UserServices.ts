import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/UserModel'
import { validate } from 'class-validator'
import { InterfaceUsersService } from '../@types/userInterface'
import { phoneFormat } from '../provider/phoneMatch'

class UserService {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async findUsers () {
    const allUsers = await this.userRepository.find()

    return allUsers
  }

  async findUser (userId: string) {
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
      phone, dateBirth: dateBirthFormat.toUTCString(), ...data
    })

    const errors = await validate(user, { skipMissingProperties: true })
    if (errors.length !== 0) { throw new Error(`${errors}`) }

    try {
      await this.userRepository.save(user)
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async delete (userId: string) {
    const userExists = await this.userRepository.findOne(userId)
    if (!userExists) { throw new Error('User not found!') }

    await this.userRepository.delete(userId)
  }
}

export { UserService }
