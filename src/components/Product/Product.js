import React, { useEffect, useState } from 'react'
import c from './Product.module.css'
import { Button } from '../Button/Button'
import { Flex } from '../shared/Flex/Flex'
export const Product = ({ product, cart, setCart, isInCart }) => {
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(false)
  const { image, name, description, price, quantity, id } = product
  const shortDescription =
    (description || '')
      .split(' ')
      .splice(0, 20)
      .join(' ') + '...'
  const addToCartHandler = () => {
    const productIndex = cart.findIndex(cartItem => cartItem.id === id)
    if (productIndex >= 0) {
      // If statement when a product is already in the cart
      const cartCopy = [...cart]
      cartCopy[productIndex].cartQuantity += 1
      setCart(cartCopy)
    }
    if (productIndex === -1) {
      // If statement when a product IS NOT in the cart
      setCart([...cart, { ...product, cartQuantity: 1 }])
    }
  }
  const removeFromCartHandler = () => {
    const itemToRemove = cart.find(cartItem => cartItem.id === id)
    const itemToRemoveIndex = cart.findIndex(cartItem => cartItem.id === id)
    if (itemToRemove.cartQuantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== id))
    }
    if (itemToRemove.cartQuantity > 1) {
      const cartCopy = [...cart]
      cartCopy[itemToRemoveIndex].cartQuantity -= 1
      setCart(cartCopy)
    }
  }

  useEffect(() => {
    // Enable Cart Quantity on every render
    if (!isInCart) {
      const productInCart = cart.find(cartItem => cartItem.id === id)
      const { cartQuantity } = productInCart || {}
      // Define when a button should be disabled
      setIsAddToCartDisabled(cartQuantity >= quantity)
    }
  }, [cart, id, quantity])

  return (
    <div className={c.product}>
      <div className={c.image}>
        <img src={image} alt={name} />
      </div>
      <div className={c.productName}>{name}</div>
      {!isInCart && (
        <div className={c.shortDescription}>{shortDescription}</div>
      )}
      <div className={c.bold}>Price: {price}€</div>
      <div className={c.bold}>
        Quantity: {isInCart ? product.cartQuantity : quantity}
      </div>
      <div className={c.buttonList}>
        <Flex justify='center'>
          {isInCart ? (
            <Button type='danger' onClick={removeFromCartHandler}>
              Delete
            </Button> //remove handler
          ) : (
            <>
              <Button onClick={addToCartHandler} disabled={isAddToCartDisabled}>
                Add to cart
              </Button>
              <Button type='secondary'>Edit</Button>
            </>
          )}
        </Flex>
      </div>
    </div>
  )
}
