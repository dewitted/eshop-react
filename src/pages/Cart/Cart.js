import React, { useState } from 'react'
import { Flex } from '../../components/shared/Flex/Flex'
import Product from '../../components/Product'
import c from './Cart.module.css'

export const Cart = ({ cart, setCart }) => {
  const isSomeItemsInCart = !!cart.length
  return (
    <Flex wrap='wrap' justify={isSomeItemsInCart ? 'space-between' : 'center'}>
      {isSomeItemsInCart ? (
        cart.map(product => (
          <Product
            isInCart
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
          />
        ))
      ) : (
        <h1 className={c.heading}>Sorry, no items in cart :(</h1>
      )}
    </Flex>
  )
}
