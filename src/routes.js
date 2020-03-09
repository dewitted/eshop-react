import Products from './pages/Products/Products'
import { Cart } from './pages/Cart/Cart'
import { Orders } from './pages/Orders/Orders'

export const routes = [
  { isExact: true, component: Products, path: '/', label: 'Products' },
  { isExact: true, component: Orders, path: '/orders', label: 'Orders' },
  { isExact: true, component: Cart, path: '/cart', label: 'Cart' }
]
