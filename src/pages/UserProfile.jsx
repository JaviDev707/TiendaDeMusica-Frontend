import "../css/UserProfile.css";
import { useState, useEffect } from "react";
import { FaUserLarge, FaBagShopping } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, pedidosRes] = await Promise.all([
          axios.get("http://localhost:8080/api/usuarios"),
          axios.get("http://localhost:8080/api/pedidos/historial")
        ]);
        setUserData(userRes.data);
        setPedidos(pedidosRes.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader size={100} color={"darkslateblue"} />
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      {/* SECCIÓN SUPERIOR: DATOS PERSONALES */}
      <section className="profile-header">
        <FaUserLarge className="icono-usuario" />
        <div className="perfil-info">
          <p className="datos-usuario"><strong>Nombre:</strong> {userData?.nombre + " " + userData?.apellido}</p>
          <p className="datos-usuario"><strong>Email:</strong> {userData?.email}</p>
          <p className="datos-usuario"><strong>Dirección:</strong> {userData?.Localidad + " - " + userData?.direccion || "No definida"}</p>
        </div>
      </section>

      <hr className="profile-divider" />

      {/* SECCIÓN INFERIOR: HISTORIAL */}
      <section className="orders-section">
        <h3 className="section-title">
          <FaBagShopping /> Mis Pedidos
        </h3>

        {pedidos.length === 0 ? (
          <p className="empty-msg">Aún no has realizado ninguna compra.</p>
        ) : (
          <div className="orders-grid">
            {pedidos.map((p) => (
              <div key={p.id} className="order-card">
                <div className="order-main-info">
                  <span><strong>N. Pedido #{p.id}</strong></span>
                  <span className={`status ${p.estado.toLowerCase()}`}>{p.estado}</span>
                </div>
                <div className="order-meta">
                  <span>Fecha: {new Date(p.fechaCreacion).toLocaleDateString()}</span>
                  <span className="order-price">{p.totalBruto.toFixed(2)}€</span>
                </div>
                {/* Resumen de productos comprados */}
                <div className="order-items-list">
                  {p.detalles?.map((d, index) => (
                    <span key={index} className="item-tag">{d.producto.nombre}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;