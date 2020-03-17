import React from 'react'
import c from './Nav.module.css'
import { Flex } from '../shared/Flex/Flex'
import { Link } from 'react-router-dom'

export const Nav = ({ cart }) => {
  const itemsInCart = cart.reduce(
    (current, currentItem) => current + currentItem.cartQuantity,
    0
  )
  return (
    <Flex justify='space-between' aling='center' className={c.navContainer}>
      <Link className={c.bigLink} to='/'>
        SuperParduotuvea
      </Link>
      <nav>
        <Flex className={c.linkWrapper}>
          <div>
            <Link className={c.link} to='/'>
              Products
            </Link>
          </div>
          <div>
            <Link className={c.link} to='/orders'>
              Orders
            </Link>
          </div>
          <div>
            <div className={c.cartBubble}>{itemsInCart}</div>
            <Link className={c.link} to='/cart'>
              Cart
            </Link>
          </div>
        </Flex>
      </nav>
    </Flex>
  )
}
