import "../css/NavFootBar.css";
import { FaCartShopping } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <h1 className="logo">SeamLess Musical</h1>
        <ul className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/catalog">Catálogo</Link>
          {isAuthenticated && (
            <>
              <Link to="/cart">
                <FaCartShopping /> {totalItems > 0 ? ` (${totalItems})` : ""}
              </Link>
              <Link to="/profile">Perfil</Link>
            </>
          )}
          {isAuthenticated ? (
            <button onClick={logout} className="logout-button">
              <GrLogout /> 
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
