import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./common/NavBar/NavBar";
import Index from "../src/Index";
import Cart from "./common/Cart/Cart";
import { useState } from "react";

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleVisibilityCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  return (
    <>
      <Index />
      <NavBar updateCartVisible={toggleVisibilityCart} />

      <main>
        <Outlet />
      </main>

      <Cart isVisible={isCartVisible} />
    </>
  );
}

export default App;
