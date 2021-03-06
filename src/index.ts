import express from 'express'
import cors from 'cors'
import path from 'path'
import router from '@routes/index'

const app = express()

const options: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(options))
app.use(express.json())
app.use('/images', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(router)

export default app
