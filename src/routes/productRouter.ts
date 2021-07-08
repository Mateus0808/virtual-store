import { Router } from 'express'

import { ProductsController } from '../controllers/ProductsControllers'

const productsController = new ProductsController()

const routes = Router()

routes.post('/product', productsController.create)
routes.get('/products', productsController.allProducts)
routes.get('/products/:userId', productsController.allProductsOneUser)
routes.put('/products/:productId', productsController.update)

export default routes
