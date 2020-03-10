import React from 'react'
import c from './Product.module.css'
export const Product = ({ product }) => {
  const { image, name, description, price, quantity } = product
  // const shortDescription = description.substring(0, 100) + '...'
  const shortDescription =
    (description || '')
      .split(' ')
      .splice(0, 20)
      .join(' ') + '...'
  return (
    <div className={c.product}>
      <div className={c.image}>
        <img src={image} alt={name} />
      </div>
      <div className={c.productName}>{name}</div>
      <div className={c.shortDescription}>{shortDescription}</div>
      <div className={c.bold}>Price: {price}€</div>
      <div className={c.bold}>{quantity}</div>
      <div className={c.buttonList}>
        <button>Add to cart</button>
        <button>Preview</button>
      </div>
    </div>
  )
}
