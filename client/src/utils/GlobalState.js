import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

// create our own functionality to manage state at a global level and make it
// available to all other components through a special <Provider> component
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
  });
  // use this to confirm it works!
  console.log(state);
  // without {...props} in returning <Provider> component, nothing on the page would be rendered
  return <Provider value={[state, dispatch]} {...props} />;
};

// When this function is executed from within a component, we will receive the
// [state, dispatch] data our StoreProvider provider manages for us.
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };