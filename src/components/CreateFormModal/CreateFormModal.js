import React, { useState } from 'react'
import Modal from 'react-modal'
import classes from './CreateFormModal.module.css'
import { random } from 'faker'
import { Input } from '../Input/Input'
import { useDispatch, useSelector } from 'react-redux'

export const CreateFormModal = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const emptyObject = () => ({
    id: random.uuid(),
    firstName: '',
    lastName: '',
    phone: 0,
    email: ''
  })

  const [formState, setFormState] = useState(emptyObject())
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const inputChangeHandler = (formStateKey, event) => {
    setFormState({
      ...formState,
      [formStateKey]: event.target.value
    })
  }

  const validate = () => {
    let isFormValid = true
    const errors = {}
    if (!formState.firstName || formState.firstName.length <= 1) {
      isFormValid = false
      errors.firstName = 'First name must be longer than 1 symbol'
    }
    if (!formState.lastName || formState.lastName.length <= 1) {
      isFormValid = false
      errors.lastName = 'Last name must be longer than 1 symbol'
    }
    if (!formState.phone || formState.phone.toString().length < 8) {
      isFormValid = false
      errors.phone = 'Phone number must be longer than 8 digits'
    }
    if (!formState.email.includes('@')) {
      isFormValid = false
      errors.email = 'Invalid email'
    }
    setErrors(errors)
    return isFormValid
  }

  const formSubmitHandler = async event => {
    event.preventDefault()
    if (validate()) {
      const newCustomer = {
        id: random.uuid(),
        ...formState
      }
      const order = {
        id: random.uuid(),
        products: cart.map(cartItem => cartItem.id),
        sum: cart.reduce(
          (lastReturnOfReduce, currentArrayItem) =>
            lastReturnOfReduce +
            currentArrayItem.price * currentArrayItem.cartQuantity,
          0
        ),
        customerId: newCustomer.id,
        orderDate: new Date().getTime()
      }
      //todo place into try and catch err
      try {
        const orderResponse = await fetch('http://localhost:4000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            cors: true
          },
          body: JSON.stringify(order)
        })
        const orderData = await orderResponse.json()
        dispatch({ type: 'ADD_ORDER', newOrder: orderData })
      } catch (err) {
        console.log('order response failed')
      }
      try {
        const customerResponse = await fetch(
          'http://localhost:4000/customers',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              cors: true
            },
            body: JSON.stringify(newCustomer)
          }
        )
        const customerData = await customerResponse.json()
        dispatch({ type: 'ADD_CUSTOMER', newCustomer: customerData })
      } catch (err) {
        console.log('customers response failed')
      }
      //todo place into try and catch err
    }

    dispatch({ type: 'REPLACE_CART', newCart: [] })
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      ariaHideApp={false}
    >
      <div>
        <form onSubmit={formSubmitHandler}>
          <Input
            inputKey='firstName'
            changeHandler={inputChangeHandler}
            errors={errors}
            label='First Name'
            value={formState.firstName}
          />
          <Input
            inputKey='lastName'
            changeHandler={inputChangeHandler}
            errors={errors}
            label='Last Name'
            value={formState.lastName}
          />
          <Input
            inputKey='phone'
            changeHandler={inputChangeHandler}
            errors={errors}
            label='Phone Number'
            value={formState.phone}
          />
          <Input
            inputKey='email'
            changeHandler={inputChangeHandler}
            errors={errors}
            label='E-mail'
            value={formState.email}
          />
          <div className={classes.buttonList}>
            <button onClick={toggleModal}>Cancel</button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
