import {
  BeforeInsert,
  BeforeRemove, BeforeUpdate, Column, CreateDateColumn, Entity,
  JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn
} from 'typeorm'
import { IsNotEmpty, IsUUID } from 'class-validator'
import aws from 'aws-sdk'
import { v4 as uuid } from 'uuid'
import { User } from './UserModel'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const s3 = new aws.S3()

@Entity('avatar')
export class Avatar {
  @PrimaryColumn('uuid')
  @IsUUID('4')
  id: string

  @Column()
  userId: string

  @OneToOne(() => User, user => user.avatar)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  @IsNotEmpty()
  name: String

  @Column()
  @IsNotEmpty()
  size: number

  @Column()
  @IsNotEmpty()
  key: string

  @Column()
  @IsNotEmpty()
  url: String

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @BeforeRemove()
  deleteImage () {
    if (process.env.STORAGE_TYPE === 's3') {
      return s3.deleteObject({
        Bucket: 'uploadsavatar',
        Key: this.key
      }).promise()
    } else {
      return promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
      )
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  setURL () {
    if (!this.url) {
      this.url = `${process.env.APP_HOST}/images/${this.key}`
    }
  }

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
