import { IsNotEmpty, IsUUID } from 'class-validator'
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'
import { User } from './UserModel'

@Entity('Refresh_token')
export class RefreshToken {
  @PrimaryColumn('uuid')
  @IsUUID('4')
  id: string

  @Column()
  userId: string

  @OneToOne(() => User, user => user.refreshToken)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column('int')
  @IsNotEmpty()
  expiresIn: number

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
