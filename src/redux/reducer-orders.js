export default (state = [], action) => {
  switch (action.type) {
    case 'REPLACE_ORDERS':
      return action.newOrders
    case 'ADD_ORDER':
      return [...state, action.newOrder]
    default:
      return state
  }
}
