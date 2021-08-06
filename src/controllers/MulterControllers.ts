import { Response } from 'express'
import { MulterServices } from '../services/MulterServices'
import { InterfaceRequestFile } from '../@types/multer'
import { RequestCustom } from '../@types/requestCustomInterface'

class MulterControllers {
  async create (req:RequestCustom, res:Response): Promise<Response> {
    try {
      const {
        originalname: name, size, key, location: url = ''
      }: InterfaceRequestFile = req.file
      const userId = req.params.id

      const multerServices = new MulterServices()
      const avatar = await multerServices.create({ key, name, size, url, userId })

      return res.status(201).json(avatar)
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  }

  async searchAll (req: RequestCustom, res: Response): Promise<Response> {
    try {
      const multerServices = new MulterServices()
      const avatar = await multerServices.searchAll()

      return res.json(avatar)
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  }

  async searchOne (req: RequestCustom, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId
      const multerServices = new MulterServices()
      const avatar = await multerServices.searchOne(userId)

      return res.json(avatar)
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  }

  async update (req: RequestCustom, res: Response): Promise<Response> {
    try {
      const {
        originalname: name, size, key, location: url = ''
      }: InterfaceRequestFile = req.file
      const userId = req.params.userId
      const multerServices = new MulterServices()
      const avatar = await multerServices.update({ userId, key, name, size, url })

      return res.json(avatar)
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  }

  async delete (req: RequestCustom, res: Response): Promise<Response> {
    try {
      const idImage = req.params.idImage
      const multerServices = new MulterServices()
      await multerServices.delete(idImage)
      return res.json({ message: 'Image deleted' })
    } catch (error) {
      return res.status(400).json({ Error: error.message })
    }
  }
}

export { MulterControllers }
