// actions.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADJUST_QUANTITY,
  ADD_TO_FAV,
  REMOVE_FROM_FAV,
} from './actionTypes';

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = itemId => ({
  type: REMOVE_FROM_CART,
  payload: {id: itemId},
});

export const adjustQuantity = (itemId, quantity) => ({
  type: ADJUST_QUANTITY,
  payload: {id: itemId, quantity},
});

export const addToFav = item => ({
  type: ADD_TO_FAV,
  payload: item,
});

export const removeFromFav = itemId => ({
  type: REMOVE_FROM_FAV,
  payload: {id: itemId},
});
