/* eslint-disable camelcase */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { IsDate, IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { v4 as uuid } from 'uuid'
import { Products } from './Products'

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @OneToMany(() => Products, product => product.user, { nullable: true, onDelete: 'CASCADE' })
  products: Products[]

  @Column({ name: 'first_name' })
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  firstName: string

  @Column({ name: 'last_name' })
  @MaxLength(40)
  @MinLength(3)
  @IsString()
  lastName: string

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid e-mail! Please enter a valid email address.' })
  @IsString()
  email: string

  @Column()
  @IsPhoneNumber('BR')
  @IsString()
  phone: string

  @Column()
  @IsString()
  gender: string

  @Column({ name: 'date_birth' })
  @IsDate()
  dateBirth: Date

  @Column({ name: 'password_hash' })
  @IsString()
  password: string

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
