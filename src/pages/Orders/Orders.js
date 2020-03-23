import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders)
  const products = useSelector(state => state.products)
  const customers = useSelector(state => state.customers)
  useEffect(() => {
    const fetchData = async () => {
      const ordersResponse = await fetch('http://localhost:4000/orders')
      const newOrders = await ordersResponse.json()
      const customersResponse = await fetch('http://localhost:4000/customers')
      const newCustomers = await customersResponse.json()
      dispatch({ type: 'REPLACE_ORDERS', newOrders })
      dispatch({ type: 'REPLACE_CUSTOMERS', newCustomers })
    }
    fetchData()
  }, [])

  return (
    <table border='1'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Products</th>
          <th>Sum </th>
          <th>Customer name</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => {
          const date = new Date(order.orderDate).toUTCString()
          const orderProducts = products.filter(product =>
            order.products.some(orderProduct => orderProduct === product.id)
          )
          const customerName =
            customers.find(customer => customer.id === order.customerId) || {}

          return (
            <tr key={order.id}>
              <td>{date}</td>
              <td>{orderProducts.map(product => product.name).join(';')}</td>
              <td>{order.sum}</td>
              <td>{customerName.firstName}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
