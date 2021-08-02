import { Router } from 'express'
import multer from 'multer'
import { multerConfig } from '../multer'
import { MulterControllers } from '@controllers/MulterControllers'
import { middlewareAuth } from '../middlewares/auth'

const routes = Router()
const multerControllers = new MulterControllers()

routes.post('/image/:id', middlewareAuth, multer(multerConfig).single('file'), multerControllers.create)
routes.get('/images', middlewareAuth, multerControllers.searchAll)
routes.get('/images/:userId', middlewareAuth, multerControllers.searchOne)
routes.put('/images/:userId', middlewareAuth, multer(multerConfig).single('file'), multerControllers.update)
routes.delete('/images/:idImage', middlewareAuth, multerControllers.delete)

export default routes
