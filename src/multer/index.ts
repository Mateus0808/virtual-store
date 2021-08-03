import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import { InterfaceRequestFile } from '../@types/multer'
require('dotenv').config()

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file: InterfaceRequestFile, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, undefined)
        file.key = `${hash.toString('hex')}-${file.originalname}`
        cb(null, file.key)
      })
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'uploadsavatar',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, undefined)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  })
}

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else { throw new Error('Invalid file type!') }
  }
}

export { multerConfig }
