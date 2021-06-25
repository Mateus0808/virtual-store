import { Router } from 'express'
import UserRouter from './userRouter'

const router = Router()

router.use(UserRouter)

export default router
