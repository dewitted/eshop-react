import React from 'react'
import c from './Product.module.css'
import { Button } from '../Button/Button'
import { Flex } from '../shared/Flex/Flex'
export const Product = ({ product }) => {
  const { image, name, description, price, quantity } = product
  const shortDescription =
    (description || '')
      .split(' ')
      .splice(0, 20)
      .join(' ') + '...'
  const addToCartHandler = () => {}
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
        <Flex justify='center'>
          <Button onClick={addToCartHandler}>Add to cart</Button>
          <Button type='secondary'>Preview</Button>
        </Flex>
      </div>
    </div>
  )
}
