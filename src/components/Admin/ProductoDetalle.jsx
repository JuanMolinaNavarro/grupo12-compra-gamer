import React from 'react'

const ProductoDetalle = ({ producto, categorias, marcas, onVolver }) => {
  if (!producto) return null

  const categoria = categorias.find(c => c.id_categoria === producto.id_categoria)
  const marca = marcas.find(m => m.id_marca === producto.id_marca)

  return (
    <div className="detalle-container">
      <h2>Detalle del Producto</h2>
      
      <div className="detalle-content">
        <div className="detalle-imagen">
          <img src={producto.imagen_url} alt={producto.nombre} />
        </div>
        
        <div className="detalle-info">
          <div className="info-group">
            <label>ID:</label>
            <span>{producto.id_producto}</span>
          </div>

          <div className="info-group">
            <label>Nombre:</label>
            <span>{producto.nombre}</span>
          </div>

          <div className="info-group">
            <label>Descripción:</label>
            <span>{producto.descripcion}</span>
          </div>

          <div className="info-row">
            <div className="info-group">
              <label>Precio:</label>
              <span>${producto.precio.toLocaleString()}</span>
            </div>

            <div className="info-group">
              <label>Stock:</label>
              <span>{producto.stock} unidades</span>
            </div>
          </div>

          <div className="info-row">
            <div className="info-group">
              <label>Categoría:</label>
              <span>{categoria ? categoria.nombre : 'No encontrada'}</span>
            </div>

            <div className="info-group">
              <label>Marca:</label>
              <span>{marca ? marca.nombre : 'No encontrada'}</span>
            </div>
          </div>

          <div className="info-group">
            <label>Fecha de agregado:</label>
            <span>{new Date(producto.fecha_agregado).toLocaleDateString()}</span>
          </div>

          <div className="info-group">
            <label>URL de imagen:</label>
            <span className="url-text">{producto.imagen_url}</span>
          </div>
        </div>
      </div>

      <div className="detalle-actions">
        <button onClick={onVolver} className="btn-volver">
          ← Volver al Grid
        </button>
      </div>
    </div>
  )
}

export default ProductoDetalle
