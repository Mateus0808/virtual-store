import { Router } from 'express'
import UserRouter from './userRouter'
import ProductsRouter from './productRouter'

const router = Router()

router.use(UserRouter)
router.use(ProductsRouter)

export default router
