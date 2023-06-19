import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./common/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
