import React from "react";
import Cards from "../components/card/Card";
import Header from "../components/header/Header";
import Navbars from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbars />
      <Header />
      <Cards />
    </>
  );
};

export default Home;
