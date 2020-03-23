import cartReducer from './reducer-cart'
import productsReducer from './reducer-products'
import ordersReducer from './reducer-orders'
import customersReducer from './reducer-customers'
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  orders: ordersReducer,
  customers: customersReducer
})

const store = createStore(
  rootReducer,
  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
)

export default store
