import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

import Basic from "./layout/basic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Basic />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
