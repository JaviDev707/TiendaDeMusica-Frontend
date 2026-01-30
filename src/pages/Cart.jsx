import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../css/Cart.css";
import { ClipLoader } from "react-spinners";

const Cart = () => {

  const { carrito, eliminarDelCarrito, actualizarCantidad, loading, comprar } = useCart();
  const navigate = useNavigate(); 
  const [isProcessing, setIsProcessing] = useState(false);

  if (loading) return ( 
    <ClipLoader size={100} color={"#123"} loading={loading} />
  );

  if (!carrito || carrito.items.length === 0) {
    return (
      <Container className="cart-empty-container">
        <Typography variant="h4" gutterBottom>Tu carrito está vacío 🎸</Typography>
        <Button variant="contained" component={Link} to="/catalog" className="btn-black" sx={{ mt: 2 }}>
          Ir al Catálogo
        </Button>
      </Container>
    );
  }

  // Función para manejar la compra
  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await comprar();
      alert("¡Pedido realizado con éxito! 🎸");
      navigate("/catalog"); 
    } catch (error) {
      alert("Hubo un error al procesar tu pedido. Inténtalo de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };

  const totalCompra = carrito.items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);

  return (
    <Container maxWidth="lg" className="cart-container">
      <Typography variant="h4" className="cart-title">
        Tu Carrito de Compra
      </Typography>

      <TableContainer component={Paper} className="cart-table-paper">
        <Table>
          <TableHead className="cart-table-head">
            <TableRow>
              <TableCell className="cart-header-cell">Producto</TableCell>
              <TableCell className="cart-header-cell" align="center">Precio</TableCell>
              <TableCell className="cart-header-cell" align="center">Cantidad</TableCell>
              <TableCell className="cart-header-cell" align="center">Subtotal</TableCell>
              <TableCell className="cart-header-cell" align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carrito.items.map((item) => (
              <TableRow key={item.producto.id} className="cart-row-hover">
                {/* INFO PRODUCTO */}
                <TableCell>
                  <div className="cart-product-info">
                    <img 
                      src={item.producto.imageUrl} 
                      alt={item.producto.nombre} 
                      className="cart-product-img" 
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.producto.nombre}
                    </Typography>
                  </div>
                </TableCell>

                {/* PRECIO */}
                <TableCell align="center">{item.producto.precio}€</TableCell>

                {/* CANTIDAD */}
                <TableCell align="center">
                  <div className="quantity-control">
                    <IconButton size="small" onClick={() => actualizarCantidad(item.producto.id, item.cantidad - 1)}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                      {item.cantidad}
                    </Typography>
                    <IconButton size="small" onClick={() => actualizarCantidad(item.producto.id, item.cantidad + 1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </div>
                </TableCell>

                {/* SUBTOTAL */}
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  {(item.producto.precio * item.cantidad).toFixed(2)}€
                </TableCell>

                {/* ELIMINAR */}
                <TableCell align="center">
                  <IconButton color="error" onClick={() => eliminarDelCarrito(item.producto.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* RESUMEN */}
      <div className="cart-summary-container">
        <Paper className="cart-summary-paper">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Resumen del Pedido</Typography>
          
          <div className="summary-row">
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography variant="h6">{totalCompra.toFixed(2)}€</Typography>
          </div>
          
          <div className="summary-row" style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <Typography variant="h6">Total</Typography>
            <Typography className="total-price">{totalCompra.toFixed(2)}€</Typography>
          </div>

          <Button 
            variant="contained" 
            fullWidth 
            className="btn-black"
            onClick={handleCheckout} 
            disabled={isProcessing}  
          >
            {isProcessing ? "Procesando..." : "Tramitar Pedido"}
          </Button>
        </Paper>
      </div>
    </Container>
  );
};

export default Cart;