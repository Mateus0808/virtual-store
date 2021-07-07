import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '@models/User'

interface InterfaceSettingsService {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  gender: string,
  dateBirth: Date,
  password: string
}

class UserService {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async create ({ firstName, lastName, email, phone, gender, dateBirth, password }: InterfaceSettingsService) {
    const userAlreadyExists = await this.userRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const user = this.userRepository.create({
      firstName, lastName, email, phone, gender, dateBirth, password
    })

    await this.userRepository.save(user)

    return user
  }

  async read () {
    const allUsers = await this.userRepository.find()

    return allUsers
  }

  // async update ({ firstName, lastName, email, phone, gender, dateBirth, password }: InterfaceSettingsService) {
  //   const user = await this.userRepository.findOne({ email })

  //   if (!user) {
  //     throw new Error('User not found!')
  //   }

  //   const userUpdate = await this.userRepository.update({
  //     firstName,
  //     lastName,
  //     email,
  //     phone,
  //     gender,
  //     dateBirth,
  //     password
  //   }, {
  //     user
  //   })

  //   return userUpdate
  // }
}

export { UserService }
