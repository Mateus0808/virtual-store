import { RefreshToken } from '../models/RefreshTokenModel'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {}

export { RefreshTokenRepository }
