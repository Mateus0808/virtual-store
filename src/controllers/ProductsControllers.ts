import { Response, Request } from 'express'
import { ProductsService } from '../services/ProductsService'

class ProductsController {
  async create (req: Request, res: Response): Promise<Response> {
    const { userId, productName, price, description, imageUrl, category, quantityStock, manufacturer } = req.body
    const productsService = new ProductsService()
    try {
      const product = await productsService.create({ userId, productName, price, description, imageUrl, category, quantityStock, manufacturer })
      return res.status(201).json(product)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }

  async allProducts (req: Request, res: Response): Promise<Response> {
    const productsService = new ProductsService()
    const products = await productsService.findProducts()
    return res.status(200).json(products)
  }

  async allProductsOneUser (req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId
    const productsService = new ProductsService()
    try {
      const userProducts = await productsService.findProductsOneUser({ userId })
      return res.status(200).json(userProducts)
    } catch (err) {
      return res.status(400).json({ message: 'Error when registering product' })
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    const productId = req.params.productId
    const { ...data } = req.body
    const productsService = new ProductsService()

    try {
      const product = await productsService.update({ productId, ...data })
      return res.status(200).json(product)
    } catch (err) {
      return res.status(400).json({ message: 'Error updating product' })
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const productId = req.params.productId
    const productsService = new ProductsService()

    try {
      await productsService.delete({ productId })
      return res.status(200).json({ message: 'Deleted product' })
    } catch (err) {
      return res.status(400).json({ message: 'Error deleting product' })
    }
  }
}

export { ProductsController }
