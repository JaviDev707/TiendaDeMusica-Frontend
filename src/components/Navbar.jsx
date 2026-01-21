import "../css/NavFootBar.css"

const Navbar = () => {
  return (
    <>
    <nav className="navbar">   
        <h1 className="logo">Mi Tienda de Música</h1>
        <ul className="nav-links">
            <a href="/">Inicio</a>
            <a href="/catalog">Catálogo</a>
            <a href="/cart">Carrito</a>
            <a href="/profile">Perfil</a>
        </ul>
    </nav>
    <hr />
    </>
    );
};

export default Navbar;