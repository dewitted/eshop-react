import React, { useState, useEffect } from 'react'
import Product from '../../components/Product'
import { Flex } from '../../components/shared/Flex/Flex'
import { CreateProductModal } from '../../components/CreateProductModal/CreateProductModal'
import { Button } from '../../components/shared/Button/Button'
import { useSelector } from 'react-redux'

const Products = () => {
  const products = useSelector(state => state.products)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModalHandler = () => setIsModalOpen(!isModalOpen)

  return (
    <>
      <Button onClick={toggleModalHandler}>Create product</Button>
      <Flex wrap='wrap' justify='space-between'>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </Flex>
      <CreateProductModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModalHandler}
      />
    </>
  )
}

export default Products
