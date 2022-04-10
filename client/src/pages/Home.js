import React from "react";
// import Nav from "../components/Nav";
// import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
