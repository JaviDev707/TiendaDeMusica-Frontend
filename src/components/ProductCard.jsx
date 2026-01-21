import "../css/Catalog.css";

const DEFAULT_IMAGES = {
    DISCO:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg", 
    INSTRUMENTO:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=500", 
    VARIOS:
      "https://www.laguitarreria.es/6309-large_default/daddario-pro-arte-ej50-juego-de-cuerdas-para-guitarra-clasica-flamenca.jpg", 
    NOT_FOUND: 
      "https://open.music-worx.com/static/img/label-img.jpeg",
  };

const ProductCard = ({ product }) => {

  const { tipoProducto, nombre, precio, imagen, stock, descripcion } = product;
  const imageUrl = imagen || DEFAULT_IMAGES[tipoProducto] || DEFAULT_IMAGES["NOT_FOUND"];

  return (
    <div className="product-card" style={cardStyle}>
      <div className="image-container">
        <img src={imageUrl} alt={nombre} style={imageStyle} />
        
        {/* Capa que aparece al hacer hover */}
        <div className="description-overlay">
          <p>{descripcion || "Sin descripción disponible"}</p>
        </div>
      </div>

      <div className="product-info">
        <h3>{nombre}</h3>
        <p className="price">{precio} €</p>

        {/* --- Renderizado basado en el tipo Herencia --- */}
        {tipoProducto === "DISCO" && (
          <div className="extra-info">
            <p>
              <strong>Artista:</strong> {product.artista}
            </p>
            <p>
              <strong>Género:</strong> {product.genero}
            </p>
            <p>
              <strong>Año:</strong> {product.year}
            </p>
          </div>
        )}

        {tipoProducto === "INSTRUMENTO" && (
          <div className="extra-info">
            <p>
              <strong>Categoría:</strong> {product.tipo}
            </p>
            <p>
              <strong>Marca:</strong> {product.marca}
            </p>
            <p>
              <strong>Modelo:</strong> {product.modelo}
            </p>
          </div>
        )}

        {tipoProducto === "VARIOS" && (
          <div className="extra-info">
            <p>
              <strong>Categoría:</strong> {product.tipo}
            </p>
            <p>
              <strong>Marca:</strong> {product.marca}
            </p>
          </div>
        )}

        {/* --- Stock y Botón --- */}
        <p className={stock > 0 ? "in-stock" : "out-of-stock"}>
          {stock > 0 ? `En stock: ${stock}` : "Agotado"}
        </p>

        <button disabled={stock === 0} onClick={() => alert("Añadido!")}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};
/*
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "15px",
  width: "220px",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const imageStyle = {
  width: "180px",
  height: "180px",
  objectFit: "cover",
  borderRadius: "4px",
};
*/
export default ProductCard;
