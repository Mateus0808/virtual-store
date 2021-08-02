import { Router } from 'express'
import UserRouter from './userRouter'
import RefreshToken from './refreshTokenRoutes'
import UserAuth from './userAuth'
import multer from './multer'

const router = Router()

router.use(UserAuth)
router.use(UserRouter)
router.use(RefreshToken)
router.use(multer)

export default router
