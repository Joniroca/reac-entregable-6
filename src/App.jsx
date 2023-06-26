import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./common/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar
        updateCartVisible={() => console.log("Función en construcción")}
      />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
