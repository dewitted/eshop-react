export default (state = [], action) => {
  switch (action.type) {
    case 'REPLACE_CUSTOMERS':
      return action.newCustomers
    case 'ADD_CUSTOMER':
      return [...state, action.newCustomer]
    default:
      return state
  }
}
