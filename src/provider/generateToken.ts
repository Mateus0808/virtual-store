import jwt from 'jsonwebtoken'

const KEY_DECODED = 'cf22e864a71e76338b3e2900b0e6bd70'

function generateToken (params = {}) {
  try {
    return jwt.sign(params, KEY_DECODED, {
      expiresIn: '1m' // 1 hour for token to expire
    })
  } catch (error) {
    throw new Error('Error! Try again. Authentication failed')
  }
}

export { generateToken }
