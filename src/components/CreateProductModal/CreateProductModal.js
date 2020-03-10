import React, { useState } from 'react'
import Modal from 'react-modal'
import c from './CreateProductModal.module.css'
import { random } from 'faker'
//TODO: name instead of name
//TODO: no image present
//TODO: quantity is string
//TODO: user can push empty objects
export const CreateProductModal = ({ isModalOpen, toggleModal }) => {
  const [formState, setFormState] = useState({
    id: random.uuid(),
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: ''
  })

  const inputChangeHandler = (formStateKey, event) =>
    setFormState({
      ...formState,
      [formStateKey]: event.target.value
    })

  const generateDescriptionHandler = e => {
    e.preventDefault()
    setFormState({
      ...formState,
      description: random.words(250)
    })
  }

  const validate = () => {
    let isFormValid = true
    if (!formState.name || formState.name.length < 5) {
      isFormValid = false
    }
    return isFormValid
  }

  const formSubmitHandler = async e => {
    e.preventDefault()
    if (validate()) {
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })
      console.log(response)
    } else {
      alert('Form is invalid')
    }
  }
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      ariaHideApp={false}
    >
      <div>
        <h2 className={c.heading}>Create product</h2>
        <form onSubmit={formSubmitHandler}>
          <div className={c.formControl}>
            <label htmlFor='name'>Product name</label>
            <input
              type='text'
              id='name'
              value={formState.name}
              onInput={event => inputChangeHandler('name', event)}
            />
          </div>
          <div className={c.formControl}>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              rows='4'
              value={formState.description}
              onInput={event => inputChangeHandler('description', event)}
            ></textarea>
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
          </div>
          <div className={c.formControl}>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              id='quantity'
              value={formState.quantity}
              onInput={event => inputChangeHandler('quantity', event)}
            />
          </div>
          <div className={c.buttonList}>
            <button>Cancel</button>
            <button>Create</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
