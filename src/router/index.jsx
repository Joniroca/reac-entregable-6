import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Purchases from "../pages/Purchases/Purchases";
import ProtectedRoute from "../common/ProtectedRoute/ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import homeLoader from "./loaders/homeLoader";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: "/purchases",
        element: (
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:productId",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <p>page 404 NOT FOUNDed</p>,
  },
]);

export default router;
