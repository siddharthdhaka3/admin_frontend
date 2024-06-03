import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./themes";
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import { Provider } from "react-redux";
import { store } from "./store/store";
import  Home  from "./pages/home";
import Admin from "./pages/adminPage";
import User from "./pages/userPage";
import  Protected  from "./layout/protected"
// interface ProtectedProps {
//   isAuthenticated: boolean;
//   children: JSX.Element;
// }


// const Protected: React.FC<ProtectedProps> = ({ isAuthenticated, children }) => {
//   const authStatus = useAppSelector((state) => state.auth.isAuthenticated );
//   const navigate = useNavigate();
//   const isAdmin = useAppSelector((state)=> state.auth.isAdmin);
//   const [loader, setLoader] = useState<boolean>(true);

//   useEffect(() => {
//     if (authStatus === true) {
//       if(isAdmin === true){
//         navigate("/admin");
//       }
//       else{
//         navigate("/user");
//       }
//     } else if (authStatus === false) {
//       navigate("/");
//     }
//     setLoader(false);
//   }, [authStatus, isAuthenticated, isAdmin, navigate]);

//   return loader ? null : <>{children}</>;

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
      <Protected >
        <Admin />
      </Protected>
    )
  },
  {
    path: "/user",
    element: (
      <Protected>
        <User />
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

