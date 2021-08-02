import { User } from '../models/UserModel'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export { UserRepository }
