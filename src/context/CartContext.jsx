import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNotification } from "./NotificationContext.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const API_URL = "http://localhost:8080/api/carrito";
  // Función para cargar el carrito desde la API
  const cargarCarrito = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    // Indico que estoy cargando
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setCarrito(response.data);
      console.log("🛒 Carrito cargado:", response.data);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    } finally {
      setLoading(false);
    }
  };
  // Cargo el carrito al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      cargarCarrito();
    } else {
      setLoading(false); 
    }
  }, []);

  // Funciones para manipular el carrito
  const agregarAlCarrito = async (productoId, cantidad = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showNotification("❌ Por favor, inicia sesión para comprar.", "warning");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/agregar`, {
        productoId,
        cantidad,
      });
      setCarrito(response.data);
      showNotification("✅ Producto añadido al carrito", "success");
    } catch (error) {
      console.error("Error al añadir:", error);
      showNotification("❌ Error al añadir al carrito", "error");
    }
  };

  const eliminarDelCarrito = async (productoId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/eliminaritem/${productoId}`,
      );
      setCarrito(response.data);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const actualizarCantidad = async (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      const response = await axios.put(`${API_URL}/actualizarcantidad`, {
        productoId,
        cantidad: nuevaCantidad,
      });
      setCarrito(response.data);
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };
  // Calculo el total de items en el carrito
  const totalItems =
    carrito?.items?.reduce((acc, item) => acc + item.cantidad, 0) || 0;
  // Función para realizar la compra
  const comprar = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/pedidos/checkout",
      );

      setCarrito({ items: [] });

      return response.data;
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        loading,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        cargarCarrito,
        totalItems,
        comprar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
