import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import theme from "./themes";
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import { Provider } from "react-redux";
import { store } from "./store/store";
import  Home  from "./pages/home";
import Admin from "./pages/adminPage";
import User from "./pages/userPage";
import NewUser from "./pages/newUser";
import  Protected  from "./layout/protected"
import ForgotPassword from "./pages/forgotPassword";
import AddUserForm from "./components/AddUserForm";

// };

// Define the router configuration
const router = createBrowserRouter ([
  {
    path: "/",
    element: <Home />
  },

  {
    path: "/admin",
    element: (
      <Protected auth = {true}>
        <Admin />
      </Protected>
    )
  },
  {
    path: "/user",
    element: (
      <Protected auth = {false}>
        <User />
      </Protected>
    )
  },
  {
    path: "/newUser",
    element: (
        <NewUser />
    )
  },
  {
    path: "/forgot-password",
    element: (
        <ForgotPassword />
    )
  },
  {
    path: "/add-user",
    element: (
      <Protected auth = {true}>
        <AddUserForm />
      </Protected>
    )
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

