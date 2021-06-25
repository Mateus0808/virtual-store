/* eslint-disable camelcase */
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  phone: string

  @Column()
  gender: string

  @Column({ name: 'date_birth' })
  dateBirth: Date

  @Column({ name: 'password_hash' })
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