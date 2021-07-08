import { ProductsRepository } from '../repositories/ProductsRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { Products } from '@models/Products'
import { UserRepository } from '../repositories/UserRepository'

interface InterfaceProductsService {
  userId: string,
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

    await this.productsRepository.save(newProduct)
    return newProduct
  }

  async findProducts () {
    const products = this.productsRepository.find()

    return products
  }

  async findProductsOneUser ({ userId }: InterfaceProductsService) {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ id: userId }, { relations: ['products'] })

    return user
  }

  async update ({ productId, ...data }: InterfaceProductsService) {
    console.log(productId)
    const product = await this.productsRepository.findOne(productId)
    const updateProduct = this.productsRepository.merge(product, { ...data })
    await this.productsRepository.save(updateProduct)
    console.log(updateProduct)
    return updateProduct
  }
}

export { ProductsService }
