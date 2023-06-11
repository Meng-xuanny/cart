import React from "react";
import cartItems from "./data";

import {
  Clear_Cart,
  Remove_Item,
  Increase_Amount,
  Decrease_Amount,
  Display_Item,
  Loading,
} from "./action";

const reducer = (state, action) => {
  if (action.type === Clear_Cart) return { ...state, cart: new Map() };

  if (action.type === Remove_Item) {
    const newCart = new Map(state.cart); //essential to set up a new variable bc we don't want to mutate the original state
    newCart.delete(action.payload);
    return { ...state, cart: newCart }; //overwriting here not mutating
  }

  if (action.type === Increase_Amount) {
    const newCart = new Map(state.cart);
    const itemId = action.payload;
    const item = newCart.get(itemId);

    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === Decrease_Amount) {
    //when amount is 1 click then delete the item
    const newCart = new Map(state.cart);
    const itemId = action.payload;
    const item = newCart.get(itemId);

    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart }; //return so that next lines won't run
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === Loading) return { ...state, loading: true };

  if (action.type === Display_Item) {
    const fetchedCartArr = action.payload;
    const items = fetchedCartArr.map((item) => [item.id, item]);
    return { ...state, loading: false, cart: new Map(items) };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
