import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { RefreshToken } from '@models/RefreshTokenModel'
import { generateToken } from '../provider/generateToken'
import dayjs from 'dayjs'
import { GenerateRefreshToken } from '../provider/GenerateRefreshToken'

class RefreshTokenServices {
  private refreshTokenRepository: Repository<RefreshToken>

  constructor () {
    this.refreshTokenRepository = getCustomRepository(RefreshTokenRepository)
  }

  async execute (refreshTokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({ id: refreshTokenId })

    if (!refreshToken) { throw new Error('Refresh token invalid!') }

    const token = generateToken({ userId: refreshToken.userId })
    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    if (refreshTokenExpired) {
      console.log(refreshToken.userId)
      await this.refreshTokenRepository.delete({ userId: refreshToken.userId })

      const generateRefreshToken = new GenerateRefreshToken()
      const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId)

      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { RefreshTokenServices }
