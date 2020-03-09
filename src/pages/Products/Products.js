import React, { Component } from 'react'
import Product from '../../components/Product'

export default class Products extends Component {
  state = {
    products: []
  }
  componentDidMount() {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/products')
      const products = await response.json()
      this.setState({ products })
    }
    fetchProducts()
  }

  render() {
    const { products } = this.state
    return (
      <div className='container'>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    )
  }
}
