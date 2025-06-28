import React from 'react'

const ProductoGrid = ({ productos, onEditar, onVer, onEliminar, categorias = [], marcas = [] }) => {
  
  const getNombreCategoria = (id) => {
    const categoria = categorias.find(c => c.id_categoria === id)
    return categoria ? categoria.nombre : `ID: ${id}`
  }

  const getNombreMarca = (id) => {
    const marca = marcas.find(m => m.id_marca === id)
    return marca ? marca.nombre : `ID: ${id}`
  }

  return (
    <div className="grid-container">
      <div className="grid-header">
        <div>ID</div>
        <div>Imagen</div>
        <div>Nombre</div>
        <div>Precio</div>
        <div>Stock</div>
        <div>Categoría</div>
        <div>Marca</div>
        <div>Acciones</div>
      </div>

      <div className="grid-body">
        {productos.map((producto) => (
          <div key={producto.id_producto} className="grid-row">
            <div>{producto.id_producto}</div>
            <div>
              <img 
                src={producto.imagen_url} 
                alt={producto.nombre}
                className="producto-imagen-small"
              />
            </div>
            <div className="producto-nombre-cell" title={producto.nombre}>
              {producto.nombre}
            </div>
            <div>${producto.precio.toLocaleString()}</div>
            <div className={producto.stock < 10 ? 'stock-bajo' : ''}>{producto.stock}</div>
            <div title={getNombreCategoria(producto.id_categoria)}>
              {getNombreCategoria(producto.id_categoria)}
            </div>
            <div title={getNombreMarca(producto.id_marca)}>
              {getNombreMarca(producto.id_marca)}
            </div>
            <div className="acciones-cell">
              <div className="menu-hamburguesa">
                <button className="btn-menu">•••</button>
                <div className="menu-opciones">
                  <button onClick={() => onVer(producto)}>
                    👁️ Ver Detalle
                  </button>
                  <button onClick={() => onEditar(producto)}>
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => onEliminar(producto.id_producto)}
                    className="btn-eliminar"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productos.length === 0 && (
        <div className="empty-message">
          <h3>No se encontraron productos</h3>
          <p>No hay productos que coincidan con los filtros aplicados</p>
        </div>
      )}
    </div>
  )
}

export default ProductoGrid
