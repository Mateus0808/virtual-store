import jwt from 'jsonwebtoken'

function generateToken (params = {}) {
  try {
    return jwt.sign(params, process.env.KEY_DECODED, {
      expiresIn: '1m' // 1 hour for token to expire
    })
  } catch (error) {
    throw new Error('Error! Try again. Authentication failed')
  }
}

export { generateToken }
