import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import {
  Clear_Cart,
  Remove_Item,
  Increase_Amount,
  Decrease_Amount,
  Display_Item,
  Loading,
} from "./action";
import { getTotal } from "./utility";

const url = "https://www.course-api.com/react-useReducer-cart-project";

// const items = cartItems.map((item) => [item.id, item]);

// const cartMap = new Map(items);

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const initialState = {
  loading: false,
  cart: new Map(),
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const { totalAmount, totalPrice } = getTotal(state.cart);

  const clearCart = () => dispatch({ type: Clear_Cart });

  const removeItem = (id) => dispatch({ type: Remove_Item, payload: id });

  const increase = (id) => dispatch({ type: Increase_Amount, payload: id });

  const decrease = (id) => dispatch({ type: Decrease_Amount, payload: id });

  const fetchData = async () => {
    dispatch({ type: Loading });
    const res = await fetch(url);
    const cartArr = await res.json(); //the data array
    dispatch({ type: Display_Item, payload: cartArr });
  };

  return (
    <GlobalContext.Provider
      value={{
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
