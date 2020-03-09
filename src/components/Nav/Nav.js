import React from 'react'
import c from './Nav.module.css'
import { Flex } from '../shared/Flex/Flex'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <Flex justify='space-between' aling='center' className={c.navContainer}>
      <Link className={c.bigLink} to='/'>
        SuperParduotuvea
      </Link>
      <nav>
        <Flex>
          <Link className={c.link} to='/'>
            Products
          </Link>
          <Link className={c.link} to='/cart'>
            Orders
          </Link>
          <Link className={c.link} to='/orders'>
            Cart
          </Link>
        </Flex>
      </nav>
    </Flex>
  )
}
