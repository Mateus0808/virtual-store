/* eslint-disable camelcase */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { IsDate, IsDefined, IsEmail, IsPhoneNumber, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
import { v4 as uuid } from 'uuid'
import { Products } from './Products'

@Entity('users')
export class User {
  @PrimaryColumn()
  @IsUUID('4')
  id: string

  @OneToMany(() => Products, product => product.user, { nullable: true, onDelete: 'CASCADE' })
  products: Products[]

  @Column({ name: 'first_name' })
  @MaxLength(20)
  @MinLength(3, { message: 'First name must be at least 3 caracters' })
  @IsString()
  @IsDefined({ message: 'Indefined first name ' })
  firstName: string

  @Column({ name: 'last_name' })
  @MaxLength(40)
  @MinLength(3)
  @IsString()
  lastName: string

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid e-mail! Please enter a valid email address.' })
  @IsString()
  @MinLength(7)
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
