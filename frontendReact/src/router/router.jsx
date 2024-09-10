import { createBrowserRouter } from "react-router-dom";
import Homepage from "../views/Homepage";
import User from "../views/User";
import Register from "../views/Register";
import Login from "../views/Login";
import AboutPage from "../views/About";
import UserDetail from "../views/UserDetail";
import Products from "../views/Product";
import Bills from "../views/Bill";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/user/:userId",
    element: <UserDetail />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/bills",
    element: <Bills />
  }
])


export default router;