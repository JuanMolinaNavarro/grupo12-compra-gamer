import React from 'react'

const CategoriaDetalle = ({ categoria, onVolver, onEditar }) => {
  if (!categoria) {
    return (
      <div className="detalle-container">
        <div className="error-mensaje">No se encontró la categoría</div>
      </div>
    )
  }

  return (
    <div className="detalle-container">
      <div className="detalle-header">
        <h2>Detalle de Categoría</h2>
        <div className="detalle-acciones">
          <button 
            className="btn btn-secondary"
            onClick={onVolver}
          >
            Volver
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => onEditar(categoria)}
          >
            Editar
          </button>
        </div>
      </div>

      <div className="detalle-content">
        <div className="detalle-seccion">
          <h3>Información General</h3>
          <div className="detalle-grid">
            <div className="detalle-campo">
              <label>ID:</label>
              <span>{categoria.id}</span>
            </div>
            <div className="detalle-campo">
              <label>Nombre:</label>
              <span className="valor-destacado">{categoria.nombre}</span>
            </div>
            <div className="detalle-campo campo-completo">
              <label>Descripción:</label>
              <span className="descripcion-texto">
                {categoria.descripcion || 'Sin descripción'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriaDetalle
