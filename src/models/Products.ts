import { IsNumber, IsString, IsUUID } from 'class-validator'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'
import { User } from './User'

@Entity('products')
export class Products {
  @PrimaryColumn()
  @IsUUID('4')
  id: string

  @Column()
  @IsUUID('4')
  userId: string

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column({ name: 'product_name' })
  @IsString()
  productName: string

  @Column()
  @IsNumber()
  price: number

  @Column()
  @IsString()
  description: string

  @Column({ name: 'image_url' })
  @IsString()
  imageUrl: string

  @Column()
  @IsString()
  category: string

  @Column({ name: 'quantity_stock' })
  @IsNumber()
  quantityStock: number

  @Column()
  @IsString()
  manufacturer: string

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
