// cartReducer.js
import {ADD_TO_CART, REMOVE_FROM_CART, ADJUST_QUANTITY} from './actionTypes';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Logic to add item to cart
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      // Logic to remove item from cart
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case ADJUST_QUANTITY:
      // Logic to adjust quantity
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
