import { createContext, useContext, useReducer, useEffect } from "react";
import { getTotal } from "./utility";

import useCaseReducers from "use-case-reducers";

const url = "https://www.course-api.com/react-useReducer-cart-project";

// const items = cartItems.map((item) => [item.id, item]);

// const cartMap = new Map(items);

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const initialState = {
  loading: false,
  cart: [],
};

const caseReducers = {
  clearCart: (state) => {
    state.cart = [];
  },

  removeItem: (state, id) => {
    let newItems = state.cart.filter((item) => item.id !== id);
    state.cart = newItems;
  },

  increase: (state, id) => {
    const newItems = state.cart.map((item) => {
      if (item.id === id) return { ...item, amount: item.amount + 1 };
      return item;
    });
    state.cart = newItems;
  },

  decrease: (state, id) => {
    const newItems = state.cart.map((item) => {
      if (item.id === id) return { ...item, amount: item.amount - 1 };
      return item;
    });

    const filteredItems = newItems.filter((item) => item.amount > 0);

    state.cart = filteredItems;
  },

  loading: (state) => {
    state.loading = true;
  },

  display: (state, arr) => {
    (state.loading = false), (state.cart = arr);
  },
};

const AppContext = ({ children }) => {
  //const [state, dispatch] = useReducer(reducer, initialState);
  const [
    state,
    dispatch,
    { clearCart, removeItem, increase, decrease, loading, display },
  ] = useCaseReducers(caseReducers, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loading());
      const res = await fetch(url);
      const cartArr = await res.json(); //the data array
      dispatch(display(cartArr));
    };
    fetchData();
  }, []);

  const { totalAmount, totalPrice } = getTotal(state.cart);

  return (
    <GlobalContext.Provider
      value={{
        dispatch,
        clearCart,
        removeItem,
        increase,
        decrease,
        ...state,
        totalAmount,
        totalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
