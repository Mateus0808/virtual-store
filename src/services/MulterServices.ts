import { Avatar } from '@models/AvatarModel'
import { AvatarRepository } from '../repositories/AvatarRepository'
import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { InterfaceMulterServices } from '../@types/multer'

class MulterServices {
  private avatarRepository: Repository<Avatar>
  constructor () {
    this.avatarRepository = getCustomRepository(AvatarRepository)
  }

  async create ({ key, name, size, url, userId }: InterfaceMulterServices) {
    const userRepository = getCustomRepository(UserRepository)
    const userAlreadyExists = await userRepository.findOne(userId)

    if (!userAlreadyExists) { throw new Error('User not found!') }

    const avatar = this.avatarRepository.create({
      name, size, key, userId, url
    })

    await this.avatarRepository.save(avatar)
    return avatar
  }

  async searchAll () {
    const avatar = await this.avatarRepository.find()
    return avatar
  }

  async searchOne (userId: string) {
    const avatar = await this.avatarRepository.findOne({ userId: userId })
    if (!avatar) { throw new Error('User not found') }
    return avatar
  }

  async update ({ userId, ...data }: InterfaceMulterServices) {
    const avatarAlreadyExist = await this.avatarRepository.findOne({ userId })
    if (!avatarAlreadyExist) { throw new Error('User not found') }

    const avatar = this.avatarRepository.merge(avatarAlreadyExist, {
      userId, ...data
    })

    await this.avatarRepository.save(avatar)
    return avatar
  }

  async delete (idImage: string) {
    const avatar = await this.avatarRepository.findOne({ id: idImage })
    if (!avatar) { throw new Error('User not found') }

    await this.avatarRepository.remove(avatar)
  }
}

export { MulterServices }
