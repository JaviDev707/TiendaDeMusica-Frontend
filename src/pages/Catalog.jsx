import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../css/App.css";

const Catalog = () => {

  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);
  // Estado para manejar errores o carga 
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos
  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/productos/todos");
      setProductos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al traer productos:", error);
      setLoading(false);
    }
  };

  // Ejecutar la función al cargar la página
  useEffect(() => {fetchProductos();}, []); 

  if (loading) return <h2>Cargando catálogo...</h2>;

  // Filtrado de los datos que vienen del Backend
  const discos = productos.filter((p) => p.tipoProducto === "DISCO");
  const instrumentos = productos.filter((p) => p.tipoProducto === "INSTRUMENTO");
  const varios = productos.filter((p) => p.tipoProducto === "VARIOS");

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Sidebar Simple */}
      <aside style={{ width: "200px" }}>
        <h3>Filtros</h3>
        <input type="checkbox" checked readOnly /> Ver todos
      </aside>

      <main style={{ flex: 1 }}>
        {/* SECCIÓN DISCOS */}
        <section>
          <h2>Discos Vinilo / CD</h2>
          <div className="product-grid">
            {discos.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        <hr />

        {/* SECCIÓN INSTRUMENTOS */}
        <section>
          <h2>Instrumentos</h2>
          <div className="product-grid">
            {instrumentos.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        <hr />

        {/* SECCIÓN VARIOS */}
        <section>
          <h2>Accesorios y Otros</h2>
          <div className="product-grid">
            {varios.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Catalog;
