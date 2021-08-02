import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository'
import { getCustomRepository } from 'typeorm'
import dayjs from 'dayjs'

class GenerateRefreshToken {
  async execute (userId: string) {
    const expiresIn = dayjs().add(120, 'second').unix()
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository)

    const refreshTokenAlreadyExists = await refreshTokenRepository.findOne({ userId: userId })
    if (refreshTokenAlreadyExists) {
      return refreshTokenAlreadyExists
    }
    const generateRefreshToken = refreshTokenRepository.create({
      userId, expiresIn
    })
    if (!generateRefreshToken) { throw new Error('Refresh token is undefined') }

    await refreshTokenRepository.save(generateRefreshToken)
    return generateRefreshToken
  }
}

export { GenerateRefreshToken }
