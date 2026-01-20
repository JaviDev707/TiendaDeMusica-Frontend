import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SidebarFilter = ({
  busqueda,
  setBusqueda,
  rangoPrecio,
  setRangoPrecio,
  categoriasActivas,
  setCategoriasActivas,
  soloStock,
  setSoloStock,
  precioMaximo,
}) => {
  const handleCheckboxChange = (cat) => {
    setCategoriasActivas({
      ...categoriasActivas,
      [cat]: !categoriasActivas[cat],
    });
  };

  return (
    <aside className="sidebar" style={{ padding: "10px", textAlign: "center" }}>
      <h3>Filtros</h3>

      {/* BUSCADOR */}
      <div className="filter-group">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      {/* SLIDER DOBLE */}
      <div className="filter-group">
        <h4>
          Rango de precio: {rangoPrecio[0]}€ - {rangoPrecio[1]}€
        </h4>
        <div>
          <Slider
            range
            min={0}
            max={precioMaximo}
            defaultValue={[0, 1000]}
            value={rangoPrecio}
            onChange={setRangoPrecio}
            trackStyle={{ backgroundColor: "black" }}
            handleStyle={[
              { borderColor: "black", backgroundColor: "white" }, // Bolita izquierda
              { borderColor: "black", backgroundColor: "white" }, // Bolita derecha
            ]}
          />
        </div>
      </div>
      <br />
      <hr />

      {/* CATEGORÍAS */}
      <div className="filter-group">
        <h4>Categorías</h4>
        {Object.keys(categoriasActivas).map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={categoriasActivas[cat]}
              onChange={() =>
                setCategoriasActivas({
                  ...categoriasActivas,
                  [cat]: !categoriasActivas[cat],
                })
              }
            />{" "}
            {cat}
            <br />
          </label>
        ))}
      </div>
      <br />
      <hr />

      {/* STOCK */}
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={soloStock}
            onChange={() => setSoloStock(!soloStock)}
          />{" "}
          Solo en stock
        </label>
      </div>
      <br />
    </aside>
  );
};
export default SidebarFilter;
