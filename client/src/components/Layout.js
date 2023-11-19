import React from "react";
import Footer from "./Footer";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <div>{children}</div>
      
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
