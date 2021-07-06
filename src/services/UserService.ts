import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'

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
  async create ({ firstName, lastName, email, phone, gender, dateBirth, password }: InterfaceSettingsService) {
    const userRepository = getCustomRepository(UserRepository)

    const userAlreadyExists = await userRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const user = userRepository.create({
      firstName, lastName, email, phone, gender, dateBirth, password
    })

    await userRepository.save(user)

    return user
  }

  async read () {
    const userRepository = getCustomRepository(UserRepository)

    const allUsers = await userRepository.find()

    return allUsers
  }

  // async update ({ firstName, lastName, email, phone, gender, dateBirth, password }: InterfaceSettingsService) {
  //   const userRepository = getCustomRepository(UserRepository)

  //   const user = await userRepository.findOne({ email })

  //   if (!user) {
  //     throw new Error('User not found!')
  //   }

  //   const userUpdate = await userRepository.update({
  //     firstName, lastName, email, phone, gender, dateBirth, password
  //   })

  //   return userUpdate
  // }
}

export { UserService }
