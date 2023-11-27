import {ADD_TO_CART, REMOVE_FROM_CART, ADJUST_QUANTITY} from './actionTypes';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, {...action.payload, quantity: 1}], // Set initial quantity here
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case ADJUST_QUANTITY:
      console.log('Adjusting Quantity', action.payload);
      return {
        ...state,
        cart: state.cart.reduce((newCart, item) => {
          if (item.id === action.payload.id) {
            if (action.payload.quantity > 0) {
              newCart.push({...item, quantity: action.payload.quantity});
            }
          } else {
            newCart.push(item);
          }
          return newCart;
        }, []),
      };
    default:
      return state;
  }
};

export default cartReducer;
