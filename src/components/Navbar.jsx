import "../css/NavFootBar.css";
import { FaCartShopping } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <h1 className="logo">Mi Tienda de Música</h1>
        <ul className="nav-links">
          <a href="/">Inicio</a>
          <a href="/catalog">Catálogo</a>
          <a href="/cart">
            <FaCartShopping /> {totalItems > 0 ? ` (${totalItems})` : ""}
          </a>
          <a href="/profile">Perfil</a>
          {isAuthenticated ? (
            <button onClick={logout} className="logout-button">
              <GrLogout /> 
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
