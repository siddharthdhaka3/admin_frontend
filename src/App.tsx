import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/adminPage";
import User from "./pages/userPage";
import Basic from "./layout/basic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Basic />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
