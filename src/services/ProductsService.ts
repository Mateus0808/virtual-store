import { ProductsRepository } from '../repositories/ProductsRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { Products } from '@models/Products'
import { UserRepository } from '../repositories/UserRepository'
import { validate } from 'class-validator'

interface InterfaceProductsService {
  userId?: string,
  productId?: string,
  productName?: string,
  price?: number,
  description?: string,
  imageUrl?: string,
  category?: string,
  quantityStock?: number,
  manufacturer?: string
}

class ProductsService {
  private productsRepository: Repository<Products>

  constructor () {
    this.productsRepository = getCustomRepository(ProductsRepository)
  }

  async create ({ userId, ...data }: InterfaceProductsService) {
    if (!userId) {
      throw new Error('UserId is undefined!')
    }
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne(userId)
    if (!user) {
      throw new Error('User not found!')
    }
    const newProduct = this.productsRepository.create({ userId: user.id, ...data })
    const errors = await validate(newProduct)

    if (errors.length !== 0) {
      throw new Error(`${errors}`)
    }
    await this.productsRepository.save(newProduct)
    return newProduct
  }

  async findProducts () {
    const products = this.productsRepository.find()

    return products
  }

  async findProductsOneUser ({ userId }: InterfaceProductsService) {
    if (!userId) {
      throw new Error('User id is undefined!')
    }
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ id: userId }, { relations: ['products'] })
    if (!user) {
      throw new Error('User not found!')
    }
    const { products } = user
    return products
  }

  async update ({ productId, ...data }: InterfaceProductsService) {
    const product = await this.productsRepository.findOne(productId)

    if (!product) {
      throw new Error('Product not found!')
    }
    const updateProduct = this.productsRepository.merge(product, { ...data })

    const errors = await validate(updateProduct)
    if (errors.length !== 0) {
      throw new Error(`${errors}`)
    }

    await this.productsRepository.save(updateProduct)
    return updateProduct
  }

  async delete ({ productId }: InterfaceProductsService) {
    const productExists = await this.productsRepository.findOne(productId)
    if (!productExists) {
      throw new Error('Product not found!')
    }
    await this.productsRepository.delete(productId)
  }
}

export { ProductsService }
