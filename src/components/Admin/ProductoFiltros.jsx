import React from 'react'

const ProductoFiltros = ({ filtros, onFiltroChange, categorias, marcas }) => {
  
  const getNombreCategoria = (id) => {
    const categoria = categorias.find(c => c.id_categoria.toString() === id)
    return categoria ? categoria.nombre : id
  }

  const getNombreMarca = (id) => {
    const marca = marcas.find(m => m.id_marca.toString() === id)
    return marca ? marca.nombre : id
  }

  return (
    <div className="filtros-container">
      <h3>🔍 Filtrar Productos</h3>
      <div className="filtros-grid">
        
        {/* Filtro por ID */}
        <div className="filtro-item">
          <label>ID</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Buscar por ID..."
              value={filtros.id}
              onChange={(e) => onFiltroChange('id', e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Nombre */}
        <div className="filtro-item">
          <label>Nombre</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={filtros.nombre}
              onChange={(e) => onFiltroChange('nombre', e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Precio */}
        <div className="filtro-item">
          <label>Precio</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Buscar por precio..."
              value={filtros.precio}
              onChange={(e) => onFiltroChange('precio', e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Stock */}
        <div className="filtro-item">
          <label>Stock</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Buscar por stock..."
              value={filtros.stock}
              onChange={(e) => onFiltroChange('stock', e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Categoría */}
        <div className="filtro-item">
          <label>Categoría</label>
          <div className="filtro-select-container">
            <select
              value={filtros.categoria}
              onChange={(e) => onFiltroChange('categoria', e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Filtro por Marca */}
        <div className="filtro-item">
          <label>Marca</label>
          <div className="filtro-select-container">
            <select
              value={filtros.marca}
              onChange={(e) => onFiltroChange('marca', e.target.value)}
            >
              <option value="">Todas las marcas</option>
              {marcas.map(marca => (
                <option key={marca.id_marca} value={marca.id_marca}>
                  {marca.nombre}
                </option>
              ))}
            </select>
            <span className="search-icon">🔍</span>
          </div>
        </div>

      </div>

      {/* Resumen de filtros activos */}
      <div className="filtros-activos">
        {filtros.id && (
          <span className="filtro-tag">
            ID: {filtros.id}
            <button onClick={() => onFiltroChange('id', '')}>×</button>
          </span>
        )}
        {filtros.nombre && (
          <span className="filtro-tag">
            Nombre: {filtros.nombre}
            <button onClick={() => onFiltroChange('nombre', '')}>×</button>
          </span>
        )}
        {filtros.precio && (
          <span className="filtro-tag">
            Precio: {filtros.precio}
            <button onClick={() => onFiltroChange('precio', '')}>×</button>
          </span>
        )}
        {filtros.stock && (
          <span className="filtro-tag">
            Stock: {filtros.stock}
            <button onClick={() => onFiltroChange('stock', '')}>×</button>
          </span>
        )}
        {filtros.categoria && (
          <span className="filtro-tag">
            Categoría: {getNombreCategoria(filtros.categoria)}
            <button onClick={() => onFiltroChange('categoria', '')}>×</button>
          </span>
        )}
        {filtros.marca && (
          <span className="filtro-tag">
            Marca: {getNombreMarca(filtros.marca)}
            <button onClick={() => onFiltroChange('marca', '')}>×</button>
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductoFiltros
