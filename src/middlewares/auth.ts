import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { RequestCustom } from '../@types/requestCustomInterface'

const middlewareAuth = (req: RequestCustom, res: Response, next: NextFunction) => {
  try {
    // Contains the credentials to authenticate a user with a server.
    const authHeader = req.headers.authorization

    if (!authHeader) { // Check if there are any credentials
      return res.status(401).json({ error: 'No token provided!' })
    }
    // Separates credentials by white space and stores them in a vector
    const parts = authHeader.split(' ')

    if (parts.length !== 2) { // Checks if the vector has 2 parts
      return res.status(401).json({ error: 'Token error!' })
    }

    // Unstructure it by taking the 2 values in the parts array
    const [scheme, token] = parts

    // Check authentication scheme is equal to Bearer
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token malformatted!' })
    }

    // checks token integrity and authenticity
    jwt.verify(token, process.env.KEY_DECODED, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token!' })

      // Adding a userId variable to the Req can access the userId on any route
      req.userId = decoded.userId
      // Give access to the route
      return next()
    })
  } catch (error) {
    return res.status(401).json({ error: 'Error! Try again!' })
  }
}

export { middlewareAuth }
