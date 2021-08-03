import { Request } from 'express'

interface RequestCustom extends Request {
  userId: string
}

export { RequestCustom }
