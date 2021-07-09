/* eslint-disable camelcase */
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUUID, Length, Matches, MaxLength, MinLength } from 'class-validator'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

import { Products } from './Products'

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  @IsUUID('4')
  id: string

  @OneToMany(() => Products, product => product.user, { nullable: true, onDelete: 'CASCADE' })
  products: Products[]

  @Column()
  @MaxLength(60)
  @MinLength(3, { message: 'Name must be at least 3 caracters' })
  @IsString()
  @IsNotEmpty()
  name: string

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid e-mail! Please enter a valid email address.' })
  @MinLength(7)
  email: string

  @Column()
  @IsPhoneNumber('BR')
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  phone: string

  @Column()
  @MinLength(8)
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  gender: string

  @Column({ name: 'date_birth' })
  @IsNotEmpty()
  @IsDate()
  dateBirth: Date

  @Column({ name: 'password_hash' })
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Invalid password format' })
  password: string

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date

  @BeforeInsert()
  async setPassword (password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
