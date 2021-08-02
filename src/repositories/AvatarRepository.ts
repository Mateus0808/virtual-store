import { Avatar } from '../models/AvatarModel'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Avatar)
class AvatarRepository extends Repository<Avatar> {}

export { AvatarRepository }
