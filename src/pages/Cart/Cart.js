import React, { useState } from 'react'
import { Flex } from '../../components/shared/Flex/Flex'
import Product from '../../components/Product'
import classes from './Cart.module.css'
import { Button } from '../../components/shared/Button/Button'
import { useSelector } from 'react-redux'
import { CreateFormModal } from '../../components/CreateFormModal/CreateFormModal'

// 1. TODO: Rodyti checkout button'a tik tada kai yra karte produktu++
// 2. TODO: Checkout forma turi atsirasti tik poto, kai paspaudziame checkout.
// 3. TODO: Sukurti forma naudojant Input.js komponenta.
//          Formoje turi buti sie fieldai: vardas, adresas, tel nr., el. p.
//          Reikia pavaliduoti!!! Kas norit galit uznaudoti https://www.npmjs.com/package/yup
// 4. TODO: Uzsakymas turi buti siunciamas i serveri ir saugomas.
//          I uzsakyma ieina sie fieldai: suma, produktu ID's, data, ir userio ID.
// 5. TODO: Useris taip pat keliauja i serveri. Turi buti saugomi
//          visi nurodyti duomenys + uuid
// 6. TODO: Duomenys taip pat turi buti ir redux'e.
// 7. TODO: Atvaizduoti orderius "Orders" page lenteles pavidalu.
//          Turi matytis:  useris, suma, produktai, data.
// !----------------------------------------------------------------!
// 8. TODO: <-- BONUS TASK --> Pasidaryti api wrapperi
export const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cart = useSelector(state => state.cart)
  const isSomeItemsInCart = !!cart.length
  const toggleModalHandler = () => setIsModalOpen(!isModalOpen)
  return (
    <>
      <Flex
        wrap='wrap'
        justify={isSomeItemsInCart ? 'space-between' : 'center'}
      >
        {isSomeItemsInCart ? (
          cart.map(product => (
            <Product isCartPage key={product.id} product={product} />
          ))
        ) : (
          <h1 className={classes.heading}>Sorry, no items in cart :(</h1>
        )}
      </Flex>
      <Flex justify='center'>
        {isSomeItemsInCart && (
          <Button onClick={toggleModalHandler}>Checkout</Button>
        )}
      </Flex>
      <CreateFormModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModalHandler}
      />
    </>
  )
}
