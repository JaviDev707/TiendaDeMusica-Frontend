import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Footbar from "./components/Footbar.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import "./css/App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footbar />
      </Router>
    </>
  );
}

export default App;
