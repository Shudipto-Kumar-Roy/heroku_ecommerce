import React from "react";
import Banner from "./Banner";
import Products from "./Products";
import Metadata from "../../../Metadata";
const Home = () => {
  return (
    <>
      <Metadata title="Welcome to Ecommerce" />
      <Banner />
      <Products />
    </>
  );
};

export default Home;
