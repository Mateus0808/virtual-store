import { Products } from '../models/Products'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Products)
class ProductsRepository extends Repository<Products> {}

export { ProductsRepository }
