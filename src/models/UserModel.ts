import {
  BeforeInsert, Column,
  CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn
} from 'typeorm'
import {
  IsEmail, IsMobilePhone, IsNotEmpty, IsString, IsUUID,
  Length, Matches, MaxLength, MinLength
} from 'class-validator'

import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

import { RefreshToken } from './RefreshTokenModel'
import { Avatar } from './AvatarModel'

// let tempPassword: string = ''

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  @IsUUID('4')
  id: string

  @OneToOne(() => RefreshToken, refreshToken => refreshToken.user, { onDelete: 'CASCADE' })
  refreshToken: RefreshToken

  @OneToOne(() => Avatar, avatar => avatar.user, { onDelete: 'CASCADE' })
  avatar: Avatar

  @Column({ name: 'first_name' })
  @MinLength(3, { message: 'Name must be at least 3 caracters' })
  @IsString()
  @IsNotEmpty()
  firstName: string

  @Column({ name: 'last_name' })
  @MinLength(3, { message: 'Name must be at least 3 caracters' })
  @IsString()
  @IsNotEmpty()
  lastName: string

  @Column()
  @MinLength(8)
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  gender: string

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid e-mail! Please enter a valid email address.' })
  email: string

  @Column()
  @IsNotEmpty()
  @MinLength(11)
  @IsMobilePhone('pt-BR')
  phone: string

  @Column('date', { name: 'date_birth' })
  @IsNotEmpty()
  @IsString()
  dateBirth: string

  @Column({ name: 'password_hash', select: false })
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Invalid password format' })
  password: string

  @Column('timestamptz', { name: 'email_verified' })
  emailVerified: Date

  @Column({ default: false })
  @IsNotEmpty()
  admin: boolean

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  // @AfterUpdate()
  // private loadTempPassword (): void {
  //   tempPassword = this.password
  // }

  @BeforeInsert()
  async setPassword (password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

  // @BeforeUpdate()
  // async updatePassword (password: string) {
  //   if (tempPassword !== this.password) {
  //     const salt = await bcrypt.genSalt()
  //     console.log(salt)
  //     this.password = await bcrypt.hash(password || this.password, salt)
  //   }
  // }

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
