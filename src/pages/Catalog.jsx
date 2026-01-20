import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../css/App.css";
import Sidebar from "../components/SidebarFilter";
import { ClipLoader } from "react-spinners";

const Catalog = () => {
  // Función para obtener los datos
  const fetchProductos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/productos/todos",
      );
      setProductos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      setLoading(false);
    }
  };
  // Ejecuto la función al cargar la página
  useEffect(() => {
    fetchProductos();
  }, []);

  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);
  // Estado para manejar errores o carga
  const [loading, setLoading] = useState(true);
  // Estado para filtros
  const [busqueda, setBusqueda] = useState("");
  const [categoriasActivas, setCategoriasActivas] = useState({
    DISCO: true,
    INSTRUMENTO: true,
    VARIOS: true,
  });
  const [soloStock, setSoloStock] = useState(false);
  // Estado del slider de precio
  const [rangoPrecio, setRangoPrecio] = useState([0, 2000]);
  const [precioMaximo, setPrecioMaximo] = useState(2000);
  // Logica de filtrado
  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria = categoriasActivas[p.tipoProducto];
    const coincideStock = soloStock ? p.stock > 0 : true;
    const coincidePrecio =
      p.precio >= rangoPrecio[0] && p.precio <= rangoPrecio[1];
    return (
      coincideNombre && coincideCategoria && coincideStock && coincidePrecio
    );
  });
  // Actualizo el rango del slider cuando se cargan los productos
  useEffect(() => {
    if (productos.length > 0) {
      const max = Math.max(...productos.map((p) => p.precio));
      setPrecioMaximo(max);
      setRangoPrecio([0, max]);
    }
  }, [productos]);

  if (loading) return ( 
    <ClipLoader size={100} color={"#123"} loading={loading} />
  );

  // Ordeno los productos filtrados por categoría
  const discos = productosFiltrados.filter((p) => p.tipoProducto === "DISCO");
  const instrumentos = productosFiltrados.filter((p) => p.tipoProducto === "INSTRUMENTO");
  const varios = productosFiltrados.filter((p) => p.tipoProducto === "VARIOS");
  
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Sidebar */}
      <Sidebar 
        busqueda={busqueda} setBusqueda={setBusqueda}
        categoriasActivas={categoriasActivas} setCategoriasActivas={setCategoriasActivas}
        soloStock={soloStock} setSoloStock={setSoloStock}
        rangoPrecio={rangoPrecio} setRangoPrecio={setRangoPrecio}
        precioMaximo={precioMaximo}
      />

      <main style={{ flex: 1 }}>
        {/* SECCIÓN DISCOS */}
        {discos.length > 0 && (
          <section>
            <h2>Discos Vinilo / CD</h2>
            <div className="product-grid">
              {discos.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <hr />
          </section>
        )}

        {/* SECCIÓN INSTRUMENTOS */}
        {instrumentos.length > 0 && (
          <section>
            <h2>Instrumentos</h2>
            <div className="product-grid">
              {instrumentos.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <hr />
          </section>
        )}

        {/* SECCIÓN VARIOS */}
        {varios.length > 0 && (
          <section>
            <h2>Accesorios y Otros</h2>
            <div className="product-grid">
              {varios.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Catalog;
