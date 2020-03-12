import React, { useState } from 'react'
import Modal from 'react-modal'
import c from './CreateProductModal.module.css'
import { random } from 'faker'
//TODO: no image present
//TODO: quantity is string
//TODO: user can push empty objects
//TODO: close the modal
//TODO: update products list
//TODO: show success message and clear inputs on create

export const CreateProductModal = ({ isModalOpen, toggleModal }) => {
  const [formState, setFormState] = useState({
    id: random.uuid(),
    name: '',
    description: '',
    price: 0,
    quantity: '',
    image: `https://picsum.photos/id/${random.number(200) || 1}/600`
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const inputChangeHandler = (formStateKey, event) =>
    setFormState({
      ...formState,
      [formStateKey]: event.target.value
    })

  const quantityChangeHandler = event => {
    const numberQuantity = Number(event.target.value)
    const quantity = numberQuantity <= 0 ? '' : numberQuantity
    setFormState({ ...formState, quantity })
  }

  const generateDescriptionHandler = e => {
    e.preventDefault()
    setFormState({
      ...formState,
      description: random.words(250)
    })
  }

  const validate = () => {
    let isFormValid = true
    const errors = {}
    if (!formState.name || formState.name.length < 5) {
      isFormValid = false
      errors.name = 'Name must be longer than 5 symbols!'
    }
    if (!formState.quantity && formState.quantity <= 0) {
      isFormValid = false
      errors.quantity = 'Quantity is required!'
    }
    if (!formState.price) {
      isFormValid = false
      errors.price = 'Price is required!'
    }
    setErrors(errors)
    return isFormValid
  }

  const formSubmitHandler = async e => {
    e.preventDefault()
    if (validate()) {
      const formStateCopy = {
        ...formState,
        price: Number(formState.price).toFixed(2)
      }
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formStateCopy)
      })
      response.status === 201 && setSuccess(true)
    }
  }
  const resetForm = () => {
    setFormState({
      ...formState,
      name: '',
      description: '',
      price: 0,
      quantity: ''
    })
    setSuccess(false)
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      ariaHideApp={false}
    >
      <div>
        <h2 className={c.heading}>Create product</h2>
        {success ? (
          <>
            <h2>Product Created!</h2>
            <div className={c.buttonList}>
              <button onClick={toggleModal}>Close</button>
              <button onClick={resetForm}>Create new product</button>
            </div>
          </>
        ) : (
          <form onSubmit={formSubmitHandler}>
            <div className={c.formControl}>
              <label htmlFor='name'>Product name</label>
              <input
                type='text'
                id='name'
                value={formState.name}
                onInput={event => inputChangeHandler('name', event)}
              />
              {errors.name && <div className={c.error}>{errors.name}</div>}
            </div>
            <div className={c.formControl}>
              <label htmlFor='description'>Description</label>
              <textarea
                id='description'
                rows='4'
                value={formState.description}
                onInput={event => inputChangeHandler('description', event)}
              ></textarea>
              {/* {errors.description && (
              <div className={c.error}>{errors.description}</div>
            )} */}
              <button onClick={generateDescriptionHandler}>
                Generate Description
              </button>
            </div>
            <div className={c.formControl}>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                id='price'
                value={formState.price}
                onInput={event => inputChangeHandler('price', event)}
              />
              {errors.price && <div className={c.error}>{errors.price}</div>}
            </div>
            <div className={c.formControl}>
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='number'
                id='quantity'
                value={formState.quantity}
                onInput={quantityChangeHandler}
              />
              {errors.quantity && (
                <div className={c.error}>{errors.quantity}</div>
              )}
            </div>
            <div className={c.buttonList}>
              <button type='button' onClick={toggleModal}>
                Cancel
              </button>
              <button>Create</button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  )
}
