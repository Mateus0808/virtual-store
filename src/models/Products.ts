import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'
import { User } from './User'

@Entity('products')
export class Products {
  @PrimaryColumn()
  id: string

  @Column()
  userId: string

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column({ name: 'product_name' })
  productName: string

  @Column()
  price: number

  @Column()
  description: string

  @Column({ name: 'image_url' })
  imageUrl: string

  @Column()
  category: string

  @Column({ name: 'quantity_stock' })
  quantityStock: number

  @Column()
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
